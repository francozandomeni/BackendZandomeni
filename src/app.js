import express from 'express'
import { productsManager } from './ProductManager.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/products", async (req,res) => {
    try {
        const products = await productsManager.getProducts()
        if(!products.length){
            res.status(200).json({message: "No products found"})
        } else {
            res.status(200).json({message:"Products found", products})

        }
    }
    catch (error) {
        res.status(500).json({message: error}) 
    }
})

app.get('/products/:idProducts',async(req,res) => {
    const {idProducto} = req.params
    try {
        const productId = parseInt(idProducto)
        const product = await productsManager.getProductById(idProducto)
        if(!product) {
            res.status(400).json({message: "Product with that id number not found"})
        } else {
            res.status(200).json({message: "Product found", product})
        }
        
    } catch (error) {
        res.status(500).json({message: error})
        
    }
})

app.post("/products", async(req,res)=> {
    try {
        const newProduct = await productsManager.addProduct(req.body)
        res.status(200).json({message: "Product created", product: newProduct})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})
