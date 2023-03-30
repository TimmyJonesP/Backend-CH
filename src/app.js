const express = require("express")
const handlebars = require("express-handlebars")
const { Server } = require("socket.io")
const router = require("./routesExtended")

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views")

const httpServer = app.listen(port, () =>{
    console.log(`Server running at port ${port}`)
})

const io = new Server(httpServer)
router(app)

io.on("connection", socket => {
    console.log(`Cliente conectado bajo el ID: ${socket.id} `)
    
    socket.on("productosActualizados", (data) => {
        const productList = document.querySelector("#product-list");
        productList.innerHTML = "";
        data.forEach(product => {
            const li = document.createElement("li");
            li.innerText = `${product.title} - ${product.price}`;
            productList.appendChild(li);
        });
    });
})