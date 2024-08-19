import categoryModel from "../../model/category.js";

const deleteCategoryController = async (request, response) => {
	try {
		const { id } = request.params;
		await categoryModel.findByIdAndDelete(id);
		response.status(200).json({
			success: true,
			error: false,
			message: "Category deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting article:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default deleteCategoryController;
