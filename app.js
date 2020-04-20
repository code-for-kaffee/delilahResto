const server = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./app/routes/post');


server.use(cors())
server.use(bodyParser.json())

/* server.get("/productos");
server.post("/productos");
server.delete("/productos");
server.put("/productos"); */

require('./db')
server.use(router);


/* 
server.get("/secure", authenticateUser, (req, res) => {
    res.send(`esta es una pagina autenticada, hola${JSON.stringify(req.user)}`)

}) */

const port = 3000;
server.listen(port, () => {
    console.log("Server On!");
});
