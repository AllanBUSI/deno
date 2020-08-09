const user = require("../controllers/user");

module.exports = api => {
    /** 
     * login => POST | email;password
     * register => POST | username;email;password
     * forgot_password => POST | email
     */
    api.route("/login").post(user.login);
    api.route("/register").post(user.register);
    api.route("/").get(user.home);
        // api.route('/logout').get(user.logout);
    api.route("/forgot").post(user.forgot_password);
        // api.route('/user/:id').get(user.getOne);
        // api.route('/user').get(user.getAll);
        // api.route('/user/:id').put(user.update);
        // api.route('/user/:id').delete(user.deleteOne);
};