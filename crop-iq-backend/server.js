const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// GET: Fetch LIVE Mandi Prices from Government API (with manual Punjab filter & fallback)
app.get('/api/prices', async (req, res) => {
  // 1. The Fallback Data (Guaranteed to show if the API fails or has no Punjab data today)
  const backupData = [
    { id: 1, crop: 'Wheat', market: 'Khanna Mandi', price: '₹2,275/q', trend: 'up', change: '+₹15' },
    { id: 2, crop: 'Paddy', market: 'Jagraon Mandi', price: '₹2,203/q', trend: 'up', change: '+₹10' },
    { id: 3, crop: 'Mustard', market: 'Ludhiana City', price: '₹5,400/q', trend: 'down', change: '-₹50' },
    { id: 4, crop: 'Maize', market: 'Mullanpur', price: '₹2,090/q', trend: 'up', change: '+₹25' },
    { id: 5, crop: 'Cotton', market: 'Bathinda Mandi', price: '₹7,100/q', trend: 'up', change: '+₹40' }
  ];

  try {
    const apiKey = process.env.AGMARKNET_API_KEY;
    if (!apiKey) {
        console.log("No API Key found in .env file. Sending backup data...");
        return res.json(backupData);
    }

    const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
    
    // 2. Fetch a massive chunk of data (500 records) to ensure we get a good national sample
    const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=500`;
    
    console.log("Fetching live data from government API...");
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Government API is down. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.records && data.records.length > 0) {
      
      // 3. THE MAGIC: Filter for Punjab manually using JavaScript
      const punjabRecords = data.records.filter(
        (record) => record.state && record.state.trim().toLowerCase() === 'punjab'
      );

      if (punjabRecords.length > 0) {
        console.log(`Success! Manually filtered ${punjabRecords.length} Punjab records.`);
        
        // Format and send the top 10 Punjab records to your React frontend
        const livePrices = punjabRecords.slice(0, 10).map((record, index) => ({
          id: index,
          crop: record.commodity,
          market: `${record.market} (${record.state})`, 
          price: `₹${record.modal_price}/q`,
          trend: 'up', 
          change: 'Live'
        }));
        return res.json(livePrices);
      } 
      
      console.log("No Punjab records found in today's live feed. Sending backup data...");
      return res.json(backupData);
      
    } else {
      console.log("Government dataset is entirely empty today. Sending backup data...");
      return res.json(backupData);
    }

  } catch (err) {
    console.error("Fetch crashed. Sending backup data... Error:", err.message);
    return res.json(backupData);
  }
});

// --- DATABASE CONNECTION & SERVER START ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cropiq';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    // Even if local MongoDB fails to connect, we still start the server so the API works!
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without database)`);
    });
  });