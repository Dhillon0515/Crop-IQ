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
        console.error("Fetch error:", error);
        setIsLoading(false);
      }
    };
    fetchPrices();
  }, []);

  const translateCrop = (cropName) => {
    if (!cropName || !t?.crops) return cropName || "";
    const name = cropName.toLowerCase();
    
    if (name.includes('wheat') || name.includes('kanak')) return t.crops.wheat || "Wheat";
    if (name.includes('paddy') || name.includes('rice') || name.includes('jhona')) return t.crops.paddy || "Paddy";
    if (name.includes('cotton') || name.includes('narma')) return t.crops.cotton || "Cotton";
    if (name.includes('maize') || name.includes('makki')) return t.crops.maize || "Maize";
    if (name.includes('mustard') || name.includes('sarson')) return t.crops.mustard || "Mustard";
    
    return cropName;
  };

  return (
    <div className="mt-4 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-gray-800 tracking-tight">{t?.mandiTitle}</h3>
        <span className="text-sm text-green-600 font-bold cursor-pointer hover:underline">{t?.seeAll}</span>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-green-600 font-bold">
          <Loader2 className="animate-spin mr-2"/> {t?.loading}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border-l-4 border-green-500 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-lg uppercase tracking-tight">{translateCrop(item.crop)}</h4>
                <div className="bg-green-100 p-1 rounded-full"><TrendingUp size={14} className="text-green-600" /></div>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-1 font-medium">
                <MapPin size={12} className="mr-1 text-orange-400" /> {item.market}
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900">{item.price}</span>
                  <span className="text-[10px] text-gray-400 font-bold">Per Quintal</span>
                </div>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase">Live</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MandiPriceCarousel;