import fs from "fs";



class CartManager {



    constructor(path) {
        this.path = path
    }

    async createCart() {
        try {
            const carts = await this.getCarts()
            let id
            let products
            if (!carts.length) {
                id = 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
            else {
                id = carts[carts.length - 1].id + 1
                products = []
                const newCart = { id, products }
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return newCart
            }
        } catch (error) {
            error
        }
    }



    async getCartsFromFile() {

        try {
            if (!fs.existsSync(this.path)) {
                const carts = []

                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return carts
            }

            const info = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(info)
        } catch (error) {
            return error

        }

    }

    async getCarts(limit) {
        try {
            const carts = await this.getCartsFromFile();

            return carts.slice(0, limit);
        } catch (error) {
            return error;
        }
    }

    async getCartById(cid) {


        try {
            const carts = await this.getCarts()
            const cartFound = carts.find((e) => e.id === parseInt(cid))
            if (cartFound) {
                return cartFound
            } else {
                return null

            }


        } catch (error) {
            throw error
        }


    }

    async addProductToCartById(idCart, idProducto) {
        try {
            console.log("idCart:", idCart);
            console.log("idProducto:", idProducto);

            const carts = await this.getCarts();
            console.log("carts:", carts);

            let cart = { ...(await this.getCartById(idCart)) };
            console.log("cart:", cart);
            
            cart.products = cart.products || []

            const productIndex = cart.products.findIndex((product) => product.product === +idProducto);

            if (productIndex === -1) {
                cart.products.push({
                    product: +idProducto,
                    quantity: 1,
                });
            } else {
                cart.products[productIndex].quantity += 1;
            }

            const cartIndex = carts.findIndex((cart) => cart.id === +idCart);

            carts[cartIndex] = cart;

            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            const result =  "Products added"

            console.log("result:", result);
            return result;
        } catch (error) {
            console.error("Error writing cart data to file:", error);
             throw new Error("Product could not be added");
        }
    }

}




export const cartManager = new CartManager("./carrito.json")

// const product5 = {
//     title: "Product 5", description: "Description 5", price: 13.99, thumbnail: "image5.jpg", code: "P005", quantity: 35
// }



// async function test() {
//     const manager = new CartManager('./carrito.json')
//     await manager.addToCart(product5)
// }
// test()



