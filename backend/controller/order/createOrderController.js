const OrderModel = require("../../model/order");
const ArticleModel = require("../../model/article");

function generateUniqueOrderId() {
	return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

const createOrderController = async (request, response) => {
	const { userId, articles, shippingAddress, totalAmount } = request.body;

	try {
		for (const article of articles) {
			const { _id, quantity } = article;
			const existingArticle = await ArticleModel.findById(_id);

			if (!existingArticle) {
				return response.status(404).json({
					success: false,
					message: `Article ${_id} not found`,
				});
			}

			if (existingArticle.stock < quantity) {
				return response.status(400).json({
					success: false,
					message: `Insufficient stock for article ${_id}`,
				});
			}

			existingArticle.stock -= quantity;
			await existingArticle.save();
		}

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
			message: "Order created successfully",
			data: order
		});
	} catch (error) {
		response.status(500).json({
			success: false,
			error: "Internal server error"
		});
	}
};

module.exports = createOrderController;