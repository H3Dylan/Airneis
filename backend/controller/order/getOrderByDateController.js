const moment = require('moment');
const OrderModel = require('../../model/order');

const getOrderByDateController = async (req, res) => {
    try {
        const { date } = req.params;
        const startOfDay = moment(date).startOf('day').toDate();
        const endOfDay = moment(date).endOf('day').toDate();

        const orders = await OrderModel.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        if (!orders.length) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'No orders found for the specified date',
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            data: orders,
        });
    } catch (error) {
        console.error('Error fetching orders by date:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error',
        });
    }
};

module.exports = getOrderByDateController;
