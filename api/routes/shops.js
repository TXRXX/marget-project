const express = require("express");
const router = express.Router();
const controllers = require("../controllers/shops");

router.post("/shop/create", controllers.createShop);
router.delete("/shop/delete/:shopId", controllers.deleteShop);
router.get("/shop/approved", controllers.getApprovedShops);
router.get("/shop/unapproved", controllers.getUnapprovedShops);
router.get("/shop/:shopId", controllers.getShop);
router.get("/shop/user/:userId", controllers.getUserShops);
router.put("/shop/update/:shopId", controllers.updateShop);
router.get("/shop/admin/all", controllers.getAllShops);

module.exports = router;
