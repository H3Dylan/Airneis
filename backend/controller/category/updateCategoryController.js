import categoryModel from "../../model/category.js";

const updateCategoryController = async (request, response) => {
	try {
		const { id } = request.params;
		const { name } = request.body;

		const updatedCategory = await categoryModel.findByIdAndUpdate(
			id,
			{
				name,
			},
			{ new: true }
		);

		response.status(200).json({
			success: true,
			error: false,
			message: "Category updated successfully",
			data: updatedCategory,
		});
	} catch (error) {
		console.error("Error updating category:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default updateCategoryController;
