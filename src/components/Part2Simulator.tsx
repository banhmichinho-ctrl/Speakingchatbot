import React, { useState, useEffect, useRef } from 'react';
import { Timer, Edit3, Mic, CheckCircle2, Volume2, Sparkles, ArrowRight, Lightbulb, FileText, Clock } from 'lucide-react';
import { TopicItem, TurnMessage, InteractionAppMode } from '../types';
import { AudioRecorder } from './AudioRecorder';
import { ensureCompleteTopicQuestions } from '../utils/topicNormalizer';

interface Part2SimulatorProps {
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

export const Part2Simulator: React.FC<Part2SimulatorProps> = ({
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
  const [prepTimeLeft, setPrepTimeLeft] = useState(60); // 60 seconds prep
  const [isPrepActive, setIsPrepActive] = useState(false);
  const [prepCompleted, setPrepCompleted] = useState(false);
  const [notesText, setNotesText] = useState('');
  
  const [speakingPhase, setSpeakingPhase] = useState<'not_started' | 'speaking' | 'rounding_question' | 'completed'>('not_started');
  const [speechTimeLeft, setSpeakingTimeLeft] = useState(120); // 2 min speech
  const [roundingOffAsked, setRoundingOffAsked] = useState(false);

  const prepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cueCard = safeTopic.part2CueCard;

  // Handle 1-min prep timer
  useEffect(() => {
    if (isPrepActive && prepTimeLeft > 0) {
      prepTimerRef.current = setInterval(() => {
        setPrepTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (prepTimeLeft === 0) {
      setIsPrepActive(false);
      setPrepCompleted(true);
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    }

    return () => {
      if (prepTimerRef.current) clearInterval(prepTimerRef.current);
    };
  }, [isPrepActive, prepTimeLeft]);

  const startPrepTimer = () => {
    setIsPrepActive(true);
    setPrepTimeLeft(60);
    setPrepCompleted(false);
  };

  const handleStartSpeaking = () => {
    setIsPrepActive(false);
    setPrepCompleted(true);
    setSpeakingPhase('speaking');
  };

  const handleSpeechSubmitted = (transcript: string, audioUrl?: string, durationSeconds?: number) => {
    // Save Part 2 Candidate Long Turn
    const turn: TurnMessage = {
      id: `turn-part2-${Date.now()}`,
      sender: 'candidate',
      text: transcript,
      audioUrl,
      timestamp: Date.now(),
      part: 2,
      durationSeconds
    };
    onAddTurn(turn);

    // Ask Rounding-off Question
    const roundingQText = `Thank you for your response. Do you think other people in your country share a similar perspective on this?`;
    const roundingTurn: TurnMessage = {
      id: `turn-rounding-${Date.now()}`,
      sender: 'examiner',
      text: roundingQText,
      timestamp: Date.now(),
      part: 2
    };

    onAddTurn(roundingTurn);
    setSpeakingPhase('rounding_question');
    setRoundingOffAsked(true);

    if (ttsEnabled) {
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(roundingQText);
        u.lang = 'en-GB';
        window.speechSynthesis.speak(u);
      }
    }
  };

  const handleRoundingResponse = (transcript: string) => {
    const turn: TurnMessage = {
      id: `turn-rounding-ans-${Date.now()}`,
      sender: 'candidate',
      text: transcript,
      timestamp: Date.now(),
      part: 2
    };
    onAddTurn(turn);
    setSpeakingPhase('completed');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-red-500/30 flex items-center justify-between">
        <div>
          <span className="bg-red-800 text-red-100 text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            IELTS Speaking Part 2 (The Individual Long Turn)
          </span>
          <h2 className="text-xl font-bold mt-1">Cue Card & 1-Min Preparation</h2>
          <p className="text-xs text-slate-300 mt-0.5">Nói tự do từ 1 đến 2 phút dựa trên chủ đề Cue Card được cấp.</p>
        </div>
        <div className="text-right bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
          <span className="text-[10px] text-slate-400 block uppercase font-semibold">Thời Gian Chuẩn Bị</span>
          <span className={`font-mono text-lg font-black ${prepTimeLeft <= 10 && isPrepActive ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
            00:{prepTimeLeft.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Main Cue Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Cue Card Frame (8 cols) */}
        <div className="md:col-span-7 bg-amber-50/80 border-2 border-amber-300/80 rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-200/80 text-amber-900 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl border-l border-b border-amber-300">
            OFFICIAL IELTS CUE CARD
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-3 pr-20 leading-snug">
            {cueCard.topic}
          </h3>

          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">You should say:</p>
          <ul className="space-y-2 mb-6">
            {cueCard.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-800 font-medium">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-amber-200/80 flex items-center justify-between">
            <span className="text-xs text-amber-800 font-medium">
              You will have 1 minute to make notes and 1-2 minutes to speak.
            </span>
          </div>
        </div>

        {/* Note-Taking Scratchpad (5 cols) */}
        <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-red-600" /> Giấy Nháp (Note-taking Pad)
              </label>
              <button
                type="button"
                onClick={startPrepTimer}
                disabled={isPrepActive}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-[11px] rounded-lg shadow transition flex items-center gap-1"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{isPrepActive ? 'Đang Đếm Ngược...' : 'Bắt Đầu 1 Min Prep'}</span>
              </button>
            </div>

            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Ghi chú các từ vựng, phrasal verbs, ý chính cho 4 gạch đầu dòng tại đây... (Ví dụ: - ChatGPT / - hashing out essays / - chip in ideas / - 2nd conditional)..."
              rows={6}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Mat Clark Fluency Formula Tips */}
          <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Mẹo Mat Clark cho Part 2:
            </div>
            <p className="leading-tight">Dùng mẫu câu nối cho 4 gạch đầu dòng: "I guess I could start off by touching on...", "Going on to my next point which is...", "And now with reference to why...", "Finally, if time permits..."</p>
          </div>
        </div>

      </div>

      {/* Speech Phase Input or Rounding Question */}
      {speakingPhase === 'not_started' && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 text-center shadow-lg border border-slate-800 space-y-3">
          <h3 className="text-base font-bold text-slate-100">Sẵn Sàng Nói Part 2 (1-2 Phút)?</h3>
          <p className="text-xs text-slate-400">
            {prepCompleted 
              ? 'Hết thời gian chuẩn bị! Bấm nút bên dưới để bật micro và trình bày bài nói của bạn.'
              : 'Bạn có thể đếm ngược 1 phút chuẩn bị hoặc bấm bắt đầu nói ngay nếu đã sẵn sàng.'}
          </p>
          <button
            onClick={handleStartSpeaking}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-red-600/30 transition animate-bounce inline-flex items-center gap-2"
          >
            <Mic className="w-5 h-5" />
            <span>Bắt Đầu Trình Bày Bài Nói Part 2</span>
          </button>
        </div>
      )}

      {speakingPhase === 'speaking' && (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-700 text-white p-3.5 rounded-xl flex items-center justify-between text-xs flex-wrap gap-2">
            <span className="font-bold text-red-400 flex items-center gap-1.5">
              <Mic className="w-4 h-4 animate-pulse text-red-500" />
              <span>Đang thu âm Part 2: Trình bày bài nói từ <strong>1 đến 2 phút (Tối đa 120 giây)</strong></span>
            </span>
            <span className="text-amber-300 font-mono bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              {appMode === 'exam' ? 'Thi thử: Tự động gửi khi hết 120s' : 'Luyện tập: Có thể thu âm lại'}
            </span>
          </div>

          <AudioRecorder
            onTranscriptComplete={(transcript, url, durationSec) => handleSpeechSubmitted(transcript, url, durationSec)}
            maxDurationSeconds={120}
            appMode={appMode}
            placeholderText="Trình bày bài nói Part 2 của bạn dựa trên Cue Card & giấy nháp (Giới hạn 2 phút)..."
          />
        </div>
      )}

      {speakingPhase === 'rounding_question' && (
        <div className="bg-slate-900 border-2 border-blue-500/50 rounded-2xl p-5 shadow-xl text-white space-y-4">
          <div className="flex items-start gap-3 bg-blue-950/60 p-3.5 rounded-xl border border-blue-500/30">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              EX
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Examiner Rounding-Off Question:</span>
              <p className="text-sm font-semibold text-white mt-0.5">
                Thank you for your response. Do you think other people in your country share a similar perspective on this?
              </p>
            </div>
          </div>

          <AudioRecorder
            onTranscriptComplete={(transcript) => handleRoundingResponse(transcript)}
            maxDurationSeconds={30}
            appMode={appMode}
            placeholderText="Trả lời ngắn gọn 1-2 câu cho câu hỏi rounding-off (Giới hạn 30s)..."
          />
        </div>
      )}

      {speakingPhase === 'completed' && (
        <div className="bg-emerald-950/90 text-emerald-100 p-6 rounded-2xl border-2 border-emerald-500 shadow-xl text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
          <div>
            <h3 className="text-lg font-bold">Hoàn Thành IELTS Speaking Part 2!</h3>
            <p className="text-xs text-emerald-300 mt-1">Bài nói Part 2 và câu hỏi phụ đã được lưu lại thành công.</p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {isFullTest ? (
              <button
                onClick={onNextPart}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <span>Chuyển Sang Part 3 (Deep Discussion)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onFinishSinglePart}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Chấm Điểm Chi Tiết Part 2 Ngay</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
