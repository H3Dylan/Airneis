const userModel = require('../../model/user');

const getUserController = async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userModel.findById(id);
        
        if (!user || user.length === 0) {
            return response.status(404).json({
                success: false,
                error: true,
                message: 'No user found!'
            });
        }

        response.status(200).json({
            success: true,
            error: false,
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        response.status(500).json({
            success: false,
            error: true,
            message: 'Internal server error'
        });
    }
};

module.exports = getUserController;