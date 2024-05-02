const userModel = require('../../model/user')

const userRegisterController = async (request, response) => {
    try {
        const existUser = await userModel.findOne({ email: request.body.email });
        if (existUser) {
            return response.status(409).json({
                success: false,
                error: true,
                message: 'Email already exists. Please use a different email address.'
            });
        }

        const newUser = new userModel(request.body);
        console.log("new User: ", await newUser.save());

        try {
            await newUser.validate();
            await newUser.save();
            response.status(201).json({
                success: true,
                error: false,
                message: 'User created successfully!'
            });
        } catch(error) {
            console.log(error);
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return response.status(400).json({
                success: false,
                error: true,
                message: 'Validation error',
                errors: errors
            });
        } else {
            console.error(error);
            return response.status(500).json({
                success: false,
                error: true,
                message: 'An error occurred while creating the user.'
            });
        }
    }
};

module.exports = userRegisterController;