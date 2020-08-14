const status = require("../../middleware/status/index"),
    verif = require("../../middleware/verif/index"),
    outil = require("../../middleware/outil/index"),
    bcrypt = require("bcrypt"),
    sql = require("../../model/sql/index.js"),
    filter = require("../../middleware/filter/index.js"),
    register = require("../../utils/email/register.js");

module.exports = {
    register: async(req, res) => {
        const data = req.body;
        // Vérification de si les données sont bien présentes dans le body
        let error = false;
        if (await verif.vide(data.nom) == false)
            error = true;
        if (await verif.vide(data.prenom) == false)
            error = true;
        if (await verif.vide(data.email) == false)
            error = true;
        if (await verif.vide(data.password) == false)
            error = true;

        if (filter.emailFormat(data.email) == false || filter.passwordFormat(data.password) == false)
            status.sendReturn(res, 400, { error: true, message: "Une ou plusieurs données obligatoire ne sont pas conformes" });
        else {
            if (error == true)
                status.sendReturn(res, 400, { error: true, message: "Une ou plusieurs données obligatoire sont manquantes" });
            else {
                // Vérification de si l'email existe déjà
                if (await verif.emailExiste("user", data.email, res))
                    status.sendReturn(res, 400, { error: true, message: "Un compte est déjà enregistré à cet email" });
                //^^Message d'erreur requête verif email
                else {
                    // Encryptage du mot de passe
                    data.password = await new Promise(resolve => {
                            bcrypt.genSalt(10, async(err, salt) => {
                                return await bcrypt.hash(data.password, salt, (err, hash) => {
                                    resolve(hash);
                                });
                            });
                        }),
                        // Insertion de l'utilisateur en base de données
                        toInsert = {
                            nom: data.nom.trim(),
                            prenom: data.prenom.trim(),
                            password: data.password,
                            attempt: 0,
                            level: 0,
                            token: "",
                            lastlogin: new Date(),
                            email: data.email.trim().toLowerCase(),
                            datec: new Date()
                        },
                        // processus d'inscription
                        sql.query(sql.insert("user"), toInsert, (error, results) => {
                            if (error) {
                                console.log(error);
                                status.sendReturn(res, 400, { error: true, message: "La requête d'inscription en base de donnée n'a pas fonctionné" });
                            } else {
                                if (res.status(201)) {
                                    outil.email(data.email, "Ton compte", register.email(data.email, data.prenom));
                                    status.sendReturn(res, 201, { error: false, message: "Super ton compte à été créé !" });
                                } else {
                                    status.sendReturn(res, 500, { error: true, message: "Error Server" });
                                }
                            }
                        });
                }
            }
        }
    }
};