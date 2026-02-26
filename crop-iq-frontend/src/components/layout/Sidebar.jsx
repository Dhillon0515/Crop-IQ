import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Mic, Bell, User, Leaf } from 'lucide-react';

const Sidebar = () => {
  const navClass = ({ isActive }) => 
    `flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
      isActive ? 'bg-green-50 text-green-700 font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
    }`;

  return (
    // "hidden md:flex" means this entirely disappears on mobile phones, but shows as a column on desktops
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 h-screen p-4 sticky top-0 shadow-sm z-20">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-2 px-4 py-6 mb-6">
        <Leaf className="text-green-600" size={32} />
        <h1 className="text-2xl font-black text-green-800 tracking-tight">Crop IQ</h1>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={navClass}>
          <Home size={24} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/voice" className={navClass}>
          <Mic size={24} />
          <span>AgroVoice AI</span>
        </NavLink>
        <NavLink to="/alerts" className={navClass}>
          <Bell size={24} />
          <span>Weather Alerts</span>
        </NavLink>
        <NavLink to="/profile" className={navClass}>
          <User size={24} />
          <span>My Farm Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;