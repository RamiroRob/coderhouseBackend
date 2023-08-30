const cartModel = require('../dao/carts.model')

const createCart = async (products) => {
    const newCart = { products };
    const cart = await cartModel.create(newCart);
    return {
        status: 201,
        message: 'Carrito creado',
        data: cart
    };
}

const getCartById = async (cid) => {
    const cart = await cartModel.findById(cid);
    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }
    return {
        status: 200,
        data: cart
    };
}

const addProductToCart = async (cid, pid) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }

    const product = cart.products.find(item => item.product == pid)

    if (product) {
        cart = await cartModel.findByIdAndUpdate(cid, {
            $inc: { 'products.$[elem].quantity': 1 }
        }, {
            arrayFilters: [{ 'elem.product': Number(pid) }]
        });
    } else {
        cart = await cartModel.findByIdAndUpdate(cid, {
            $push: { products: { product: Number(pid), quantity: 1 } }
        });
    }

    return {
        status: 201,
        message: 'Producto agregado al carrito',
        data: cart
    };
}


const removeProductFromCart = async (cid, pid) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }

    cart = await cartModel.findByIdAndUpdate(cid, {
        $pull: { products: { product: Number(pid) } }
    }, { new: true });

    return {
        status: 200,
        message: 'Producto eliminado del carrito',
        data: cart
    };
}

const updateCart = async (cid, products) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }

    cart = await cartModel.findByIdAndUpdate(cid, { products }, { new: true });
    return {
        status: 200,
        message: 'Carrito actualizado',
        data: cart
    };
}

const updateProductQuantityInCart = async (cid, pid, quantity) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }

    const product = cart.products.find(item => item.product == pid);

    if (product) {
        cart = await cartModel.findByIdAndUpdate(cid, {
            $set: { 'products.$[elem].quantity': Number(quantity) }
        }, {
            arrayFilters: [{ 'elem.product': Number(pid) }],
            new: true
        });
    } else {
        return {
            status: 404,
            message: 'No se encontró el producto en el carrito'
        };
    }

    return {
        status: 200,
        message: 'Cantidad de producto actualizada en el carrito',
        data: cart
    };
}

const clearCart = async (cid) => {
    let cart = await cartModel.findById(cid);

    if (!cart) {
        return {
            status: 404,
            message: 'No se encontró el carrito'
        };
    }

    cart = await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });

    return {
        status: 200,
        message: 'Carrito limpiado',
        data: cart
    };
}


module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    updateCart,
    updateProductQuantityInCart,
    clearCart
}