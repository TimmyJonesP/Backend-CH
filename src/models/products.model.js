const mongoose = require('mongoose')

const collectionName = 'product'

const collectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumnail: String,
    code: String,
    stock: Number
})

const Products = mongoose.model(collectionName, collectionSchema)

module.exports = {
    Products,
    getProductsWithOptions: async (options) => {
        const {
            limit = 10,
            page = 1,
            sort = '',
            query = ''
        } = options;

        const skip = (page - 1) * limit;

        let sortOption = {};
        if (sort) {
            sortOption = sort === 'asc' ? { price: 1 } : { price: -1 };
        }

        let queryOption = {};
        if (query) {
            queryOption = {
                title: {
                    $regex: query,
                    $options: 'i'
                }
            };
        }

        const products = await Product.find(queryOption)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        const total = await Product.countDocuments(queryOption);

        return {
            products,
            total,
            page,
            limit
        };
    }
};