const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const shippingAddressSchema = require("./shippingAdress.js");
const creditCardSchema = require("./creditCard.js");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	shippingAddresses: [shippingAddressSchema],
	phone: {
		type: String,
	},
	creditCard: {
		type: [creditCardSchema],
	},
});

userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) return next();

	try {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
		next();
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model("user", userSchema);

module.exports = User;
