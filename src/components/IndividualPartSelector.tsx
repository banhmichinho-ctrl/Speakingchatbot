import React, { useState } from 'react';
import { Target, Sparkles, BookOpen, Layers, Zap, ArrowRight } from 'lucide-react';
import { TestMode, TopicItem } from '../types';
import { IELTS_TOPICS_2026 } from '../data/ieltsTopics2026';

interface IndividualPartSelectorProps {
  onStartSinglePart: (mode: TestMode, selectedTopic: TopicItem) => void;
}

export const IndividualPartSelector: React.FC<IndividualPartSelectorProps> = ({ onStartSinglePart }) => {
  const [selectedPartMode, setSelectedPartMode] = useState<TestMode>('part1');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(IELTS_TOPICS_2026[0].id);

  const selectedTopic = IELTS_TOPICS_2026.find(t => t.id === selectedTopicId) || IELTS_TOPICS_2026[0];

  const handleStart = () => {
    onStartSinglePart(selectedPartMode, selectedTopic);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Hero Badge */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-red-500/30">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-200 mb-2">
          <Target className="w-4 h-4 text-amber-300" /> Mode Luyện Tập Riêng Lẻ Từng Phần
        </div>
        <h2 className="text-2xl font-black tracking-tight">Luyện Tập Riêng Lẻ Part 1, Part 2 Hoặc Part 3</h2>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          ⚡ Mode này cho phép bạn luyện tập nhanh bất kỳ phần nào một cách độc lập. Hệ thống sẽ <strong>BỎ QUA</strong> bước kiểm tra ID Card và chuyển thẳng tới bài nói.
        </p>
      </div>

      {/* Part Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Part 1 Option */}
        <div
          onClick={() => setSelectedPartMode('part1')}
          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
            selectedPartMode === 'part1'
              ? 'bg-red-950/20 border-red-600 shadow-lg ring-2 ring-red-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center">
              P1
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              4-5 Phút
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Part 1: Basic Topics</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Các câu hỏi ngắn về cuộc sống, công việc, học tập, thói quen & xu hướng công nghệ 2026.
          </p>
        </div>

        {/* Part 2 Option */}
        <div
          onClick={() => setSelectedPartMode('part2')}
          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
            selectedPartMode === 'part2'
              ? 'bg-red-950/20 border-red-600 shadow-lg ring-2 ring-red-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              P2
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              3-4 Phút
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Part 2: Cue Card Long Turn</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            1 phút nháp ghi chú trên bảng nháp + 2 phút nói tự do theo Cue Card & câu hỏi phụ.
          </p>
        </div>

        {/* Part 3 Option */}
        <div
          onClick={() => setSelectedPartMode('part3')}
          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
            selectedPartMode === 'part3'
              ? 'bg-red-950/20 border-red-600 shadow-lg ring-2 ring-red-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center">
              P3
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              4-5 Phút
            </span>
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Part 3: Deep Discussion</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thảo luận các câu hỏi tư duy trừu tượng, so sánh thời gian, dự đoán xu hướng tương lai 2026/2030.
          </p>
        </div>

      </div>

      {/* Topic Selection Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-red-600" /> Chọn Chủ Đề Bài Nói (IELTS Topic Bank 2026/2027)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {IELTS_TOPICS_2026.map((top) => (
            <div
              key={top.id}
              onClick={() => setSelectedTopicId(top.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-2 ${
                selectedTopicId === top.id
                  ? 'bg-slate-900 text-white border-red-600 shadow-md'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md mb-1 inline-block ${
                  top.yearCategory === '2026-2027 New' ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-200'
                }`}>
                  {top.yearCategory}
                </span>
                <h4 className="text-xs font-bold leading-snug">{top.title}</h4>
                <p className={`text-[11px] mt-1 ${selectedTopicId === top.id ? 'text-slate-300' : 'text-slate-500'}`}>
                  {top.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-2">
        <button
          onClick={handleStart}
          className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-xl hover:shadow-red-600/30 transition flex items-center gap-2 mx-auto"
        >
          <Zap className="w-5 h-5 text-amber-300" />
          <span>Vào Luyện Tập {selectedPartMode.toUpperCase()} Ngay (Bỏ Qua ID Card)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
