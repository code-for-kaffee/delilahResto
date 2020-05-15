const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, "newPassword");
        if (user.validateAdmin === true) {
            req.user = user;
            return next();
        }else{
           return res.status(401).json({error: "No estás autorizado a realizar esta acción"});
        }
    } catch (err) {
        res.status(403).json({ error: "Por favor ingrese un Token válido" });
    }
}

module.exports.authenticateUser = async (req, res, next) =>{
    try {
        const token =  req.headers.authorization.split(' ')[1];
        const user = await jwt.verify(token, "newPassword");
        const userId = user.userId;
        if (userId) {
            return userId
       }
    } catch (err) {
        res.status(403).json({ error: "Por favor ingrese un token válido" });
    }
}

module.exports.authenticateAdminUser = async (req, res, next) =>{
    try {
        const token =  req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, "newPassword");
        const validateAdmin = user.validateAdmin;
        if (validateAdmin) {
            return validateAdmin
        }else{
           return res.status(401).json({error: "No estás autorizado a realizar esta acción"});
        }
    } catch (err) {
        res.status(403).json({ error: "Por favor ingrese un token válido" });
    }
}