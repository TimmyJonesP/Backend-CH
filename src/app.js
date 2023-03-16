const express = require("express")
const productRouter = require("../router/productsRouter")
const cartRouter = require("../router/cartRouter")

const app = express()
const port = 3000
app.use(express.json())
app.use("/api/productos", productRouter)
app.use('/api/cart', cartRouter)
app.use(express.urlencoded({extended:true}))

app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})
