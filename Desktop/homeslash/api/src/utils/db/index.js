const mysql = require("mysql"),
    mongoose = require("mongoose"),
    config = require("../../config");

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

const connectionMongo = mongoose.connect(config.database.mongodb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectionMysql = mysql.createConnection({
    host: config.database.mysql.host,
    user: config.database.mysql.user,
    password: config.database.mysql.password,
    database: config.database.mysql.database
});

connectionMysql.connect((err) => {
    if (err)
        console.log(`Error while attempting to connect to database MySQL: ${JSON.stringify(err)}`);
    else
        console.log("connected as id " + connectionMysql.threadId);
});

// Check connection sucess
connectionMongo
    .then(db => {
        console.log(
            `Successfully connected to ${config.database.mongodb.url} MongoDB cluster in ${
				config.server.env
			} mode.`,
        );
        return db;
    })
    .catch(err => {
        if (err.message.code === "ETIMEDOUT") {
            console.log("Attempting to re-establish database connection.");
            mongoose.connect(config.database.mongodb.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        } else
            console.log("ok");
        console.log(`Error while attempting to connect to database MongoDB: ${JSON.stringify(err)}`);
    });

module.exports = {
    mysql: connectionMysql,
    mongodb: connectionMongo
};