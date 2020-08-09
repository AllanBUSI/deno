const ville = require("../model/views/ville.js");

exports.ville = async(req, res) => {
    ville.ville(req, res);
};