import getUserIdFromToken from "./getUserId";
import apiClient from "./api";

const getUserInfo = async () => {
	const user_id = getUserIdFromToken();
	if (!user_id) {
		throw new Error("User ID not found in token");
	}

	try {
		const response = await apiClient.get(`/users/${user_id}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching user info:", error);
		throw error;
	}
};

export default getUserInfo;
