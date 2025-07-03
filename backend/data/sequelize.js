const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/CalendarioDB.sqlite'
});

module.exports = { sequelize };