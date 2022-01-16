const Order = require("../models/OrderModel");
const asyncHandler = require("express-async-handler");
const uid = require("short-unique-id");

exports.placeOrder = asyncHandler(async (req, res) => {
  const { orderItem, shippingAddress, city, pincode } = req.body;
  if (!orderItem || !shippingAddress || !city || !pincode) {
    res.status(400);
    throw new Error("Order not placed");
    return;
  } else {
    const uniqueId = new uid({ length: 10 });
    const order = await Order.create({
      user: req.user._id,
      orderItem,
      orderId: uniqueId,
      shippingAddress,
      city,
      pincode,
    });

    res.status(201).json(order);
  }
});

exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No order found");
  }
});
