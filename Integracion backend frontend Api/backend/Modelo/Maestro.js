const sequelize = require('../db/conection');
const { DataTypes } = require('sequelize');

const Maestro = sequelize.define('Maestro', {
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
    tableName: 'maestro',
    timestamps: false
});

module.exports = Maestro;
