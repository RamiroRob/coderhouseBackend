const passport = require('passport');
const local = require('passport-local')
const userModel = require('../models/users.model');
const { createHash, isValidPassword } = require('../utils');

const localStrategy = local.Strategy;

const initializePassport = () => {

    passport.use("register", new localStrategy({
        usernameField: "email",
        passReqToCallback: true,
    }, async (req, done) => {
        try {
            const { email, password, first_name, last_name } = req.body;
            const user = await userModel.findOne({ email });
            if (user) return done(null, false, { message: "El usuario ya está registrado" });

            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password)
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use("login", new localStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email });
                if (!user) return done(null, false, { message: "Usuario o contraseña incorrectas" });

                const isMatch = await isValidPassword(user, password);
                if (!isMatch) return done(null, false, { message: "Usuario o contraseña incorrectas" });

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }))


    passport.serializeUser((user, done) => {
        done(null, user._id);
    }
    );

    passport.deserializeUser(async (id, done) => {
        const user = userModel.findById(id);
        done(null, user);
    })
}

module.exports = initializePassport;


