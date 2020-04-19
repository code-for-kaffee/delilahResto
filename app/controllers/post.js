const jwt = require('jsonwebtoken');

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

validateUsers = (user, password) => {
    sequelize.authenticate().then(async () => { 
        const tryas = 'INSERT INTO clients (user, pass) VALUES ("algo", "asd123")';
    
        const query = 'SELECT * FROM clients';
        const resultados = await sequelize.query(query, { raw: true});
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