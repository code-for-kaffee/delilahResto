const jwt = require('jsonwebtoken');
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports.registerUser = (req, res, next) => {
    let data = req;
    this.register = async () => {
        try {
            const user = data.body;
            await registroUsuario(user);
            const response = {
                estado: 'Se registró correctamente el usuario'
            }
            return res.status(201).send({ code: 'OK', message: `${response.estado}` });;
        } catch (error) {
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


module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const validateUser = await validateUsers(username, password);
    const validateAdmin = await validateAdminUser(username, password);
    if (!validateUser) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
    if (validateAdmin) {
        const token = jwt.sign({
            username,
            validateAdmin
        }, 'newPassword');
        res.status(202).json({ token });
    }else{
    const token = jwt.sign({
        username
    }, 'newPassword');
    res.status(202).json({ token })
}
}


validateUsers = async (username, password) => {
    const users = sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    const [filterUsers] = await users.filter(fila => fila.username === username && fila.password === password);
    if (!filterUsers) {
        return false;
    }
   
    return filterUsers; 
}
validateAdminUser = async (username, password) => {
    const users = sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    const [validateAdmin] = await users.filter(fila => fila.username === username && fila.password === password && fila.admin === 1);
    if (!validateAdmin){
        return false;
    };
    return true;
}