const Sequelize = require('sequelize'),
      db = require('../db');


module.exports = function() {
    return db.sequelize.define("tasks", {
        task_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        isDone: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'tasks'
    })
}