const cartRouter = require("../../router/cartRouter")
const productRouter = require("../../router/productsRouter")
const realTimeProducts = require("../../router/realTimeProducts")

const router = app => {
    app.use("/api/productos", productRouter)
    app.use('/api/cart', cartRouter)
    app.use("/realtimeproducts", realTimeProducts)
}

module.exports = router