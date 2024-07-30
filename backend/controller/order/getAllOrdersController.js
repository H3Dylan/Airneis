// src/controller/order/getAllOrdersController.js
const orderModel = require('../../model/order');
const articleModel = require('../../model/article'); // Assurez-vous d'importer votre modèle d'article

const getAllOrdersController = async (req, res) => {
    try {
        // Récupérer toutes les commandes
        const orders = await orderModel.find();

        // Peupler les articles dans chaque commande
        const populatedOrders = await Promise.all(orders.map(async (order) => {
            const articles = await Promise.all(order.articles.map(async (item) => {
                const article = await articleModel.findById(item.articleId);
                return {
                    name: article ? article.name : 'Unknown',
                    quantity: item.quantity
                };
            }));

            return {
                ...order._doc,
                articles
            };
        }));

        if (!populatedOrders || populatedOrders.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No orders found!'
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            message: 'Orders retrieved successfully',
            data: populatedOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getAllOrdersController;
