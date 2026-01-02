const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.role === "admin",
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        isAdmin: updatedUser.role === "admin",
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  getUsers,
  deleteUser,
};
