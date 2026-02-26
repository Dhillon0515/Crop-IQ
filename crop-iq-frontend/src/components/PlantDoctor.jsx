import React, { useState, useEffect } from 'react';
import { Leaf, Activity, BookOpen } from 'lucide-react';

const PlantDoctor = ({ lang, t, voiceTranscript }) => {
  const [selection, setSelection] = useState({ crop: 'wheat', variety: 'pbw824' });
  const [symptom, setSymptom] = useState('');
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (voiceTranscript) {
      setSymptom(voiceTranscript);
      getDiagnosis(voiceTranscript);
    }
  }, [voiceTranscript]);

  const getDiagnosis = (input = symptom) => {
    const text = input.toLowerCase();
    const cropData = t.knowledgeBase?.[selection.crop]?.[selection.variety]; // Defensive access
    
    let diagnosis = null;
    if (text.includes('rust') || text.includes('ਕੁੰਗੀ')) diagnosis = cropData?.rust;
    else if (text.includes('nitrogen') || text.includes('ਪੀਲੇ')) diagnosis = cropData?.nitrogen;
    else if (text.includes('whitefly') || text.includes('ਮੱਖੀ')) diagnosis = cropData?.whitefly;
    else if (text.includes('borer') || text.includes('ਸੁੰਡੀ')) diagnosis = cropData?.borer;

    setReport(diagnosis || t.noMatch);
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-50">
        <h2 className="text-3xl font-black mb-6 flex items-center gap-3"><Leaf className="text-green-600"/> {t.doctorTitle}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <select className="p-4 bg-gray-50 rounded-xl font-bold" onChange={(e) => setSelection({...selection, crop: e.target.value})}>
            <option value="wheat">{t.cropsList?.wheat}</option>
            <option value="cotton">{t.cropsList?.cotton}</option>
            <option value="maize">{t.cropsList?.maize}</option>
          </select>
          <select className="p-4 bg-gray-50 rounded-xl font-bold" onChange={(e) => setSelection({...selection, variety: e.target.value})}>
            {selection.crop === 'wheat' ? (
              <><option value="pbw824">PBW 824</option><option value="unnat343">Unnat 343</option></>
            ) : selection.crop === 'cotton' ? (
              <option value="rch650">RCH 650</option>
            ) : (
              <option value="pmh1">PMH 1</option>
            )}
          </select>
        </div>

        <textarea 
          className="w-full p-6 bg-gray-50 rounded-2xl font-bold text-lg min-h-[120px] mb-4 outline-none"
          placeholder="Describe symptoms..." value={symptom} onChange={(e) => setSymptom(e.target.value)}
        />
        <button onClick={() => getDiagnosis()} className="w-full bg-green-600 text-white py-4 rounded-xl font-black shadow-lg">
          {lang === 'en' ? "GET ACCURATE SOLUTION" : "ਸਹੀ ਇਲਾਜ ਜਾਣੋ"}
        </button>
      </div>

      {report && (
        <div className="mt-8 bg-white p-8 rounded-3xl border-l-[10px] border-green-500 shadow-xl animate-in fade-in">
          <h3 className="text-xs font-black text-green-600 uppercase mb-2">{t.treatment}</h3>
          <p className="text-xl font-bold text-gray-700">{report}</p>
        </div>
      )}
    </div>
  );
};

export default PlantDoctor;