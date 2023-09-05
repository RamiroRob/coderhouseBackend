const productModel = require('../dao/products.model');

const getProducts = async (query) => {
    let limit = 10
    let page = 1;
    let sort = {}
    let queryObj = {}

    if (query.limit) limit = parseInt(query.limit)
    if (query.page) page = parseInt(query.page)
    if (query.sort) sort.price = query.sort === 'desc' ? -1 : 1
    if (query.query) queryObj = { title: query.query }
    if (query.category) queryObj.category = query.category;
    if (query.status) {
        queryObj.status = query.status.toLowerCase() === 'true';
    }

    const products = await productModel
        .find(queryObj)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit);

    let totalProducts = 0
    if (query) {
        totalProducts = await productModel.countDocuments(queryObj);
    } else {
        totalProducts = await productModel.countDocuments();
    }
    const totalPages = Math.ceil(totalProducts / limit);

    if (!products.length) {
        throw new Error("No hay productos cargados");
    }

    return {
        status: "success",
        payload: products,
        totalPages: totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page: page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevLink: page > 1 ? `http://localhost:8080/api/products?page=${page - 1}` : null,
        nextLink: page < totalPages ? `http://localhost:8080/api/products?page=${page + 1}` : null,
    };
}

const createProduct = async (productData) => {
    const { title, description, code, price, stock, thumbnails, category } = productData;

    if (!title || !description || !price || !code || !stock || !category) {
        throw new Error('Falta información del producto, no se puede crear sin información completa');
    }

    const newProduct = {
        title,
        description,
        code,
        price,
        status: true,
        stock,
        thumbnails,
        category,
    };

    return await productModel.create(newProduct);
}

const getProductById = async (pid) => {
    return await productModel.findById(pid);
}

const updateProduct = async (pid, productData) => {
    let productExists = await productModel.findById(pid);

    if (!productExists) {
        return null;
    }

    return await productModel.findByIdAndUpdate(pid, productData, { new: true });
}

const deleteProduct = async (pid) => {
    return await productModel.findByIdAndDelete(pid);
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
