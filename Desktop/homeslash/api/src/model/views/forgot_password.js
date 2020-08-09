const status = require("../../middleware/status/index"),
    verif = require("../../middleware/verif/index"),
    outil = require("../../middleware/outil/index"),
    forgot = require("../../utils/email/forgot_password.js"),
    sql = require("../sql/index"),
    bcrypt = require("bcrypt");


module.exports = {
    forgot_password: async(req, res) => {
        if (verif.vide(req.body.email) == false)
            status.sendReturn(res, 400, { error: true, message: "L'email de l'utilisateur est manquant pour l'envoi" });
        else {
            if (await verif.emailExiste("user", req.body.email, res)) {
                userEmail = req.body.email;
                mdp = Math.random().toString(36).slice(-8);
                outil.email(userEmail, " Mot de passe oublié ", forgot.email(mdp, userEmail));
                mdp = await new Promise(resolve => {
                    bcrypt.genSalt(10, async(err, salt) => {
                        return await bcrypt.hash(mdp, salt, (err, hash) => {
                            resolve(hash);
                        });
                    });
                });
                toUpdate = {
                    password: mdp
                };
                sql.query(sql.update("user", "email = '" + userEmail + "'"), toUpdate, (error, results) => {
                    if (error)
                        console.log(error);
                    if (results.affectedRows != 0) {
                        status.sendReturn(res, 200, { error: false, message: "Email de récupération envoyé" });
                    } else {
                        status.sendReturn(res, 400, { error: true, message: "Modification Impossible" });
                    }
                });
            } else {
                status.sendReturn(res, 200, { error: false, message: "Email de récupération envoyé" });
            }
        }
    }
};