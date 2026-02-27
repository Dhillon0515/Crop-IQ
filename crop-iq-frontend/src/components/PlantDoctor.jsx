import React, { useState, useEffect } from 'react';
import { Leaf, Volume2, ShieldCheck } from 'lucide-react';

const PlantDoctor = ({ lang, t, voiceTranscript }) => {
  const [selection, setSelection] = useState({ crop: 'wheat', variety: 'pbw824' });
  const [symptom, setSymptom] = useState('');
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (voiceTranscript) {
      setSymptom(voiceTranscript);
    }
  }, [voiceTranscript]);

  const speakSolution = (text) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'pa' ? 'pa-IN' : 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleGetSolution = () => {
    const text = symptom.toLowerCase();
    const cropData = t?.knowledgeBase?.[selection.crop]?.[selection.variety];
    
    let diagnosis = null;
    
    // Expanded Matching Logic for both original crops and new vegetables
    if (text.includes('rust') || text.includes('ਕੁੰਗੀ')) diagnosis = cropData?.rust;
    else if (text.includes('nitrogen') || text.includes('ਪੀਲੇ')) diagnosis = cropData?.nitrogen;
    else if (text.includes('whitefly') || text.includes('ਮੱਖੀ')) diagnosis = cropData?.whitefly;
    else if (text.includes('curl') || text.includes('ਮਰੋੜ')) diagnosis = cropData?.leaf_curl;
    else if (text.includes('blight') || text.includes('ਝੁਲਸ')) diagnosis = cropData?.blight;
    else if (text.includes('scab') || text.includes('ਦਾਗ')) diagnosis = cropData?.scab;

    const finalResult = diagnosis || t?.noMatch;
    setReport(finalResult); 
    speakSolution(finalResult); 
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-green-100 p-3 rounded-2xl">
            <Leaf className="text-green-600" size={28}/>
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">{t?.doctorTitle}</h2>
        </div>
        
        {/* Updated Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select 
            className="p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-green-200 outline-none transition-all"
            value={selection.crop}
            onChange={(e) => setSelection({...selection, crop: e.target.value})}
          >
            <option value="wheat">{t?.cropsList?.wheat}</option>
            <option value="cotton">{t?.cropsList?.cotton}</option>
            <option value="tomato">{t?.cropsList?.tomato}</option>
            <option value="potato">{t?.cropsList?.potato}</option>
          </select>

          <select 
            className="p-4 bg-gray-50 rounded-2xl font-bold border-2 border-transparent focus:border-green-200 outline-none transition-all"
            value={selection.variety}
            onChange={(e) => setSelection({...selection, variety: e.target.value})}
          >
            {selection.crop === 'wheat' && (
              <><option value="pbw824">PBW 824</option><option value="unnat343">Unnat 343</option></>
            )}
            {selection.crop === 'cotton' && <option value="rch650">RCH 650</option>}
            {selection.crop === 'tomato' && <option value="punjab_ratta">Punjab Ratta</option>}
            {selection.crop === 'potato' && <option value="kufri_pukhraj">Kufri Pukhraj</option>}
          </select>
        </div>

        <textarea 
          className="w-full p-6 bg-gray-50 rounded-3xl font-bold text-lg min-h-[150px] mb-6 outline-none border-2 border-transparent focus:border-green-200 transition-all placeholder:text-gray-300"
          placeholder={lang === 'en' ? "Describe symptoms..." : "ਲੱਛਣ ਦੱਸੋ..."} 
          value={symptom} 
          onChange={(e) => setSymptom(e.target.value)}
        />

        <button 
          onClick={handleGetSolution}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <Volume2 size={24}/> {lang === 'en' ? "GET ACCURATE SOLUTION" : "ਸਹੀ ਇਲਾਜ ਜਾਣੋ"}
        </button>

        {report && (
          <div className="mt-10 p-8 rounded-[32px] bg-green-50 border-l-[12px] border-green-500 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-green-600" size={20}/>
              <h3 className="text-xs font-black text-green-600 uppercase tracking-widest">{t?.treatment}</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 leading-snug">
              {report}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantDoctor;