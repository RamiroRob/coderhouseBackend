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
        const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        if(productos.length == 0) {
            throw new Error('No products found');
        }

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

productManager.addProduct("producto prueba 1", "Este es un producto prueba", 200, "Sin imagen", "a", 25)
productManager.addProduct("producto prueba 2", "Este es un producto prueba 3", 300, "Sin imagen", "b", 50)
productManager.addProduct("producto prueba 3", "Este es un producto prueba 4", 400, "Sin imagen", "c", 50)
productManager.addProduct("producto prueba 4", "Este es un producto prueba 5", 500, "Sin imagen", "d", 50)

console.log("Primer log --------", productManager.getProducts())

productManager.updateProduct(1, "title", "newTitle12345")
console.log("Segundo log con nuevo titulo en 1 --------",productManager.getProducts())

console.log("getProductbyId 3 --------", productManager.getProductById(3))

productManager.deleteProduct(2)
console.log("Delete id 2 --------", productManager.getProducts())
