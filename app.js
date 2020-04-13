const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const postRoutes = require('./app/routes/post');
/* const Sequelize = require ('sequelize');
const sequelize = new  Sequelize(); */

/* sequelize.authenticate().then(async () => { 
    const query = 'SELECT * FROM usuarios';
    const resultados = await sequelize.query(query, { raw: true});
})
 */
app.use(cors())
app.use(bodyParser.json())

/* app.get("/productos");
app.post("/productos");
app.delete("/productos");
app.put("/productos"); */


app.use(postRoutes);


/* 
app.get("/secure", authenticateUser, (req, res) => {
    res.send(`esta es una pagina autenticada, hola${JSON.stringify(req.user)}`)

}) */

const port = 3000;
app.listen(port, () => {
    console.log("Server On!");
});
