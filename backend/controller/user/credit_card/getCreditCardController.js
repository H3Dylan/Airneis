// const userModel = require('../../../model/user');
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getCreditCardController = async (request, response) => {
    try {
        const userId = request.user.id;
        const customer = await stripe.customers.listSources(userId, {
            object: 'card',
        });

        response.status(200).json({
            success: true,
            error: false,
            data: customer.data,
        });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export default getCreditCardController;