const fs = require('fs');
const path = require('path');

const pathData = path.resolve(__dirname, '../data.json');

const createCart = (req, res) => {

    const { products } = req.body;
    let maxId

        data = JSON.parse(fs.readFileSync(pathData))
        carts = data.carts

    if (carts.length > 0) {
        maxId = carts.reduce((acc, el) => el.id > acc ? el.id : acc, carts[0].id)
    } else {
        maxId = 0
    }

    const newCart = {
        id: maxId + 1,
        products,
    }

    carts.push(newCart);

    fs.writeFileSync(pathData, JSON.stringify(data))

    res.status(201).json({ message: 'Carrito creado', data: newCart });
}

const getCartById = (req, res) => {

    const { cid } = req.params;
    const data = JSON.parse(fs.readFileSync(pathData))
    const carts = data.carts
    let cart = carts.find(cart => cart.id == cid);

    if (!cart) {
        res.status(404).json({ message: 'No se encontró el carrito' });
    }

    res.status(200).json(cart);
}

const addProductToCart = (req, res) => {

    const { cid, pid } = req.params;

    const data = JSON.parse(fs.readFileSync(pathData))
    const carts = data.carts
    let cart = carts.find(cart => cart.id == cid);

    if (!cart) {
        res.status(404).json({ message: 'No se encontró el carrito' });
    }

        const product = cart.products.find(prod => prod.product == pid);

    if (product) {
        product.quantity++;
    } else {
        cart.products.push({
            product: Number(pid),
            quantity: 1,
        });
    }

    fs.writeFileSync(pathData, JSON.stringify(data))

    res.status(201).json({ message: 'Producto agregado al carrito', data: cart });
}

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
}