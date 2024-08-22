import mongoose from "mongoose";

const Schema = mongoose.Schema;

const creditCardSchema = new Schema({
	cardName: {
		type: String,
	},
	cardNumber: {
		type: String,
	},
	expirationDate: {
		type: Date,
	},
});

export default creditCardSchema;
