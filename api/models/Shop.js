const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    categories: [
        { type: String }
    ],
    isApproved: { type: Boolean, default: false },
    userId: { type: String, required: true },
    imageUrl: { type: String },
    status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model("Shop", ShopSchema);
