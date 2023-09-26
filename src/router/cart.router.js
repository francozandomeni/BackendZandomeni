import { Router } from "express";
import { cartManager } from "../CartManager.js";


const router = Router()


router.get("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
    
        const cart = await cartManager.getCartById(cid);
    
        res.status(200).json({ products: cart.products });
      } catch (error) {
        next(error);
      }
    }
);

router.use((req, res, next) => {
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    next(); 
  });

router.post(
    "/:cid/products/:pid", async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
        
            const result = await cartManager.addProductToCartById(cid, pid);
        
            res.status(200).json({ message: result });
          } catch (error) {
            next (error);
          }
        }
);          


router.use((req, res, next) => {
    console.log("Request body:", req.body);
    next(); 
  });
  

router.post("/", async (req, res, next) => {
    try {
        const result = await cartManager.createCart(req.body);
    
        res.status(200).json({ message: "product created", result });
      } catch (error) {
        next(error);
      }
})

export default router