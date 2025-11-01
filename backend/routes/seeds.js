const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');
const { body } = require('express-validator');

// Apply for seeds (protected)
router.post(
  '/apply',
  seedController.verifyToken,
  [
    body('seedType').notEmpty().withMessage('Seed type is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('landArea').isFloat({ min: 0.1 }).withMessage('Land area must be at least 0.1 acres'),
    body('cropSeason').notEmpty().withMessage('Crop season is required')
  ],
  seedController.applyForSeeds
);

// Get my applications (protected)
router.get('/my-applications', seedController.verifyToken, seedController.getMyApplications);

// Get all applications (admin only)
router.get('/all', seedController.verifyToken, seedController.checkAdmin, seedController.getAllApplications);

// Update application status (admin only)
router.patch(
  '/:applicationId/status',
  seedController.verifyToken,
  seedController.checkAdmin,
  [
    body('status').isIn(['pending', 'approved', 'rejected', 'distributed']).withMessage('Invalid status')
  ],
  seedController.updateApplicationStatus
);

module.exports = router;

