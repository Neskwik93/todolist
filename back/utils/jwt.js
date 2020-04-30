const jwt = require('jsonwebtoken');
const security = require('./../config/security');

const createAccessToken = userId => {
    return jwt.sign({ userId }, security.JWT_SECRET);
}

module.exports = {
    createAccessToken
}