require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "todo",
    "root",
    process.env.MYSQL_ROOT_PASSWORD,
    {
        dialect: "mysql",
        host: "mysql",
        port: 3306
    }
)

sequelize.sync()
.then(() => console.log("connection is active"))
.catch((err) => console.log(err));

module.exports = {
    sequelize : sequelize,
}