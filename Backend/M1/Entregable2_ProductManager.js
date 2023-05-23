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


// Testing
const productManager = new ProductManager();

console.log("Primer getProducts", productManager.getProducts())
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log("getProducts con un producto creado", productManager.getProducts())
console.log("getProductById", productManager.getProductById(1))
productManager.updateProduct(1, "title", "newTitle12345")
console.log("updatedProduct", productManager.getProducts()) 
productManager.deleteProduct(1)
console.log("Deleted Product", productManager.getProducts())
