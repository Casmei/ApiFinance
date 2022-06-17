const { Sequelize } = require('sequelize');
const dataSource = require("../config/database.config");
const sequelize = new Sequelize(dataSource);


const test_connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

test_connection()

module.exports = sequelize;
