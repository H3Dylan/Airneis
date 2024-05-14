const articleModel = require('../../model/article');

const getAllArticlesController = async (request, response) => {
    try {
        const articleList = await articleModel.find();

        if (!articleList || articleList.length === 0) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'No articles found!'
            });
        }

        response.status(200).json({
            success: true,
            error: false,
            message: 'Articles retrieved successfully',
            data: articleList
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getAllArticlesController;