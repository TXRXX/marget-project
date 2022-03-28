const Shop = require('../models/Shop');

exports.createShop = async (req, res) => {
    const newShop = new Shop({
        name: req.body.name,
        description: req.body.description,
        contact: req.body.contact,
        categories: req.body.categories,
        userId: req.body.userId,
        imageUrl: req.body.imageUrl
    });
    try {
        const savedShop = await newShop.save();
        res.status(200).json(savedShop);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.deleteShop = async (req, res) => {
    try {
        await Shop.findByIdAndDelete(req.params.shopId);
        res.status(200).json("Shop has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getApprovedShops = async (_, res) => {
    try {
        const shops = await Shop.find();
        const approvedShops = shops.filter(shop => shop.isApproved && shop.status === 'Approved');
        res.status(200).json(approvedShops);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUnapprovedShops = async (_, res) => {
    try {
        const shops = await Shop.find();
        const unapprovedShops = shops.filter(shop => !shop.isApproved);
        res.status(200).json(unapprovedShops);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopId);
        if (req.user.id !== shop.userId) {
            return res.status(403).json("You cannot viewing not your own shop!");
        }
        res.status(200).json(shop);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getUserShops = async (req, res) => {
    try {
        const userShops = await Shop.find({ userId: req.params.userId });
        res.status(200).json(userShops);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateShop = async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(
            req.params.shopId,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllShops = async (_, res) => {
    try {
        const shops = await Shop.aggregate([{ $sort: { isApproved: 1 } }]);
        res.status(200).json(shops);
    } catch (error) {
        res.status(500).json(error);
    }
};
