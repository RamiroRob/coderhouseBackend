const express = require('express');
const { productManager } = require('./Entregable3_ProductManager');


const app = express();
const PORT = 8080


app.get('/products', async (req, res) => {

    try {
        let productos = await productManager.getProducts()

        if (req.query.limit){
            let { limit } = req.query
            limit = 
            productos = productos.slice(0, parseInt(limit))
        }

        res.status(200).json(productos);
        
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});

app.get('/products/:pid', async (req, res) => {

    const { pid } = req.params;
    console.log(pid)
    
    try {
        const productoById = await productManager.getProductById(pid)
        console.log(productoById)
        res.status(200).json(productoById);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
    
});


app.listen(PORT || 8080, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
}
);
