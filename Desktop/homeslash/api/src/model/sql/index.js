db = require("../../utils/db/index");

module.exports = {
    insert: (table) => {
        return "INSERT INTO " + table + "  SET ? ";
    },
    select: (table) => {
        return "SELECT * FROM " + table + " WHERE ? ";
    },
    selectAll: (table) => {
        return "SELECT * FROM " + table;
    },
    selectLike: (table, where) => {
        return "SELECT * FROM " + table + " WHERE " + where + " LIKE ?";
    },
    update: (table, where) => {
        return "UPDATE " + table + " SET ? WHERE " + where;
    },
    query: (req, obj, callback) => {
        console.log("ok " + obj);
        return db.mysql.query(req, obj, callback);
    }
};