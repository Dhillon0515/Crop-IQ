import React from 'react';
import { Home, Cloud, BarChart3, User, Sprout, ShieldAlert } from 'lucide-react';

const Sidebar = ({ lang, t, activePage, setActivePage }) => {
  const menuItems = [
    { id: 'home', icon: <Home size={20} />, label: t.sidebar?.home || "Home" },
    { id: 'weather', icon: <Cloud size={20} />, label: t.sidebar?.weather || "Weather" },
    { id: 'mandi', icon: <BarChart3 size={20} />, label: t.sidebar?.mandi || "Mandi" },
    { id: 'doctor', icon: <ShieldAlert size={20} />, label: t.sidebar?.doctor || "Plant Doctor" },
    { id: 'profile', icon: <User size={20} />, label: t.sidebar?.profile || "Profile" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40 shadow-sm">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-black">
          <Sprout size={18} />
        </div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Crop IQ</h1>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold text-sm ${
              activePage === item.id 
              ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' 
              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="p-6 text-[10px] font-black text-gray-300 uppercase tracking-widest text-center">
        GNDEC Ludhiana
      </div>
    </div>
  );
};

export default Sidebar;