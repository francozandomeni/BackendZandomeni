import fs from "fs";



class CartManager {



    constructor(path) {
        this.path = path
    }



    async createCart() {
        try {
            if(!fs.existsSync(this.path)){
                await fs.promises.writeFile(this.path, "[]")
            }
            const infoCarts = await fs.promises.readFile(this.path, 'utf-8') 
            const carts = JSON.parse(infoCarts);
            const newCart = { id: Date.now().toString(), products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            throw error;
        }
    }


    async getProducts(cartId) {
        try {
            const info = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(info);
            const cart = carts.find((c) => c.id === cartId);
            if (!cart) {
                return null;
            }
            return cart.products;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(cartId, productId, quantity) {
        try {
            const infoCart = await fs.promises.readFile(this.path, 'utf-8')
            const carts = JSON.parse(infoCart);
            const cartIndex = carts.findIndex((c) => c.id === cartId);
            if (cartIndex === -1) {
                return null;
            }
            
            const infoProd = await fs.promises.readFile('productos.json', 'utf-8')
            const products = JSON.parse(infoProd);
            const productIndex = products.findIndex((p) => p.id === productId);
            if (productIndex === -1) {
                return null;
            }

            const cart = carts[cartIndex];
            const existingProduct = cart.products.find((item) => item.product === productId);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            return cart.products;
        } catch (error) {
            throw error;
        }
    }


}


export const cartManager = new CartManager("./carrito.json")


