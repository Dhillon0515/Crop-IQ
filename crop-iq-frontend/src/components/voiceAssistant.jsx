import React from 'react';
import { Mic, MicOff } from 'lucide-react';

// Notice we are ONLY using props here. 
// Do NOT import or call useAgroVoice inside this file!
const VoiceAssistant = ({ lang, t, isListening, aiResponse, startListening, stopListening }) => {
  
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      
      {/* Tooltip / AI Response Bubble */}
      {aiResponse && (
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-green-100 mb-2 max-w-sm animate-in fade-in slide-in-from-bottom-4">
          <p className="text-gray-800 font-bold text-sm">
            <span className="text-green-600 mr-2">●</span>
            {aiResponse}
          </p>
        </div>
      )}

      {/* The Floating Mic Button */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-5 rounded-2xl shadow-2xl transition-all duration-300 ${
          isListening 
            ? "bg-red-500 hover:bg-red-600 animate-pulse scale-110" 
            : "bg-green-600 hover:bg-green-700 hover:scale-105"
        }`}
      >
        {isListening ? (
          <MicOff className="text-white" size={28} />
        ) : (
          <Mic className="text-white" size={28} />
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;