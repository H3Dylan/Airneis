const OrderModel = require('../../model/order');

function generateUniqueOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}
const createOrderController = async (request, response) => {
    try {
        const { userId, articles, shippingAddress, totalAmount } = request.body;
        console.log(request.body);
        const order = new OrderModel({
            orderId: generateUniqueOrderId(),
            userId,
            articles,
            shippingAddress,
            totalAmount
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