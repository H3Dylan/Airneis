const articleModel = require('../../model/article');

const getArticlesByCategoryController = async (request, response) => {
    try {
        const { category } = request.params;
        const articles = await articleModel.find({ category });

        if (!articles || articles.length === 0) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'No articles found for the given category!'
            });
        }

        response.status(200).json({
            success: true,
            error: false,
            message: 'Articles retrieved successfully',
            data: articles
        });
    } catch (error) {
        console.error('Error fetching articles by category:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getArticlesByCategoryController;