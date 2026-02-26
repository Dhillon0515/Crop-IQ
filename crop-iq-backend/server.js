const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/prices', async (req, res) => {
  const backupData = [
    { id: 1, crop: 'Wheat', market: 'Khanna Mandi', price: '₹2,275/q' },
    { id: 2, crop: 'Paddy', market: 'Jagraon Mandi', price: '₹2,203/q' },
    { id: 3, crop: 'Mustard', market: 'Ludhiana City', price: '₹5,400/q' },
    { id: 4, crop: 'Cotton', market: 'Bathinda Mandi', price: '₹7,100/q' }
  ];

  try {
    const apiKey = process.env.AGMARKNET_API_KEY;
    const resourceId = '9ef84268-d588-465a-a308-a864a43d0070';
    const apiUrl = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=500`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data?.records?.length > 0) {
      const punjabRecords = data.records.filter(r => r.state?.trim().toLowerCase() === 'punjab');
      if (punjabRecords.length > 0) {
        return res.json(punjabRecords.slice(0, 8).map((r, i) => ({
          id: i, crop: r.commodity, market: r.market, price: `₹${r.modal_price}/q`
        })));
      }
    }
    res.json(backupData);
  } catch (err) {
    res.json(backupData);
  }
});

app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));