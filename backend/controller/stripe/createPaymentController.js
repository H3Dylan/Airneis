const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentController = async (request, response) => {
	try {
        const { totalAmount } = request.body;
        console.log(totalAmount);
        if (!totalAmount || totalAmount <= 0) {
            return response.status(400).json({
                success: false,
                error: true,
                message: "Invalid amount",
            });
        }

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(totalAmount * 100),
			currency: "eur",
		});

        response.status(200).json({
            success: true,
            error: false,
            message: "Payment intented",
            data: paymentIntent.client_secret
        });
	} catch (error) {
		response.status(500).json({ error: error.message });
	}
};

module.exports = createPaymentController;
