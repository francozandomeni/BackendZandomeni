import express from 'express'
import productsRouter from "./router/products.router.js"
import cartRouter from "./router/cart.router.js"

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartRouter)



app.listen(8080, () => {
    console.log("Escuchando al puerto 8080")
})