import apiClient from "./api";

const getAllCategories = async () => {
	try {
		const response = await apiClient.get("/categories");
		return response.data;
	} catch (error) {
		console.error("Error fetching all categories:", error);
		throw error;
	}
};

export default getAllCategories;
