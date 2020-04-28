const router = require('express').Router();

router.use('/users', require('./userRouter'));

module.exports = router;