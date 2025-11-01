const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const seedController = require('../controllers/seedController');
const { body } = require('express-validator');

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Aadhar number must be 12 digits'),
    body('address.district').notEmpty().withMessage('District is required'),
    body('address.taluka').notEmpty().withMessage('Taluka is required'),
    body('address.village').notEmpty().withMessage('Village is required'),
    body('address.pincode').notEmpty().withMessage('Pincode is required')
  ],
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  authController.login
);

// Get profile (protected)
router.get('/profile', seedController.verifyToken, authController.getProfile);

module.exports = router;

