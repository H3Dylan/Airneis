const OrderModel = require('../../model/order');

const createOrderController = async (request, response) => {
    try {
        const { userId, articles,totalPrice } = request.body;

        const order = new OrderModel({
            userId,
            articles,
            totalPrice
        });

        await order.save();
        response.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        response.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

module.exports = createOrderController;