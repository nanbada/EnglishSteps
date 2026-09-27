import React, { useState, useEffect } from 'react';
import { 
  VSTFSentence, 
  VSTFLine, 
  GrammaticalRole,
  GrammarTermMode,
  getRoleDisplayName
} from '../types/vstf';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Edit3, 
  ArrowLeft, 
  ArrowRight,
  CornerDownRight,
  Plus,
  Minus,
  RotateCcw,
  PenTool,
  Presentation,
  Play,
  HelpCircle,
  Eye
} from 'lucide-react';
import { FontMode } from './Header';
import { ttsService } from '../lib/ttsService';

interface CascadeViewerProps {
  sentence: VSTFSentence;
  showGuides: boolean;
  showGrammarColors: boolean;
  grammarTermMode?: GrammarTermMode;
  fontMode: FontMode;
  indentSpaces: number;
  fontSize: 'sm' | 'md' | 'lg';
  onUpdateLine?: (lineId: string, updated: Partial<VSTFLine>) => void;
  onAddLine?: (afterLineId: string) => void;
  onRemoveLine?: (lineId: string) => void;
  isAiResult?: boolean;
  onOpenQuiz?: () => void;
}

const ROLE_COLORS: Record<GrammaticalRole, { text: string; bg: string; border: string; badge: string }> = {
  subject: {
    text: 'text-indigo-950 font-bold',
    bg: 'bg-indigo-50/70',
    border: 'border-indigo-400',
    badge: 'bg-indigo-100 text-indigo-800'
  },
  predicate: {
    text: 'text-emerald-950 font-bold',
    bg: 'bg-emerald-50/70',
    border: 'border-emerald-400',
    badge: 'bg-emerald-100 text-emerald-800'
  },
  object: {
    text: 'text-amber-950 font-medium',
    bg: 'bg-amber-50/60',
    border: 'border-amber-400',
    badge: 'bg-amber-100 text-amber-800'
  },
  complement: {
    text: 'text-teal-950 font-medium',
    bg: 'bg-teal-50/60',
    border: 'border-teal-400',
    badge: 'bg-teal-100 text-teal-800'
  },
  prepositional: {
    text: 'text-sky-950 font-normal',
    bg: 'bg-sky-50/60',
    border: 'border-sky-400',
    badge: 'bg-sky-100 text-sky-800'
  },
  modifier: {
    text: 'text-slate-800 font-normal',
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    badge: 'bg-slate-200 text-slate-700'
  },
  dependent: {
    text: 'text-sky-950 font-normal',
    bg: 'bg-sky-50/60',
    border: 'border-sky-400',
    badge: 'bg-sky-100 text-sky-800'
  },
  introductory: {
    text: 'text-purple-950 font-medium',
    bg: 'bg-purple-50/80',
    border: 'border-purple-400',
    badge: 'bg-purple-100 text-purple-800'
  },
  conjunction: {
    text: 'text-rose-700 font-extrabold',
    bg: 'bg-rose-50/80',
    border: 'border-rose-400',
    badge: 'bg-rose-100 text-rose-800'
  },
  relative_clause: {
    text: 'text-indigo-800 font-medium',
    bg: 'bg-indigo-50/60',
    border: 'border-indigo-300',
    badge: 'bg-indigo-100 text-indigo-700'
  },
  subordinate_clause: {
    text: 'text-purple-900 font-medium',
    bg: 'bg-purple-50/60',
    border: 'border-purple-300',
    badge: 'bg-purple-100 text-purple-700'
  }
};

