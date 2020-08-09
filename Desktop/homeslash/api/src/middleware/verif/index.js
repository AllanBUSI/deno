const sql = require("../../model/sql/index.js"),
    status = require("../status/index");


module.exports = {
    vide: async(data) => {
        if (data == undefined || data.trim().length == 0)
            return false;
        else
            return true;
    },
    emailExiste: async(table, data, res) => {
        let toReturn = false;
        toReturn = await new Promise(resolve => {
            sql.query(sql.select(table, "email"), data, (error, results) => {
                resolve((res.length > 0) ? true : false);
            });
        });
        return toReturn;
    },
    lastconnect: async(res, req, essaie, lastlogin, table, where, email) => {
        if (essaie >= 5 && ((new Date() - lastlogin) / 1000 / 60) <= 3) {
            status.sendReturn(res, 429, { error: true, message: "Trop de tentative sur l'email " + email + " - Veuillez patientez 3 min" });
        } else {
            toUpdate = {
                lastlogin: new Date(),
                attempt: essaie + 1
            };
            console.log(email);
            sql.query(sql.update(table, where + "'" + email + "'"), toUpdate, (error, results) => {
                console.log(results);
                if (error != null) {
                    status.sendReturn(res, 401, { error: true, message: "Requête impossible", sql: "update" });
                } else
                    status.sendReturn(res, 401, { error: true, message: "Votre Email/Password est incorrect" });
            });
        }
    }
};