const SeedApplication = require('../models/SeedApplication');
const User = require('../models/User');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check admin role
exports.checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apply for seeds
exports.applyForSeeds = async (req, res) => {
  try {
    const { seedType, quantity, landArea, cropSeason } = req.body;

    if (!seedType || !quantity || !landArea || !cropSeason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const application = new SeedApplication({
      userId: req.userId,
      seedType,
      quantity,
      landArea,
      cropSeason
    });

    await application.save();
    await application.populate('userId', 'name email');

    res.status(201).json({
      message: 'Seed application submitted successfully',
      application
    });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's applications
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await SeedApplication.find({ userId: req.userId })
      .populate('userId', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await SeedApplication.find()
      .populate('userId', 'name email phone address')
      .populate('approvedBy', 'name email')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update application status (admin only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, remarks } = req.body;

    if (!['pending', 'approved', 'rejected', 'distributed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await SeedApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    if (remarks) application.remarks = remarks;
    if (status === 'approved' || status === 'rejected') {
      application.approvedBy = req.userId;
      application.approvedAt = new Date();
    }

    await application.save();
    await application.populate('userId', 'name email');
    await application.populate('approvedBy', 'name email');

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

