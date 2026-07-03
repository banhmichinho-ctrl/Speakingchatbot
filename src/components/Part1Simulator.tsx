import React, { useState, useEffect } from 'react';
import { User, Volume2, ArrowRight, CheckCircle2, RefreshCw, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { TopicItem, TurnMessage, InteractionAppMode } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { ensureCompleteTopicQuestions } from '../utils/topicNormalizer';

interface Part1SimulatorProps {
  topic: TopicItem;
  candidateName: string;
  turns: TurnMessage[];
  onAddTurn: (turn: TurnMessage) => void;
  onNextPart: () => void;
  onFinishSinglePart: () => void;
  isFullTest: boolean;
  ttsEnabled: boolean;
  appMode?: InteractionAppMode;
}

export const Part1Simulator: React.FC<Part1SimulatorProps> = ({
  topic,
  candidateName,
  turns,
  onAddTurn,
  onNextPart,
  onFinishSinglePart,
  isFullTest,
  ttsEnabled,
  appMode = 'practice'
}) => {

  const safeTopic = ensureCompleteTopicQuestions(topic);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const questions = safeTopic.part1Questions;
  const currentQuestion = questions[currentQuestionIndex] || questions[0];

  useEffect(() => {
    // Speak examiner question using Web Speech TTS if enabled
    if (ttsEnabled && currentQuestion) {
      speakText(`Part 1. ${currentQuestion}`);
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

  const handleCandidateResponse = async (transcript: string, audioUrl?: string, durationSeconds?: number) => {
    setIsProcessing(true);

    // 1. Add Candidate Turn
    const candidateTurn: TurnMessage = {
      id: `turn-candidate-${Date.now()}`,
      sender: 'candidate',
      text: transcript,
      audioUrl,
      timestamp: Date.now(),
      part: 1,
      durationSeconds
    };
    onAddTurn(candidateTurn);

    // Check if more questions in Part 1
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      const nextQ = questions[nextIdx];

      // Add Examiner Question Turn
      const examinerTurn: TurnMessage = {
        id: `turn-examiner-${Date.now()}`,
        sender: 'examiner',
        text: nextQ,
        timestamp: Date.now(),
        part: 1
      };
      
      setTimeout(() => {
        onAddTurn(examinerTurn);
        setCurrentQuestionIndex(nextIdx);
        setIsProcessing(false);
      }, 800);
    } else {
      // Part 1 Completed
      setIsProcessing(false);
    }
  };

  const isPart1Complete = currentQuestionIndex >= questions.length - 1 && turns.filter(t => t.part === 1 && t.sender === 'candidate').length >= questions.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-red-500/30 flex items-center justify-between">
        <div>
          <span className="bg-red-800 text-red-100 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            IELTS Speaking Part 1
          </span>
          <h2 className="text-xl font-bold mt-1">{topic.title}</h2>
          <p className="text-xs text-slate-300 mt-0.5">Short questions on familiar topics, routines, lifestyle, hobbies & 2026 trends (4-5 mins)</p>
        </div>
        <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-right">
          <span className="text-xs text-slate-400 block">Tiến độ</span>
          <span className="font-mono text-sm font-bold text-amber-300">
            {Math.min(currentQuestionIndex + 1, questions.length)} / {questions.length} Câu Hỏi
          </span>
        </div>
      </div>

      {/* Main Conversation Feed */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 max-h-[420px] overflow-y-auto">
        {turns.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            <Sparkles className="w-8 h-8 text-red-500 mx-auto mb-2 animate-bounce" />
            Giám khảo đã sẵn sàng. Câu hỏi Part 1 đầu tiên được hiển thị bên dưới.
          </div>
        ) : (
          turns.map((turn) => (
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
                      title="Nghe lại giám khảo đọc"
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

      {/* Active Question Box */}
      {!isPart1Complete && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start justify-between gap-3 shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-0.5">
              Current Examiner Question ({currentQuestionIndex + 1}/{questions.length}):
            </span>
            <h3 className="text-base font-bold text-slate-900">{currentQuestion}</h3>
          </div>
          {ttsEnabled && (
            <button
              onClick={() => speakText(currentQuestion)}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition"
              title="Đọc lại câu hỏi"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Audio Recorder Input */}
      {!isPart1Complete ? (
        <div className="space-y-2">
          <div className="p-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Part 1 timing rule: Tối đa <strong>30 giây</strong> / mỗi câu trả lời</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {appMode === 'exam' ? 'Thi thử: Tự động gửi khi hết 30s' : 'Luyện tập: Được thu âm lại'}
            </span>
          </div>

          <AudioRecorder
            onTranscriptComplete={handleCandidateResponse}
            isProcessing={isProcessing}
            maxDurationSeconds={30}
            appMode={appMode}
            placeholderText="Bấm 'Bắt Đầu Nói' để thu âm câu trả lời của bạn (Giới hạn 30s)..."
          />
        </div>
      ) : (
        <div className="bg-emerald-950/90 text-emerald-100 p-6 rounded-2xl border-2 border-emerald-500 shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
          <div>
            <h3 className="text-lg font-bold">Hoàn Thành IELTS Speaking Part 1!</h3>
            <p className="text-xs text-emerald-300 mt-1">Bạn đã trả lời xuất sắc tất cả câu hỏi Part 1 của chủ đề này.</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {isFullTest ? (
              <button
                onClick={onNextPart}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <span>Chuyển Sang Part 2 (Cue Card & 1 Min Prep)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onFinishSinglePart}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Chấm Điểm Chi Tiết Part 1 Ngay</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
