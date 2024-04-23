const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    category: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    materials: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Article = mongoose.model('article', articleSchema);

module.exports = Article;
