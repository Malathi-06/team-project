const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

// @route   GET /api/products
// @route   POST /api/products
router.route("/").get(getProducts).post(createProduct);

// @route   GET /api/products/:id
// @route   PUT /api/products/:id
// @route   DELETE /api/products/:id
router.route("/:id").get(getProductById).put(updateProduct).delete(deleteProduct);

module.exports = router;
