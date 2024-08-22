import categoryModel from "../../model/category.js";

const getCategoriesController = async (request, response) => {
	try {
		const { id } = request.params;
		const category = await categoryModel.findById(id);

		if (!category || category.length === 0) {
			return response.status(404).json({
				success: false,
				error: true,
				message: "No category found!",
			});
		}

		response.status(200).json({
			success: true,
			error: false,
			message: "Category retrieved successfully",
			data: category,
		});
	} catch (error) {
		console.error("Error fetching categories:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default getCategoriesController;
