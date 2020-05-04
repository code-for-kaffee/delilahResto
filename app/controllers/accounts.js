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
        } catch (e) {
            throw res.status(409
                ).send({error: 'Username or email duplicated'})
        }
    };
    const registroUsuario = async (user) => {
        const registro = sequelize.query(
            `INSERT INTO clients (username, fullname, email, phone, address, password) 
            VALUES('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.address}', '${user.password}')`,
            { type: QueryTypes.INSERT });
        return registro;
    }
    this.register(data);
};


module.exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const validate = validateUsers(username, password);
    console.log(validate)
   if (!validate) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
    const token = jwt.sign({
        username
    }, 'newPassword');

    res.status(200).json({ token })
}


validateUsers = async (username, password) => {
    const users = sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    const [filterUsers] = await users.filter(fila => fila.username === username && fila.password === password);
    if (!filterUsers) {
        return false;
    }
    return filterUsers; 
}
