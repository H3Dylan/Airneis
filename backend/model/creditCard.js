const mongoose = require("mongoose");
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

module.exports = creditCardSchema;
