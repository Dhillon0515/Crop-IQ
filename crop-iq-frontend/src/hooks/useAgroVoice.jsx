import { useState, useRef, useEffect } from 'react';

export const useAgroVoice = (lang, t) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const recognitionRef = useRef(null);

  // Auto-Dismiss Logic for the AI bubble
  useEffect(() => {
    if (aiResponse && aiResponse !== 'Listening...' && aiResponse !== 'ਸੁਣ ਰਿਹਾ ਹੈ...') {
      const timer = setTimeout(() => {
        setAiResponse('');
      }, 7000); 
      return () => clearTimeout(timer);
    }
  }, [aiResponse]);

  // Expanded Symptom Database
  const symptomDatabase = {
    en: [
      { keys: ['rust', 'kungi'], crop: 'wheat', variety: 'pbw824', advice: t?.knowledgeBase?.wheat?.pbw824?.rust },
      { keys: ['rust', 'kungi'], crop: 'wheat', variety: 'unnat343', advice: t?.knowledgeBase?.wheat?.unnat343?.rust },
      { keys: ['yellow', 'nitrogen'], advice: "Nitrogen deficiency. Apply 25kg Urea." },
      { keys: ['whitefly'], crop: 'cotton', variety: 'rch650', advice: t?.knowledgeBase?.cotton?.rch650?.whitefly },
      { keys: ['curl', 'curling'], crop: 'tomato', variety: 'punjab_ratta', advice: t?.knowledgeBase?.tomato?.punjab_ratta?.leaf_curl },
      { keys: ['blight', 'black spots'], crop: 'tomato', variety: 'punjab_ratta', advice: t?.knowledgeBase?.tomato?.punjab_ratta?.blight },
      { keys: ['brown spots', 'blight'], crop: 'potato', variety: 'kufri_pukhraj', advice: t?.knowledgeBase?.potato?.kufri_pukhraj?.blight },
      { keys: ['scab', 'rough', 'dry'], crop: 'potato', variety: 'kufri_pukhraj', advice: t?.knowledgeBase?.potato?.kufri_pukhraj?.scab }
    ],
    pa: [
      { keys: ['ਕੁੰਗੀ', 'rust'], crop: 'wheat', variety: 'pbw824', advice: t?.knowledgeBase?.pa?.wheat?.pbw824?.rust },
      { keys: ['ਕੁੰਗੀ', 'rust'], crop: 'wheat', variety: 'unnat343', advice: t?.knowledgeBase?.pa?.wheat?.unnat343?.rust },
      { keys: ['ਪੀਲੇ', 'ਨਾਈਟ੍ਰੋਜਨ'], advice: "ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਕਮੀ। ਯੂਰੀਆ ਪਾਓ।" },
      { keys: ['ਚਿੱਟੀ ਮੱਖੀ'], crop: 'cotton', variety: 'rch650', advice: t?.knowledgeBase?.pa?.cotton?.rch650?.whitefly },
      { keys: ['ਮਰੋੜ', 'ਪੱਤਾ ਮਰੋੜ'], crop: 'tomato', variety: 'punjab_ratta', advice: t?.knowledgeBase?.pa?.tomato?.punjab_ratta?.leaf_curl },
      { keys: ['ਝੁਲਸ', 'ਕਾਲੇ ਧੱਬੇ'], crop: 'tomato', variety: 'punjab_ratta', advice: t?.knowledgeBase?.pa?.tomato?.punjab_ratta?.blight },
      { keys: ['ਝੁਲਸ', 'ਭੂਰੇ ਧੱਬੇ'], crop: 'potato', variety: 'kufri_pukhraj', advice: t?.knowledgeBase?.pa?.potato?.kufri_pukhraj?.blight },
      { keys: ['ਦਾਗ', 'ਸੁੱਕਾ'], crop: 'potato', variety: 'kufri_pukhraj', advice: t?.knowledgeBase?.pa?.potato?.kufri_pukhraj?.scab }
    ]
  };

  const processWithAI = async (text) => {
    const lowerText = text.toLowerCase();
    let finalReply = "";

    try {
      if (lowerText.includes('price') || lowerText.includes('rate') || lowerText.includes('ਭਾਅ')) {
        const response = await fetch('http://localhost:5000/api/prices');
        const data = await response.json();
        const match = data?.find(item => lowerText.includes(item.crop.toLowerCase()));

        if (match) {
          finalReply = lang === 'pa' ? `${match.market} ਵਿੱਚ ਭਾਅ ${match.price} ਹੈ।` : `Price at ${match.market} is ${match.price}.`;
        } else {
          finalReply = lang === 'pa' ? "ਭਾਅ ਨਹੀਂ ਮਿਲੇ।" : "No rates found.";
        }
      } else {
        const currentDB = symptomDatabase[lang === 'pa' ? 'pa' : 'en'];
        const match = currentDB.find(item => item.keys.some(key => lowerText.includes(key)));
        finalReply = match?.advice || (lang === 'pa' ? "ਹੋਰ ਦੱਸੋ।" : "Tell me more.");
      }
    } catch (err) {
      finalReply = "Error connecting to service.";
    }

    setAiResponse(finalReply);
    speak(finalReply);
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // 1. Set the language tag
    utterance.lang = lang === 'pa' ? 'pa-IN' : 'en-IN';
    
    // 2. Fetch all available voices on this computer
    const voices = window.speechSynthesis.getVoices();
    
    // 3. Force the browser to pick the correct voice profile
    if (lang === 'pa') {
      // Hunt specifically for a Punjabi voice
      const punjabiVoice = voices.find(v => 
        v.lang === 'pa-IN' || 
        v.lang === 'pa_IN' || 
        v.name.includes('Punjabi')
      );
      
      if (punjabiVoice) {
        utterance.voice = punjabiVoice;
        console.log("Found Punjabi Voice:", punjabiVoice.name);
      } else {
        console.warn("WARNING: No Punjabi voice found on this device!");
      }
     } else {
      // Hunt for a good Indian English voice
      const englishVoice = voices.find(v => v.lang === 'en-IN');
      if (englishVoice) utterance.voice = englishVoice;
     }

     utterance.rate = 0.9; // Slightly slower for better clarity
     window.speechSynthesis.speak(utterance);
    };

  // --- VERY IMPORTANT FIX ---
  // Browsers load voices asynchronously. This forces them to load immediately 
  // when your component mounts, so they are ready when you click the button.
     if (window.speechSynthesis.onvoiceschanged !== undefined) {
     window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
     }

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'pa' ? 'pa-IN' : 'en-IN';
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
    recognition.start();
    recognition.onerror = (event) => {
    console.error("MIC ERROR FIRED! The exact reason is: ", event.error);
  
     if (event.error === 'not-allowed') {
     alert("Microphone access was denied by the browser or OS!");
     } else if (event.error === 'no-speech') {
     console.log("Mic is on, but the browser isn't detecting any sound. Check your hardware mic.");
     }  else if (event.error === 'network') {
     console.log("Browser doesn't have the cloud translation connection right now.");
    }
   };
  };

  const stopListening = () => recognitionRef.current?.stop();

  return { isListening, transcript, aiResponse, startListening, stopListening };
};