import fs from "fs";



class CartManager {



    constructor(path) {
        this.path = path
    }

    async addToCart(obj) {
        //Debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recordar siempre guardarlo como un array en el archivo)
         const { title, description, price, thumbnail, code, quantity } = obj

         if (!title || !description || !price || !thumbnail || !code || !quantity) {
             return console.log("Faltan campos obligatorios")
         }

        try { console.log("comienzo")
            const askCarrito = await this.getCart()

            let id
            if (!askCarrito.length) {
                console.log("if")
                id = 1
            } else {
                console.log("else")
                id = askCarrito[askCarrito.length - 1].id + 1
            }

            const newCart = { id, ...obj }
            console.log("carrito cargado")
            askCarrito.push(newCart)
            console.log("carrito nuevo")
            await fs.promises.writeFile(this.path, JSON.stringify(askCarrito))
            return newCart
        } catch (error) {
            return error
        }

    }



    async getCart() {
        //Debe leer el archivo de productos y devolver todos los productos en formato de arreglo
            
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')                
                return JSON.parse(info)

            } else {
                return []
            }

        } catch (error) {
            return error

        }

    }

    async getProductById(idProducto) {
        //debe recibir un id y tras leer el archivo debe buscar el producto con el id especificado y devolverlo en formato objeto
        try {
            const pedirProductos = await this.getProducts({})
            const producto = pedirProductos.find(e => e.id === parseInt(idProducto))
            return producto

        } catch (error) {
            return error
        }


    }


    async updateProduct(idProducto, obj) {
        //debe recibir el id del producto a actualizar, asi tambien como el campo a actualizar(puede ser el objeto completo como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRASE SU ID



        try {
            const pedirProductos = await this.getProducts()
            const producto = await this.getProductById(idProducto)

            if (!producto) console.log("Producto no encontrado")

            const productoActualizado = { ...producto, ...obj }

            const arrayActualizado = pedirProductos.map((p) => p.id === (idProducto) ? productoActualizado : p)

            await fs.promises.writeFile(this.path, JSON.stringify(arrayActualizado))

            return console.log("Producto actualizado")


        } catch (error) {
            return error
        }

    }

    async deleteProduct(idProducto) {

        // debe recibir un id y eliminar el producto que tenga ese id en el archivo

        try {
            const pedirProductos = await this.getProducts()
            const nuevoArrayProductos = pedirProductos.filter(p => p.id !== idProducto)
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoArrayProductos))
        } catch (error) {

        }
    }

    
}

const product1 = {
    title:"Product 1",description:"Description 1",price:15.99,thumbnail:"image1.jpg",code:"P001",quantity:30
}


export const cartManager = new CartManager("./carrito.json")

// async function test() {
//     const manager = new CartManager('./carrito.json')
//     await manager.addToCart(product1)
// }




