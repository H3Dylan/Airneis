import articleModel from "../../model/article.js";
import categoryModel from "../../model/category.js";

const createArticleController = async (request, response) => {
	try {
		const {
			category,
			name,
			price,
			stock,
			shortDescription,
			detailsDescription,
			materials,
		} = request.body;
		const categoryObject = await categoryModel.findOne({ name: category });

		if (
			!name ||
			!price ||
			!stock ||
			!shortDescription ||
			!detailsDescription
		) {
			return response.status(400).json({
				success: false,
				error: true,
				message:
					"Name, price, stock and different decriptions are required fields",
			});
		}

		if (!categoryObject) {
			return response.status(404).json({
				success: false,
				error: true,
				message: "Category not found",
			});
		}

		const newArticle = new articleModel({
			category: categoryObject._id,
			name: name,
			price: price,
			stock: stock,
			shortDescription: shortDescription,
			detailsDescription: detailsDescription,
			materials: materials,
		});

		const savedArticle = await newArticle.save();

		response.status(201).json({
			success: true,
			error: false,
			message: "Article created successfully",
			data: savedArticle,
		});
	} catch (error) {
		console.error("Error creating article:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default createArticleController;
