const user = require("./user"),
    carte = require("./carte");

module.exports = api => {
    user(api);
    carte(api);
};