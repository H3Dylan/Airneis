const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
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

userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;