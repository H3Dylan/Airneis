const userModel = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLoginController = async (request, response) => {
    try {
        const user = await userModel.findOne({ email: request.body.email });

        if (!user) {
            return response.status(401).json({
                success: false,
                error: true,
                message: 'Bad credentials: user not found'
            });
        }

        const passwordMatch = await bcrypt.compare(request.body.password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({
                success: false,
                error: true,
                message: 'Bad credentials: incorrect password'
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3d' }
        );

        response.status(200).json({
            success: true,
            error: false,
            message: 'User successfully logged in!',
            token: token
        });
        
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: true,
            message: 'An error occurred while logging in.'
        });
    }
};

module.exports = userLoginController;
