import { Router } from "express";
import { productsManager } from "../ProductManager.js"


const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await productsManager.getProducts(req.query)
        if (!products.length) {
            res.status(200).json({ message: "No products found" })
            console.log("no se encuentra")
        } else {
            res.status(200).json({ message: "Products found", products })

        }
    }
    catch (error) {
        res.status(500).json({ message: "error 500 getproduct" })
    }
})


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productId = parseInt(pid)
        const product = await productsManager.getProductById(+pid)
        if (!product) {
            res.status(400).json({ message: "Product with that id number not found" })
        } else {
            res.status(200).json({ message: "Product found", product })
        }

    } catch (error) {
        res.status(500).json({ message: "error 500 idproduct" })

    }
})

router.post("/", async (req, res) => {
    try {
        const newProduct = await productsManager.addProduct()
        res.status(200).json({ message: "Product created", product: newProduct })
    } catch (error) {
        res.status(500).json({ message: "error creando producto" })
    }
})

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        const response = await productsManager.deleteProduct(+pid)
        if (response === -1) {
            res.status(400).json({ message: "user not found with de id sent" })
        } else {
            res.status(200).json({ message: "user deleted" })

        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.put("/:pid", async (req, res) => {
    const {pid} = req.params 
    try {
        const response = await usersManager.updateProduct(+pid, req.body)
        if (response === -1) {
            res.status(400).json({ message: "user not found with de id sent" })
        } else {
            res.status(200).json({ message: "user updated" })

        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

export default router