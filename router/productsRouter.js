const { Router } = require("express")
const ProductManager = require("../src/Manager/ProductManager");

const products = new ProductManager("../src/db/productos.txt")
const router = Router()

router.get("/", async (req, res) => {
    const data1 = await products.getAll()
    const limit = parseInt(req.query.limit) || Infinity
    const result = data1.slice(0, limit);
    res.json(result)
})

router.post("/", async (req, res) =>{
    const newProduct = req.body;

    const newProductId = await products.addProduct(newProduct)
    res.json({message: "Producto Agregado", productId: newProductId})
})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await products.getProductById(pid)
    res.json(product)
})

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid
    const updatedProduct = {...req.body, id: pid}
    await products.updateProduct(updatedProduct)
    res.json({ message: `Producto de id ${pid} actualizado correctamente!`})
})

router.delete("/:pid", async (req,res) =>{
    const pid = req.params.pid
    await products.deleteProduct(pid)
    res.json({ message: `Producto de id ${pid} eliminado correctamente!`})
})

module.exports = router;