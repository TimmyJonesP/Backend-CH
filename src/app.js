const express = require("express")
const productRouter = require("../router/productsRouter")
const cartRouter = require("../router/cartRouter")
const handlebars = require("express-handlebars")
const { Server } = require("socket.io")

const app = express()
const port = 3000
app.use(express.json())
app.use("/api/productos", productRouter)
app.use('/api/cart', cartRouter)
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/view")

const io = new Server(httpServer)

const httpServer = app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})

io.on("connection", socket => {
    console.log(`Cliente conectado bajo el ID: ${socket.id} `)
})
