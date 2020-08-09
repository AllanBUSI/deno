module.exports = {
    server: {
        port: 3000,
        env: process.env.NODE_ENV || "development",
    },
    database: {
        mysql: {
            host: "",
            user: "",
            password: "",
            database: "",
        },
        mongodb: {
            url: "",
            port: "",
            username: "",
            password: "",
        },
        email: {
            sender: {
                default: {
                    name: "",
                    email: ""
                }
            },
            id: {
                host: "smtp..com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "", // email
                    pass: "", // password
                },

            },
            sendgrid: {
                secret: ""
            }
        }
    },
    logger: {
        host: "",
        port: "",
    },
    keyToken: ""
};