import React from 'react';
import { Award, CheckCircle2, AlertTriangle, Sparkles, Download, RotateCcw, X, Layers, BookOpen, Volume2, ArrowUpRight, Mic, Play } from 'lucide-react';
import { IELTSEvaluation, PracticeSessionRecord, TurnMessage, CandidateIdentity, MispronouncedWord } from '../types';

interface EvaluationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: IELTSEvaluation | null;
  turns: TurnMessage[];
  candidateName: string;
  topicTitle: string;
  candidateIdentity?: CandidateIdentity;
  onRestartTest: () => void;
}

export const EvaluationReportModal: React.FC<EvaluationReportModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  turns,
  candidateName,
  topicTitle,
  candidateIdentity,
  onRestartTest
}) => {
  if (!isOpen || !evaluation) return null;

  const speakNativeText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.88;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderTextWithRedHighlights = (text: string, mispronouncedWords?: MispronouncedWord[]) => {
    if (!mispronouncedWords || mispronouncedWords.length === 0) {
      return <span>"{text}"</span>;
    }

    const mispronouncedSet = new Set(
      mispronouncedWords.map(m => m.word.toLowerCase().replace(/[^a-z0-9]/g, ''))
    );

    const words = text.split(/(\s+)/);

    return (
      <span className="leading-relaxed">
        "
        {words.map((part, i) => {
          const cleanPart = part.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (cleanPart && mispronouncedSet.has(cleanPart)) {
            const mw = mispronouncedWords.find(
              m => m.word.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanPart
            );
            return (
              <span
                key={i}
                onClick={() => mw && speakNativeText(mw.word)}
                className="bg-red-950/90 text-red-200 border border-red-500 px-1.5 py-0.5 rounded font-bold underline decoration-red-500 decoration-wavy cursor-pointer hover:bg-red-900 transition mx-0.5 inline-flex items-center gap-1 shadow-sm"
                title={`Từ phát âm sai/nuốt âm. Nhấp để nghe mẫu chuẩn IPA: ${mw?.correctIPA || ''}`}
              >
                {part}
                <Volume2 className="w-3 h-3 text-red-400 inline shrink-0" />
              </span>
            );
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
        "
      </span>
    );
  };

  const getBandBadgeColor = (band: number) => {
    if (band >= 8.0) return 'bg-emerald-600 text-white border-emerald-500';
    if (band >= 7.0) return 'bg-blue-600 text-white border-blue-500';
    if (band >= 6.0) return 'bg-amber-500 text-white border-amber-400';
    return 'bg-red-600 text-white border-red-500';
  };

  const getBandLabel = (band: number) => {
    if (band >= 8.5) return 'Expert / Native-like User (C2)';
    if (band >= 7.5) return 'Very Good User (C1+)';
    if (band >= 6.5) return 'Good Competent User (B2+)';
    if (band >= 5.5) return 'Modest Competent User (B1+)';
    return 'Limited User';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl max-w-4xl w-full my-8 border-2 border-red-600 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 p-6 text-white flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow">
              <Award className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-200 block">Official IELTS Speaking Scorecard</span>
                <span className="bg-black/40 text-red-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-red-500/50 uppercase tracking-wider">
                  🔥 Chế Độ Chấm Strict
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight">Báo Cáo Chấm Điểm Khắt Khe & Soi Lỗi Chi Tiết</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Notice Banner: Official British Council / IDP Standard with STT Filtering */}
          <div className="bg-emerald-950/60 border border-emerald-700/80 p-3.5 rounded-2xl text-xs text-emerald-200 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white font-bold block">Đánh Giá Chuẩn Official IELTS Speaking Examiner (British Council / IDP):</strong>
              <span className="text-slate-200">
                Hệ thống tự động thông minh nhận diện & lọc bỏ các lỗi phát âm/chính tả do phần mềm chuyển giọng nói (STT). Giám khảo đánh giá dựa trên bản chất năng lực nói thực tế, độ trôi chảy, vốn từ vựng chuyên sâu và độ dài câu trả lời của bạn.
              </span>
            </div>
          </div>
          
          {/* Candidate & Session Info Bar */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Thí Sinh (Candidate)</span>
              <span className="text-base font-extrabold text-white">{candidateName}</span>
              {candidateIdentity?.verified && (
                <span className="ml-2 text-[10px] bg-red-950 text-red-300 border border-red-700/60 px-2 py-0.5 rounded-full font-mono">
                  ID: {candidateIdentity.idNumber}
                </span>
              )}
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Chủ Đề (IELTS Topic)</span>
              <span className="text-sm font-bold text-slate-200">{topicTitle}</span>
            </div>

            {/* Big Overall Band Badge */}
            <div className="flex items-center gap-3 bg-slate-950 px-5 py-2.5 rounded-2xl border border-slate-800">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Band Score</span>
                <span className="text-xs font-semibold text-emerald-400">{getBandLabel(evaluation.overallBand)}</span>
              </div>
              <div className={`px-4 py-1.5 rounded-xl font-black text-2xl border shadow-md ${getBandBadgeColor(evaluation.overallBand)}`}>
                {evaluation.overallBand.toFixed(1)}
              </div>
            </div>
          </div>

          {/* General Examiner Feedback Summary */}
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Nhận Xét Tổng Quan Từ Giám Khảo (Examiner Summary):
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed italic">
              "{evaluation.generalSummary}"
            </p>
          </div>

          {/* 4 IELTS Criteria Grid (FC, LR, GRA, PR) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. Fluency & Coherence */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-extrabold text-sm text-sky-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  Fluency & Coherence (FC)
                </h4>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getBandBadgeColor(evaluation.fluencyAndCoherence.band)}`}>
                  Band {evaluation.fluencyAndCoherence.band.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.fluencyAndCoherence.feedback}</p>
              
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-emerald-400">✓ Ưu điểm:</p>
                {evaluation.fluencyAndCoherence.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">▸</span> {s}
                  </p>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-amber-400">⚠ Điểm cần cải thiện:</p>
                {evaluation.fluencyAndCoherence.improvements.map((imp, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400">▸</span> {imp}
                  </p>
                ))}
              </div>
            </div>

            {/* 2. Lexical Resource */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-extrabold text-sm text-purple-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Lexical Resource (LR)
                </h4>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getBandBadgeColor(evaluation.lexicalResource.band)}`}>
                  Band {evaluation.lexicalResource.band.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.lexicalResource.feedback}</p>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-emerald-400">✓ Ưu điểm từ vựng:</p>
                {evaluation.lexicalResource.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">▸</span> {s}
                  </p>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-amber-400">⚠ Điểm cần cải thiện từ vựng:</p>
                {evaluation.lexicalResource.improvements.map((imp, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400">▸</span> {imp}
                  </p>
                ))}
              </div>
            </div>

            {/* 3. Grammatical Range & Accuracy */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-extrabold text-sm text-emerald-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Grammatical Range & Accuracy (GRA)
                </h4>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getBandBadgeColor(evaluation.grammaticalRangeAndAccuracy.band)}`}>
                  Band {evaluation.grammaticalRangeAndAccuracy.band.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.grammaticalRangeAndAccuracy.feedback}</p>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-emerald-400">✓ Điểm cộng ngữ pháp:</p>
                {evaluation.grammaticalRangeAndAccuracy.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">▸</span> {s}
                  </p>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-amber-400">⚠ Cấu trúc cần bổ sung:</p>
                {evaluation.grammaticalRangeAndAccuracy.improvements.map((imp, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400">▸</span> {imp}
                  </p>
                ))}
              </div>
            </div>

            {/* 4. Pronunciation */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-extrabold text-sm text-red-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                  Pronunciation (PR)
                </h4>
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${getBandBadgeColor(evaluation.pronunciation.band)}`}>
                  Band {evaluation.pronunciation.band.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{evaluation.pronunciation.feedback}</p>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-emerald-400">✓ Ngữ điệu & phát âm:</p>
                {evaluation.pronunciation.strengths.map((s, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-emerald-400">▸</span> {s}
                  </p>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold text-amber-400">⚠ Điểm cần khắc phục:</p>
                {evaluation.pronunciation.improvements.map((imp, i) => (
                  <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-amber-400">▸</span> {imp}
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Mat Clark & Keith Phrasal Verbs Diagnostic Checklist */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-500" />
              Đánh Giá Chiến Thuật Kỹ Thuật Nói (Mat Clark & Phrasal Verbs Strategy)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              <div className={`p-3 rounded-xl border text-center ${evaluation.matClarkTechniquesFeedback.leadInPhrasesUsed ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase block">Lead-in Phrases</span>
                <span className="text-xs font-bold">{evaluation.matClarkTechniquesFeedback.leadInPhrasesUsed ? '✓ Đã Dùng' : '✗ Chưa Dùng'}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${evaluation.matClarkTechniquesFeedback.pointingPhrasesUsed ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase block">Pointing Phrases</span>
                <span className="text-xs font-bold">{evaluation.matClarkTechniquesFeedback.pointingPhrasesUsed ? '✓ Đã Dùng' : '✗ Chưa Dùng'}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${evaluation.matClarkTechniquesFeedback.situationalContrastUsed ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase block">Situational Contrast</span>
                <span className="text-xs font-bold">{evaluation.matClarkTechniquesFeedback.situationalContrastUsed ? '✓ Đã Dùng' : '✗ Chưa Dùng'}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${evaluation.matClarkTechniquesFeedback.secondConditionalsUsed ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase block">Second Conditionals</span>
                <span className="text-xs font-bold">{evaluation.matClarkTechniquesFeedback.secondConditionalsUsed ? '✓ Đã Dùng' : '✗ Chưa Dùng'}</span>
              </div>

              <div className={`p-3 rounded-xl border text-center ${evaluation.matClarkTechniquesFeedback.complexConnectivesUsed ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                <span className="text-[10px] font-bold uppercase block">Complex Connectives</span>
                <span className="text-xs font-bold">{evaluation.matClarkTechniquesFeedback.complexConnectivesUsed ? '✓ Đã Dùng' : '✗ Chưa Dùng'}</span>
              </div>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong>Ghi chú từ Giám Khảo:</strong> {evaluation.matClarkTechniquesFeedback.notes}
            </div>

            {/* Phrasal Verbs Recommendation Box */}
            <div className="bg-blue-950/40 p-4 rounded-xl border border-blue-800/60 space-y-2">
              <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Phrasal Verbs Nên Bổ Sung Cho Bài Nói Tiếp Theo (Gợi ý từ Keith Speaking Academy):
              </h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.recommendedPhrasalVerbs.map((pv, idx) => (
                  <span key={idx} className="bg-blue-900/80 text-blue-200 border border-blue-700 px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                    + {pv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Line-by-Line Detailed Analysis & Word-by-Word IPA Pronunciation Guide */}
          {evaluation.lineByLineAnalysis && evaluation.lineByLineAnalysis.length > 0 && (
            <div className="bg-slate-950/90 border-2 border-emerald-600/80 p-5 rounded-2xl space-y-5 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-emerald-800/80 pb-3">
                <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                  <Mic className="w-5 h-5 text-emerald-400" />
                  Chấm Chữa Chi Tiết Từng Lượt Nói & Hướng Dẫn Phát Âm Chuẩn IPA (Word & Sentence Analysis)
                </h3>
                <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-600">
                  ✓ Khắc phục triệt để lỗi phát âm & từ vựng
                </span>
              </div>

              <div className="space-y-4">
                {evaluation.lineByLineAnalysis.map((item, idx) => {
                  const matchingTurn = turns.find((t, tIdx) => t.sender === 'candidate' && (tIdx === item.turnIndex - 1 || turns.filter(x => x.sender === 'candidate').indexOf(t) === idx));
                  return (
                    <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Mic className="w-4 h-4 text-amber-400" />
                          Lượt nói #{item.turnIndex || idx + 1}
                        </span>
                        {item.scoreEstimate && (
                          <span className="bg-blue-950 text-blue-300 border border-blue-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg">
                            Band đánh giá câu này: {item.scoreEstimate.toFixed(1)}
                          </span>
                        )}
                      </div>

                      {/* User Recorded Audio if available */}
                      {matchingTurn?.audioUrl && (
                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                            File thu âm thực tế lượt này của bạn:
                          </span>
                          <audio controls src={matchingTurn.audioUrl} className="w-full h-8 rounded-lg" />
                        </div>
                      )}

                      {/* Original Transcribed Text with Red Highlighted Mispronunciations */}
                      <div className="space-y-1">
                        <p className="text-xs text-slate-300">
                          <strong className="text-slate-400">Văn bản thu âm (Từ phát âm lỗi bôi đỏ):</strong>{' '}
                          {renderTextWithRedHighlights(item.originalSpokenText, item.mispronouncedWords)}
                        </p>
                        {item.sttFixes && (
                          <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/60">
                            🔍 <strong>Xử lý nhận diện giọng nói (STT):</strong> {item.sttFixes}
                          </p>
                        )}
                      </div>

                      {/* Mispronounced Words & Audio File Correction Section */}
                      {item.mispronouncedWords && item.mispronouncedWords.length > 0 && (
                        <div className="bg-red-950/40 border border-red-800/80 p-3.5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                              Lỗi Phát Âm Phát Hiện Qua Bản Thu Âm (Đã bôi đỏ trên câu & chỉ ra cách sửa):
                            </span>
                            <span className="text-[10px] text-red-200 bg-red-900/60 px-2 py-0.5 rounded border border-red-700 font-mono font-bold">
                              Phân tích âm thanh thực tế
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {item.mispronouncedWords.map((mw, mwIdx) => (
                              <div key={mwIdx} className="bg-slate-950 p-3 rounded-xl border border-red-900/80 space-y-2 text-xs">
                                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-red-900/40 pb-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-red-900/90 text-red-100 border border-red-500 font-bold px-2.5 py-0.5 rounded text-xs">
                                      {mw.word}
                                    </span>
                                    <span className="text-xs font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                                      IPA Chuẩn: {mw.correctIPA}
                                    </span>
                                  </div>

                                  <button
                                    onClick={() => speakNativeText(mw.word)}
                                    className="px-2.5 py-1 bg-red-900/90 hover:bg-red-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 border border-red-500 transition shadow"
                                    title={`Nghe file phát âm mẫu chuẩn: ${mw.word}`}
                                  >
                                    <Volume2 className="w-3.5 h-3.5 text-red-300" />
                                    <span>Nghe File Phát Âm Mẫu Chuẩn ({mw.word})</span>
                                  </button>
                                </div>

                                {mw.spokenPhonetic && (
                                  <p className="text-[11px] text-red-300">
                                    ⚠️ <strong>Lỗi thu âm thực tế:</strong> {mw.spokenPhonetic}
                                  </p>
                                )}

                                <p className="text-[11px] text-slate-200">
                                  🔍 <strong>Chi tiết lỗi sai phát âm:</strong> {mw.errorExplanation}
                                </p>

                                <p className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/80">
                                  ✅ <strong>Cách sửa & khẩu hình bật âm chuẩn:</strong> {mw.howToFix}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Corrected & Band 8.5 Upgrades */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Cú Pháp Chuẩn Xác (Corrected):</span>
                          <p className="text-xs text-slate-200 font-medium">{item.correctedText}</p>
                        </div>
                        <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase block">Nâng Cấp NATIVE Band 8.5+:</span>
                            <button
                              onClick={() => speakNativeText(item.upgradedText)}
                              className="px-2 py-0.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[10px] font-bold flex items-center gap-1 transition"
                              title="Nghe mẫu phát âm câu chuẩn"
                            >
                              <Volume2 className="w-3 h-3" />
                              <span>Nghe Cả Câu</span>
                            </button>
                          </div>
                          <p className="text-xs text-emerald-200 font-semibold">{item.upgradedText}</p>
                        </div>
                      </div>

                      {/* Key Vocabulary IPA & Audio Trainer */}
                      {item.keyWordsIPA && item.keyWordsIPA.length > 0 && (
                        <div className="space-y-2 pt-1 border-t border-slate-800">
                          <span className="text-[11px] font-bold text-purple-300 block">
                            📚 Từ Vựng Trọng Tâm & Hướng Dẫn Phát Âm Chuẩn IPA:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.keyWordsIPA.map((kw, kwIdx) => (
                              <div key={kwIdx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white">{kw.word}</span>
                                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800">
                                      {kw.ipa}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400">{kw.meaningVi}</span>
                                </div>
                                <button
                                  onClick={() => speakNativeText(kw.word)}
                                  className="p-1.5 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded-lg border border-purple-700 transition"
                                  title={`Nghe phát âm chuẩn: ${kw.word}`}
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grammar & Pronunciation Tips */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-slate-300">
                          <strong className="text-sky-400 block mb-0.5">💬 Ghi chú Ngữ Pháp:</strong>
                          {item.grammarNotes}
                        </div>
                        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-slate-300">
                          <strong className="text-red-400 block mb-0.5">🗣 Mẹo Phát Âm & Ngữ Điệu (IPA):</strong>
                          {item.pronunciationNotes}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Line-by-Line Upgrades (Band 8.5 Rewrites) */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Sửa Lỗi Chi Tiết & Phiên Bản Nâng Cấp Band 8.5+ (Sentence-by-Sentence Upgrades)
            </h3>

            {evaluation.detailedUpgrades.length === 0 ? (
              <p className="text-xs text-slate-400">Không tìm thấy câu nói cần chỉnh sửa đặc biệt.</p>
            ) : (
              <div className="space-y-3">
                {evaluation.detailedUpgrades.map((upg, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        Hạng Mục: {upg.category}
                      </span>
                      {upg.phoneticIPA && (
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                          IPA: {upg.phoneticIPA}
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400">
                        <strong className="text-red-400">Câu gốc bạn nói:</strong> "{upg.originalText}"
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-emerald-300 font-medium">
                          <strong className="text-emerald-400">Phiên bản Band 8.5+:</strong> "{upg.upgradedTextText}"
                        </p>
                        <button
                          onClick={() => speakNativeText(upg.upgradedTextText)}
                          className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 rounded-lg text-[10px] font-bold flex items-center gap-1 transition"
                        >
                          <Volume2 className="w-3 h-3 text-emerald-400" />
                          <span>Nghe phát âm chuẩn</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-slate-300 text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 italic">
                      💡 <strong>Giải thích lý do nâng điểm:</strong> {upg.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transcript Review & Recorded Audio Playback */}
          <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                Toàn Bộ Lời Thoại & File Ghi Âm Giọng Nói (Transcript & Recorded Audio)
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                ✓ Nghe lại trực tiếp file thu âm thực tế
              </span>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 max-h-80 overflow-y-auto space-y-3.5 text-xs">
              {turns.map((t, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${t.sender === 'candidate' ? 'bg-blue-950/40 border-blue-900/80 space-y-2' : 'bg-slate-800/60 border-slate-700/60'}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      {t.sender === 'candidate' ? <Mic className="w-3.5 h-3.5 text-emerald-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                      Part {t.part} - {t.sender === 'candidate' ? candidateName : 'Examiner'}
                    </span>
                    {t.durationSeconds ? (
                      <span className="text-[10px] font-mono text-slate-400">Thời lượng nói: {t.durationSeconds}s</span>
                    ) : null}
                  </div>

                  <p className="text-slate-200 leading-relaxed font-sans text-xs">{t.text}</p>

                  {/* Audio Player for Candidate Turn if audioUrl is present */}
                  {t.sender === 'candidate' && t.audioUrl && (
                    <div className="pt-2 border-t border-blue-900/60 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        File ghi âm giọng nói thực tế của bạn:
                      </span>
                      <audio controls src={t.audioUrl} className="w-full h-9 rounded-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition"
            >
              Đóng Báo Cáo
            </button>

            <button
              onClick={onRestartTest}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Bắt Đầu Luyện Bài Mới</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