export const CascadeViewer: React.FC<CascadeViewerProps> = ({
  sentence,
  showGuides,
  showGrammarColors,
  grammarTermMode = 'student',
  fontMode,
  indentSpaces,
  fontSize,
  onUpdateLine,
  onAddLine,
  onRemoveLine,
  isAiResult,
  onOpenQuiz
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingLineId, setPlayingLineId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.8); // Default 0.8 for elementary/middle school
  const [activeHoverLineId, setActiveHoverLineId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Step Reveal Mode for Smart Board / Classroom Interaction
  const [isStepRevealMode, setIsStepRevealMode] = useState(false);
  const [revealedStepCount, setRevealedStepCount] = useState(1);

  // Stop audio playback if sentence changes
  useEffect(() => {
    setRevealedStepCount(1);
    return () => {
      ttsService.stop();
    };
  }, [sentence.id]);

  // Keyboard shortcut for Step Reveal Mode (Space or ArrowRight)
  useEffect(() => {
    if (!isStepRevealMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setRevealedStepCount((prev) => Math.min(sentence.lines.length, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setRevealedStepCount((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStepRevealMode, sentence.lines.length]);

  // Generate plain indented text
  const plainIndentedText = sentence.lines
    .map((line) => `${' '.repeat(line.indent * indentSpaces)}${line.text}`)
    .join('\n');

  // Copy handler
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(plainIndentedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  // High quality Natural TTS
  const handlePlayTTS = () => {
    if (isPlayingAudio) {
      ttsService.stop();
      setIsPlayingAudio(false);
      setPlayingLineId(null);
      return;
    }

    ttsService.speak(sentence.originalText, {
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false);
        setPlayingLineId(null);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setPlayingLineId(null);
      },
      rate: speechRate
    });
  };

  // Play single line TTS for chunk-level repetition practice
  const handlePlayLine = (lineId: string, text: string) => {
    ttsService.stop();
    setPlayingLineId(lineId);
    setIsPlayingAudio(true);

    ttsService.speak(text, {
      onStart: () => {
        setIsPlayingAudio(true);
        setPlayingLineId(lineId);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setPlayingLineId(null);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setPlayingLineId(null);
      },
      rate: speechRate
    });
  };

  // Typography font class
  const fontClass =
    fontMode === 'mono'
      ? 'font-mono-vstf'
      : fontMode === 'serif'
      ? 'font-serif-vstf'
      : 'font-sans-vstf';

  // Classroom font size class
  const textSizeClass =
    fontSize === 'sm'
      ? 'text-sm leading-relaxed'
      : fontSize === 'lg'
      ? 'text-xl leading-loose'
      : 'text-base leading-relaxed';

  // Indent unit in pixels: indent * indentSpaces * multiplier
  const indentPx = indentSpaces * (fontSize === 'lg' ? 18 : 14);

  const hoveredLine = sentence.lines.find((l) => l.id === activeHoverLineId);

  // Visible lines in step reveal mode
  const visibleLines = isStepRevealMode
    ? sentence.lines.slice(0, revealedStepCount)
    : sentence.lines;

  const nextStepLine = isStepRevealMode && revealedStepCount < sentence.lines.length
    ? sentence.lines[revealedStepCount]
    : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden vstf-card transition-all">
      {/* Top Banner & Action Controls */}
      <div className="bg-slate-50/90 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {isAiResult ? (
            <span className="inline-flex items-center gap-1.5 text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200 text-[11px] sm:text-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              AI 구문분석 완료
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-slate-700 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-[11px] sm:text-xs shadow-2xs">
              실시간 사다리
            </span>
          )}

          <span className="text-slate-300">|</span>

          <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
            총 <strong className="text-slate-900">{sentence.lines.length}</strong>단계
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* TTS Listen Button */}
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
            <button
              onClick={handlePlayTTS}
              className={`px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-700 font-extrabold animate-pulse'
                  : 'text-slate-700 hover:text-indigo-600'
              }`}
              title={`원어민 음성 듣기 (${speechRate}배속)`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                  <span>중지</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>듣기</span>
                </>
              )}
            </button>

            {/* Speech Rate Toggle: 0.8x vs 1.0x */}
            <button
              onClick={() => setSpeechRate(speechRate === 0.8 ? 1.0 : 0.8)}
              className="px-1.5 py-0.5 ml-0.5 text-[10px] font-mono font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              title="배속 변경 (0.8x: 초등·느린 듣기 / 1.0x: 표준)"
            >
              {speechRate === 0.8 ? '0.8x 느리게' : '1.0x 표준'}
            </button>
          </div>

          {/* Electronic Smart Board Step Reveal Mode Toggle */}
          <button
            onClick={() => {
              if (!isStepRevealMode) {
                setIsStepRevealMode(true);
                setRevealedStepCount(1);
              } else {
                setIsStepRevealMode(false);
              }
            }}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-all ${
              isStepRevealMode
                ? 'bg-amber-500 border-amber-500 text-white shadow-xs ring-2 ring-amber-200'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-amber-700'
            }`}
            title="전자칠판/스마트보드에서 한 계단씩 순차적으로 보여주며 학생 참여 유도"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{isStepRevealMode ? '단계별 진행 중' : '단계별 공개'}</span>
          </button>

          {/* Edit toggle */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors ${
              isEditing
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="들여쓰기 및 단어 직접 수정"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? '완료' : '편집'}</span>
          </button>

          {/* Blank Quiz Mode Button */}
          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center gap-1.5 transition-all shadow-2xs"
              title="이 문장의 핵심 구문을 빈칸으로 만들어 직접 타이핑하며 익히는 퀴즈 풀기"
            >
              <PenTool className="w-3.5 h-3.5 text-purple-600" />
              <span>빈칸 퀴즈</span>
            </button>
          )}

          {/* Copy Plain Indented Text */}
          <button
            onClick={handleCopyText}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨' : '사다리 복사'}</span>
          </button>
        </div>
      </div>

      {/* Classroom Step Reveal Interactive Banner (Shown when Step Reveal Mode is active) */}
      {isStepRevealMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5">
              <Presentation className="w-4 h-4 text-amber-700" />
              <span>전자칠판 단계별 공개:</span>
            </span>
            <span className="text-xs font-bold bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded-md font-mono">
              {revealedStepCount} / {sentence.lines.length} 단계 공개됨
            </span>
            <span className="text-[11px] text-amber-700 hidden md:inline">
              (키보드 <strong>Space</strong> 키 또는 오른쪽 화살표로 다음 계단 진행)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRevealedStepCount((prev) => Math.max(1, prev - 1))}
              disabled={revealedStepCount <= 1}
              className="px-2.5 py-1 text-xs font-bold bg-white border border-amber-300 rounded-lg text-amber-900 disabled:opacity-40 hover:bg-amber-100 transition-colors"
            >
              ◀ 이전 계단
            </button>

            <button
              onClick={() => setRevealedStepCount((prev) => Math.min(sentence.lines.length, prev + 1))}
              disabled={revealedStepCount >= sentence.lines.length}
              className="px-3 py-1 text-xs font-bold bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            >
              <span>다음 계단 공개 ▶</span>
            </button>

            <button
              onClick={() => setRevealedStepCount(sentence.lines.length)}
              className="px-2.5 py-1 text-xs font-bold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              전체 보기
            </button>
          </div>
        </div>
      )}

      {/* Main Cascade Render Board */}
      <div className="p-6 sm:p-8 relative bg-white min-h-[260px] overflow-x-auto">
        {/* Background vertical indent rail guides */}
        {showGuides && (
          <div className="absolute inset-0 pointer-events-none p-6 sm:p-8 flex">
            {[0, 1, 2, 3, 4, 5, 6].map((level) => (
              <div
                key={level}
                style={{ left: `${24 + level * indentPx}px` }}
                className="absolute top-6 bottom-6 border-l border-dashed border-slate-200/90"
              />
            ))}
          </div>
        )}

        {/* Lines Container */}
        <div className={`space-y-2 relative z-10 ${fontClass} ${textSizeClass}`}>
          {visibleLines.map((line, idx) => {
            const roleStyle = ROLE_COLORS[line.role] || ROLE_COLORS.modifier;
            const isHovered = activeHoverLineId === line.id;
            const isSubjectPredicate = line.role === 'subject' || line.role === 'predicate';
            const isPlayingThisLine = playingLineId === line.id;
            const roleDisplayName = getRoleDisplayName(line.role, grammarTermMode);

            return (
              <div
                key={line.id || idx}
                onMouseEnter={() => setActiveHoverLineId(line.id)}
                onMouseLeave={() => setActiveHoverLineId(null)}
                className={`group flex items-center transition-all py-1.5 px-2.5 rounded-lg relative ${
                  isPlayingThisLine
                    ? 'bg-amber-50 ring-2 ring-amber-300 shadow-xs'
                    : isHovered
                    ? 'bg-slate-100/95 shadow-2xs'
                    : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Indentation Spacer */}
                <div
                  style={{ width: `${line.indent * indentPx}px` }}
                  className="shrink-0 flex items-center justify-end relative h-6"
                >
                  {/* Visual Guide Connectors */}
                  {showGuides && (
                    <>
                      {/* Principle 3: Introductory arrow */}
                      {line.isIntroductory && (
                        <span className="absolute -left-5 text-amber-500 text-xs font-bold select-none" title="도입부 배경 정보">
                          ⇨
                        </span>
                      )}

                      {/* Principle 2: Elbow arrow for dependents */}
                      {line.parentLineId && line.indent > 0 && !line.isConjunctionOffset && (
                        <div className="absolute right-1 text-slate-400 select-none text-xs flex items-center">
                          <CornerDownRight className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      )}

                      {/* Principle 4: Offset Conjunction Indicator */}
                      {line.isConjunctionOffset && (
                        <div className="absolute right-1 text-rose-500 text-xs font-extrabold select-none" title="접속사 좌측 정렬">
                          ◀
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Line Content Box */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Vertical Alignment Rail for Principle 1 (Subject-Predicate) */}
                  {showGuides && isSubjectPredicate && (
                    <div
                      className={`w-1.5 self-stretch rounded-full mr-1 ${
                        line.role === 'subject' ? 'bg-indigo-500' : 'bg-emerald-500'
                      }`}
                      title={grammarTermMode === 'student' ? (line.role === 'subject' ? '누가/무엇이' : '한다/이다') : (line.role === 'subject' ? '주어 (Subject)' : '동사/술어 (Predicate)')}
                    />
                  )}

                  {/* Text Chunk */}
                  {isEditing ? (
                    <input
                      type="text"
                      value={line.text}
                      onChange={(e) =>
                        onUpdateLine && onUpdateLine(line.id, { text: e.target.value })
                      }
                      className="px-2.5 py-1 border border-indigo-400 rounded-lg font-inherit text-inherit bg-white shadow-2xs focus:outline-indigo-600"
                    />
                  ) : (
                    <span
                      className={`px-2 py-0.5 rounded transition-colors ${
                        showGrammarColors
                          ? `${roleStyle.text} ${roleStyle.bg}`
                          : 'text-slate-900 font-semibold'
                      } ${line.isConjunctionOffset ? 'text-rose-600 font-extrabold' : ''}`}
                    >
                      {line.text}
                    </span>
                  )}

                  {/* Individual Line-by-Line Speaker Button */}
                  <button
                    onClick={() => handlePlayLine(line.id, line.text)}
                    className="p-1 rounded text-slate-300 hover:text-indigo-600 hover:bg-slate-200/50 transition-colors opacity-70 group-hover:opacity-100"
                    title={`이 줄만 듣기: "${line.text}"`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Grammar Role Chip (Student Term or Teacher Term) */}
                  {(showGrammarColors || isHovered) && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-sans font-bold select-none tracking-tight ${roleStyle.badge}`}
                    >
                      {roleDisplayName}
                    </span>
                  )}

                  {/* Principle Tag */}
                  {line.principle && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold select-none ${
                        line.principle === 1
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : line.principle === 2
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : line.principle === 3
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                      title={`원칙 ${line.principle} 적용`}
                    >
                      원칙 {line.principle}
                    </span>
                  )}

                  {/* Editing Controls */}
                  {isEditing && (
                    <div className="flex items-center gap-1 ml-2 bg-slate-100 border border-slate-200 p-0.5 rounded-lg shadow-2xs">
                      <button
                        onClick={() =>
                          onUpdateLine &&
                          onUpdateLine(line.id, { indent: Math.max(0, line.indent - 1) })
                        }
                        disabled={line.indent === 0}
                        title="왼쪽으로 내어쓰기"
                        className="p-1 hover:bg-white disabled:opacity-30 rounded text-slate-700"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1.5 text-slate-800">{line.indent}</span>
                      <button
                        onClick={() =>
                          onUpdateLine && onUpdateLine(line.id, { indent: line.indent + 1 })
                        }
                        title="오른쪽으로 들여쓰기"
                        className="p-1 hover:bg-white rounded text-slate-700"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      {onAddLine && (
                        <button
                          onClick={() => onAddLine(line.id)}
                          title="아래에 사다리 줄 추가"
                          className="p-1 hover:bg-white rounded text-emerald-600"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onRemoveLine && sentence.lines.length > 1 && (
                        <button
                          onClick={() => onRemoveLine(line.id)}
                          title="이 사다리 줄 삭제"
                          className="p-1 hover:bg-rose-50 rounded text-rose-600"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Next Step Mystery Placeholder (In Step Reveal Mode) */}
          {nextStepLine && (
            <div
              onClick={() => setRevealedStepCount((prev) => Math.min(sentence.lines.length, prev + 1))}
              style={{ marginLeft: `${nextStepLine.indent * indentPx}px` }}
              className="mt-3 p-3 bg-amber-50/90 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer hover:bg-amber-100/90 transition-all flex items-center justify-between gap-3 text-amber-900 group shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-bold">
                  👉 다음 계단에 무슨 말이 올까요? [클릭하여 공개]
                </span>
                <span className="text-[11px] font-bold bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded-full">
                  힌트: {getRoleDisplayName(nextStepLine.role, grammarTermMode)} 자리
                </span>
              </div>
              <span className="text-xs font-bold text-amber-700 underline group-hover:text-amber-900">
                공개 (Space) ▶
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Information Footer / Syntax & Principle Analysis */}
      <div className="bg-slate-50/90 border-t border-slate-200 p-4 sm:p-6 space-y-4">
        {/* Korean Translation */}
        {sentence.translationKo && (
          <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shrink-0">
              우리말 해석
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {sentence.translationKo}
            </p>
          </div>
        )}

        {/* Hovered Line Specific Detail */}
        {hoveredLine && (
          <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 font-mono">"{hoveredLine.text}"</span>
              <span className="text-slate-400">→</span>
              <span className="font-bold text-indigo-700">
                {getRoleDisplayName(hoveredLine.role, grammarTermMode)}
              </span>
              {hoveredLine.explanation && (
                <span className="text-slate-600">({hoveredLine.explanation})</span>
              )}
            </div>
            {hoveredLine.principle && (
              <span className="text-slate-500 font-semibold shrink-0">
                원칙 {hoveredLine.principle} 적용
              </span>
            )}
          </div>
        )}

        {/* Syntactic Principles Applied Overview */}
        {sentence.principlesApplied && Object.keys(sentence.principlesApplied).length > 0 && (
          <div className="space-y-2 pt-1 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-600 block">
              문장 사다리 구조 분석 (적용된 4대 원칙)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {sentence.principlesApplied.principle1 && (
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-slate-700">
                  <span className="font-bold text-indigo-900 block mb-0.5">
                    원칙 1: 주어와 동사의 수직 정렬
                  </span>
                  <span>{sentence.principlesApplied.principle1}</span>
                </div>
              )}
              {sentence.principlesApplied.principle2 && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-slate-700">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    원칙 2: 종속 성분의 계단식 들여쓰기
                  </span>
                  <span>{sentence.principlesApplied.principle2}</span>
                </div>
              )}
              {sentence.principlesApplied.principle3 && (
                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl text-slate-700">
                  <span className="font-bold text-amber-900 block mb-0.5">
                    원칙 3: 도입부/배경 정보 들여쓰기
                  </span>
                  <span>{sentence.principlesApplied.principle3}</span>
                </div>
              )}
              {sentence.principlesApplied.principle4 && (
                <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-slate-700">
                  <span className="font-bold text-rose-900 block mb-0.5">
                    원칙 4: 병렬 그룹 단어 정렬 및 접속사 오프셋
                  </span>
                  <span>{sentence.principlesApplied.principle4}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
