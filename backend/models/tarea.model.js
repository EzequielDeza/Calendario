const { DataTypes } = require('sequelize');
const { sequelize } = require('../data/sequelize'); 

const Tarea = sequelize.define('Tarea', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    completada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

module.exports = { Tarea };
