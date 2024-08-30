const OrderModel = require('../../model/order');

const getOrderByArticleController = async (req, res) => {
    try {
        const { articleId } = req.params;

        if (!articleId) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Article ID is required',
            });
        }

        // Rechercher les commandes qui contiennent l'article spécifié
        const orders = await OrderModel.find({
            'articles.articleId': articleId
        });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No orders found for the specified article',
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            data: orders,
        });
    } catch (error) {
        console.error('Error fetching orders by article:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error',
        });
    }
};

module.exports = getOrderByArticleController;
