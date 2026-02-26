import { useState, useRef } from 'react';
import { useLocationWeather } from './useLocationWeather'; 

export const useAgroVoice = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  const { locationName, temperature, weatherDesc } = useLocationWeather();
  const recognitionRef = useRef(null);

  const processWithAI = async (text) => {
    const lowerText = text.toLowerCase();
    let finalReply = "";

    // 1. Weather Logic
    if (lowerText.includes('weather') || lowerText.includes('rain') || lowerText.includes('mausam')) {
      finalReply = `It is currently ${temperature} degrees and ${weatherDesc} in ${locationName}.`;
    } 
    
    // 2. LIVE Market Price Logic with Crop Matching
    else if (
      lowerText.includes('price') || lowerText.includes('rate') || 
      lowerText.includes('wheat') || lowerText.includes('kanak') ||
      lowerText.includes('paddy') || lowerText.includes('jhona') ||
      lowerText.includes('tomato') || lowerText.includes('tamatar') ||
      lowerText.includes('maize') || lowerText.includes('makki')
    ) {
      setAiResponse("Checking live Mandi rates..."); 
      
      try {
        const response = await fetch('http://localhost:5000/api/prices');
        const data = await response.json();
        
        if (data && data.length > 0) {
          // Find the specific crop in the data array
          let targetCrop = data.find(item => {
            const cropName = item.crop.toLowerCase();
            return (
              lowerText.includes(cropName) || 
              (lowerText.includes('kanak') && cropName.includes('wheat')) ||
              (lowerText.includes('jhona') && cropName.includes('paddy')) ||
              (lowerText.includes('tamatar') && cropName.includes('tomato')) ||
              (lowerText.includes('makki') && cropName.includes('maize'))
            );
          });

          if (targetCrop) {
            const spokenPrice = targetCrop.price
              .replace('₹', '')
              .replace('/q', ' rupees per quintal');

            finalReply = `The current live rate for ${targetCrop.crop} at ${targetCrop.market} is ${spokenPrice}.`;
          } else {
            // Fallback if the specific crop isn't in today's Punjab data
            finalReply = `I couldn't find a live price for that specific crop in Punjab today, but the rate for ${data[0].crop} is ${data[0].price.replace('₹', '').replace('/q', ' rupees')}.`;
          }
        } else {
          finalReply = "I couldn't find any live prices for Punjab right now.";
        }
      } catch (error) {
        finalReply = "I am having trouble connecting to the market database.";
      }
    } 
    else {
      finalReply = `I heard: "${text}". You can ask me about the weather or specific crop prices like wheat and paddy.`;
    }

    setAiResponse(finalReply);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); 
      const utterance = new SpeechSynthesisUtterance(finalReply);
      utterance.lang = 'en-IN'; 
      utterance.rate = 1.0; 
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAiResponse("Browser not supported. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true; 
    recognition.lang = 'en-IN'; 

    recognitionRef.current = recognition;
    let finalSpokenText = ''; 

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setAiResponse('Listening...');
    };

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscript(currentTranscript);
      finalSpokenText = currentTranscript; 
    };

    recognition.onend = () => {
      setIsListening(false);
      if (finalSpokenText.trim() !== '') {
         processWithAI(finalSpokenText);
      } else {
         setAiResponse("I didn't catch that. Tap the mic and try again.");
      }
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const stopListening = () => recognitionRef.current?.stop();

  return { isListening, transcript, aiResponse, startListening, stopListening };
};