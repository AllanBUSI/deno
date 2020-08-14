module.exports = {
    server: {
        port: 3000,
        env: process.env.NODE_ENV || "development",
    },
    database: {
        mysql: {
            host: "b68wkt0iwonqsueyq954-mysql.services.clever-cloud.com",
            user: "ug7ngj7nasxbgw1u",
            password: "QjBVd4TpnhjP0REJmA7e",
            database: "b68wkt0iwonqsueyq954",
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