const status = require("../../middleware/status/index"),
    sql = require("../sql/index"),
    verif = require("../../middleware/verif/index"),
    filter = require("../../middleware/filter/index"),
    outil = require("../../middleware/outil/index"),
    bcrypt = require("bcrypt"),
    jwt = require("jsonwebtoken"),
    config = require("../../config/index"),
    login = require("../../utils/email/login.js");



module.exports = {
    login: async(req, res) => {
        data = req.body;
        table = "user";
        array = { email: data.email.trim().toLowerCase() };
        error = false;
        if (verif.vide(data.email) == false)
            error = true;
        if (verif.vide(data.password) == false)
            error = true;
        if (error == true)
            status.sendReturn(res, 400, { error: true, message: "Une ou plusieurs données obligatoire sont manquantes" });

        if (filter.emailFormat(data.email) == false || filter.passwordFormat(data.password) == false)
            status.sendReturn(res, 400, { error: true, message: "Une ou plusieurs données obligatoire ne sont pas conformes" });
        sql.query(sql.select(table), array, (error, results) => {
            if (error != null) {
                console.log(error);
                status.sendReturn(res, 401, { error: true, message: "Requête impossible" });
            } else if (results.length == 0) {
                status.sendReturn(res, 401, { error: true, message: "Votre Email/Password est incorrect" });
            } else {
                bcrypt.compare(data.password, results[0].password).then(isOK => {
                    if (isOK) {
                        if (results[0].attempt >= 5 && ((new Date() - results[0].lastlogin) / 1000 / 60) <= 3)
                            status.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + data.email + " - Veuillez patientez 3min" });
                        else {
                            console.log(results);
                            toUpdate = {
                                lastlogin: new Date(),
                                attempt: 0,
                                token: token = jwt.sign({ id: results[0].iduser, level: 0 }, config.keyToken, {
                                    expiresIn: 86400 // expires in 24 hours
                                })
                            };
                            console.log(toUpdate);
                            sql.query(sql.update("user", "iduser = " + results[0].iduser + ""), toUpdate, (error, results) => {
                                console.log(results);
                                if (error != null)
                                    status.sendReturn(res, 500, { error: true, message: "Requête impossible" });
                                else {
                                    sql.query(sql.select("user"), array, (error, results) => {
                                        if (error != null)
                                            status.sendReturn(res, 500, { error: true, message: "Requête impossible" });
                                        else
                                            status.result(results, outil.email(data.email, "Connexion Detecté", login.email(results[0].email, results[0].prenom)), status.sendReturn(res, 200, { error: false, message: "vous êtes connecter", token: results[0].token }));

                                    });
                                }
                            });
                        }
                    } else {
                        verif.lastconnect(res, req, results[0].attempt, results[0].lastlogin, "user", "email = ", results[0].email);
                    }
                });
            }
        });
    }
};