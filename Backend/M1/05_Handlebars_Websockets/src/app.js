const express = require('express');
const router = require('./routes/routes');
const viewsRouter = require('./routes/views.routes');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');

const app = express();
const PORT = 8080

const httpServer = app.listen(PORT || 8080, () => {console.log(`Servidor funcionando en puerto ${PORT}`);});
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());


app.set("views", __dirname + "/views")
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', router)
app.use('/', viewsRouter)

io.on('connection', (socket) => {

    console.log('cliente conectado')

    socket.on('new-product', (data) => {
        console.log(data)
        io.sockets.emit('new-product', data)
    })
})
