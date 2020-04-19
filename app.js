const server = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./app/routes/post');
const Sequelize = require ('sequelize');
const sequelize = new  Sequelize('mysql://zmuIZMfIcW:nBGMqiRUM1@remotemysql.com:3306/zmuIZMfIcW'); 



addUser = (req, res, next) => {
    const query = 'INSERT INTO clients (user, pass) VALUES ("algo", "asd123")';
    const resultados = sequelize.query(query, { raw: true});
    
}

server.use(cors())
server.use(bodyParser.json())

/* server.get("/productos");
server.post("/productos");
server.delete("/productos");
server.put("/productos"); */


server.use(router);


/* 
server.get("/secure", authenticateUser, (req, res) => {
    res.send(`esta es una pagina autenticada, hola${JSON.stringify(req.user)}`)

}) */

const port = 3000;
server.listen(port, () => {
    console.log("Server On!");
});
