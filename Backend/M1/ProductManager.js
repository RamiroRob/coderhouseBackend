class ProductManager {

    constructor() {
        this.products = [];
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
    }

    getProducts() {
        if(this.products.length == 0) {
            throw new Error('No products found');
        }

        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(product => product.id == id);

        if(!product) {
            throw new Error('Product not found');
        }

        return product;
    }  
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

console.log("1 producto agregado")
console.log(productManager.getProducts());
console.log(productManager.getProductById(1))

// El comentado da error porque el codigo ya existe
// productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc123", 50)
productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc1234", 50)

console.log("2 productos agregados")
console.log(productManager.getProducts());
console.log(productManager.getProductById(2))

// El comentado da error porque no hay productos
// console.log(productManager.getProductById(3))

// El comentado da error porque falta un dato
// productManager.addProduct("producto prueba 2", "Este es un producto prueba 2", 200, "Sin imagen", "abc12345")