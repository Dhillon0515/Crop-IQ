import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MandiPriceCarousel from './components/dashboard/MandiPriceCarousel';
import PlantDoctor from './components/PlantDoctor';
import VoiceAssistant from './components/VoiceAssistant';
import { translations } from './translations';
import { useAgroVoice } from './hooks/useAgroVoice';

function App() {
  const [lang, setLang] = useState('en'); 
  const [activePage, setActivePage] = useState('home'); // Controls Zomato-style navigation
  const t = translations[lang] || translations['en']; // Defensive fallback

  const { isListening, aiResponse, transcript, startListening, stopListening } = useAgroVoice(lang, t);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar lang={lang} t={t} activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 ml-64 pb-24">
        <nav className="p-4 px-8 flex justify-end items-center sticky top-0 z-30 bg-white/80 backdrop-blur-md">
          <button 
            onClick={() => setLang(lang === 'en' ? 'pa' : 'en')}
            className="bg-green-50 text-green-700 px-6 py-2 rounded-xl font-bold border border-green-100"
          >
            {lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
          </button>
        </nav>

        {activePage === 'home' ? (
          <>
            <header className="p-8 px-10 max-w-7xl mx-auto">
              <h1 className="text-4xl font-black text-gray-900">{t.greeting}</h1>
            </header>
            <MandiPriceCarousel lang={lang} t={t} />
          </>
        ) : (
          <PlantDoctor lang={lang} t={t} voiceTranscript={transcript} />
        )}
      </main>
      
      <VoiceAssistant 
        lang={lang} t={t} isListening={isListening} 
        aiResponse={aiResponse} startListening={startListening} stopListening={stopListening} 
      />
    </div>
  );
}

export default App;