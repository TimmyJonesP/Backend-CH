class ProductManager {
    title = ""
    description = ""
    price 
    thumbnail = ""
    code = ""
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
        products.length == 0 ? newId = 1 : (newId = products[products.length - 1].id + 1)
        newId = this.code
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        let seeker = this.products.find(p => p.id == id) || "Not found, create one."
        return seeker
    }
}