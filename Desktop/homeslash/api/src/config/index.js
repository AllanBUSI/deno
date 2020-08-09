module.exports = {
    server: {
        port: 8892,
        env: process.env.NODE_ENV || "development",
    },
    database: {
        mysql: {
            host: "bi70clphib8gkcphtlzx-mysql.services.clever-cloud.com",
            user: "umfjds0krupyucta",
            password: "IJdfXW7mCoyE8mUVLnuo",
            database: "bi70clphib8gkcphtlzx",
        },
        mongodb: {
            url: "",
            port: "",
            username: "",
            password: "",
        }
    },
    email: {
        sender: {
            default: {
                name: "",
                email: ""
            }
        },
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "busi.travail@gmail.com", // email
            pass: "knvwsnrmboqlswsy", // password
        },
        sendgrid: {
            secret: ""
        }
    },
    logger: {
        host: "",
        port: "",
    },
    keyToken: "allanbusi"
};