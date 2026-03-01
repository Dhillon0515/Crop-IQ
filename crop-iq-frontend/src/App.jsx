import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MandiPriceCarousel from './components/dashboard/MandiPriceCarousel';
import PlantDoctor from './components/PlantDoctor';
import VoiceAssistant from './components/VoiceAssistant';
import ThemeToggle from './components/layout/ThemeToggle';
import { translations } from './translations';
import { useAgroVoice } from './hooks/useAgroVoice';
import { CloudSun, MapPin, Droplets, Wind, Sprout, Leaf, ThermometerSun } from 'lucide-react';

function App() {
  const [lang, setLang] = useState('en'); 
  const [activePage, setActivePage] = useState('home'); 
  const t = translations[lang] || translations['en']; 

  const { isListening, aiResponse, transcript, startListening, stopListening } = useAgroVoice(lang, t);

  // --- LIVE WEATHER STATE ---
  const [weather, setWeather] = useState({
    temp: 24, humidity: 42, wind: 12, city: 'Ludhiana',
    conditionEn: 'Clear Sky', conditionPa: 'ਸਾਫ਼ ਮੌਸਮ', iconCode: '01d'
  });

  // NOTE: Keep your existing useEffect weather fetching logic here as per your original file

  return (
    <div className="flex min-h-screen bg-[var(--bg-body)] transition-colors duration-300">
      <Sidebar lang={lang} t={t} activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 ml-64 pb-24">
        {/* Top Navigation */}
        <nav className="p-4 px-8 flex justify-end items-center sticky top-0 z-30 bg-[var(--bg-body)]/80 backdrop-blur-md gap-4">
          <ThemeToggle />
          <button 
            onClick={() => setLang(lang === 'en' ? 'pa' : 'en')}
            className="bg-[var(--bg-card)] text-[var(--nav-green)] px-6 py-2 rounded-xl font-bold border border-[var(--nav-green)]/20 transition-all hover:bg-[var(--nav-green)] hover:text-white"
          >
            {lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
          </button>
        </nav>

        {activePage === 'home' ? (
          <div className="px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            <header className="py-8">
              <h1 className="text-4xl font-black text-[var(--text-main)] tracking-tight">{t?.greeting}</h1>
              <p className="text-[var(--text-main)] opacity-60 font-bold mt-2">
                {lang === 'en' ? 'Here is your farm overview for today.' : 'ਅੱਜ ਲਈ ਤੁਹਾਡੇ ਖੇਤ ਦੀ ਜਾਣਕਾਰੀ।'}
              </p>
            </header>

            {/* Weather & Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Weather Card */}
              <div className="lg:col-span-2 bg-[var(--weather-card)] rounded-[32px] p-8 text-white shadow-xl flex items-center justify-between relative overflow-hidden transition-all duration-500">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-white/80 font-bold mb-3 uppercase tracking-wider text-sm">
                    <MapPin size={16} /> {weather.city}
                  </div>
                  <div className="flex items-end gap-4">
                    <h2 className="text-7xl font-black tracking-tighter">{weather.temp}°</h2>
                    <p className="text-xl font-bold text-white mb-2 border-l-2 border-white/30 pl-4">
                      {lang === 'en' ? weather.conditionEn : weather.conditionPa}<br/>
                      <span className="text-sm font-medium opacity-70">
                        {lang === 'en' ? 'Live farm conditions.' : 'ਖੇਤ ਦੇ ਲਾਈਵ ਹਾਲਾਤ।'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-64 h-64 bg-[var(--nav-green)]/10 rounded-full blur-3xl dark:block hidden"></div>
                <img 
                  src={`https://openweathermap.org/img/wn/${weather.iconCode}@4x.png`} 
                  alt="weather icon" 
                  className="w-32 h-32 relative z-10 drop-shadow-2xl"
                />
              </div>

              {/* HIGH-VISIBILITY ENVIRONMENT STATS */}
              <div className="grid grid-rows-2 gap-4">
                {/* Humidity Card */}
                <div className="bg-[var(--bg-card)] rounded-[32px] p-6 border border-white/10 shadow-lg flex items-center gap-5 hover:border-cyan-500/50 transition-all group">
                  <div className="bg-cyan-500/10 dark:bg-cyan-500/20 p-4 rounded-2xl text-cyan-500 shadow-inner group-hover:scale-110 transition-transform">
                    <Droplets size={28} className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Humidity</p>
                    <p className="text-2xl font-black text-[var(--text-main)] flex items-baseline gap-1">
                      {weather.humidity}<span className="text-sm font-bold text-[var(--text-muted)]">%</span>
                    </p>
                  </div>
                </div>

                {/* Wind Speed Card */}
                <div className="bg-[var(--bg-card)] rounded-[32px] p-6 border border-white/10 shadow-lg flex items-center gap-5 hover:border-teal-500/50 transition-all group">
                  <div className="bg-teal-500/10 dark:bg-teal-500/20 p-4 rounded-2xl text-teal-500 shadow-inner group-hover:scale-110 transition-transform">
                    <Wind size={28} className="drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Wind Speed</p>
                    <p className="text-2xl font-black text-[var(--text-main)] flex items-baseline gap-1">
                      {weather.wind}<span className="text-sm font-bold text-[var(--text-muted)]">km/h</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Monitored Crops Section */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-[var(--text-main)] mb-6 flex items-center gap-2">
                <Leaf className="text-[var(--nav-green)] shadow-sm" /> 
                {lang === 'en' ? 'Monitored Crops' : 'ਨਿਗਰਾਨੀ ਹੇਠ ਫ਼ਸਲਾਂ'}
              </h3>
  
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: t?.cropsList?.wheat, varieties: 'PBW 824\nUnnat 343', icon: <Sprout size={32}/>, color: 'amber' },
                  { name: t?.cropsList?.cotton, varieties: 'RCH 650', icon: <CloudSun size={32}/>, color: 'emerald' },
                  { name: t?.cropsList?.tomato, varieties: 'Punjab Ratta', icon: <ThermometerSun size={32}/>, color: 'red' },
                  { name: t?.cropsList?.potato, varieties: 'Kufri Pukhraj', icon: <Leaf size={32}/>, color: 'orange' }
                ].map((crop, i) => (
                  <div 
                    key={i}
                    onClick={() => setActivePage('doctor')} 
                    className="bg-[var(--bg-card)] p-6 rounded-[32px] shadow-lg border border-white/10 flex flex-col items-center justify-center hover:scale-105 hover:border-[var(--nav-green)]/40 transition-all cursor-pointer group"
                  >
                    <div className={`bg-${crop.color}-500/10 dark:bg-white/5 group-hover:bg-${crop.color}-500/20 p-4 rounded-2xl mb-4 transition-all duration-300 shadow-inner`}>
                      <span className={`text-${crop.color}-500 dark:text-${crop.color}-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]`}>
                        {crop.icon}
                      </span>
                    </div>
                    <h4 className="font-black text-[var(--text-main)] text-lg">{crop.name}</h4>
                    <p className="text-[11px] font-bold text-[var(--text-muted)] mt-2 text-center whitespace-pre-line leading-relaxed">
                      {crop.varieties}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandi Rates */}
            <MandiPriceCarousel lang={lang} t={t} />
          </div>
        ) : (
          /* Plant Doctor */
          <PlantDoctor lang={lang} t={t} voiceTranscript={transcript} />
        )}
      </main>
      
      <VoiceAssistant lang={lang} t={t} isListening={isListening} aiResponse={aiResponse} startListening={startListening} stopListening={stopListening} />
    </div>
  );
}

export default App;