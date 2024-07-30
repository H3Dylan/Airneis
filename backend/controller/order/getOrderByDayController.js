// src/controller/order/getOrderByDayController.js
const orderModel = require('../../model/order');
const moment = require('moment');

const getOrderByDayController = async (req, res) => {
    try {
        const today = moment().startOf('day');
        const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');

        // Trouver les commandes dans les 7 derniers jours
        const orders = await orderModel.find({
            createdAt: { $gte: sevenDaysAgo.toDate(), $lte: today.toDate() }
        });

        // Calculer les totaux par jour
        const dailyTotals = {};
        orders.forEach(order => {
            const orderDate = moment(order.createdAt).format('YYYY-MM-DD');
            if (!dailyTotals[orderDate]) {
                dailyTotals[orderDate] = 0;
            }
            dailyTotals[orderDate] += order.totalPrice;
        });

        // Créer une liste des dates et des totaux
        const dates = [];
        const totals = [];
        for (let i = 6; i >= 0; i--) {
            const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
            dates.push(date);
            totals.push(dailyTotals[date] || 0);
        }

        res.status(200).json({
            success: true,
            error: false,
            message: 'Daily sales retrieved successfully',
            data: { dates, totals }
        });
    } catch (error) {
        console.error('Error fetching daily sales:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getOrderByDayController;
