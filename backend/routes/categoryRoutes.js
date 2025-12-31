const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

// @route   GET /api/categories
// @route   POST /api/categories
router.route("/").get(getCategories).post(createCategory);

// @route   GET /api/categories/:id
// @route   PUT /api/categories/:id
// @route   DELETE /api/categories/:id
router.route("/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

module.exports = router;
