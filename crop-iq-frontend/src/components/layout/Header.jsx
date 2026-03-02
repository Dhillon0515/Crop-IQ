import React from 'react';
import { MapPin, CloudSun } from 'lucide-react';
import { useLocationWeather } from '../../hooks/useLocationWeather';
import ThemeToggle from './ThemeToggle'; // 1. Import the toggle

const Header = () => {
  const { locationName, temperature, weatherDesc } = useLocationWeather();

  return (
    /* Change: Used var(--bg-card) for background and var(--text-main) for text */
    <div className="bg-[var(--bg-card)] p-4 md:px-10 md:py-6 flex justify-between items-center shadow-sm z-10 relative transition-colors duration-300">
      
      {/* Left Section: Location */}
      <div className="flex items-center gap-3 text-[var(--nav-green)]">
        {/* Change: Used dynamic background and icon colors */}
        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full hidden md:block">
          <MapPin size={24} />
        </div>
        <MapPin size={20} className="md:hidden" />
        <div>
          <h1 className="font-bold text-lg md:text-xl leading-tight text-[var(--text-main)]">
            {locationName}
          </h1>
          <p className="text-xs md:text-sm text-[var(--nav-green)] font-medium">
            Current Location
          </p>
        </div>
      </div>

      {/* Right Section: Weather & Theme Toggle */}
      <div className="flex items-center gap-4">
        
        {/* Weather Badge - Adjusted for Dark Mode compatibility */}
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-2xl border border-blue-100 dark:border-blue-800">
          <CloudSun className="text-blue-500 dark:text-blue-300" size={28} />
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-bold text-blue-900 dark:text-blue-100 leading-tight">
              {temperature}°C
            </span>
            <span className="text-[10px] md:text-xs text-blue-700 dark:text-blue-300 font-semibold">
              {weatherDesc}
            </span>
          </div>
        </div>

        {/* 2. Insert the ThemeToggle component here */}
        <ThemeToggle />
        
      </div>
    </div>
  );
};

export default Header;