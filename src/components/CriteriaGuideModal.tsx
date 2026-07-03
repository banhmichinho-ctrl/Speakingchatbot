import React, { useState } from 'react';
import { HelpCircle, X, CheckCircle2, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import { OFFICIAL_BAND_DESCRIPTORS, MAT_CLARK_TIPS } from '../data/ieltsCriteriaInfo';

interface CriteriaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CriteriaGuideModal: React.FC<CriteriaGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedBand, setSelectedBand] = useState<number>(7.0);

  if (!isOpen) return null;

  const currentDesc = OFFICIAL_BAND_DESCRIPTORS.find(d => d.band === selectedBand) || OFFICIAL_BAND_DESCRIPTORS[2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl max-w-4xl w-full my-6 border-2 border-red-600 overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 p-5 text-white flex items-center justify-between border-b border-red-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl border border-white/20">
              <HelpCircle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-200">IELTS Official Scoring Standards</span>
              <h2 className="text-xl font-black tracking-tight">Tiêu Chí Chấm Điểm IELTS Speaking Official</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Band Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chọn Mức Điểm Band Để Xem Tiêu Chí Chi Tiết:</label>
            <div className="flex flex-wrap gap-2">
              {[9.0, 8.0, 7.0, 6.0, 5.0].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBand(b)}
                  className={`px-4 py-2 rounded-xl font-black text-xs transition border ${
                    selectedBand === b
                      ? 'bg-red-600 text-white border-red-500 shadow-lg'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  Band {b.toFixed(1)}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Criteria Details for Selected Band */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">Fluency & Coherence (FC) - Band {currentDesc.band}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{currentDesc.fc}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Lexical Resource (LR) - Band {currentDesc.band}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{currentDesc.lr}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Grammatical Range & Accuracy (GRA) - Band {currentDesc.band}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{currentDesc.gra}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">Pronunciation (PR) - Band {currentDesc.band}</span>
              <p className="text-xs text-slate-300 leading-relaxed">{currentDesc.pr}</p>
            </div>

          </div>

          {/* Mat Clark Strategy Tips Section */}
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Kỹ Thuật Trả Lời Mat Clark Đã Được Tích Hợp Vào AI</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MAT_CLARK_TIPS.map((tip, idx) => (
                <div key={idx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="text-xs font-bold text-amber-300">{tip.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
