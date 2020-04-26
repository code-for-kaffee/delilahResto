const jwt = require('jsonwebtoken');
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');


module.exports.checkUser = (req, res, next) => {
    console.log(req.body)
    const { user, password } = req.body;
    console.log(user)
    const validate = validateUsers(user, password);
    if (!validate) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
    const token = jwt.sign({
        user
    }, 'newPassword');
    res.json({ token })
}

/* module.exports.registerUser = (req, res, next) => {
    const user = req.body;
    console.log(user);

    const registroUsuario =  (user) => {
        const registro = sequelize.query(
            `INSERT INTO clients (username, fullname, email, phone, adress, password) 
          VALUES('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.adress}', '${user.password}')`,
            { type: QueryTypes.INSERT });
            return registro;
        
    }
    registroUsuario(user);
} */




module.exports.registerUser = (req, res, next) => {
    let require = req.body;
   prueba(require); 
    async function prueba(require) {
        try {
            const user = require;
            const registrarUsuario = await registroUsuario(user);
            const response = {
                estado: 'Se registró el usuario',
                usuario: registrarUsuario
            }
            return response;
        } catch (err) {
            throw err
        }
    };
    const registroUsuario =  (user) =>{
         const registro = sequelize.query(
             `INSERT INTO clients (username, fullname, email, phone, adress, password) 
           VALUES('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.adress}', '${user.password}')`,
             { type: QueryTypes.INSERT });
             return registro;
         
     }
};

validateUsers = (user, password) => {
    sequelize.authenticate().then(async () => {
        const query = 'SELECT * FROM clients';
        const resultados = await sequelize.query(query, { raw: true });
        return resultados;
    })
    const [filterUsers] = users.filter(fila => fila.user === user && fila.password === password);
    if (!filterUsers) {
        return false;
    }
    return filterUsers;

} 

module.exports.authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, "newPassword");
        if (verifyToken) {
            req.user = verifyToken;
            return next();
        }
    } catch (err) {
        res.json({ error: "Error al validar usuario" })
    }

}




//Template literals (Template strings) 