const fs = require('fs');
const path = require('path');

const pathData = path.resolve(__dirname, '../data.json');


const getProducts = (req, res) => {

    if (!fs.existsSync(pathData)) {
        res.status(404).json({ message: "No hay productos cargados" })
    }

    const data = JSON.parse(fs.readFileSync(pathData))
    const products = data.products


    if (req.query.limit) {

        let { limit } = req.query
        products = products.slice(0, parseInt(limit))
    }

    res.status(200).json(products);

}

const createProduct = (req, res) => {

    const { title, description, code, price, stock, thumbnails, category } = req.body;

    if (fs.existsSync(pathData)) {

        const data = JSON.parse(fs.readFileSync(pathData))
        const products = data.products

        if (products.find(product => product.code == code)) {
            res.status(400).json({ message: 'Ya existe un producto con ese código' });
        }

        if (!title || !description || !price || !code || !stock || !category) {
            res.status(400).json({ message: 'Falta información del producto, no se puede crear sin información completa' });
        }
    }

    const data = JSON.parse(fs.readFileSync(pathData))
    const products = data.products

    const newProduct = {
        id: products.length + 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        thumbnails, //no obligatorio
        category,
    };

    products.push(newProduct);

    fs.writeFileSync(pathData, JSON.stringify(data))

    res.status(201).json({ message: 'Product created', data: newProduct });
}

const getProductById = (req, res) => {

    const { pid } = req.params;
    console.log(pid)
    const data = JSON.parse(fs.readFileSync(pathData))
    const products = data.products

    let product = products.find(product => product.id == pid);

    if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' });
    }

    res.status(200).json(product);
}

const updateProduct = (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, thumbnails, category } = req.body;

    const data = JSON.parse(fs.readFileSync(pathData))
    const products = data.products

    const product = products.find((product) => product.id == pid);

    if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' });
        return;
    }

    title ? product.title = title : product.title = product.title;
    description ? product.description = description : product.description = product.description;
    code ? product.code = code : product.code = product.code;
    price ? product.price = price : product.price = product.price;
    status ? product.status = status : product.status = product.status;
    stock ? product.stock = stock : product.stock = product.stock;
    thumbnails ? product.thumbnails = thumbnails : product.thumbnails = product.thumbnails;
    category ? product.category = category : product.category = product.category;


    fs.writeFileSync(pathData, JSON.stringify(data))

    res.status(200).json({ message: 'Product updated', data: product });
}

const deleteProduct = (req, res) => {
    const { pid } = req.params;
    let data = JSON.parse(fs.readFileSync(pathData))
    let products = data.products

    const productIndex = products.findIndex((product) => product.id == pid);
    const product = products[productIndex];

    if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' });
        return;
    }

    products.splice(productIndex, 1);

    fs.writeFileSync(pathData, JSON.stringify(data))

    res.status(200).json({ message: 'Product deleted' });
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}