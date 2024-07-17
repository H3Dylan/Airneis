const UserSchema = require("../../../model/user");
const shippingAddressSchema = require("../../model/shippingAddress");

const addShippingAddressController = async (userId, shippingData) => {
	try {
		const user = await UserSchema.findById(userId);

		if (!user) {
			throw new Error("Utilisateur non trouvé");
		}

		const newAddress = new shippingAddressSchema({
			label: shippingData.label,
			firstName: shippingData.firstName,
			lastName: shippingData.lastName,
			addressLine1: shippingData.addressLine1,
			addressLine2: shippingData.addressLine2 || "",
			city: shippingData.city,
			region: shippingData.region,
			postalCode: shippingData.postalCode,
			country: shippingData.country,
			phoneNumber: shippingData.phoneNumber,
		});

		user.shippingAddresses.push(newAddress);

		await user.save();

		return {
			success: true,
			message: "Accepted payment",
			data: newAddress,
		};
	} catch (error) {
		console.error(
			"Erreur lors de l'ajout de l'adresse de livraison:",
			error
		);
		throw error;
	}
};

module.exports = addShippingAddressController;
