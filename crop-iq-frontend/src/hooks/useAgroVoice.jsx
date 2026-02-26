import { useState, useRef } from 'react';

export const useAgroVoice = (lang, t) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  // --- INTERNAL KNOWLEDGE BASE FOR CROP HEALTH ---
  const symptomDatabase = {
    en: [
      { keys: ['yellow', 'pale', 'nitrate'], result: "Nitrogen Deficiency", advice: "Apply Urea or nitrogen-rich fertilizer immediately." },
      { keys: ['brown', 'spots', 'blight', 'fungus'], result: "Fungal Infection", advice: "Spray recommended fungicide and remove infected leaves." },
      { keys: ['white', 'powder', 'mildew'], result: "Powdery Mildew", advice: "Use sulfur-based spray and ensure better air circulation." },
      { keys: ['hole', 'insect', 'pests'], result: "Pest Attack", advice: "Identify the insect and use organic Neem oil or recommended pesticide." }
    ],
    pa: [
      { keys: ['ਪੀਲੇ', 'ਪੀਲਾ', 'ਨਾਈਟ੍ਰੋਜਨ'], result: "ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਕਮੀ", advice: "ਯੂਰੀਆ ਜਾਂ ਨਾਈਟ੍ਰੋਜਨ ਭਰਪੂਰ ਖਾਦ ਦੀ ਵਰਤੋਂ ਕਰੋ।" },
      { keys: ['ਭੂਰੇ', 'ਧੱਬੇ', 'ਉੱਲੀ'], result: "ਉੱਲੀ ਦਾ ਰੋਗ", advice: "ਸਿਫਾਰਸ਼ ਕੀਤੇ ਉੱਲੀਨਾਸ਼ਕ ਦੀ ਵਰਤੋਂ ਕਰੋ ਅਤੇ ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਹਟਾ ਦਿਓ।" },
      { keys: ['ਚਿੱਟਾ', 'ਪਾਊਡਰ'], result: "ਚਿੱਟਾ ਰੋਗ", advice: "ਹਵਾ ਦਾ ਸੰਚਾਰ ਵਧਾਓ ਅਤੇ ਗੰਧਕ ਵਾਲੇ ਸਪਰੇਅ ਦੀ ਵਰਤੋਂ ਕਰੋ।" },
      { keys: ['ਸੁੰਡੀ', 'ਕੀੜੇ', 'ਮੋਰੀ'], result: "ਕੀੜਿਆਂ ਦਾ ਹਮਲਾ", advice: "ਨੀਮ ਦੇ ਤੇਲ ਜਾਂ ਸਿਫਾਰਸ਼ ਕੀਤੇ ਕੀਟਨਾਸ਼ਕ ਦੀ ਵਰਤੋਂ ਕਰੋ।" }
    ]
  };

  const processWithAI = async (text) => {
    const lowerText = text.toLowerCase();
    let finalReply = "";

    // 1. MANDI PRICE LOGIC
    if (lowerText.includes('price') || lowerText.includes('rate') || lowerText.includes('ਭਾਅ') || lowerText.includes('ਕਣਕ')) {
      try {
        const response = await fetch('http://localhost:5000/api/prices');
        const data = await response.json();
        if (data && data.length > 0) {
          const item = data[0]; // Gets the first Punjab Mandi record
          finalReply = lang === 'pa' 
            ? `${item.market} ਵਿੱਚ ${item.crop} ਦਾ ਭਾਅ ${item.price.replace('₹', '')} ਰੁਪਏ ਹੈ।` 
            : `The current rate for ${item.crop} at ${item.market} is ${item.price.replace('₹', '')} rupees.`;
        }
      } catch (err) {
        finalReply = lang === 'pa' ? "ਸਰਵਰ ਨਾਲ ਕੁਨੈਕਸ਼ਨ ਨਹੀਂ ਹੋ ਸਕਿਆ।" : "Could not connect to the price database.";
      }
    } 
    
    // 2. PLANT HEALTH / DISEASE LOGIC (NEW)
    else if (
      lowerText.includes('leaf') || lowerText.includes('pattay') || lowerText.includes('ਬੂਟਾ') || 
      lowerText.includes('disease') || lowerText.includes('ਬਿਮਾਰੀ') || lowerText.includes('ਹਾਲਤ')
    ) {
      const currentDB = symptomDatabase[lang === 'pa' ? 'pa' : 'en'];
      const match = currentDB.find(item => item.keys.some(key => lowerText.includes(key)));

      if (match) {
        finalReply = lang === 'pa' 
          ? `ਇਹ ${match.result} ਲੱਛਣ ਹਨ। ਸੁਝਾਅ: ${match.advice}` 
          : `This sounds like ${match.result}. Recommended action: ${match.advice}`;
      } else {
        finalReply = lang === 'pa' 
          ? "ਮੈਨੂੰ ਲੱਛਣਾਂ ਬਾਰੇ ਹੋਰ ਦੱਸੋ, ਜਿਵੇਂ ਪੱਤਿਆਂ ਦਾ ਰੰਗ ਜਾਂ ਧੱਬੇ।" 
          : "Please tell me more about the symptoms, such as leaf color or spots.";
      }
    } 

    // 3. FALLBACK
    else {
      finalReply = lang === 'pa' 
        ? `ਮੈਂ ਸੁਣਿਆ: "${text}"। ਤੁਸੀਂ ਮੈਨੂੰ ਫਸਲਾਂ ਦੇ ਭਾਅ ਜਾਂ ਬਿਮਾਰੀਆਂ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।` 
        : `I heard: "${text}". Try asking about Mandi prices or crop diseases.`;
    }

    setAiResponse(finalReply);
    speak(finalReply);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'pa' ? 'pa-IN' : 'en-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'pa' ? 'pa-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setAiResponse(lang === 'pa' ? 'ਸੁਣ ਰਿਹਾ ਹੈ...' : 'Listening...');
    };

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setTranscript(resultText);
      processWithAI(resultText);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  return { isListening, transcript, aiResponse, startListening, stopListening };
};