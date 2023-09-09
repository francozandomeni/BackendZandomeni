const fs = require("fs")
const { title, connected } = require("process")

class ProductManager {

    

    constructor(path) {
    this.path = path
    }

    async addProduct(obj){
        //Debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recordar siempre guardarlo como un array en el archivo)


        const { title, description, price, thumbnail, code, stock } = obj

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Faltan campos obligatorios")
        }

        try {
            const pedirProductos = await this.getProducts()
            let id 
            if(!pedirProductos.length){
                id = 1
            } else {
                id = pedirProductos[pedirProductos.length-1].id+1
            }
            pedirProductos.push({id,...obj})
            await fs.promises.writeFile(this.path,JSON.stringify(pedirProductos))
            
        } catch (error) {
            return error
        }

    } 

    

    async getProducts() {
        //Debe leer el archivo de productos y devolver todos los productos en formato de arreglo
        try {
            if(fs.existsSync(this.path)){
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
            const pedirProductos = await this.getProducts()
            const producto =  pedirProductos.find(e => e.id === idProducto)
            if(producto){
                return producto
            } else {
                return console.log("El producto no existe")
            }
            
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

            const productoActualizado = {...producto,...obj}

            const arrayActualizado = pedirProductos.map((p) => p.id === (idProducto) ? productoActualizado : p )

            await fs.promises.writeFile(this.path,JSON.stringify(arrayActualizado))

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
            await fs.promises.writeFile(this.path,JSON.stringify(nuevoArrayProductos))
        } catch (error) {
            
        }
    }

    
}


const producto1 = {
        title: "Producto 1",
        description: "Descripcion 1",
        price: 15.99,
        thumbnail: "imagen1.jpg",
        code: "F0001",
        stock: 30,
}

const producto2 = {
    title: "Producto 2",
    description: "Descripcion 2",
    price: 17.99,
    thumbnail: "imagen2.jpg",
    code: "F0002",
    stock: 50,
}

const producto3 = {
    title: "Producto 3",
    description: "Descripcion 3",
    price: 20.99,
    thumbnail: "imagen3.jpg",
    code: "F0003",
    stock: 70,
}



async function test() {
    const manager1 = new ProductManager("Users.json")
    // await manager1.addProduct(producto1)

    // const prueba = await manager1.getProducts()
    // console.log(prueba);

    // const producto = await manager1.getProductById()
    // console.log(producto)

    // await manager1.deleteProduct(1)
    // const producto = await manager1.getProducts()
    // console.log(producto)

    // const producto = await manager1.updateProduct(2, {code: "K0002"})
    // console.log(producto)
    

}
test()
