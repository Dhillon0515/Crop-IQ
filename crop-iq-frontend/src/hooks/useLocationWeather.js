import { useState, useEffect } from 'react';

export const useLocationWeather = () => {
  const [locationName, setLocationName] = useState('Locating...');
  const [temperature, setTemperature] = useState('--');
  const [weatherDesc, setWeatherDesc] = useState('...');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLocationName('Ludhiana, Punjab'); // Safe fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 1. Get City Name (Reverse Geocoding via OpenStreetMap)
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const geoData = await geoRes.json();
          
          const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || 'Your Farm';
          const state = geoData.address.state || '';
          setLocationName(`${city}, ${state}`);

          // 2. Get Live Weather (via Open-Meteo)
          const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
          const weatherData = await weatherRes.json();
          setTemperature(Math.round(weatherData.current_weather.temperature));

          // Basic WMO Weather Code Translation
          const code = weatherData.current_weather.weathercode;
          let desc = "Clear";
          if (code > 0 && code <= 3) desc = "Partly Cloudy";
          if (code >= 45 && code <= 48) desc = "Foggy";
          if (code >= 51 && code <= 67) desc = "Rainy";
          if (code >= 95) desc = "Thunderstorm";
          setWeatherDesc(desc);

        } catch (err) {
          console.error("API Fetch Error:", err);
          setError('Failed to fetch data');
          setLocationName('Ludhiana, Punjab'); // Fallback
          setTemperature('28');
        }
      },
      (err) => {
        console.error("Location Error:", err);
        setError('Location Access Denied');
        setLocationName('Ludhiana, Punjab'); // Fallback if user clicks "Block"
      }
    );
  }, []);

  return { locationName, temperature, weatherDesc, error };
};