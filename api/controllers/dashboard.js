const Account = require("../models/User")

exports.getDashboard = (req, res) => {
    const user = Account.findOne({user : req.username});
    res.render("manage/dashboard", {user:user});
}