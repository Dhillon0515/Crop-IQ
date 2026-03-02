import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Mic, Bell, User, Leaf } from 'lucide-react';

const Sidebar = () => {
  // Logic to handle both Day and Night mode styling dynamically
  const navClass = ({ isActive }) => 
    `flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
      isActive 
        ? 'bg-[var(--nav-green)] text-white font-bold shadow-md' // Active: uses our brand green variable
        : 'text-[var(--text-main)] opacity-70 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800' // Inactive: uses variable text color
    }`;

  return (
    /* Change: bg-[var(--bg-card)] for the background and border-[var(--bg-main)] for the divider */
    <div className="hidden md:flex flex-col w-64 bg-[var(--bg-card)] border-r border-[var(--bg-main)] h-screen p-4 sticky top-0 shadow-sm z-20 transition-colors duration-300">
      
      {/* Brand Logo - Uses var(--nav-green) for the leaf and text */}
      <div className="flex items-center gap-2 px-4 py-6 mb-6">
        <Leaf className="text-[var(--nav-green)]" size={32} />
        <h1 className="text-2xl font-black text-[var(--nav-green)] tracking-tight">Crop IQ</h1>
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

      {/* Optional: Visual indicator for Dark Mode at the bottom */}
      <div className="mt-auto p-4 opacity-50 text-[10px] text-[var(--text-main)] uppercase tracking-widest text-center">
        GNDEC Project
      </div>
    </div>
  );
};

export default Sidebar;