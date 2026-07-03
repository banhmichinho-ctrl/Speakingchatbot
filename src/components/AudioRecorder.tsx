import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Square, Play, Pause, RefreshCw, AlertTriangle, Send, RotateCcw, ShieldAlert, Clock } from 'lucide-react';
import { InteractionAppMode } from '../types';

interface AudioRecorderProps {
  onTranscriptComplete: (transcript: string, audioUrl?: string, durationSeconds?: number) => void;
  isProcessing?: boolean;
  autoStart?: boolean;
  placeholderText?: string;
  maxDurationSeconds?: number;
  appMode?: InteractionAppMode;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptComplete,
  isProcessing = false,
  autoStart = false,
  placeholderText = "Bấm 'Bắt Đầu Nói' hoặc gõ câu trả lời của bạn vào đây...",
  maxDurationSeconds,
  appMode = 'practice'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [duration, setDuration] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check SpeechRecognition browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const next = prev + 1;
          if (maxDurationSeconds && next >= maxDurationSeconds) {
            handleTimeLimitReached();
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, maxDurationSeconds, appMode]);

  const handleTimeLimitReached = () => {
    stopRecording();
    if (appMode === 'exam') {
      // In Exam mode: automatically send answer when timer reaches limit!
      setTimeout(() => {
        handleSendResponse();
      }, 300);
    }
  };

  const startRecording = async () => {
    try {
      setMicPermissionDenied(false);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      // Setup SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setTranscript(currentTranscript.trim());
        };

        recognition.onerror = (err: any) => {
          console.warn('Speech recognition notice:', err);
        };

        recognition.start();
      }

      setIsRecording(true);
      setDuration(0);
      setRecordedAudioUrl(null);
    } catch (err: any) {
      console.error('Microphone error:', err);
      setMicPermissionDenied(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleReRecord = () => {
    stopRecording();
    setTranscript('');
    setManualText('');
    setRecordedAudioUrl(null);
    setDuration(0);
  };

  const handleSendResponse = () => {
    const finalContent = (transcript.trim() || manualText.trim());
    if (!finalContent) return;

    onTranscriptComplete(finalContent, recordedAudioUrl || undefined, duration);
    setTranscript('');
    setManualText('');
    setRecordedAudioUrl(null);
    setDuration(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlayAudio = () => {
    if (!audioPlayerRef.current || !recordedAudioUrl) return;
    if (isPlayingAudio) {
      audioPlayerRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const remainingSeconds = maxDurationSeconds ? Math.max(0, maxDurationSeconds - duration) : null;
  const progressPercent = maxDurationSeconds ? Math.min(100, (duration / maxDurationSeconds) * 100) : 0;

  return (
    <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-4 shadow-xl text-white space-y-4">
      
      {/* Mic Status & Live Timer */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {isRecording ? (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
          ) : (
            <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
          )}
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            {isRecording ? 'Đang Thu Âm Giọng Nói...' : 'Microphone Sẵn Sàng'}
          </span>
        </div>

        {/* Mode Indicator & Max Duration Banner */}
        <div className="flex items-center gap-2">
          {appMode === 'exam' ? (
            <span className="bg-amber-950 text-amber-300 border border-amber-600/60 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase">
              <ShieldAlert className="w-3 h-3 text-amber-400" /> Thi Thử: Không Cho Thu Âm Lại
            </span>
          ) : (
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-600/60 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase">
              <RotateCcw className="w-3 h-3 text-emerald-400" /> Luyện Tập: Được Thu Âm Lại
            </span>
          )}

          {/* Countdown Timer */}
          <div className={`font-mono text-xs font-extrabold px-3 py-1 rounded-lg border ${
            remainingSeconds !== null && remainingSeconds <= 5 && isRecording
              ? 'bg-red-900 text-red-100 border-red-500 animate-bounce'
              : 'bg-slate-800 text-amber-300 border-slate-700'
          }`}>
            <Clock className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
            {maxDurationSeconds ? (
              <span>Còn {formatTime(remainingSeconds || 0)} / {formatTime(maxDurationSeconds)}</span>
            ) : (
              <span>⏱️ {formatTime(duration)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Countdown Progress Bar */}
      {maxDurationSeconds && isRecording && (
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              remainingSeconds !== null && remainingSeconds <= 5 ? 'bg-red-500' : 'bg-amber-400'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Mic Permission Warning */}
      {micPermissionDenied && (
        <div className="p-3 bg-amber-950/60 border border-amber-600/50 rounded-xl text-amber-200 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            Không thể truy cập Microphone. Bạn hãy cho phép quyền dùng Micro trên trình duyệt hoặc gõ câu trả lời vào ô văn bản phía dưới.
          </div>
        </div>
      )}

      {/* Live Speech Transcript Preview */}
      <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 min-h-[80px] max-h-[140px] overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
          <span>Trích xuất giọng nói (Live Speech Transcript):</span>
          {transcript && <span className="text-[10px] text-emerald-400">Tự động nhận diện English</span>}
        </p>
        <p className="text-sm text-slate-100 italic leading-relaxed">
          {transcript || manualText || <span className="text-slate-500 not-italic">{placeholderText}</span>}
        </p>
      </div>

      {/* Text Fallback / Manual Edit Input (Available in Practice Mode or for editing) */}
      <div>
        <textarea
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          placeholder={appMode === 'exam' ? 'Gõ trực tiếp văn bản câu trả lời nếu không muốn nói...' : 'Hoặc gõ/chỉnh sửa văn bản câu trả lời của bạn tại đây nếu cần...'}
          rows={2}
          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        
        {/* Recording Controls */}
        <div className="flex items-center gap-2">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isProcessing}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <Mic className="w-4 h-4" />
              <span>Bắt Đầu Nói</span>
            </button>
          ) : (
            <button
              onClick={() => {
                stopRecording();
                if (appMode === 'exam') {
                  // In Exam mode: Stop recording & auto-send
                  setTimeout(() => handleSendResponse(), 200);
                }
              }}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition animate-pulse"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>{appMode === 'exam' ? 'Dừng Nói & Gửi Trực Tiếp' : 'Dừng Nói'}</span>
            </button>
          )}

          {/* Re-record Button (PRACTICE MODE ONLY) */}
          {appMode === 'practice' && (recordedAudioUrl || transcript || manualText) && !isRecording && (
            <button
              onClick={handleReRecord}
              disabled={isProcessing}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              title="Hủy kết quả thu âm này để nói lại"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Thu Âm Lại</span>
            </button>
          )}

          {/* Audio Playback Review if url exists (PRACTICE MODE ONLY) */}
          {appMode === 'practice' && recordedAudioUrl && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayAudio}
                className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1.5"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlayingAudio ? 'Tạm Dừng' : 'Nghe Lại'}</span>
              </button>
              <audio
                ref={audioPlayerRef}
                src={recordedAudioUrl}
                onEnded={() => setIsPlayingAudio(false)}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Send Response Button */}
        <button
          onClick={handleSendResponse}
          disabled={isProcessing || (!transcript.trim() && !manualText.trim())}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Giám Khảo Đang Xử Lý...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Gửi Câu Trả Lời</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
};
