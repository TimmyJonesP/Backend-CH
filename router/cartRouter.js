const { Router } = require("express")
const CartManager = require("../src/Manager/CartManager")

const router = Router()
const carts = new CartManager("../src/db/cart.txt")

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

    if (productIndex !== -1){
        cart.products[productIndex].quantity += 1
        await carts.updateCart(cart)
        res.json(cart)
    } else {
        const newProduct = {product: pid, quantity: 1}
        cart.products.push(newProduct)
        await carts.updateCart(cart)
        res.json(cart)
    }
})

module.exports = router;