import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Sparkles, X, ChevronRight, ChevronLeft, Volume2, Search, Filter, Lightbulb, Dna, Compass, Shuffle, Layers, PlusCircle, ShieldAlert, Grid, ArrowRight, RefreshCw, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { IELTS_TOPICS_2026 } from '../data/ieltsTopics2026';
import { DOMAINS_CONFIG, generateProceduralTopic } from '../data/topicBankData';
import { getCurrentQuarterYear, formatQuarterString, generateForecastForQuarter, saveForecastTopics } from '../data/forecastEngine';
import { TopicItem, MainDomain, InteractionAppMode } from '../types';
import { ensureCompleteTopicQuestions } from '../utils/topicNormalizer';

interface TopicBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopicForPractice: (topic: TopicItem) => void;
  appMode?: InteractionAppMode;
  onSelectRandomTopic?: () => void;
}

export const TopicBankModal: React.FC<TopicBankModalProps> = ({
  isOpen,
  onClose,
  onSelectTopicForPractice,
  appMode = 'practice',
  onSelectRandomTopic
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDomain, setActiveDomain] = useState<MainDomain | 'all'>('all');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [showSubGrid, setShowSubGrid] = useState(false);
  
  // Topic store state to allow adding generated topics dynamically
  const [topicsList, setTopicsList] = useState<TopicItem[]>(IELTS_TOPICS_2026);
  const [selectedTopic, setSelectedTopic] = useState<TopicItem>(IELTS_TOPICS_2026[0]);
  const [customTopicTitle, setCustomTopicTitle] = useState('');

  // Perpetual Forecast Generator State
  const liveQY = getCurrentQuarterYear();
  const [selectedQuarter, setSelectedQuarter] = useState<number>(liveQY.quarter);
  const [selectedYear, setSelectedYear] = useState<number>(liveQY.year);
  const [showForecastPanel, setShowForecastPanel] = useState<boolean>(false);
  const [forecastNotification, setForecastNotification] = useState<string | null>(null);

  // Function to dynamically update/generate forecast for any quarter & year
  const handleUpdateQuarterlyForecast = (q?: number, y?: number) => {
    const targetQ = q ?? selectedQuarter;
    const targetY = y ?? selectedYear;
    const newQuarterTopics = generateForecastForQuarter({ quarter: targetQ, year: targetY }, 8);

    const updated = [...newQuarterTopics, ...topicsList];
    setTopicsList(updated);
    
    // Save generated forecast topics to localStorage
    const onlyForecasts = updated.filter(t => t.id.startsWith('forecast-'));
    saveForecastTopics(onlyForecasts);

    if (newQuarterTopics.length > 0) {
      setSelectedTopic(newQuarterTopics[0]);
    }

    setForecastNotification(`⚡ Đã tự động cập nhật & nạp 8 đề thi IELTS Speaking Forecast MỚI NHẤT cho Quý Q${targetQ}/${targetY}!`);
    setTimeout(() => setForecastNotification(null), 6000);
  };

  // Refs for horizontal scrolling
  const domainNavRef = useRef<HTMLDivElement>(null);
  const subCategoryNavRef = useRef<HTMLDivElement>(null);

  const scrollNav = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter topics based on search, main domain, and subcategory
  const filteredTopics = topicsList.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          topic.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (topic.subCategoryVi && topic.subCategoryVi.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = activeDomain === 'all' || topic.domain === activeDomain;
    const matchesSub = activeSubCategory === 'all' || topic.subCategoryVi === activeSubCategory || topic.tag === activeSubCategory;

    return matchesSearch && matchesDomain && matchesSub;
  });

  // Auto-generate topic for active subcategory if none found
  useEffect(() => {
    if (!isOpen) return;
    if (activeSubCategory !== 'all') {
      const hasTopic = topicsList.some(t => t.subCategoryVi === activeSubCategory || t.tag === activeSubCategory);
      if (!hasTopic) {
        let foundDomain: MainDomain = 'daily_life';
        let foundSubId = 'sub';
        for (const d of DOMAINS_CONFIG) {
          const s = d.subCategories.find(sub => sub.nameVi === activeSubCategory);
          if (s) {
            foundDomain = d.id;
            foundSubId = s.id;
            break;
          }
        }
        const newTopic = generateProceduralTopic(foundDomain, foundSubId, activeSubCategory);
        setTopicsList(prev => [newTopic, ...prev]);
        setSelectedTopic(newTopic);
      }
    }
  }, [isOpen, activeSubCategory, topicsList]);

  if (!isOpen) return null;

  // Handle procedural topic generation (10,000+ combinations)
  const handleGenerateProcedural = (domainToUse?: MainDomain, subCatNameToUse?: string) => {
    const targetDomain = domainToUse || (activeDomain !== 'all' ? activeDomain : 'daily_life');
    const domainObj = DOMAINS_CONFIG.find(d => d.id === targetDomain) || DOMAINS_CONFIG[0];
    const subCatObj = domainObj.subCategories[Math.floor(Math.random() * domainObj.subCategories.length)];
    
    const subName = subCatNameToUse || subCatObj.nameVi;
    const newTopic = generateProceduralTopic(
      targetDomain,
      subCatObj.id,
      subName,
      customTopicTitle.trim() ? customTopicTitle.trim() : undefined
    );

    setTopicsList(prev => [newTopic, ...prev]);
    setSelectedTopic(newTopic);
    setCustomTopicTitle('');
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-GB';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl max-w-6xl w-full my-4 border-2 border-red-600 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-slate-900 p-4 sm:p-5 text-white flex flex-wrap items-center justify-between gap-3 border-b border-red-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl border border-white/20">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-200 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
                  Kho Đề Thi 10,000+ Topics
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-1 shadow-sm">
                  <Zap className="w-3 h-3 text-amber-400 animate-pulse" /> Live Forecast: Q{liveQY.quarter}/{liveQY.year} (Cập nhật Vĩnh Viễn)
                </span>
                {appMode === 'exam' ? (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 text-amber-400" /> 🎲 Chế độ Thi Thử (Random Đề)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                    Phù Hợp HSSV & Bạn Trẻ
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">Kho Đề Thi IELTS Speaking Toàn Diện (Forecast Q{liveQY.quarter}/{liveQY.year})</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForecastPanel(!showForecastPanel)}
              className={`px-3.5 py-2 rounded-xl font-extrabold text-xs shadow-lg transition border flex items-center gap-1.5 ${
                showForecastPanel
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20'
                  : 'bg-red-950/90 text-amber-300 border-amber-500/50 hover:bg-red-900'
              }`}
              title="Mở Bảng Điều Khiển Cập Nhật Forecast Vĩnh Viễn Cho Mọi Quý"
            >
              <RefreshCw className={`w-4 h-4 text-amber-300 ${showForecastPanel ? 'animate-spin' : ''}`} />
              <span>⚡ Cập Nhật Forecast Quý (Auto Engine)</span>
            </button>

            <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Perpetual Forecast Auto-Generator Panel Drawer */}
        {showForecastPanel && (
          <div className="p-4 bg-slate-950 border-b-2 border-red-500 text-xs space-y-3 shrink-0 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-white text-xs">
                  Trình Tự Động Cập Nhật & Sinh Đề Forecast Theo Quý (Perpetual Forecast Generator)
                </h3>
              </div>
              <span className="text-[10px] text-amber-300 font-mono bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                Live System Date: Q{liveQY.quarter}/{liveQY.year}
              </span>
            </div>

            <p className="text-slate-300 text-[11px]">
              Ứng dụng hỗ trợ cập nhật tự động bộ đề thi IELTS Speaking Forecast chuẩn cấu trúc Part 1, Part 2 Cue Card & Part 3 cho <strong>BẤT KỲ QUÝ & NĂM NÀO TRONG TƯƠNG LAI VĨNH VIỄN</strong>. Bạn có thể chọn Quý mục tiêu dưới đây và nhấn nút Cập Nhật:
            </p>

            <div className="flex flex-wrap items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300">Chọn Quý:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map(q => (
                    <button
                      key={q}
                      onClick={() => setSelectedQuarter(q)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs border transition ${
                        selectedQuarter === q
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      Q{q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-300">Chọn Năm:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="bg-slate-950 text-amber-300 border border-slate-800 font-bold px-3 py-1 rounded-lg text-xs outline-none focus:border-amber-500"
                >
                  {[2026, 2027, 2028, 2029, 2030, 2031, 2032].map(y => (
                    <option key={y} value={y}>Năm {y}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleUpdateQuarterlyForecast(selectedQuarter, selectedYear)}
                className="ml-auto px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg border border-amber-400/40 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>⚡ Cập Nhật Forecast Q{selectedQuarter}/{selectedYear} Ngay</span>
              </button>
            </div>
          </div>
        )}

        {/* Forecast Notification Toast */}
        {forecastNotification && (
          <div className="bg-emerald-950 border-b border-emerald-500/50 p-3 px-5 text-xs text-emerald-200 flex items-center gap-2 shrink-0 animate-fadeIn font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{forecastNotification}</span>
          </div>
        )}

        {/* Exam Mode Special Banner */}
        {appMode === 'exam' && (
          <div className="bg-amber-950/80 border-b border-amber-600/60 p-3 px-5 text-xs text-amber-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-white font-bold block">Chế độ Thi Thử (Random Topic Assignment):</strong>
                <span>Trong phòng thi thật, giám khảo sẽ bốc đề ngẫu nhiên! Bạn không thể tự chọn đề thi trong chế độ này để rèn phản xạ.</span>
              </div>
            </div>
            <button
              onClick={() => {
                if (onSelectRandomTopic) {
                  onSelectRandomTopic();
                } else {
                  const rand = IELTS_TOPICS_2026[Math.floor(Math.random() * IELTS_TOPICS_2026.length)];
                  setSelectedTopic(rand);
                  onSelectTopicForPractice(rand);
                }
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-lg border border-amber-400/40 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>🎲 Bốc Đề Ngẫu Nhiên Khác</span>
            </button>
          </div>
        )}

        {/* Domain Tabs Navigation (4 Main Domains) with Scroll Buttons & Custom Scrollbar */}
        <div className="relative bg-slate-950 border-b border-slate-800 p-2 flex items-center shrink-0">
          <button
            onClick={() => scrollNav(domainNavRef, 'left')}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 mr-2 shrink-0 transition"
            title="Cuộn sang trái"
          >
            <ChevronLeft className="w-4 h-4 text-slate-300" />
          </button>

          <div
            ref={domainNavRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-red-600/70 scrollbar-track-slate-900 pb-1 flex-1"
          >
            <button
              onClick={() => {
                setActiveDomain('all');
                setActiveSubCategory('all');
              }}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                activeDomain === 'all'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tất Cả Kho Đề</span>
            </button>

            {DOMAINS_CONFIG.map(domain => (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveDomain(domain.id);
                  setActiveSubCategory('all');
                }}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                  activeDomain === domain.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <span>{domain.titleVi}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollNav(domainNavRef, 'right')}
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 ml-2 shrink-0 transition"
            title="Cuộn sang phải"
          >
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </button>

          <button
            onClick={() => setShowSubGrid(!showSubGrid)}
            className={`ml-2 px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 border shrink-0 ${
              showSubGrid
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow'
                : 'bg-slate-900 text-amber-400 border-amber-500/40 hover:bg-slate-800'
            }`}
            title="Hiển thị lưới phân loại tất cả nhóm nhỏ"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lưới Nhóm Nhỏ</span>
          </button>
        </div>

        {/* Expanded Subcategories Grid Drawer (When showSubGrid is true) */}
        {showSubGrid && (
          <div className="p-4 bg-slate-950/95 border-b-2 border-amber-500/50 max-h-72 overflow-y-auto space-y-4 text-xs shrink-0 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-extrabold text-amber-300 text-xs flex items-center gap-2">
                <Grid className="w-4 h-4 text-amber-400" />
                <span>Bảng Phân Loại Chi Tiết Tất Cả Nhóm Nhỏ (Select Subcategory)</span>
              </h3>
              <button
                onClick={() => setShowSubGrid(false)}
                className="text-slate-400 hover:text-white text-[11px] underline"
              >
                Đóng lưới nhóm
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {DOMAINS_CONFIG.map(domain => (
                <div key={domain.id} className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="font-bold text-red-400 text-[11px] truncate">{domain.titleVi}</h4>
                  <div className="space-y-1">
                    {domain.subCategories.map(sub => {
                      const count = topicsList.filter(t => t.subCategoryVi === sub.nameVi || t.tag === sub.nameVi).length;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setActiveDomain(domain.id);
                            setActiveSubCategory(sub.nameVi);
                            setShowSubGrid(false);
                          }}
                          className={`w-full text-left p-1.5 rounded-lg border text-[11px] transition flex items-center justify-between ${
                            activeDomain === domain.id && activeSubCategory === sub.nameVi
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                              : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{sub.nameVi}</span>
                          <span className="text-[9px] bg-slate-800 text-amber-300 px-1.5 py-0.2 rounded font-mono shrink-0 ml-1">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subcategories Chips & Search Bar */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 space-y-2.5 shrink-0">
          
          {/* Subcategories selector bar with scroll controls */}
          <div className="relative flex items-center">
            <button
              onClick={() => scrollNav(subCategoryNavRef, 'left')}
              className="p-1 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-md border border-slate-800 mr-1.5 shrink-0"
              title="Cuộn nhóm nhỏ sang trái"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div
              ref={subCategoryNavRef}
              className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs scrollbar-thin scrollbar-thumb-amber-600/70 scrollbar-track-slate-950 flex-1"
            >
              <span className="text-slate-400 font-bold text-[10px] mr-1 uppercase tracking-wider shrink-0">Phân loại:</span>
              <button
                onClick={() => setActiveSubCategory('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold border whitespace-nowrap shrink-0 ${
                  activeSubCategory === 'all'
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Tất cả nhóm nhỏ
              </button>

              {/* Show subcategories from selected domain, or all subcategories if activeDomain === 'all' */}
              {(activeDomain === 'all'
                ? DOMAINS_CONFIG.flatMap(d => d.subCategories)
                : DOMAINS_CONFIG.find(d => d.id === activeDomain)?.subCategories || []
              ).map(sub => {
                const count = topicsList.filter(t => t.subCategoryVi === sub.nameVi || t.tag === sub.nameVi).length;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubCategory(sub.nameVi)}
                    className={`px-2.5 py-1 rounded-lg font-semibold border whitespace-nowrap shrink-0 flex items-center gap-1.5 transition ${
                      activeSubCategory === sub.nameVi
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                    title={sub.youthAngle}
                  >
                    <span>{sub.nameVi}</span>
                    {count > 0 && (
                      <span className="text-[9px] bg-slate-800 text-amber-300 px-1.5 py-0.2 rounded font-mono">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollNav(subCategoryNavRef, 'right')}
              className="p-1 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-md border border-slate-800 ml-1.5 shrink-0"
              title="Cuộn nhóm nhỏ sang phải"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search Bar & Procedural Topic Generator Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm từ khóa (ví dụ: AI, lạm phát, vô thường, sức khỏe tâm thần, vũ trụ)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Custom Topic Quick Generator */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customTopicTitle}
                onChange={(e) => setCustomTopicTitle(e.target.value)}
                placeholder="Nhập chủ đề tùy chọn bạn muốn..."
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-44 sm:w-56"
              />
              <button
                onClick={() => handleGenerateProcedural()}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 whitespace-nowrap border border-amber-400/40"
                title="Tạo ngẫu nhiên hoặc tạo bộ câu hỏi IELTS theo từ khóa bạn nhập"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-200" />
                <span>Tạo Đề Mới (10,000+ Topics)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Topic List Column (4 cols) */}
          <div className="md:col-span-4 bg-slate-950/70 border-r border-slate-800 p-3 overflow-y-auto space-y-2">
            {filteredTopics.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs space-y-3">
                <p>Không tìm thấy đề trùng khớp với từ khóa tìm kiếm.</p>
                <button
                  onClick={() => handleGenerateProcedural()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl"
                >
                  Tạo Đề Thi Cho Từ Khóa Này
                </button>
              </div>
            ) : (
              filteredTopics.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    selectedTopic.id === topic.id
                      ? 'bg-red-950/50 border-red-500 text-white shadow-lg ring-1 ring-red-500/50'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-red-900/80 text-red-200 border border-red-700/50 uppercase">
                      {topic.subCategoryVi || topic.tag}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 line-clamp-2">{topic.title}</h4>
                  {topic.youthAngleNote && (
                    <p className="text-[10px] text-amber-300/80 mt-1 line-clamp-1 italic">
                      💡 {topic.youthAngleNote}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Topic Detail View Column (8 cols) */}
          {(() => {
            const safeSelectedTopic = ensureCompleteTopicQuestions(selectedTopic);
            return (
              <div className="md:col-span-8 p-5 overflow-y-auto space-y-6 bg-slate-900">
                
                {/* Header detail */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-950 px-2 py-0.5 rounded border border-red-800">
                        {safeSelectedTopic.subCategoryVi || safeSelectedTopic.tag}
                      </span>
                      <span className="text-[10px] text-slate-400">{safeSelectedTopic.yearCategory}</span>
                    </div>
                    <h3 className="text-lg font-black text-white">{safeSelectedTopic.title}</h3>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTopicForPractice(safeSelectedTopic);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 border border-red-400/40"
                  >
                    <span>Bắt Đầu Luyện Đề Này Ngay</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Youth Angle Relatability Note */}
                {safeSelectedTopic.youthAngleNote && (
                  <div className="bg-amber-950/40 border border-amber-600/60 p-3.5 rounded-2xl text-xs text-amber-200 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-amber-300 uppercase block text-[10px] tracking-wider mb-0.5">
                        Góc Nhìn Gần Gũi Cho Học Sinh - Sinh Viên & Bạn Trẻ:
                      </span>
                      <span>{safeSelectedTopic.youthAngleNote}</span>
                    </div>
                  </div>
                )}

                {/* Part 1 Questions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Part 1 Questions (Daily Warm-up):</span>
                  </h4>
                  <ul className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200">
                    {safeSelectedTopic.part1Questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold bg-sky-950 px-1.5 py-0.5 rounded text-[10px] border border-sky-800">Q{idx + 1}</span>
                        <span className="mt-0.5">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Part 2 Cue Card */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Part 2 Cue Card Topic:</h4>
                  <div className="bg-amber-950/20 border border-amber-600/50 p-4.5 rounded-2xl text-xs text-amber-100 space-y-2.5 shadow-inner">
                    <p className="font-bold text-sm text-white">{safeSelectedTopic.part2CueCard.topic}</p>
                    <p className="font-semibold text-amber-300 text-[11px] uppercase tracking-wide">You should say:</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      {safeSelectedTopic.part2CueCard.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Part 3 Discussion Questions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">Part 3 Abstract & Philosophical Discussion:</h4>
                  <ul className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200">
                    {safeSelectedTopic.part3Questions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold bg-purple-950 px-1.5 py-0.5 rounded text-[10px] border border-purple-800">P3.{idx + 1}</span>
                        <span className="mt-0.5">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Vocabulary, Phrasal Verbs & Collocations */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Phrasal Verbs & High-Band Vocabulary:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {safeSelectedTopic.keyVocabulary.map((vocab, idx) => (
                      <div key={idx} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-300 text-sm">{vocab.word}</span>
                          <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase font-semibold">
                            {vocab.type}
                          </span>
                        </div>
                        {vocab.ipa && <p className="text-[10px] text-slate-500 font-mono">{vocab.ipa}</p>}
                        <p className="text-slate-300">{vocab.meaning}</p>
                        <p className="text-slate-400 italic text-[11px] bg-slate-900 p-2 rounded-xl border border-slate-800/80">
                          "{vocab.example}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Band 8.5 Model Answer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" /> Band 8.5 Speech Response Outline:
                    </h4>
                    <button
                      onClick={() => speakText(safeSelectedTopic.sampleAnswerBand8)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Nghe Đọc Mẫu</span>
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 leading-relaxed italic">
                    "{safeSelectedTopic.sampleAnswerBand8}"
                  </div>
                </div>

              </div>
            );
          })()}

        </div>

      </div>
    </div>
  );
};
