const jwt = require('jsonwebtoken');
const security = require('../config/security');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    if (!token) return res.sendStatus(401);
    jwt.verify(token, security.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.userId;
        next();
    });
};


module.exports = { authenticate };
