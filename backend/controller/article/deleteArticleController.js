const articleModel = require('../../model/article');

const deleteArticleController = async (request, response) => {
    try {
        const { id } = request.params;
        await articleModel.findByIdAndDelete(id);
        response.status(200).json({
            success: true,
            error: false,
            message: 'Article deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting article:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = deleteArticleController;