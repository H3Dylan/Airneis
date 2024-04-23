const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	addresses: [{
		street: String,
		city: String,
		region: String,
		zipCode: Number,
		country: String
	}],
	phone: {
		type: String
	},
	creditCard: {
		cardName: String,
		cardNumber: String,
		expirationDate: Date,
		CVV: String
	}
});

const User = mongoose.model('user', userSchema);

module.exports = User;