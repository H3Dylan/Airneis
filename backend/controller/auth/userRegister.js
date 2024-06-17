const userModel = require('../../model/user')

const userRegisterController = async (request, response) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*_\-])[A-Za-z\d!@#$&*_\-]{8,}$/;
    try {
        const existUser = await userModel.findOne({ email: request.body.email });
        if (existUser) {
            return response.status(409).json({
                success: false,
                error: true,
                message: 'Email already exists. Please use a different email address.'
            });
        }

        if (!passwordRegex.test(request.body.password)) {
            return response.status(400).json({
                success: false,
                error: true,
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
            });
        }

        const newUser = new userModel(request.body);
        console.log("new User: ", await newUser.save());

        try {
            // await newUser.validate();
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