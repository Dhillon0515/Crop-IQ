import React from 'react';
import { Mic, Search, Bot } from 'lucide-react';
import { useAgroVoice } from '../../hooks/useAgroVoice'; // Import our new hook

const AgroVoiceMic = () => {
  // Bring in the logic from our hook
  const { 
    isListening, 
    transcript, 
    setTranscript, 
    aiResponse, 
    startListening, 
    stopListening 
  } = useAgroVoice();

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="p-5 md:p-12 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-8">
          Hello, <span className="text-green-600">Farmer</span> 👋
        </h2>
        
        {/* The Search Bar */}
        <div className="relative flex items-center bg-gray-100 rounded-2xl p-2 md:p-3 shadow-inner max-w-2xl">
          <Search className="text-gray-400 ml-3 md:ml-4" size={24} />
          
          <input 
            type="text" 
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Ask about crop prices or say 'Weather'..." 
            className="bg-transparent border-none outline-none w-full p-2 md:p-3 text-sm md:text-lg text-gray-800 focus:ring-0"
          />
          
          {/* Animated Microphone Button */}
          <div className="relative">
            {isListening && <span className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></span>}
            <button 
              onClick={handleMicClick}
              className={`relative z-10 p-3 md:p-4 rounded-full text-white shadow-lg transition-all duration-300 ${
                isListening ? 'bg-red-500 scale-110' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Mic size={24} className={isListening ? 'animate-pulse' : ''} />
            </button>
          </div>
        </div>
        
        {/* Status Text */}
        {isListening && (
          <p className="text-sm md:text-base text-green-600 font-semibold mt-4 ml-4 animate-pulse">
            AgroVoice is listening... speak now.
          </p>
        )}

        {/* AI Response Bubble */}
        {aiResponse && !isListening && (
          <div className="mt-6 max-w-2xl bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-4 items-start shadow-sm animate-fade-in-up">
            <div className="bg-green-600 p-2 rounded-full text-white flex-shrink-0">
              <Bot size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-green-800 mb-1">AgroVoice AI</h4>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {aiResponse}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgroVoiceMic;