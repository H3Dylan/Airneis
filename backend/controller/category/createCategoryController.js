const  categoryModel = require('../../model/category');

const createCategoryController = async (request, response) => {
    try {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({
                success: false,
                error: true,
                message: 'Name is required field'
            });
        }

        const newCategory = new categoryModel({
            name
        });

        const savedCategory = await newCategory.save();

        response.status(201).json({
            success: true,
            error: false,
            message: 'Category created successfully',
            data: savedCategory
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

module.exports = createCategoryController;
