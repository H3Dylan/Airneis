import categoryModel from "../../model/category.js";

const getAllCategoriesController = async (request, response) => {
	try {
		const categoryList = await categoryModel.find();

		if (!categoryList || categoryList.length === 0) {
			return response.status(404).json({
				success: false,
				error: true,
				message: "No categories found!",
			});
		}

		response.status(200).json({
			success: true,
			error: false,
			message: "Category retrieved successfully",
			data: categoryList,
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

export default getAllCategoriesController;
