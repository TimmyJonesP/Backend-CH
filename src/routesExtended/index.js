const cartRouter = require("../Cart/controller.cart")
const productRouter = require("../Products/controller.products")
const realTimeProducts = require("../router/realTimeProducts")

const router = app => {
    app.use("/api/productos", productRouter)
    app.use('/api/cart', cartRouter)
    app.use("/realtimeproducts", realTimeProducts)
}

module.exports = router