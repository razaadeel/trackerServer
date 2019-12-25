const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'MySecretKey');

        res.send({ token });
    } catch (err) {
        res.status(422).send(err.message);
    }

})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    //Check for email and password provided or not
    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' });
    }

    try {
        //Finding user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Invalid Email/password' });
        }

        //Comparing password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid Email/Password' })
        }

        const token = jwt.sign({ userId: user._id }, 'MySecretKey');
        res.send({ token });

    } catch (err) {

    }
})

module.exports = router;