const cartModel = require('../models/carts.model');

const createCart = async (req, res) => {

    const { products } = req.body;

    const newCart = {
        products
    }

    const cart = await cartModel.create(newCart);

    res.status(201).json({ message: 'Carrito creado', data: cart });
}

const getCartById = async (req, res) => {

    const { cid } = req.params;

    const cart = await cartModel.findById(cid);

    if (!cart) {
        res.status(404).json({ message: 'No se encontró el carrito' });
    }

    res.status(200).json(cart);
}

const addProductToCart = async (req, res) => {

    const { cid, pid } = req.params;

    let cart = await cartModel.findById(cid);

    if (!cart) {
        res.status(404).json({ message: 'No se encontró el carrito' });
    }

    const product = cart.products.find(item => item.product == pid)

    if (product) {
        cart = await cartModel.findByIdAndUpdate(cid, {
            $inc: { 'products.$[elem].quantity': 1 }
        }, {
            arrayFilters: [{ 'elem.product': Number(pid) }]
        })
    } else {

        cart = await cartModel.findByIdAndUpdate(cid, {
            $push: { products: { product: Number(pid), quantity: 1 } }
        })
    }

    res.status(201).json({ message: 'Producto agregado al carrito', data: cart });
}

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
}