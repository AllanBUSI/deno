const status = require("../../middleware/status/index"),
    verif = require("../../middleware/verif/index"),
    sql = require("../sql/index");



module.exports = {
    ville: async(req, res) => {
        data = req.params.ville;
        error = false;
        if (await verif.vide(data) == false)
            error = true;
        if (error == true)
            status.sendReturn(res, 400, { error: true, message: "Aucun résultat" });
        else {
            sql.query(sql.selectLike("villes_france", "ville_nom_simple"), "%" + data + "%", (error, results) => {
                if (error)
                    console.log(error);
                status.sendReturn(res, 200, { error: false, result: results });
            });
        }
    }
};