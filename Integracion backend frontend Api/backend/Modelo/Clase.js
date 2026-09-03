const sequelize = require('../db/conection');
const { DataTypes } = require('sequelize');

const Clase = sequelize.define('Clase', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'clase',
    timestamps: false
});

module.exports = Clase;
