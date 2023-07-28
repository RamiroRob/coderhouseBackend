const express = require('express');
const userModel = require('../models/users.model');

const sessionsRouter = express.Router();

sessionsRouter.post('/register', async (req, res) => {
    const result = await userModel.create(req.body);
    res.send({ status: "success", payload: result });
})

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });
    if (!user) return res.status(400).json({ status: "error", error: "Usuario o contraseña incorrectas" });


    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
    }

    res.status(200).json({ status: "success", message: "Logged in successfully" });
})



sessionsRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ success: false, message: 'Error al cerrar sesión.' });
        }
        res.clearCookie('connect.sid'); // Limpia la cookie de sesión.
        return res.json({ success: true, message: 'Sesión cerrada con éxito.' });
    });
});

module.exports = sessionsRouter;