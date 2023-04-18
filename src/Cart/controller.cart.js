const { Router } = require("express")
const CartManager = require("../Manager/CartManager")

const router = Router()
const carts = new CartManager("../../db/cart.txt")

router.post("/", async (req, res) => {
    const newCart = { products: [] };
    const cartId = await carts.addCart(newCart);
    res.json({ id: cartId });
});

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid
    const cart = await carts.getCartById(cid)
    res.json(cart)
})

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid
    const cart = await carts.getCartById(cid)
    const pid = req.params.pid

    const productIndex = cart.products.findIndex((p) => p.product === pid)

    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1
        await carts.updateCart(cart)
        res.json(cart)
    } else {
        const newProduct = { product: pid, quantity: 1 }
        cart.products.push(newProduct)
        await carts.updateCart(cart)
        res.json(cart)
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
        const cart = await Cart.findByIdAndDelete(req.params.cid);
        res.json({ status: 'success', message: 'Cart deleted', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

module.exports = router;