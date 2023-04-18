const { Router } = require("express")
const Cart = require("../models/cart.model")

const router = Router()

router.post("/", async (req, res) => {
    const newCart = { products: [] };
    const cart = new Cart(newCart);
    await cart.save();
    res.json({ id: cart._id });
});

router.get("/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const pid = req.params.pid;
        const productIndex = cart.products.findIndex((p) => p.product === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            const newProduct = { product: pid, quantity: 1 }
            cart.products.push(newProduct)
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const productIndex = cart.products.findIndex(product => product.id === req.params.pid);
        if (productIndex === -1) {
            return res.status(404).json({ status: 'error', message: 'Product not found in cart' });
        }
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.json({ status: 'success', message: 'Product removed from cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body }, { new: true }).populate('products.product');
        res.json({ status: 'success', message: 'Cart updated', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const product = cart.products.find(product => product.id === req.params.pid);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found in cart' });
        }
        product.quantity = req.body.quantity;
        await cart.save();
        res.json({ status: 'success', message: 'Product quantity updated in cart', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }
        res.json({ status: 'success', message: 'Cart deleted', cart: deletedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;