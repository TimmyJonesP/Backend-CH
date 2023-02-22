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
        let newId = this.products.length == 0 ? 1 : this.products[this.products.length - 1].id + 1;
        const newProduct = { ...product, id: newId };
        this.products.push(newProduct);
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        let seeker = this.products.find(p => p.id == id) || "Not found, create one."
        return seeker
    }
}
let cucurucho = {title: "cucurucho", description: "Cucurucho de heladería", price: 199, thumbnail: "CucuruchoRico.jpeg", stock: 999}

let TiendaHelado = new ProductManager

TiendaHelado.addProduct(cucurucho)
TiendaHelado.getProductById(1)
TiendaHelado.getProducts()
console.log(TiendaHelado.getProducts())