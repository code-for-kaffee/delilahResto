const Sequelize = require ('sequelize');
const sequelize = new  Sequelize('mysql://zmuIZMfIcW:DtI8GmeO5l@remotemysql.com:3306/zmuIZMfIcW'); 


const userModel = require ('./app/models/users');

const user = userModel(sequelize, Sequelize);

sequelize.sync( {force : false })
    .then( () => {
        console.log('Tables sincronizadas')
    })

module.exports= {
    user
}