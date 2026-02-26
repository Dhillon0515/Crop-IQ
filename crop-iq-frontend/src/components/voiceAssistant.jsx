import React from 'react';
import { Mic, Square } from 'lucide-react';
import { useAgroVoice } from '../hooks/useAgroVoice';

const VoiceAssistant = ({ lang, t }) => {
  const { isListening, aiResponse, startListening, stopListening } = useAgroVoice(lang, t);

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end z-50">
      {aiResponse && (
        <div className="mb-4 mr-2 max-w-xs bg-white p-4 rounded-2xl shadow-2xl border border-green-50 text-sm font-bold text-gray-800 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-green-600 mr-2">●</span> {aiResponse}
        </div>
      )}
      
      <button 
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all active:scale-95 ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isListening ? <Square size={28} fill="white" /> : <Mic size={28} />}
      </button>
      <span className="mr-2 mt-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md shadow-sm">
        {isListening ? t.listening : t.micLabel}
      </span>
    </div>
  );
};

export default VoiceAssistant;