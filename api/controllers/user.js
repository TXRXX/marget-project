const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            };
            const currentUser = await User.findOne({ _id: user.id });
            const { password, ...others } = currentUser._doc;
            res.status(200).json(others);
        });
    } catch (error) {
        res.status(500).json(error);
    }
};
