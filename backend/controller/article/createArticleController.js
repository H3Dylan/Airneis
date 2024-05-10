const articleModel = require('../../model/article');

const createArticleController = async (request, response) => {
    try {
        const { category, name, price, stock, description, materials } = request.body;

        if (!name || !price || !stock) {
            return response.status(400).json({
                success: false,
                error: true,
                message: 'Name, price, and stock are required fields'
            });
        }

        const newArticle = new articleModel({
            category,
            name,
            price,
            stock,
            description,
            materials
        });

        const savedArticle = await newArticle.save();

        response.status(201).json({
            success: true,
            error: false,
            message: 'Article created successfully',
            data: savedArticle
        });
    } catch (error) {
        console.error('Error creating article:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = createArticleController;
