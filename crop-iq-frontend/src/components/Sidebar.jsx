import React from 'react';
import { Home, Leaf } from 'lucide-react';

const Sidebar = ({ lang, activePage, setActivePage }) => {
  // Cleaned up navigation items (Removed Weather & Mandi)
  const navItems = [
    { id: 'home', icon: Home, labelEn: 'Dashboard', labelPa: 'ਡੈਸ਼ਬੋਰਡ' },
    { id: 'doctor', icon: Leaf, labelEn: 'Plant Doctor', labelPa: 'ਫ਼ਸਲ ਡਾਕਟਰ' },
  ];

  return (
    <aside className="w-64 bg-white shadow-2xl h-screen fixed top-0 left-0 border-r border-green-50 flex flex-col z-40">
      
      {/* Project Logo/Branding */}
      <div className="p-8">
        <h1 className="text-3xl font-black text-green-700 tracking-tighter">
          Crop IQ <span className="text-green-400">.</span>
        </h1>
        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
          GNDEC Project
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 mt-4 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all duration-300 ${
                isActive 
                  ? 'bg-green-600 text-white shadow-xl shadow-green-100 translate-x-1' 
                  : 'text-gray-400 hover:bg-green-50 hover:text-green-700'
              }`}
            >
              <Icon size={22} className={isActive ? 'animate-bounce' : ''} />
              <span className="text-lg">
                {lang === 'en' ? item.labelEn : item.labelPa}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;