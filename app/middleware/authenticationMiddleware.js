const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, "newPassword");
        if (user.validateAdmin === true) {
            req.user = user;
            return next();
        }else{
            res.status(401).json({error: "No estás autorizado a realizar esta acción"})
        }
    } catch (err) {
        res.status(403).json({ error: "Error al validar usuario o contraseña" });
    }
}
