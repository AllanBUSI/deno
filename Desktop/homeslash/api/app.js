const cors = require("cors"), // CORS est un package node.js pour fournir un middleware sous Express qui peut être utilisé pour activer CORS avec diverses options.
    express = require("express"),
    db = require("./src/utils/db"),
    route = require("./src/routes"), // Apport des route créé
    config = require("./src/config"),
    bodyParser = require("body-parser"),
    logger = require("./src/utils/logger"),
    api = express();

api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Content-Type", "application/json");
    next();
});

api.use(cors());

api.use(bodyParser.urlencoded({
    extended: false
}));

api.use(bodyParser.json({
    extended: false
}));

route(api);

api.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname + "/public/index.html"));
});

api.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError")
        res.status(401).send("Missing authentication credentials.");
});

api.listen(config.server.port, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    logger.info(
        `API Tourne ${config.server.port} in ${config.server.env} mode \n Lancé le site web sur votre navigateur http://localhost:${config.server.port}`
    );
});