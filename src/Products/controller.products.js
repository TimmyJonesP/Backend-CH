const { Router } = require("express")
const ProductManager = require("../Manager/ProductManager");
const Products = require('../models/products.model')

const products = new ProductManager("../../db/productos.txt")
const router = Router()

router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || '';
    const category = req.query.category || '';
    const availability = req.query.availability || '';

    const startIndex = (page - 1) * limit;

    try {
        let queryOptions = {};
        if (category) {
            queryOptions.category = category;
        }
        if (availability) {
            queryOptions.availability = availability === 'true';
        }
        if (query) {
            queryOptions.title = {
                $regex: query,
                $options: 'i'
            };
        }

        const count = await Products.countDocuments(queryOptions);
        const totalPages = Math.ceil(count / limit);

        let prevPage = null;
        let nextPage = null;

        if (page > 1) {
            prevPage = page - 1;
        }

        if (page < totalPages) {
            nextPage = page + 1;
        }

        let sortOption = {};
        if (sort) {
            sortOption = sort === 'asc' ? { price: 1 } : { price: -1 };
        }

        const products = await Products.find(queryOptions)
            .sort(sortOption)
            .skip(startIndex)
            .limit(limit);

        const result = {
            status: 'success',
            payload: products,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: page,
            hasPrevPage: prevPage !== null,
            hasNextPage: nextPage !== null,
            prevLink: prevPage ? `/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}&category=${category}&availability=${availability}` : null,
            nextLink: nextPage ? `/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}&category=${category}&availability=${availability}` : null,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.post("/", async (req, res) => {
    const newProduct = req.body;

    const newProductId = await products.addProduct(newProduct)
    res.json({ message: "Producto Agregado", productId: newProductId })
})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await products.getProductById(pid)
    res.json(product)
})

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid
    const updatedProduct = { ...req.body, id: pid }
    await products.updateProduct(updatedProduct)
    res.json({ message: `Producto de id ${pid} actualizado correctamente!` })
})

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid
    await products.deleteProduct(pid)
    res.json({ message: `Producto de id ${pid} eliminado correctamente!` })
})

module.exports = router;