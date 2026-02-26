import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Mic, Bell, User } from 'lucide-react';

const BottomNavigation = () => {
  const navClass = ({ isActive }) => 
    `flex flex-col items-center cursor-pointer transition-colors ${
      isActive ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
    }`;

  return (
    // Removed max-w-md and added md:hidden just in case
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around p-3 pb-5 z-50 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <NavLink to="/" className={navClass}><Home size={24} /><span className="text-[10px] mt-1 font-semibold">Home</span></NavLink>
      <NavLink to="/voice" className={navClass}><Mic size={24} /><span className="text-[10px] mt-1 font-semibold">AgroVoice</span></NavLink>
      <NavLink to="/alerts" className={navClass}><Bell size={24} /><span className="text-[10px] mt-1 font-semibold">Alerts</span></NavLink>
      <NavLink to="/profile" className={navClass}><User size={24} /><span className="text-[10px] mt-1 font-semibold">Profile</span></NavLink>
    </div>
  );
};

export default BottomNavigation;