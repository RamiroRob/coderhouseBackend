const express = require('express');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/products.controller');
const { authorize } = require('../utils/utils');


const productsRouter = express.Router();

productsRouter.get('/', getProducts)
productsRouter.post('/', authorize("admin"), createProduct)

productsRouter.get('/:pid', getProductById)
productsRouter.put('/:pid', authorize("admin"), updateProduct)
productsRouter.delete('/:pid', authorize("admin"), deleteProduct)



module.exports = productsRouter;