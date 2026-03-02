import React, { useState, useEffect } from 'react';
import { Leaf, Volume2, ShieldCheck, RotateCcw } from 'lucide-react';

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

  const clearDiagnosis = () => {
    setSymptom('');
    setReport(null);
    window.speechSynthesis.cancel();
  };

  const handleGetSolution = () => {
    const text = symptom.toLowerCase();
    const cropData = t?.knowledgeBase?.[selection.crop]?.[selection.variety];
    let diagnosis = null;
    
    // Diagnosis Logic
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
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-700">
      {/* Main Card Container */}
      <div className="bg-[var(--bg-card)] rounded-[40px] shadow-2xl p-8 border border-black/5 dark:border-white/10 transition-colors duration-300">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-5">
            <div className="bg-[var(--nav-green)]/20 p-4 rounded-2xl shadow-inner border border-[var(--nav-green)]/10">
              <Leaf className="text-[var(--nav-green)]" size={32}/>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[var(--text-main)] tracking-tight">
                {t?.doctorTitle}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--nav-green)] animate-pulse" />
                <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">
                  GNDEC AI Diagnosis
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Reset Button */}
          <button 
            onClick={clearDiagnosis}
            className="group flex items-center gap-2 p-3 px-5 rounded-xl text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-wider border border-transparent hover:border-red-500/20"
          >
            <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /> 
            {lang === 'en' ? 'Reset' : 'ਰੀਸੈੱਟ'}
          </button>
        </div>
        
        {/* Dropdowns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <label className="text-[var(--text-muted)] text-[11px] font-black uppercase ml-2 tracking-widest opacity-80">Select Crop</label>
            <div className="relative group">
                <select 
                  className="w-full p-4 bg-[var(--bg-body)] text-[var(--text-main)] rounded-2xl font-bold border border-black/5 dark:border-white/10 focus:border-[var(--nav-green)]/50 outline-none transition-all cursor-pointer appearance-none shadow-inner"
                  value={selection.crop}
                  onChange={(e) => setSelection({...selection, crop: e.target.value})}
                >
                  <option value="wheat">{t?.cropsList?.wheat}</option>
                  <option value="cotton">{t?.cropsList?.cotton}</option>
                  <option value="tomato">{t?.cropsList?.tomato}</option>
                  <option value="potato">{t?.cropsList?.potato}</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)] opacity-30">
                    ▼
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[var(--text-muted)] text-[11px] font-black uppercase ml-2 tracking-widest opacity-80">Variety</label>
            <div className="relative group">
                <select 
                  className="w-full p-4 bg-[var(--bg-body)] text-[var(--text-main)] rounded-2xl font-bold border border-black/5 dark:border-white/10 focus:border-[var(--nav-green)]/50 outline-none transition-all cursor-pointer appearance-none shadow-inner"
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
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)] opacity-30">
                    ▼
                </div>
            </div>
          </div>
        </div>

        {/* Symptoms Text Area */}
        <div className="space-y-3 mb-8">
          <label className="text-[var(--text-muted)] text-[11px] font-black uppercase ml-2 tracking-widest opacity-80">Observations</label>
          <textarea 
            className="w-full p-6 bg-[var(--bg-body)] text-[var(--text-main)] rounded-[32px] font-bold text-lg min-h-[180px] outline-none border border-black/5 dark:border-white/10 focus:border-[var(--nav-green)]/50 transition-all placeholder:text-[var(--text-muted)] placeholder:opacity-20 shadow-inner resize-none"
            placeholder={lang === 'en' ? "Describe yellowing, spots, or pests..." : "ਪੀਲੇ ਪੱਤੇ, ਧੱਬੇ ਜਾਂ ਕੀੜੇ..."} 
            value={symptom} 
            onChange={(e) => setSymptom(e.target.value)}
          />
        </div>

        {/* Action Button */}
        <button 
          onClick={handleGetSolution}
          className="w-full bg-[var(--nav-green)] hover:brightness-110 text-black py-5 rounded-3xl font-black text-xl shadow-[0_15px_40px_rgba(57,255,20,0.25)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
        >
          <Volume2 size={26} className="group-hover:scale-110 transition-transform"/> 
          {lang === 'en' ? "GET ACCURATE SOLUTION" : "ਸਹੀ ਇਲਾਜ ਜਾਣੋ"}
        </button>

        {/* Solution Card */}
        {report && (
          <div className="mt-10 p-8 rounded-[35px] bg-[var(--nav-green)]/[0.03] border-l-[12px] border-[var(--nav-green)] shadow-2xl animate-in slide-in-from-bottom-5 duration-500">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-[var(--nav-green)] rounded-lg">
                <ShieldCheck className="text-black" size={20}/>
              </div>
              <h3 className="text-xs font-black text-[var(--nav-green)] uppercase tracking-[0.3em]">{t?.treatment}</h3>
            </div>
            <p className="text-2xl font-black text-[var(--text-main)] leading-relaxed">
              {report}
            </p>
          </div>
        )}
      </div>
      
      {/* Disclaimer */}
      <p className="text-center mt-8 text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest opacity-30">
         AI insights are for guidance. Consult experts for severe crop damage.
      </p>
    </div>
  );
};

export default PlantDoctor;