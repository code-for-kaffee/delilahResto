const server = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors')
const router = require('./app/routes/routes');
const displayRoutes = require('express-routemap');


server.use(cors())
server.use(bodyParser.json())

/* server.get("/productos");
server.post("/productos");
server.delete("/productos");
server.put("/productos"); */

require('./app/db/db')
server.use(router);


/* 
server.get("/secure", authenticateUser, (req, res) => {
    res.send(`esta es una pagina autenticada, hola${JSON.stringify(req.user)}`)

}) */

const port = 3000;
server.listen(port, () => {
    console.log(`API running -> Port ${port}`);
    displayRoutes(server);

});

