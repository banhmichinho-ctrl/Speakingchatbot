import React from 'react';
import { Award, BookOpen, Clock, History, Mic, ShieldCheck, Volume2, VolumeX, Sparkles, HelpCircle, RotateCcw, ShieldAlert } from 'lucide-react';
import { TestMode, CandidateIdentity, InteractionAppMode } from '../types';

interface HeaderProps {
  currentMode: TestMode;
  onSelectMode: (mode: TestMode) => void;
  appMode: InteractionAppMode;
  onToggleAppMode: (mode: InteractionAppMode) => void;
  candidateIdentity: CandidateIdentity;
  onOpenIdentityModal: () => void;
  onOpenTopicBank: () => void;
  onOpenCriteriaGuide: () => void;
  onOpenHistory: () => void;
  ttsEnabled: boolean;
  onToggleTts: () => void;
  onResetTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  appMode,
  onToggleAppMode,
  candidateIdentity,
  onOpenIdentityModal,
  onOpenTopicBank,
  onOpenCriteriaGuide,
  onOpenHistory,
  ttsEnabled,
  onToggleTts,
  onResetTest
}) => {

  return (
    <header className="bg-slate-900 text-white border-b-4 border-red-600 shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 gap-3">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onResetTest}>
            <div className="bg-red-600 text-white font-black px-3 py-1.5 rounded text-xl tracking-wider shadow-md border border-red-500 flex items-center gap-1.5">
              <span>IELTS</span>
              <span className="bg-white text-red-600 text-xs px-1.5 py-0.5 rounded font-bold uppercase">2026/2027</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Speaking Chatbot Assistant
                <span className="bg-red-950/80 text-red-300 text-xs px-2.5 py-0.5 rounded-full border border-red-500/50 flex items-center gap-1 font-bold">
                  <ShieldAlert className="w-3 h-3 text-red-400" /> Strict Examiner (Chấm Khắt Khe)
                </span>
              </h1>
              <p className="text-xs text-slate-400">Chấm cực kỳ nghiêm ngặt chuẩn British Council / IDP • Soi từng lỗi sai</p>
            </div>
          </div>

          {/* Test Mode Switcher & Quick Tools */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* App Interaction Mode Switcher (Luyện tập vs Thi thử) */}
            <div className="bg-slate-950 p-1 rounded-lg border border-slate-700 flex items-center text-xs">
              <button
                onClick={() => onToggleAppMode('practice')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 ${
                  appMode === 'practice'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Chế độ Luyện Tập: Cho phép nghe lại & thu âm lại câu trả lời"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
                <span>Luyện Tập</span>
              </button>
              <button
                onClick={() => onToggleAppMode('exam')}
                className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 ${
                  appMode === 'exam'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Chế độ Thi Thử: Không thu âm lại, tự động gửi khi hết giờ"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
                <span>Thi Thử</span>
              </button>
            </div>

            {/* Mode selection buttons */}
            <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex items-center text-xs">
              <button
                onClick={() => onSelectMode('full')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                  currentMode === 'full'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Thi thử Full 3 Part (Có kiểm tra ID Card)"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Full Test (3 Parts)</span>
              </button>
              
              <button
                onClick={() => onSelectMode('part1')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  currentMode === 'part1'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Luyện riêng Part 1 (Không cần ID Card)"
              >
                Part 1
              </button>

              <button
                onClick={() => onSelectMode('part2')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  currentMode === 'part2'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Luyện riêng Part 2 (Không cần ID Card)"
              >
                Part 2 (Cue Card)
              </button>

              <button
                onClick={() => onSelectMode('part3')}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  currentMode === 'part3'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Luyện riêng Part 3 (Không cần ID Card)"
              >
                Part 3
              </button>
            </div>

            {/* Quick Action Utilities */}
            <div className="flex items-center gap-1.5">
              {/* TTS Toggle */}
              <button
                onClick={onToggleTts}
                className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                  ttsEnabled
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
                title={ttsEnabled ? "Examiner Speech: BẬT" : "Examiner Speech: TẮT"}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                <span className="hidden sm:inline">{ttsEnabled ? 'Giọng Giám Khảo On' : 'Giọng Off'}</span>
              </button>

              {/* Topic Bank Button */}
              <button
                onClick={onOpenTopicBank}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                title="Xem kho đề IELTS 2026/2027"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline">Kho Đề 2026</span>
              </button>

              {/* Criteria Guide Button */}
              <button
                onClick={onOpenCriteriaGuide}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                title="Tiêu chí chấm IELTS Band Descriptors"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span className="hidden md:inline">Tiêu Chí Chấm</span>
              </button>

              {/* Score History */}
              <button
                onClick={onOpenHistory}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                title="Lịch sử bài nói & Báo cáo"
              >
                <History className="w-4 h-4 text-purple-400" />
                <span className="hidden md:inline">Lịch Sử</span>
              </button>

              {/* Candidate Info Badge */}
              <button
                onClick={onOpenIdentityModal}
                className={`p-1.5 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
                  candidateIdentity.verified
                    ? 'bg-red-950/40 text-red-300 border-red-700/60'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${candidateIdentity.verified ? 'text-red-400' : 'text-slate-400'}`} />
                <span className="max-w-[100px] truncate">{candidateIdentity.fullName || 'Thí sinh'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
