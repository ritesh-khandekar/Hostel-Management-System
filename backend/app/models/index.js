const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.students = require("./students.model.js")(sequelize, Sequelize);
db.complaint = require("./complaints.model.js")(sequelize, Sequelize);
db.admins = require("./admins.model.js")(sequelize, Sequelize);

module.exports = db;