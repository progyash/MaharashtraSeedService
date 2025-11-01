const mongoose = require('mongoose');

const seedApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seedType: {
    type: String,
    required: [true, 'Seed type is required'],
    enum: ['wheat', 'rice', 'cotton', 'soybean', 'sugarcane', 'maize', 'other']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1
  },
  landArea: {
    type: Number,
    required: [true, 'Land area is required'],
    min: 0.1
  },
  cropSeason: {
    type: String,
    required: [true, 'Crop season is required'],
    enum: ['kharif', 'rabi', 'zaid']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'distributed'],
    default: 'pending'
  },
  remarks: {
    type: String,
    default: ''
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('SeedApplication', seedApplicationSchema);

