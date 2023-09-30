import fs from "fs";




class ProductManager {



    constructor(path) {
        this.path = path
    }

    async addProduct(obj) {
        //Debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y guardarlo en el arreglo (recordar siempre guardarlo como un array en el archivo)
         const { title, description, price, thumbnail, code, stock } = obj
         
         if (!title || !description || !price || !thumbnail || !code || !stock) {
             return console.log("Faltan campos obligatorios")
         }

        try {
            const pedirProductos = await this.getProducts()
            let id
            if (!pedirProductos.length) {
                id = 1
            } else {
                id = pedirProductos[pedirProductos.length - 1].id + 1
            }
            const newProduct = { id, ...obj }
            pedirProductos.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(pedirProductos))
            return newProduct
        } catch (error) {
            return error
        }

    }



    async getProducts(queryObj) {
        //Debe leer el archivo de productos y devolver todos los productos en formato de arreglo
            const {limit} = queryObj
        try {
            if (fs.existsSync(this.path)) {
                const info = await fs.promises.readFile(this.path, 'utf-8')
                const productsArray = JSON.parse(info)
                return limit ? productsArray.slice(0,limit) : productsArray

            } else {
                return []
            }

        } catch (error) {
            return error

        }

    }

    async getProductById(pid) {
        //debe recibir un id y tras leer el archivo debe buscar el producto con el id especificado y devolverlo en formato objeto
        try {
            const pedirProductos = await this.getProducts({})
            const producto = pedirProductos.find(e => e.id === parseInt(pid))
            return producto

        } catch (error) {
            return error
        }


    }


    async updateProduct(pid, obj) {
        //debe recibir el id del producto a actualizar, asi tambien como el campo a actualizar(puede ser el objeto completo como en una DB), y debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRASE SU ID



        try {
            const pedirProductos = await this.getProducts()
            const producto = pedirProductos.findIndex(p => p.id === pid)
            if(index===-1) {
                return -1
            }
            const pedirProducto = producto[index]
            pedirProducto[index] = {...userInfo, ...obj}
            await fs.promises.writeFile(this.path, JSON.stringify(producto))
            return 1

        } catch (error) {
            return error
        }

    }

    async deleteProduct(pid) {

        // debe recibir un id y eliminar el producto que tenga ese id en el archivo

        try {
            const pedirProductos = await this.getProducts()
            const pedirProducto = pedirProductos.find(p => p.id === pid)
            if(!pedirProducto){
                return -1
            }
            const nuevoArrayProductos = pedirProductos.filter(p => p.id !== pid)
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoArrayProductos))
            return 1
        } catch (error) {
            return error

        }
    }


}

 export const productsManager = new ProductManager("./products.json")

// async function test() {
//     const productsManager = new ProductManager('../products.json')
//     await productsManager.addProduct(product5)

// }

