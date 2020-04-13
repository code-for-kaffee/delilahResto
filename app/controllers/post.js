const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res, next) =>{
    const { user, password } = req.body;
    const validate = postRoutes(user, password);
    if (!validate) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
   
    const token = jwt.sign({
        user
    }, 'newPassword');
    res.json({ token })
   }
   
exports.validateUsers = (user, password) => {
    const users = [{
         user: 'fede',
         password: 'Facil123!'
     }]
     const [filterUsers] = users.filter(fila => fila.user === user && fila.password  === password);
     if (!filterUsers){
         return false;
     }
     return filterUsers;
 
 }
 
 module.exports.authenticateUser = (req, res, next) =>{
 try{
     const token = req.headers.authorization.split(' ')[1];
     const verificateToken = jwt.verify(token, "newPassword");
     if(verificateToken) {
         req.user = verificateToken;
         return next();
     }
 }catch (err) {
     res.json({ error: "Error al validar usuario"})
 }
 
 }
