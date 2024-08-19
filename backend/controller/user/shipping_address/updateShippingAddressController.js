import userModel from "../../../model/user.js";

const updateShippingAddressController = async (request, response) => {
	const userId = request.params.userId;
	const newAddress = request.body;

	try {
		const user = await userModel.findById(userId);

		if (!user) {
			return response.status(404).json({
				success: false,
				error: true,
				message: "User not found",
			});
		}

		const existingAddress = user.shippingAddresses.find(
			(addr) =>
				addr.firstName === newAddress.firstName &&
				addr.lastName === newAddress.lastName &&
				addr.addressLine1 === newAddress.addressLine1 &&
				addr.city === newAddress.city &&
				addr.region === newAddress.region &&
				addr.postalCode === newAddress.postalCode &&
				addr.country === newAddress.country &&
				addr.phoneNumber === newAddress.phoneNumber
		);

		if (existingAddress) {
			return response.status(400).json({
				success: false,
				error: true,
				message: "Shipping address already exist !.",
			});
		}
		if (!newAddress.label) {
			user.shippingAddresses.newAddress.label == "Address1";
		}
		user.shippingAddresses.push(newAddress);
		await user.save();

		response.status(201).json({
			success: true,
			error: false,
			message: "Shipping address saved !",
			data: newAddress,
		});
	} catch (error) {
		console.error("Error saving shipping address:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error.",
		});
	}
};

export default updateShippingAddressController;
