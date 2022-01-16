const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/authenicate");
const { placeOrder, getMyOrders } = require("../controllers/orderController");

router.post("/order", isAuthenticated, placeOrder);

router.get("/order/myorder", isAuthenticated, getMyOrders);

module.exports = router;
