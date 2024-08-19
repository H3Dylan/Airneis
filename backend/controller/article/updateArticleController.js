import articleModel from "../../model/article.js";

const updateArticleController = async (request, response) => {
	try {
		const { id } = request.params;
		const { category, name, price, stock, description, materials } =
			request.body;

		const updatedArticle = await articleModel.findByIdAndUpdate(
			id,
			{
				category,
				name,
				price,
				stock,
				description,
				materials,
			},
			{ new: true }
		);

		response.status(200).json({
			success: true,
			error: false,
			message: "Article updated successfully",
			data: updatedArticle,
		});
	} catch (error) {
		console.error("Error updating article:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default updateArticleController;
