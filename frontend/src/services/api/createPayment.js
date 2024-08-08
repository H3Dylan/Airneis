import apiClient from "./api";

const createPayment = async (totalAmount) => {
	try {
		const response = await apiClient.post("/payment/create_payment", { totalAmount });
		return response.data;
	} catch (error) {
		console.error("Error fetching payment creation:", error);
		throw error;
	}
};

export default createPayment;
