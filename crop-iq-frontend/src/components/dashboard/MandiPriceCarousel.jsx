import React, { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

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
    if (name.includes('wheat') || name.includes('kanak')) return t.crops.wheat;
    if (name.includes('tomato')) return t.crops.tomato;
    if (name.includes('banana')) return t.crops.banana;
    if (name.includes('cucumbar') || name.includes('kheera')) return t.crops.cucumber;
    if (name.includes('pea')) return t.crops.peas;
    if (name.includes('chilli')) return t.crops.chilli;
<<<<<<< HEAD
=======
    if (name.includes('onion')) return t.crops.onion;
    if (name.includes('papaya')) return t.crops.papaya;
>>>>>>> main
    return cropName; 
  };

  return (
    <div className="mt-8 px-8 max-w-7xl mx-auto transition-colors duration-300">
      <h3 className="text-xl font-black text-[var(--text-main)] mb-6">{t?.mandiTitle}</h3>
      
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-[var(--nav-green)]" size={40}/>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prices.map((item) => (
<<<<<<< HEAD
            <div 
              key={item.id} 
              className="bg-[var(--bg-card)] p-6 rounded-[32px] shadow-lg border border-white/10 hover:border-[var(--nav-green)]/50 transition-all"
            >
              <h4 className="font-bold text-[var(--text-main)] text-lg uppercase tracking-tight">
               {translateCrop(item.crop)}
              </h4>
  
               {/* Changed opacity to var(--text-muted) for visibility */}
               <div className="flex items-center text-xs text-[var(--text-muted)] mt-1 font-bold">
                <MapPin size={12} className="mr-1" /> {item.market}
               </div>
  
               <div className="mt-6 flex items-end justify-between">
                <span className="text-2xl font-black text-[var(--text-main)]">
                 ₹{item.price}<span className="text-sm text-[var(--text-muted)] font-medium">/q</span>
                </span>
    
                <span className="text-[10px] font-black text-[var(--nav-green)] bg-[var(--nav-green)]/10 px-2 py-1 rounded-md border border-[var(--nav-green)]/30">
                 LIVE
                </span>
=======
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border-l-4 border-green-500 hover:shadow-lg transition-all">
              <h4 className="font-bold text-gray-900 text-lg uppercase">{translateCrop(item.crop)}</h4>
              <div className="flex items-center text-xs text-gray-400 mt-1"><MapPin size={12} className="mr-1" /> {item.market}</div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-2xl font-black text-gray-900">{item.price}</span>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">LIVE</span>
>>>>>>> main
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MandiPriceCarousel;