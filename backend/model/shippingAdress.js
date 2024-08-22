import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shippingAddressSchema = new Schema({
	label: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	addressLine1: {
		type: String,
		required: true,
	},
	addressLine2: {
		type: String,
		required: false,
	},
	city: {
		type: String,
		required: true,
	},
	region: {
		type: String,
		required: true,
	},
	postalCode: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
});

export default shippingAddressSchema;
