// const { fileURLToPath } = require('url');
// const { dirname } = require('path');
const bcrypt = require('bcrypt');


const createHash = async (password) => {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

const isValidPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password)
}



function authorize(...allowedRoles) {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ error: "No hay usuario autenticado" });
        }

        if (allowedRoles.includes(user.role)) {
            next();
        } else {
            return res.status(403).json({ error: "No tienes permiso para realizar esta acción" });
        }
    };
}

module.exports = {
    createHash,
    isValidPassword,
    authorize
}