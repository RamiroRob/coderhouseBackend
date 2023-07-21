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
        email: user.email
    }

    res.json({ status: "success", message: "Logged in successfully" });
})

module.exports = sessionsRouter;