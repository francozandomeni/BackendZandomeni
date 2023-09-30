import { Router } from "express";
import { cartManager } from "../CartManager.js";
import fs from "fs"


const router = Router()

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await cartManager.getProducts(cid);
    if (!products) {
      return res.status(400).json({ error: 'Carrito no encontrado' });
    }
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const infoCarts = await fs.promises.readFile('../src/carrito.json', 'utf-8')
    const carts = JSON.parse(infoCarts);
    const infoProd = await fs.promises.readFile('../src/products.json', 'utf-8')
    const products = JSON.parse(infoProd);

    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
      return res.status(400).json({ error: 'Carrito no encontrado' });
    }

    const product = products.find((p) => p.id === parseInt(pid));

    if (!product) {
      return res.status(400).json({ error: 'Producto no encontrado' });
    }

    const cartProduct = {
      product: pid,
      quantity: quantity || 1, 
    };

    cart.products.push(cartProduct);

    await fs.promises.writeFile('../src/carrito.json', JSON.stringify(carts, null, 2));

    res.json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export default router