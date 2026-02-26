import React from 'react';
import { MapPin, CloudSun } from 'lucide-react';
import { useLocationWeather } from '../../hooks/useLocationWeather'; // Import the new hook

const Header = () => {
  // Pull the live data from our hook
  const { locationName, temperature, weatherDesc } = useLocationWeather();

  return (
    <div className="bg-white p-4 md:px-10 md:py-6 flex justify-between items-center shadow-sm z-10 relative">
      <div className="flex items-center gap-3 text-green-700">
        <div className="bg-green-100 p-2 rounded-full hidden md:block"><MapPin size={24} /></div>
        <MapPin size={20} className="md:hidden" />
        <div>
          <h1 className="font-bold text-lg md:text-xl leading-tight text-gray-800">{locationName}</h1>
          <p className="text-xs md:text-sm text-green-600 font-medium">Current Location</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
        <CloudSun className="text-blue-500" size={28} />
        <div className="flex flex-col">
          <span className="text-sm md:text-lg font-bold text-blue-900 leading-tight">{temperature}°C</span>
          <span className="text-[10px] md:text-xs text-blue-700 font-semibold">{weatherDesc}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;