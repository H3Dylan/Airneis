import articleModel from "../../model/article.js";

const searchController = async (request, response) => {
	try {
		const {
			searchText,
			descriptionText,
			materials,
			minPrice,
			maxPrice,
			categories,
			inStock,
			sortBy,
			sortOrder,
		} = request.query;

		let query = {};

		if (searchText) {
			query.name = {
				$regex: searchText,
				$options: "i",
			};
		}

		if (descriptionText) {
			query.detailsDescription = {
				$regex: descriptionText,
				$options: "i",
			};
		}

		if (materials) {
			query.materials = { $in: materials.split(",") };
		}

		if (minPrice) {
			query.price = { $gte: Number(minPrice) };
		}

		if (maxPrice) {
			query.price = { ...query.price, $lte: Number(maxPrice) };
		}

		if (categories) {
			query.category = { $in: categories.split(",") };
		}

		if (inStock === "true") {
			query.stock = { $gt: 0 };
		}

		let productsQuery = articleModel.find(query);

		if (sortBy) {
			let sortOptions = {};
			sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
			productsQuery = productsQuery.sort(sortOptions);
		}

		const products = await productsQuery.exec();

		response.status(200).json({
			success: true,
			error: false,
			data: products,
		});
	} catch (error) {
		console.error("Error searching products:", error);
		response.status(500).json({
			success: false,
			error: true,
			message: "Internal server error",
		});
	}
};

export default searchController;
