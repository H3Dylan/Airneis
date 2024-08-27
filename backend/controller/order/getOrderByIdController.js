const OrderModel = require('../../model/order');

const getOrderByIdController = async (request, response) => {
    try {
        const { id } = request.params;
        const order = await OrderModel.findById(id);

        if (!order) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'Order not found',
            });
        }

        response.status(200).json({
            success: true,
            error: false,
            data: order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error',
        });
    }
};

module.exports = getOrderByIdController;
