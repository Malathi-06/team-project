const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getMe).put(protect, updateUserProfile);

module.exports = router;
