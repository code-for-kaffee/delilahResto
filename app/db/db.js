const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://zmuIZMfIcW:B1t0VeEZnH@remotemysql.com:3306/zmuIZMfIcW');


const userModel = require('../models/users');
/* 
const user = userModel(sequelize, Sequelize);
 sequelize.sync({ force: false })
     .then(() => {
         console.log('Tablas sincronizadas')
     }) */

module.exports = {
    sequelize
}