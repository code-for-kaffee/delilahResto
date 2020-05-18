const jwt = require('jsonwebtoken');
const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');


module.exports.registerUser = (req, res) => {
    let data = req;
    this.register = async () => {
        try {
            const user = data.body;
            const {username, password, email} = data.body;
            console.log(data.body)
            const validate= await validateUsers(username, password, email);
            if(validate == false){
            await registerUser(user);
            const response = {
                estado: 'Se registró correctamente el usuario'
            }
            return res.status(201).send({ code: 'OK', message: `${response.estado}` });}
            else{
                throw res.status(409).send({error: 'Error nombre de usuario o mail duplicado'})
            }
        } catch (error) {
            throw res.status(409).send({error: 'Error nombre de usuario o mail duplicado'})
        }
    };
    const registerUser = async (user) => {
        const registro = sequelize.query(
            `INSERT INTO clients (username, fullname, email, phone, address, password, admin) 
            VALUES('${user.username}', '${user.fullname}', '${user.email}', '${user.phone}', '${user.address}', '${user.password}', '${user.admin}')`,
            { type: QueryTypes.INSERT });
        return registro;
    }
    this.register(data);
};


module.exports.loginUser = async (req, res) => {
    const { password, email} = req.body;
    let username = req.body.username
    const validateUser = await validateUsers(username, password, email);
    const userId = await validateUser.user_id;
    const validateAdmin = await validateAdminUser(username, password, email);
    username = validateUser.username;
    if (!validateUser) {
        res.json({ error: 'No existe el usuario o contraseña incorrecta' });
        return;
    }
    if (validateAdmin) {
        const token = jwt.sign({
            username,
            validateAdmin,
            userId
        }, 'newPassword');
        res.status(202).json({ token });
    }else{
    const token = jwt.sign({
        username, 
        userId
    }, 'newPassword');
    res.status(202).json({ token })
}
}

module.exports.getUsers = async(req, res) =>{
    const users = await sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    res.status(202).json({users})
}

validateUsers = async (username, password, email) => {
    const users = sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    await validateData(users);
    const [filterUsers] = await users.filter(fila =>( fila.username === username || fila.email === email) && fila.password === password);
    if (!filterUsers) {
        return false;
    }
    return filterUsers; 
}
validateAdminUser = async (username, password, email) => {
    const users = sequelize.query('SELECT * FROM clients', { type : QueryTypes.SELECT});
    const [validateAdmin] = await users.filter(fila => (fila.username === username  || fila.email === email) && fila.password === password && fila.admin === 1);
    if (!validateAdmin){
        return false;
    };
    return true;
}

validateData= (users) =>{
if(users.email){
    return users.email
}else{
    return users.username
}
}