const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");

exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: "No product found" });
  }
});

exports.getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product Not Found" });
  }
});
