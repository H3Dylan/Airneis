const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    articles: [
        {
            articleId: String,
            quantity: Number
        }
    ],
    totalPrice: Number,
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;