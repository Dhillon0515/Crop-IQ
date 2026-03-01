import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    /* Change 1: bg-[var(--bg-main)] ensures the whole screen background 
       switches from Light Gray to Deep Navy. 
       Change 2: Added transition-colors for a smooth fade effect.
    */
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col md:flex-row font-sans overflow-hidden selection:bg-green-200 transition-colors duration-300">
      
      {/* Desktop Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      {/* Change 3: Added 'text-[var(--text-main)]' so any loose text inside 
         the layout (like loading spinners or footers) inherits the right color.
      */ }
      <div className="flex-1 h-screen overflow-y-auto pb-20 md:pb-0 text-[var(--text-main)]">
        <Outlet /> 
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
      
    </div>
  );
};

export default MainLayout;