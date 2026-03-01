import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Loader2 } from 'lucide-react';

const MandiPriceCarousel = ({ lang, t }) => {
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/prices');
        const data = await response.json();
        setPrices(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchPrices();
  }, []);

  const translateCrop = (cropName) => {
    if (!cropName || !t?.crops) return cropName || "";
    const name = cropName.toLowerCase();
    
    // Fuzzy Matching Logic
    if (name.includes('wheat') || name.includes('kanak')) return t.crops.wheat;
    if (name.includes('tomato')) return t.crops.tomato;
    if (name.includes('banana')) return t.crops.banana;
    if (name.includes('cucumbar') || name.includes('kheera')) return t.crops.cucumber;
    if (name.includes('pea')) return t.crops.peas;
    if (name.includes('chilli')) return t.crops.chilli;
    if (name.includes('onion')) return t.crops.onion;
    if (name.includes('papaya')) return t.crops.papaya;
    return cropName; 
  };

  return (
    <div className="mt-4 px-8 max-w-7xl mx-auto">
      <h3 className="text-xl font-black text-gray-800 mb-6">{t?.mandiTitle}</h3>
      {isLoading ? (
        <Loader2 className="animate-spin text-green-600 mx-auto" size={40}/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border-l-4 border-green-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-lg uppercase">{translateCrop(item.crop)}</h4>
              <div className="flex items-center text-xs text-gray-400 mt-1"><MapPin size={12} className="mr-1" /> {item.market}</div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-2xl font-black text-gray-900">{item.price}</span>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">LIVE</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MandiPriceCarousel;