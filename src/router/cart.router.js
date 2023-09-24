import { Router } from "express";
import { cartManager } from "../CartManager.js";

const router = Router()

router.post("/", async(req,res)=> {
    try {
        
        const newCart = await cartManager.addToCart()
        res.status(200).json({message: "added to cart", cart: newCart})
    } catch (error) {
        res.status(500).json({message: "error adding to cart"})
    }
})





export default router