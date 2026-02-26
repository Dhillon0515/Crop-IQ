import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    // Notice we removed "max-w-md mx-auto" so it can stretch to full screen
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans overflow-hidden selection:bg-green-200">
      
      {/* Desktop Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      {/* md:pb-0 removes the extra padding at the bottom on desktop since there's no bottom nav */}
      <div className="flex-1 h-screen overflow-y-auto pb-20 md:pb-0">
        <Outlet /> 
      </div>
      
      {/* Mobile Bottom Navigation - Added md:hidden so it disappears on desktop */}
      <div className="md:hidden">
        <BottomNavigation />
      </div>
      
    </div>
  );
};

export default MainLayout;