import React, { useState, useEffect } from 'react';
import { User, Volume2, CheckCircle2, RefreshCw, Sparkles, HelpCircle, Layers, ArrowUpRight, Clock } from 'lucide-react';
import { TopicItem, TurnMessage, InteractionAppMode } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { ensureCompleteTopicQuestions } from '../utils/topicNormalizer';

interface Part3SimulatorProps {
  topic: TopicItem;
  candidateName: string;
  turns: TurnMessage[];
  onAddTurn: (turn: TurnMessage) => void;
  onFinishTest: () => void;
  ttsEnabled: boolean;
  appMode?: InteractionAppMode;
}

export const Part3Simulator: React.FC<Part3SimulatorProps> = ({
  topic,
  candidateName,
  turns,
  onAddTurn,
  onFinishTest,
  ttsEnabled,
  appMode = 'practice'
}) => {

  const safeTopic = ensureCompleteTopicQuestions(topic);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const questions = safeTopic.part3Questions;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  useEffect(() => {
    if (ttsEnabled && currentQuestion) {
      speakText(`Part 3 discussion question. ${currentQuestion}`);
    }
  }, [currentQuestionIndex, ttsEnabled]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getQuestionTypeBadge = (index: number) => {
    const types = [
      { label: 'Time Comparison', tip: 'Dùng "used to" & cấu trúc so sánh: "whereas in contrast..."' },
      { label: '2026-2030 Future Prediction', tip: 'Dùng từ dự đoán: "It is quite probable that we might begin to see..."' },
      { label: 'Why & Root Causes', tip: 'Dùng từ thay thế "reason": "factors involved", "key motivations"' },
      { label: 'Pros & Cons / Solutions', tip: 'Dùng từ thay thế "advantage": "clear benefits", "obvious plus points"' }
    ];
    return types[index % types.length];
  };

  const handleCandidateResponse = async (transcript: string, audioUrl?: string, durationSeconds?: number) => {
    setIsProcessing(true);

    // 1. Add Candidate Turn
    const candidateTurn: TurnMessage = {
      id: `turn-candidate-p3-${Date.now()}`,
      sender: 'candidate',
      text: transcript,
      audioUrl,
      timestamp: Date.now(),
      part: 3,
      durationSeconds
    };
    onAddTurn(candidateTurn);

    // Check if more questions in Part 3
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];

      const examinerTurn: TurnMessage = {
        id: `turn-examiner-p3-${Date.now()}`,
        sender: 'examiner',
        text: nextQ,
        timestamp: Date.now(),
        part: 3
      };

      setTimeout(() => {
        onAddTurn(examinerTurn);
        setCurrentQuestionIndex(nextIdx);
        setIsProcessing(false);
      }, 800);
    } else {
      setIsProcessing(false);
    }
  };

  const isPart3Complete = currentQuestionIndex >= questions.length - 1 && turns.filter(t => t.part === 3 && t.sender === 'candidate').length >= questions.length;
  const questionTypeInfo = getQuestionTypeBadge(currentQuestionIndex);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-red-500/30 flex items-center justify-between">
        <div>
          <span className="bg-red-800 text-red-100 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            IELTS Speaking Part 3 (Two-way Abstract Discussion)
          </span>
          <h2 className="text-xl font-bold mt-1">{topic.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">Thảo luận chuyên sâu về các vấn đề xã hội, xu hướng tương lai 2026/2030 và lý luận logic (4-5 mins)</p>
        </div>
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
          <span className="text-xs text-slate-400 block">Tiến độ Part 3</span>
          <span className="font-mono text-sm font-bold text-amber-300">
            {Math.min(currentQuestionIndex + 1, questions.length)} / {questions.length} Câu Hỏi
          </span>
        </div>
      </div>

      {/* Conversation Feed */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 max-h-[380px] overflow-y-auto">
        {turns.filter(t => t.part === 3).length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            <Layers className="w-8 h-8 text-red-500 mx-auto mb-2" />
            Giám khảo bắt đầu hỏi các câu hỏi Part 3 thảo luận trừu tượng bên dưới.
          </div>
        ) : (
          turns.filter(t => t.part === 3).map((turn) => (
            <div
              key={turn.id}
              className={`flex gap-3 ${turn.sender === 'candidate' ? 'justify-end' : 'justify-start'}`}
            >
              {turn.sender === 'examiner' && (
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
                  EX
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  turn.sender === 'candidate'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p className="font-semibold text-xs mb-1 opacity-80 flex items-center justify-between">
                  <span>{turn.sender === 'candidate' ? candidateName : 'IELTS Examiner'}</span>
                  {turn.sender === 'examiner' && ttsEnabled && (
                    <button
                      onClick={() => speakText(turn.text)}
                      className="text-slate-500 hover:text-red-600 transition"
                      title="Nghe lại"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </p>
                <p>{turn.text}</p>
              </div>

              {turn.sender === 'candidate' && (
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Question Box & Strategy Badge */}
      {!isPart3Complete && (
        <div className="bg-slate-900 border-2 border-red-600/80 rounded-2xl p-5 shadow-xl text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wide">
              {questionTypeInfo.label}
            </span>
            {ttsEnabled && (
              <button
                onClick={() => speakText(currentQuestion)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Phát Âm Câu Hỏi</span>
              </button>
            )}
          </div>

          <h3 className="text-base font-bold text-white leading-snug">
            {currentQuestion}
          </h3>

          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-amber-300 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span><strong>Mẹo Mat Clark Strategy:</strong> {questionTypeInfo.tip}</span>
          </div>
        </div>
      )}

      {/* Audio Recorder Input */}
      {!isPart3Complete ? (
        <div className="space-y-2">
          <div className="p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Part 3 timing rule: Tối đa <strong>50 giây</strong> / mỗi câu trả lời thảo luận</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {appMode === 'exam' ? 'Thi thử: Tự động gửi khi hết 50s' : 'Luyện tập: Được thu âm lại'}
            </span>
          </div>

          <AudioRecorder
            onTranscriptComplete={handleCandidateResponse}
            isProcessing={isProcessing}
            maxDurationSeconds={50}
            appMode={appMode}
            placeholderText="Trả lời mở rộng với lý luận, dẫn chứng & từ vựng cao cấp cho câu hỏi Part 3 (Giới hạn 50s)..."
          />
        </div>
      ) : (
        <div className="bg-emerald-950/90 text-emerald-100 p-6 rounded-2xl border-2 border-emerald-500 shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
          <div>
            <h3 className="text-lg font-bold">Hoàn Thành IELTS Speaking Test!</h3>
            <p className="text-xs text-emerald-300 mt-1">Hệ thống AI Examiner đang phân tích toàn bộ bài nói của bạn theo 4 tiêu chí chuẩn IELTS.</p>
          </div>

          <button
            onClick={onFinishTest}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Xem Báo Cáo Chấm Điểm & Phân Tích Chi Tiết</span>
          </button>
        </div>
      )}

    </div>
  );
};
