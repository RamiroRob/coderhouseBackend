const fs = require('fs')

class ProductManager {

    constructor() {
        this.products = [];
        this.path = 'productos.txt'
    }

    addProduct(title, description, price, thumbnail, code, stock) {
  
        if (this.products.find(product => product.code == code)) {
            throw new Error('Code already exists');
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Missing data');
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
        if(this.products.length == 0) {
            throw new Error('No products found');
        }

        const data = fs.readFileSync(this.path, 'utf-8');
        return JSON.parse(data)
    }

    getProductById(id) {

        const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        console.log(productos)
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
        this.products[id-1] = null
    }
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 300, "Sin imagen", "abc1234", 50)

console.log("Primer log", productManager.getProducts())
productManager.updateProduct(1, "title", "newTitle12345")
console.log("Segundo log",productManager.getProducts())

console.log("getProductbyId--------", productManager.getProductById(1))
// productManager.getProductById(2)

// productManager.deleteProduct(1)
// productManager.deleteProduct(2)
// productManager.deleteProduct(3)
// console.log(productManager.getProducts())
