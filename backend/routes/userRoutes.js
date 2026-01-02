const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe,
    updateUserProfile,
    getUsers,
    deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.post('/login', loginUser);
router.route('/profile').get(protect, getMe).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
