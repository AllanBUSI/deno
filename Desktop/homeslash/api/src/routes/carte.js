const carte = require("../controllers/carte.js");

module.exports = api => {
    /**
     * ville => GET | ville
     */
    // api.route('/vente').post(user.addvente);
    // api.route('/vente').put(user.updatevente);
    // api.route('/vente').delete(user.deletevente);
    api.route("/:ville").get(carte.ville);
    // api.route('/:bienvenduall').get(user.bienvenduAll);
    // api.route('/:bienvendu').get(user.bienvendu);
    // api.route('/:bienventeall').get(user.bienventeAll);
    // api.route('/:bienvente').get(user.bienvente);
};