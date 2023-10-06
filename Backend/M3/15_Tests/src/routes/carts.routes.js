const express = require('express');
const { createCart, getCartById, addProductToCart, removeProductFromCart, updateCart, updateProductQuantityInCart, clearCart, finalizePurchase } = require('../controllers/carts.controller');
const { authorize } = require('../utils');

const cartsRouter = express.Router();

cartsRouter.post('/', createCart)
cartsRouter.get('/:cid', getCartById)
cartsRouter.post('/:cid/purchase', authorize("usuario"), finalizePurchase);
cartsRouter.post('/:cid/products/:pid', authorize("usuario"), addProductToCart)
cartsRouter.delete('/:cid/products/:pid', removeProductFromCart);
cartsRouter.put('/:cid', updateCart);
cartsRouter.put('/:cid/products/:pid', updateProductQuantityInCart);
cartsRouter.delete('/:cid', clearCart);



module.exports = cartsRouter;