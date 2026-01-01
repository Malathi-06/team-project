const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   GET /api/categories
// @route   POST /api/categories
router.route("/").get(getCategories).post(protect, admin, createCategory);

// @route   GET /api/categories/:id
// @route   PUT /api/categories/:id
// @route   DELETE /api/categories/:id
router.route("/:id").get(getCategoryById).put(protect, admin, updateCategory).delete(protect, admin, deleteCategory);

module.exports = router;
