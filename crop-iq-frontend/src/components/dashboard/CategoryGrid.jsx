import React from 'react';

const CategoryGrid = () => {
  const categories = [
    { emoji: '🌾', name: 'Wheat' },
    { emoji: '🍚', name: 'Paddy' },
    { emoji: '🌽', name: 'Maize' },
    { emoji: '🌱', name: 'Cotton' }
  ];

  return (
    <div className="p-4 mt-2 transition-colors duration-300">
      {/* Uses var(--text-main) to switch from Dark Gray to White */}
      <h2 className="text-lg font-bold mb-6 text-[var(--text-main)]">Quick Explore</h2>
      
      <div className="grid grid-cols-4 gap-6 text-center">
        {categories.map((crop, index) => (
          <div key={index} className="flex flex-col items-center gap-3 cursor-pointer group">
            
            {/* The Icon Box */}
            <div className="w-16 h-16 bg-[var(--bg-card)] border border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm 
              group-hover:scale-110 group-hover:border-[var(--nav-green)] group-hover:shadow-lg transition-all duration-300">
              {crop.emoji}
            </div>

            {/* The Text Label */}
            <span className="text-sm font-semibold text-[var(--text-main)] opacity-80 group-hover:text-[var(--nav-green)] group-hover:opacity-100">
              {crop.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;