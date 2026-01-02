const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   GET /api/products
// @route   POST /api/products
router.route("/").get(getProducts).post(protect, admin, createProduct);

// @route   GET /api/products/:id
// @route   PUT /api/products/:id
// @route   DELETE /api/products/:id
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
