const { Router } = require("express")
const Products = require('../models/products.model')
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

router.post('/', async (req, res) => {
    try {
        const newProduct = new Products(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;