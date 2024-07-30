// src/controller/order/updateOrderController.js
const OrderModel = require('../../model/order');

const updateOrderController = async (request, response) => {
    try {
        const { id } = request.params;
        const { userId, articles, totalPrice, status } = request.body;

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { userId, articles, totalPrice, status },
            { new: true }
        );

        if (!updatedOrder) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'Order not found',
            });
        }

        response.status(200).json({
            success: true,
            error: false,
            message: 'Order updated successfully',
            data: updatedOrder,
        });
    } catch (error) {
        console.error('Error updating order:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error',
        });
    }
};

module.exports = updateOrderController;
