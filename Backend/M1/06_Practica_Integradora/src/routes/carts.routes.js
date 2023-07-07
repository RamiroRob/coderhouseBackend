const express = require('express');
const { createCart, getCartById, addProductToCart } = require('../controllers/carts.controller');

const cartsRouter = express.Router();

cartsRouter.post('/', createCart)

cartsRouter.get('/:cid', getCartById)

cartsRouter.post('/:cid/products/:pid', addProductToCart)

module.exports = cartsRouter;