const express = require('express');
const passport = require('passport');
const userDto = require('../dto/user.dto');

const sessionsRouter = express.Router();

sessionsRouter.post('/register', passport.authenticate("register"),
    async (req, res) => {

        res.send({ status: "success", message: "Registrado satisfactoriamente!" });
    })

sessionsRouter.post('/login', passport.authenticate("login"), async (req, res) => {

    req.session.user = {
        name: `${req.user.first_name ? req.user.first_name : ''} ${req.user.last_name ? req.user.last_name : ''}`,
        email: req.user.email,
        role: req.user.role,
    }

    res.status(200).json({ status: "success", message: "Logueado satisfactoriamente!" });
})

sessionsRouter.get('/githubcallback', passport.authenticate('github'), async (req, res) => {
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        role: req.user.role,
    }
    res.redirect('/products')
}
);

sessionsRouter.get('/current', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ user: userDto(req.session.user) });
    } else {
        res.status(401).json({ error: "No hay usuario autenticado" });
    }
});


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