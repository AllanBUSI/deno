const login = require("../model/views/login.js"),
    register = require("../model/views/register.js"),
    forgot_password = require("../model/views/forgot_password.js"),
    status = require("../middleware/status/index");


exports.home = async(req, res) => {
    status.sendReturn(res, 200, { error: false, message: "Site CDA" });
};

exports.register = async(req, res) => {
    register.register(req, res);
};

exports.login = async(req, res) => {
    login.login(req, res);
};

exports.forgot_password = async(req, res) => {
    forgot_password.forgot_password(req, res);
};