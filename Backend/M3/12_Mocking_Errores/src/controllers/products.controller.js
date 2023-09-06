const productService = require('../services/products.service');
const { authorize } = require('../utils/utils');

const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts(req.query);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const result = await productService.createProduct(req.body);
        req.io.sockets.emit('new-product', result);
        res.status(201).json({ message: 'Product created', data: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        if (!product) {
            res.status(404).json({ message: 'No se encontró el producto' });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.pid, req.body);
        if (!product) {
            res.status(404).json({ message: 'No se encontró el producto' });
            return;
        }
        res.status(200).json({ message: 'Product updated', data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.pid);
        if (!product) {
            res.status(404).json({ message: 'No se encontró el producto' });
            return;
        }
        req.io.sockets.emit('deleted-product', req.params.pid);
        res.status(200).json({ message: 'Product deleted', data: product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const mockProducts = async (req, res) => {
    try {
        const mockData = await productService.mockProducts();
        res.status(201).json({ message: 'Mock products created', data: mockData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    mockProducts
}
