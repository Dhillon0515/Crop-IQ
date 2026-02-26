import React from 'react';

const CategoryGrid = () => {
  const categories = ['🌾 Wheat', '🍚 Paddy', '🌽 Maize', '🌱 Cotton'];

  return (
    <div className="p-4 mt-2">
      <h2 className="text-lg font-bold mb-4 text-gray-800">Quick Explore</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        {categories.map((crop, index) => (
          <div key={index} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:bg-green-100 group-hover:shadow-md transition-all">
              {crop.split(' ')[0]} 
            </div>
            <span className="text-xs font-semibold text-gray-700">{crop.split(' ')[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;