const { Router } = require("express")
const ProductManager = require("../src/Manager/ProductManager");

const router = Router()
const products = new ProductManager("../src/view/productos.txt")

router.post("/", async (req, res) =>{
    let nuevoProducto = {...req.body}
    products.addProduct(nuevoProducto)
    res.json({message:"Se ha creado un nuevo producto"})
})

module.exports = router;