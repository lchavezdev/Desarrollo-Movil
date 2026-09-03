const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'proyecto',
    'root',
    'basededatos',
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexion exitosa a MySQL'))
    .catch((error) => console.log('Error de conexión:', error));

module.exports = sequelize;
