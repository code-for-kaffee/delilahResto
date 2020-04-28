const jwt = require('jsonwebtoken');
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');



module.exports.registerUser = (req, res, next) => {
    let data = req;
    this.register = async () => {
        try {
            const user = data.body;
            await registroUsuario(user);
            const response = {
                estado: 'Se registró correctamente el usuario'
            }
            return res.status(200).send({ code: 'OK', message: `${response.estado}` });;
        } catch (err) {
            throw err
        }
    };
    const registroUsuario = async (user) => {
        const registro = sequelize.query(
            `INSERT INTO clients (username, fullname, email, phone, adress, password) 
            VALUES('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.adress}', '${user.password}')`,
            { type: QueryTypes.INSERT });
        return registro;
    }
    this.register(data);
};


module.exports.loginUser = (req, res, next) => {
    const { username, password } = req.body;
    console.log(username + " " + password)
    const validate = validateUsers(username, password);
    console.log(validate)
    if (!validate) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
    const token = jwt.sign({
        username
    }, 'newPassword');
    res.json({ token })
}
module.exports.authenticate = (req, res, next) => {
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


validateUsers = () => {
    sequelize.authenticate().then(async () => {
        const query = 'SELECT * FROM clients';
        console.log(query)
        const resultados = await sequelize.query(query, { raw: false });
        return resultados;
    })
     const [filterUsers] = resultados.filter(fila => fila.user === user && fila.password === password);
    if (!filterUsers) {
        return false;
    }
    console.log(filterUsers);
    return filterUsers; 
}