const productModel = require('../models/products.model');

const getProducts = async (req, res) => {

    let products = await productModel.find({});

    if (!products) {
        res.status(404).json({ message: "No hay productos cargados" })
    }

    if (req.query.limit) {

        let { limit } = req.query
        products = products.slice(0, parseInt(limit))
    }

    res.status(200).json(products);
}

const createProduct = async (req, res) => {

    const { title, description, code, price, stock, thumbnails, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
        res.status(400).json({ message: 'Falta información del producto, no se puede crear sin información completa' });
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        thumbnails, //no obligatorio
        category,
    };

    await productModel.create(newProduct);

    req.io.sockets.emit('new-product', newProduct);

    res.status(201).json({ message: 'Product created', data: newProduct });
}

const getProductById = async (req, res) => {

    const { pid } = req.params;
    let product = await productModel.findById(pid);

    if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' });
    }

    res.status(200).json(product);
}

const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, thumbnails, category } = req.body;

    let productExists = await productModel.findById(pid);

    if (!productExists) {
        res.status(404).json({ message: 'No se encontró el producto' });
        return;
    }

    let product = await productModel.findByIdAndUpdate(pid, {
        title,
        description,
        code,
        price,
        status,
        stock,
        thumbnails,
        category,
    }, { new: true });

    res.status(200).json({ message: 'Product updated', data: product });
}

const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    const product = await productModel.findByIdAndDelete(pid);

    if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' });
        return;
    }

    req.io.sockets.emit('deleted-product', pid);

    res.status(200).json({ message: 'Product deleted', data: product });
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}