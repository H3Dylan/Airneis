const articleModel = require('../../model/article');

const getSimilarArticlesController = async (request, response) => {
    try {
        const { category, id } = request.params;
        const similarProducts = await articleModel.find({ 
            category, 
            stock: { $gt: 0 }, 
            _id: { $ne: id }
        });

        if (!similarProducts || similarProducts.length === 0) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'No similar products found!'
            });
        }

        const randomProduct = similarProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = randomProduct.slice(0, 6);

        response.status(200).json({
            success: true,
            error: false,
            message: 'Similar products retrieved successfully',
            data: selectedProducts
        });
    } catch (error) {
        console.error('Error fetching similar products:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getSimilarArticlesController;
