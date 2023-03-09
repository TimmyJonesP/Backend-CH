import ProductManager from "../ProductManager"
import express from "express"

const app = express()

const port = 8080

const products = new ProductManager("../productos.txt")
const DEFAULT_LIMIT = Infinity

app.use(express.urlencoded({extended:true}))

app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})

app.get("/products", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;

    const lectura = products.getAll({
        limit,
    })
    res.send(lectura)

})

app.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await products.getProductById(pid)
    res.send(product)
})