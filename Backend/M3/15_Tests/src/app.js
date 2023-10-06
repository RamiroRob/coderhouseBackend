const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const initializePassport = require('./config/passport.config');
const { mongoUrl } = require('./config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const router = require('./routes/routes');
const viewsRouter = require('./routes/views.routes');
const logger = require('./middlewares/loggers/winston.logger');

// Levantar el servidor
const app = express();
const PORT = 8080
const httpServer = app.listen(PORT || 8080, () => { logger.info(`Servidor funcionando en puerto ${PORT}`); });
const io = new Server(httpServer);

// Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de e-commerce",
            description: "Documentación de endpoints de products y carts",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Conexion a la db
const connect = async () => {
    await mongoose.connect(mongoUrl)
        .then(() => logger.info('Conectado a la base de datos'))
        .catch((err) => logger.error(err))
}

connect()


// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars");


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: mongoUrl,
            ttl: 600,
        }),
        secret: "CoderSecret",
        resave: false,
        saveUninitialized: true, // Revisar esto
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router)
app.use('/', viewsRouter)


// Socket.io
io.on('connection', (socket) => {

    logger.info('cliente conectado')

    socket.on('new-product', (data) => {
        logger.info(data)
        io.sockets.emit('new-product', data)
    })
})
