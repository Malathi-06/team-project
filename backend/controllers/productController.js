const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, category, minPrice, maxPrice, sort } = req.query;

        // Build query
        const query = { isActive: true };

        // Search by name or description
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sort options
        let sortOption = {};
        if (sort === "price-asc") sortOption.price = 1;
        else if (sort === "price-desc") sortOption.price = -1;
        else if (sort === "rating") sortOption.rating = -1;
        else if (sort === "newest") sortOption.createdAt = -1;
        else sortOption.createdAt = -1; // default

        // Execute query with pagination
        const products = await Product.find(query)
            .populate("category", "name")
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // Get total count for pagination
        const count = await Product.countDocuments(query);

        res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            totalProducts: count,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name description");

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        // Validate required fields
        if (!name || !description || !price || !category) {
            res.status(400);
            throw new Error("Please provide all required fields");
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock: stock || 0,
            images: images || [],
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ).populate("category", "name");

        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
