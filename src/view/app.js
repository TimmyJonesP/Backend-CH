const ProductManager = require("../Manager/ProductManager");
const express = require("express")

const app = express()

const port = 3000

const products = new ProductManager("./productos.txt")

app.use(express.urlencoded({extended:true}))

app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})

app.get("/products", async (req, res) => {
    const data1 = await products.getAll()
    const limit = parseInt(req.query.limit) || Infinity
    const result = data1.slice(0, limit);
    res.json(result)

})

app.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await products.getProductById(pid)
    res.json(product)
})