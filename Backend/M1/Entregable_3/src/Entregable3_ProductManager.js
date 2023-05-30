const fs = require('fs')

class ProductManager {

    constructor() {
        this.products = [];
        this.path = 'productos.txt'
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if(fs.existsSync(this.path)){

            const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

            if (productos.find(product => product.code == code)) {
                throw new Error('Code already exists');
            }
            
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                throw new Error('Missing data');
            }
        }

        this.products.push({
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });

        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts() {
        if (!fs.existsSync(this.path)) {
            return [] 
        } 

        const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))

        return productos
    }

    getProductById(id) {

        const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        let product = productos.find(product => product.id == id);

        if(!product) {
            throw new Error('Product not found');
        }

        return product;
    }  

    updateProduct(id, field, content) {

        const productos = JSON.parse(fs.readFileSync(this.path, "utf-8"))
        productos[id-1][field] = content
        fs.writeFileSync(this.path, JSON.stringify(productos))
    }

    deleteProduct(id) {

        let productos = JSON.parse(fs.readFileSync(this.path, 'utf-8')).filter(product => product.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(productos))
    }
}


const productManager = new ProductManager();


// Llenando el archivo para luego poder probar las rutas (comentado luego para no romper el programa)
// productManager.addProduct("producto prueba", "Este es un producto prueba", 100, "Sin imagen", "abc123", 15)
// productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc1234", 25)
// productManager.addProduct("producto prueba 3", "Este es un producto prueba 3", 300, "Sin imagen", "abc12345", 35)
// productManager.addProduct("producto prueba 4", "Este es un producto prueba 4", 400, "Sin imagen", "abc123456", 45)
// productManager.addProduct("producto prueba 5", "Este es un producto prueba 5", 500, "Sin imagen", "abc1234567", 55)
// productManager.addProduct("producto prueba 6", "Este es un producto prueba 6", 600, "Sin imagen", "abc12345678", 65)
// productManager.addProduct("producto prueba 7", "Este es un producto prueba 7", 700, "Sin imagen", "abc123456789", 75)
// productManager.addProduct("producto prueba 8", "Este es un producto prueba 8", 800, "Sin imagen", "abc1234567890", 85)

module.exports = {
    productManager
};