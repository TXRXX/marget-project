const Account = require("../models/User");

exports.getIndex = async (req, res ) => {
    const user = await Account.findOne({user : req._id});
    console.log(user)
    res.render("index", {user:user})
}
