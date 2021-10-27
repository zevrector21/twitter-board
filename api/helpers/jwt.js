const expressJwt = require('express-jwt');
const config = require('../config/config');
const userController = require('../users/user.controller');

module.exports = jwt;

function jwt() {
    const secret = config.jwtSecret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userController.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};