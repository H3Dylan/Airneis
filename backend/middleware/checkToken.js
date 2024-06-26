const jwt = require('jsonwebtoken')

const checkToken = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return response.status(403).json({
                        success: false,
                        error: true,
                        message: 'Token expired'
                    });
                } else {
                    return response.status(403).json({
                        success: false,
                        error: true,
                        message: 'Token not valid'
                    });
                }
            }
            request.user = user;
            next();
        });
    } else {
        return response.status(401).json({
            success: false,
            error: true,
            message: 'Authorization header not found'
        });
    }
};

module.exports = checkToken;