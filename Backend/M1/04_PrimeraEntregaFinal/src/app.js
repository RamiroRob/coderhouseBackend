const express = require('express');
const router = require('./routes/routes');

const app = express();
const PORT = 8080

app.use(express.json());
app.use('/api', router)


app.listen(PORT || 8080, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
}
);
