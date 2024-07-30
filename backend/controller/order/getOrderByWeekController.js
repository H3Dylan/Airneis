// src/controller/order/getOrderByWeekController.js
const orderModel = require('../../model/order');
const moment = require('moment');

const getOrderByWeekController = async (req, res) => {
    try {
        const today = moment().startOf('week');
        const fiveWeeksAgo = moment().subtract(5, 'weeks').startOf('week');

        // Trouver les commandes dans les 5 dernières semaines
        const orders = await orderModel.find({
            createdAt: { $gte: fiveWeeksAgo.toDate(), $lte: today.toDate() }
        });

        // Calculer les totaux par semaine
        const weeklyTotals = {};
        orders.forEach(order => {
            const weekStart = moment(order.createdAt).startOf('week').format('YYYY-MM-DD');
            if (!weeklyTotals[weekStart]) {
                weeklyTotals[weekStart] = 0;
            }
            weeklyTotals[weekStart] += order.totalPrice;
        });

        // Créer une liste des semaines et des totaux
        const weeks = [];
        const totals = [];
        for (let i = 4; i >= 0; i--) {
            const weekStart = moment().subtract(i, 'weeks').startOf('week').format('YYYY-MM-DD');
            weeks.push(weekStart);
            totals.push(weeklyTotals[weekStart] || 0);
        }

        res.status(200).json({
            success: true,
            error: false,
            message: 'Weekly sales retrieved successfully',
            data: { weeks, totals }
        });
    } catch (error) {
        console.error('Error fetching weekly sales:', error);
        res.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getOrderByWeekController;
