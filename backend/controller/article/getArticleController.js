import articleModel from "../../model/article.js";

const getArticlesController = async (request, response) => {
	try {
		const { id } = request.params;
		const article = await articleModel.findById(id);

		if (!article || article.length === 0) {
			return response.status(404).json({
				success: false,
				error: true,
				message: "No article found!",
			});
		}

		response.status(200).json({
			success: true,
			error: false,
			message: "Article retrieved successfully",
			data: article,
		});
	} catch (error) {
		console.error("Error fetching articles:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default getArticlesController;
