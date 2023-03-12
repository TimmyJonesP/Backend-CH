const { promises: fs} = require ("fs")

class ProductManager {
    title = ""
    description = ""
    price 
    thumbnail = ""
    code 
    stock 
    
    constructor(path){
        this.path = path;
    }

    
    async getAll() {
        try{
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        }catch (err) {
            return  []
        }
    }

    async addProduct(s){
        const data = await this.getAll()
        let newId = data.length == 0 ? 1 : data[data.length - 1].id + 1;
        const newProduct = { ...s, id: newId };
        data.push(newProduct);

        try {
            await fs.writeFile(this.path, JSON.stringify(data, null, 2))
            return newId
        } catch(err){
            return (`no pudo guardarse ${s}`)
        }

    }

    async deleteProduct(id){
        const data = await this.getAll()
        const i = data.filter((p) => p.id !== id)

        try {
            await fs.writeFile(this.path, JSON.stringify(i, null, 2));
            return {id}
        }
        catch (err){
            return (`${err}`)
        }
    }

    async getProducts(){
        const data = await this.getAll();
        return data
    }

    async getProductById(id){
        const data = await this.getAll()
        let seeker = data.find(p => p.id == id)
        if (!seeker) {
            return (`No se encontró el producto con ID: ${id}`)
        }
        return seeker
    }

    async updateProduct(id, propiedad, newValue){
        const data = await this.getAll()
        const i = data.find(p => p.id === id)
        if (i){
            i[propiedad] = newValue

        try{
            await fs.writeFile(this.path, JSON.stringify(data,null,2))
            return {i}
        } catch (err){
            return (`${err}`)
        }
    } else {
        return (`No se encontró el producto con ID: ${id}`)
    }
    }
}

module.exports = ProductManager