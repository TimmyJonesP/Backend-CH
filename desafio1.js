class ProductManager {
    title = ""
    description = ""
    price 
    thumbnail = ""
    code 
    stock 
    
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.products = []
    }
    addProduct(product) {

        let newId
        this.products.length == 0 ? newId = 1 : (newId = products[products.length - 1].id + 1)
        newId = this.code
        let newProduct = {...product, newId}
        this.products.push(newProduct)
    }

    getProducts(){
        return this.products
    }

    getProductById(code){
        let seeker = this.products.find(p => p.code == code) || "Not found, create one."
        return seeker
    }
}
let cucurucho = {title: "cucurucho", description: "Cucurucho de heladería", price: 199, thumbnail: "CucuruchoRico.jpeg", stock: 999}

let TiendaHelado = new ProductManager

TiendaHelado.addProduct(cucurucho)
TiendaHelado.getProductById(1)
TiendaHelado.getProducts