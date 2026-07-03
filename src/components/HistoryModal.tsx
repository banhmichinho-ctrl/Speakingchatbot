import React from 'react';
import { History, Award, X, Trash2, Calendar, BookOpen, ExternalLink } from 'lucide-react';
import { PracticeSessionRecord } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyRecords: PracticeSessionRecord[];
  onSelectRecord: (record: PracticeSessionRecord) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historyRecords,
  onSelectRecord,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl max-w-3xl w-full my-6 border-2 border-red-600 overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 p-5 text-white flex items-center justify-between border-b border-red-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl border border-white/20">
              <History className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-200">Lịch Sử Luyện Tập</span>
              <h2 className="text-xl font-black tracking-tight">Practice History & Score Trends</h2>
            </div>
          </div>

          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {historyRecords.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Award className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold">Chưa có bài luyện tập nào được lưu.</p>
              <p className="text-xs text-slate-500">Hoàn thành bài nói đầu tiên của bạn để xem biểu đồ và kết quả đánh giá tại đây!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyRecords.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    onSelectRecord(rec);
                    onClose();
                  }}
                  className="bg-slate-950 border border-slate-800 hover:border-red-600 p-4 rounded-2xl cursor-pointer transition flex items-center justify-between gap-4 group shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {rec.mode === 'full' ? 'Full Test 3 Parts' : `Single Part (${rec.mode.toUpperCase()})`}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" /> {new Date(rec.date).toLocaleDateString('vi-VN')} {new Date(rec.date).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition">{rec.topicTitle}</h4>
                    
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                      <span>FC: <strong className="text-sky-300">{rec.fcBand.toFixed(1)}</strong></span>
                      <span>LR: <strong className="text-purple-300">{rec.lrBand.toFixed(1)}</strong></span>
                      <span>GRA: <strong className="text-emerald-300">{rec.graBand.toFixed(1)}</strong></span>
                      <span>PR: <strong className="text-red-300">{rec.prBand.toFixed(1)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center px-3 py-1.5 bg-red-600 text-white rounded-xl font-black text-lg border border-red-500 shadow">
                      {rec.overallBand.toFixed(1)}
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {historyRecords.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
            <button
              onClick={onClearHistory}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa Toàn Bộ Lịch Sử</span>
            </button>

            <span className="text-xs text-slate-400">
              Đã hoàn thành <strong>{historyRecords.length}</strong> bài luyện tập
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
