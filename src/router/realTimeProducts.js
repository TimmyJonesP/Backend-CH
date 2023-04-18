const { Router } = require("express");
const ProductManager = require("../Manager/ProductManager");

const products = new ProductManager("../src/db/productos.txt");
const router = Router();

router.get("/", async (req, res) => {
    try {
        const data = await products.getAll();
        const limit = parseInt(req.query.limit) || Infinity;
        const result = data.slice(0, limit);
        res.render("realTimeProducts", { products: result });
    } catch (err) {
        console.error(err);
        res.status(500).send("Ha ocurrido un error al cargar los productos.");
    }
});

router.post("/", async (req, res) =>{
    const newProduct = req.body;
    const newProductId = await products.addProduct(newProduct)
    console.log(newProductId)
    res.redirect("/realtimeproducts")
});

router.delete("/:id", async (req, res) =>{
    const { id } = req.params;

    await products.deleteProduct(id);
    res.render("realTimeProducts", products)
});

module.exports = router;