const express = require("express");
const router = express.Router();

const {
  getOneProduct,
  getProducts,
} = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/products/:id", getOneProduct);

module.exports = router;
