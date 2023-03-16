const fs = require("fs/promises");

class CartManager {
    constructor(filePath) {
    this.path = filePath;
}

    async getAll() {
    try {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
    }

    async getCartById(cartId) {
        const data = await this.getAll()
        let seeker = data.find(p => p.id == cartId)
        if (!seeker) {
            return (`No se encontró el producto con ID: ${id}`)
        }
        return seeker
    }

    async addCart(cart) {
    const data = await this.getAll();
    let newId = data.length == 0 ? 1 : data[data.length - 1].id + 1;
    const newCart = { ...cart, id: newId };
    data.push(newCart);

    try {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return newId;
    } catch (err) {
        return `No se pudo agregar el carrito ${cart}`;
    }
    }

    async updateCart(cart) {
    const data = await this.getAll();
    const index = data.findIndex((c) => c.id === cart.id);

    if (index === -1) {
        return `No se pudo actualizar el carrito ${cart.id}`;
    }

    data.splice(index, 1, cart);

    try {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return `El carrito ${cart.id} fue actualizado correctamente`;
    } catch (err) {
        return `No se pudo actualizar el carrito ${cart.id}`;
    }
    }
}

module.exports = CartManager;