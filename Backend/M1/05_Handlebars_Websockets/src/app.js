const express = require('express');
const router = require('./routes/routes');
const viewsRouter = require('./routes/views.routes');
const handlebars = require('express-handlebars');

const app = express();
const PORT = 8080

app.engine("handlebars", handlebars.engine());


app.set("views", __dirname + "/views")
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api', router)
app.use('/', viewsRouter)

app.listen(PORT || 8080, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
}
);
