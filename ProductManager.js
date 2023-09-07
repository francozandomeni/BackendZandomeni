const { title, connected } = require("process")

class ProductManager {

    

    constructor() {
    this.productos = []
    }

    addProduct(title,description,price,thumbnail,code,stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            return "Faltan campos obligatorios"

        } else {

            const product = {
                id: this.#generarId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.productos.push(product)
           
        }
    } 

    

     getProducts() {

         return this.productos;

     }

    getProductById(idProducto) {
        const product =  this.productos.find(e=>e.id === idProducto)
        return product ? "El producto existe" : "Not found"
    }
        

    #generarId() {
        return this.productos.length
        ? this.productos[this.productos.length - 1].id + 1
        : 1;
    }

    
}

const productManager = new ProductManager();

productManager.addProduct("Product 1", "Description 1", 10.99, "image1.jpg", "P001", 50);
productManager.addProduct("Product 2", "Description 2", 15.99, "image2.jpg", "P002", 30);



console.log(productManager.getProducts());

console.log(productManager.getProductById(4));


