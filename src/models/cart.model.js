const mongoose = require('mongoose')

const collectionName = "cart"

const collectionSchema = new mongoose.Schema({
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 },
    }],
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});

const Cart = mongoose.model(collectionName, collectionSchema)

module.exports = Cart