const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://zmuIZMfIcW:B1t0VeEZnH@remotemysql.com:3306/zmuIZMfIcW'); -> Descomentar para utilizar la db online
const host = 'localhost';
const database_name = 'DelilahResto';
const user = 'root';
const password = '';
const port = '3306';
const sequelize = new Sequelize('mysql://' + user + ':' + password + '@' + host + ':' + port + '/' + database_name);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión éxitosa a la base de datos: ' + database_name)
  })
  .catch(err => {
    console.log('No se pudo conectar a MySQL')
  });
module.exports = {
    sequelize
}