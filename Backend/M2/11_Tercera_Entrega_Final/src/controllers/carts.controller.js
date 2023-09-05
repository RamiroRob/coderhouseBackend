const cartModel = require('../dao/carts.model');
const cartService = require('../services/carts.service')

const createCart = async (req, res) => {
    const { products } = req.body;
    const result = await cartService.createCart(products);
    res.status(result.status).json(result);
}


const getCartById = async (req, res) => {
    const { cid } = req.params;
    const result = await cartService.getCartById(cid);
    res.status(result.status).json(result);
}


const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartService.addProductToCart(cid, pid);
    res.status(result.status).json(result);
}

const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    const result = await cartService.removeProductFromCart(cid, pid);
    res.status(result.status).json(result);
}

const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const result = await cartService.updateCart(cid, products);
    res.status(result.status).json(result);
}

const updateProductQuantityInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const result = await cartService.updateProductQuantityInCart(cid, pid, quantity);
    res.status(result.status).json(result);
}

const clearCart = async (req, res) => {
    const { cid } = req.params;
    const result = await cartService.clearCart(cid);
    res.status(result.status).json(result);
}

const finalizePurchase = async (req, res) => {
    const { cid } = req.params;
    const userEmail = req.user.email;
    const result = await cartService.finalizePurchase(cid, userEmail);
    res.status(result.status).json(result);
}

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantityInCart,
    clearCart,
    finalizePurchase
}
