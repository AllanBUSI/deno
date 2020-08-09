const filter = require("../filter/index"),
    bcrypt = require("bcrypt"),
    status = require("../status"),
    nodemailer = require("nodemailer"),
    config = require("../../config/index");


module.exports = {
    email: (email, sujet, html) => {
        console.log(config.email);
            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: config.email.secure, // true for 465, false for other ports
            auth: {
                user: config.email.auth.user, // email
                pass: config.email.auth.pass, // password
            },
        });

        // send mail with defined transport object
        transporter.sendMail({
            from: config.email.auth.user, // sender address
            to: email, // list of receivers
            subject: sujet, // Subject line
            // text: "Vous avez lancer une procédure de récupération de mot de passe. Voilà un mot de passe de remplacement qui vous permettra de vous connecter à votre compte, et lors de votre première connection vous pourrez le changer de nouveau. Votre nouveau mot de passe est : " + mdp,
            html: html
        });
    },
    verifloginpassword: async(email, password) => {
        if (filter.emailFormat(email) == false || filter.exist(password) == false) {
            return status.sendReturn(res, 401, { error: true, message: "L'email/password not correct", data: data });
        }
    },
    hashSecurity: async(result) => {
        // Encryptage du mot de passe
        const data = await new Promise(resolve => {
            bcrypt.genSalt(10, async(err, salt) => {
                return await bcrypt.hash(result, salt, (err, hash) => {
                    resolve(hash);
                });
            });
        });
        return data;
    },
    passwordGenerator: async() => {
        return Math.random().toString(36).slice(-8);
    }
};