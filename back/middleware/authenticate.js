const jwt = require('jsonwebtoken');
const security = require('../config/security');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    var typeUser = "";
    if (token) {
        try {
            var decode = jwt.verify(token, security.JWT_SECRET);
            var user_id = decode.user_id;
            
        } catch (e) {
            res.status(401).send({error: true});
        }
    } else {
        res.status(401).send({error: true});
    }
};


module.exports = { authenticate };
