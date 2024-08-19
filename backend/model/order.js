import mongoose from "mongoose";
import shippingAddressSchema from "./shippingAdress.js";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	orderId: {
		type: String,
		require: true,
		unique: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	orderDate: {
		type: Date,
		default: Date.now,
	},
	items: [
		{
			productId: {
				type: String,
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			totalPrice: {
				type: Number,
				required: true,
			},
		},
	],
	shippingAddress: shippingAddressSchema,
	status: {
		type: String,
		enum: ["paid", "pending", "cancelled"],
		default: "pending",
	},
	totalAmount: {
		type: Number,
		required: true,
	},
});

const Order = mongoose.model("order", orderSchema);

export default Order;
