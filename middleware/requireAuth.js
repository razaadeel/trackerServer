const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'you must be logged in' });
    }

    const token = authorization;    
    try {
        //Extracting userId from token
        const { userId } = jwt.verify(token, 'MySecretKey');
        const user = await User.findById(userId);

        //Sending user in req
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ error: 'You must be logged in' });
    }

}