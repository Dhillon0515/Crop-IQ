const mongoose = require('mongoose');

// This schema perfectly matches the mock data we used on your React frontend!
const mandiPriceSchema = new mongoose.Schema({
  crop: { 
    type: String, 
    required: true 
  },
  market: { 
    type: String, 
    required: true 
  },
  price: { 
    type: String, 
    required: true 
  }, // e.g., '₹2,275/q'
  trend: { 
    type: String, 
    enum: ['up', 'down'], // It can ONLY be 'up' or 'down'
    required: true 
  },
  change: { 
    type: String, 
    required: true 
  } // e.g., '+₹15'
}, { 
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' dates
});

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);