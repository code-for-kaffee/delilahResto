const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, "newPassword");
        if (user) {
            req.user = user;
            return next();
        }
    } catch (err) {
        res.status(401).json({ error: "Error al validar usuario o contraseña" })
    }
}
