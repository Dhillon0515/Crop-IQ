import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, MapPin, Loader2 } from 'lucide-react';

const MandiPriceCarousel = () => {
  // 1. Set up state to hold our real data and a loading spinner
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch the data from our Node.js backend when the component loads
  useEffect(() => {
    const fetchRealPrices = async () => {
      try {
        // Calling your local backend server
        const response = await fetch('http://localhost:5000/api/prices');
        const data = await response.json();
        
        // Save the real data to state
        setPrices(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch live prices:", error);
        setIsLoading(false);
      }
    };

    fetchRealPrices();
  }, []); // The empty array means this only runs once when the page loads

  // Helper function to pick the right emoji based on the real crop name
  const getCropEmoji = (cropName) => {
    const name = cropName.toLowerCase();
    if (name.includes('wheat')) return '🌾';
    if (name.includes('paddy') || name.includes('rice')) return '🍚';
    if (name.includes('mustard')) return '🌼';
    if (name.includes('maize')) return '🌽';
    if (name.includes('cotton')) return '☁️';
    if (name.includes('potato')) return '🥔';
    return '🌱'; // Default emoji
  };

  return (
    <div className="mt-4 pl-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center pr-4 md:pr-0 mb-4">
        <h3 className="text-lg md:text-2xl font-bold text-gray-800">Live Punjab Mandi Rates</h3>
        <span className="text-xs md:text-sm text-green-600 font-bold cursor-pointer hover:bg-green-50 px-3 py-1 rounded-full transition-colors">See All</span>
      </div>
      
      {/* Show a loading spinner while waiting for the government API */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-green-600" size={32} />
          <span className="ml-3 text-gray-500 font-medium">Fetching live rates from Agmarknet...</span>
        </div>
      ) : prices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No prices available right now.</div>
      ) : (
        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 pr-4 md:pr-0 scrollbar-hide">
          {prices.map((item) => (
            <div key={item.id} className="min-w-[160px] md:min-w-0 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0 hover:shadow-md hover:border-green-200 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-full flex items-center justify-center text-xl md:text-2xl shadow-sm">
                  {getCropEmoji(item.crop)}
                </div>
                {item.trend === 'up' ? <TrendingUp size={20} className="text-green-500" /> : <TrendingDown size={20} className="text-red-500" />}
              </div>
              
              <h4 className="font-bold text-gray-800 text-sm md:text-lg mt-2 capitalize">{item.crop.toLowerCase()}</h4>
              <div className="flex items-center text-[10px] md:text-sm text-gray-500 mt-1 mb-3 font-medium">
                <MapPin size={12} className="mr-1" />
                <span className="truncate">{item.market}</span>
              </div>
              
              <div className="flex items-end justify-between mt-auto">
                <span className="font-black text-gray-900 md:text-xl">{item.price}</span>
                <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-md ${item.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{item.change}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MandiPriceCarousel;