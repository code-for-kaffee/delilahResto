const Sequelize = require('sequelize');
//const sequelize = new Sequelize('mysql://zmuIZMfIcW:B1t0VeEZnH@remotemysql.com:3306/zmuIZMfIcW'); -> Descomentar para utilizar la db online
const host = 'localhost';
const dbName = 'DelilahResto';
const user = 'root';
const password = '';
const port = '3306';
const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${dbName}`);

sequelize.authenticate()
  .then(() => {
    console.log(`Conexión éxitosa a la base de datos ${dbName}`)
  })
  .catch(err => {
    console.log('No se pudo conectar a MySQL')
  });
module.exports = {
    sequelize
}