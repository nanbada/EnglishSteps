import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VSTFSentence, VSTFLine, GrammarTermMode, getRoleDisplayName } from '../types/vstf';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Trophy, 
  Lightbulb, 
  ArrowRight, 
  Check, 
  Volume2,
  Sparkles,
  Shuffle
} from 'lucide-react';
import { ttsService } from '../lib/ttsService';
import { FontMode } from './Header';

interface BlankQuizViewerProps {
  sentence: VSTFSentence;
  indentSpaces: number;
  fontSize: 'sm' | 'md' | 'lg';
  fontMode: FontMode;
  showGuides: boolean;
  grammarTermMode?: GrammarTermMode;
  onExitQuiz?: () => void;
}

export type QuizDifficulty = 'key_verbs' | 'predicates_objects' | 'connectors' | 'all_key';

interface BlankItem {
  id: string; // `${lineId}-${tokenIndex}`
  lineId: string;
  tokenIndex: number;
  originalWord: string;
  cleanAnswer: string; // stripped of punctuation and lowercased
  punctuationSuffix: string;
  punctuationPrefix: string;
  hint: string;
  roleKorean: string;
}

// Common function words that shouldn't be primary blanks unless in connector mode
const FUNCTION_WORDS = new Set([
  'the', 'a', 'an', 'this', 'that', 'these', 'those',
  'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from'
]);

export const BlankQuizViewer: React.FC<BlankQuizViewerProps> = ({
  sentence,
  indentSpaces,
  fontSize,
  fontMode,
  showGuides,
  grammarTermMode = 'student',
  onExitQuiz
}) => {
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('predicates_objects');
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [showAnswerMap, setShowAnswerMap] = useState<Record<string, boolean>>({});
  const [revealedAll, setRevealedAll] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [activeHintId, setActiveHintId] = useState<string | null>(null);

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Parse each line into word tokens and decide which words become blanks based on difficulty & grammar roles
  const { blankItems, linesWithTokens } = useMemo(() => {
    const blanks: BlankItem[] = [];
    const processedLines = sentence.lines.map((line) => {
      // Split line text into tokens
      const rawTokens = line.text.split(/(\s+)/);
      let wordIdx = 0;

      const tokens = rawTokens.map((raw) => {
        if (/^\s+$/.test(raw)) {
          return { isSpace: true, text: raw };
        }

        const match = raw.match(/^([^a-zA-Z0-9']*)([a-zA-Z0-9'-]+)([^a-zA-Z0-9']*)$/);
        const prefix = match ? match[1] : '';
        const coreWord = match ? match[2] : raw;
        const suffix = match ? match[3] : '';
        const cleanAnswer = coreWord.toLowerCase().trim();

        // Determine if this core word qualifies as a blank
        let isBlank = false;

        if (coreWord.length >= 2) {
          if (difficulty === 'key_verbs') {
            // Predicates, verbs, or verbal forms
            if (line.role === 'predicate' || line.role === 'subordinate_clause') {
              isBlank = true;
            }
          } else if (difficulty === 'connectors') {
            // Conjunctions, relative pronouns, introductory markers
            if (
              line.role === 'conjunction' ||
              line.role === 'relative_clause' ||
              line.role === 'introductory' ||
              ['and', 'but', 'or', 'so', 'who', 'which', 'that', 'although', 'after', 'because', 'when', 'if', 'how'].includes(cleanAnswer)
            ) {
              isBlank = true;
            }
          } else if (difficulty === 'predicates_objects') {
            // Verbs and primary head nouns / objects
            if (
              line.role === 'predicate' ||
              line.role === 'object' ||
              (line.role === 'subject' && !FUNCTION_WORDS.has(cleanAnswer))
            ) {
              if (!FUNCTION_WORDS.has(cleanAnswer) || line.role === 'predicate') {
                isBlank = true;
              }
            }
          } else {
            // 'all_key': any content word
            if (!FUNCTION_WORDS.has(cleanAnswer) && coreWord.length > 2) {
              isBlank = true;
            }
          }
        }

        const currentWordIdx = wordIdx++;
        const blankId = `${line.id}-w${currentWordIdx}`;

        if (isBlank) {
          // Construct hint using student/teacher terminology
          const firstChar = coreWord.charAt(0);
          const roleDisplay = getRoleDisplayName(line.role, grammarTermMode);
          const hint = `${roleDisplay} (첫 글자: ${firstChar}, 총 ${coreWord.length}글자)`;

          blanks.push({
            id: blankId,
            lineId: line.id,
            tokenIndex: currentWordIdx,
            originalWord: coreWord,
            cleanAnswer,
            punctuationPrefix: prefix,
            punctuationSuffix: suffix,
            hint,
            roleKorean: roleDisplay
          });

          return {
            isSpace: false,
            isBlank: true,
            blankId,
            prefix,
            coreWord,
            suffix,
            cleanAnswer
          };
        }

        return {
          isSpace: false,
          isBlank: false,
          prefix,
          coreWord,
          suffix
        };
      });

      return {
        ...line,
        tokens
      };
    });

    return { blankItems: blanks, linesWithTokens: processedLines };
  }, [sentence, difficulty, grammarTermMode]);

  // Reset inputs when sentence or difficulty changes
  useEffect(() => {
    setUserInputs({});
    setShowAnswerMap({});
    setRevealedAll(false);
    setHasChecked(false);
    setActiveHintId(null);
  }, [sentence.id, difficulty]);

  // Score calculation
  const stats = useMemo(() => {
    let correctCount = 0;
    let filledCount = 0;

    blankItems.forEach((b) => {
      const val = (userInputs[b.id] || '').trim().toLowerCase();
      if (val) filledCount++;
      if (val === b.cleanAnswer) {
        correctCount++;
      }
    });

    const total = blankItems.length;
    const isCompleted = total > 0 && correctCount === total;
    const scorePct = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      total,
      correctCount,
      filledCount,
      isCompleted,
      scorePct
    };
  }, [blankItems, userInputs]);

  // Handlers
  const handleInputChange = (blankId: string, val: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [blankId]: val
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      // Focus next blank if available
      const nextBlank = blankItems[currentIndex + 1];
      if (nextBlank && inputRefs.current[nextBlank.id]) {
        e.preventDefault();
        inputRefs.current[nextBlank.id]?.focus();
      } else {
        setHasChecked(true);
      }
    }
  };

  const handleReset = () => {
    setUserInputs({});
    setShowAnswerMap({});
    setRevealedAll(false);
    setHasChecked(false);
    setActiveHintId(null);
  };

  const handleToggleRevealAll = () => {
    if (revealedAll) {
      setShowAnswerMap({});
      setRevealedAll(false);
    } else {
      const all: Record<string, boolean> = {};
      blankItems.forEach((b) => {
        all[b.id] = true;
      });
      setShowAnswerMap(all);
      setRevealedAll(true);
    }
  };

  const handleToggleSingleReveal = (blankId: string) => {
    setShowAnswerMap((prev) => ({
      ...prev,
      [blankId]: !prev[blankId]
    }));
  };

  // Play audio TTS
  const handleListen = () => {
    ttsService.speak(sentence.originalText, { rate: 0.95 });
  };

  // Typography font class
  const fontClass =
    fontMode === 'mono'
      ? 'font-mono-vstf'
      : fontMode === 'serif'
      ? 'font-serif-vstf'
      : 'font-sans-vstf';

  const textSizeClass =
    fontSize === 'sm'
      ? 'text-sm'
      : fontSize === 'lg'
      ? 'text-xl'
      : 'text-base';

  const indentPx = indentSpaces * (fontSize === 'lg' ? 18 : 14);

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-md overflow-hidden transition-all">
      {/* Quiz Control Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-indigo-300 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base text-white">사다리 빈칸 완성 퀴즈</h3>
              <span className="text-[10px] sm:text-[11px] font-bold bg-amber-400 text-slate-900 px-2 py-0.2 rounded-full shrink-0">
                능동 구문 훈련
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-indigo-200 mt-0.5 hidden sm:block">
              사다리 구조(들여쓰기·주어-동사 위치)를 보며 핵심 구문 단어를 직접 입력해 보세요.
            </p>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl text-[11px] sm:text-xs flex-wrap">
          <span className="text-indigo-200 px-1.5 font-semibold hidden md:inline">유형:</span>
          <button
            onClick={() => setDifficulty('predicates_objects')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all ${
              difficulty === 'predicates_objects'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            동사·목적어
          </button>
          <button
            onClick={() => setDifficulty('key_verbs')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all ${
              difficulty === 'key_verbs'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            술어 동사
          </button>
          <button
            onClick={() => setDifficulty('connectors')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all ${
              difficulty === 'connectors'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            접속사·관계사
          </button>
          <button
            onClick={() => setDifficulty('all_key')}
            className={`px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-all ${
              difficulty === 'all_key'
                ? 'bg-white text-indigo-950 shadow-xs'
                : 'text-indigo-200 hover:text-white'
            }`}
          >
            전체 주요어
          </button>
        </div>
      </div>

      {/* Progress & Live Score Bar */}
      <div className="bg-indigo-50/80 px-4 sm:px-6 py-2.5 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">진행도:</span>
            <span className="font-extrabold text-indigo-700 font-mono text-sm">
              {stats.filledCount} / {stats.total}
            </span>
          </div>

          <div className="w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${stats.total > 0 ? (stats.filledCount / stats.total) * 100 : 0}%` }}
            />
          </div>

          {hasChecked && (
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>정답률: {stats.scorePct}% ({stats.correctCount}/{stats.total})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Listen Button */}
          <button
            onClick={handleListen}
            className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-100/50 font-bold flex items-center gap-1 transition-colors"
            title="원어민 발음으로 정답 문장 듣기"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>원문 듣기</span>
          </button>

          {/* Reveal Answers */}
          <button
            onClick={handleToggleRevealAll}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1 transition-colors"
          >
            {revealedAll ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{revealedAll ? '정답 숨기기' : '정답 전체 확인'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold flex items-center gap-1 transition-colors"
            title="모든 입력 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>다시 풀기</span>
          </button>

          {/* Exit Quiz Button if provided */}
          {onExitQuiz && (
            <button
              onClick={onExitQuiz}
              className="px-3 py-1 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-900 transition-colors"
            >
              퀴즈 닫기
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Blank Cascade Board */}
      <div className="p-6 sm:p-8 relative bg-white min-h-[300px] overflow-x-auto">
        {/* Background vertical indent rail guides */}
        {showGuides && (
          <div className="absolute inset-0 pointer-events-none p-6 sm:p-8 flex">
            {[0, 1, 2, 3, 4, 5, 6].map((level) => (
              <div
                key={level}
                style={{ left: `${24 + level * indentPx}px` }}
                className="absolute top-6 bottom-6 border-l border-dashed border-indigo-100"
              />
            ))}
          </div>
        )}

        <div className={`space-y-3 relative z-10 ${fontClass} ${textSizeClass}`}>
          {linesWithTokens.map((line, lIdx) => {
            return (
              <div
                key={line.id || lIdx}
                className="flex items-center py-1 px-2 rounded-lg hover:bg-indigo-50/40 transition-colors"
              >
                {/* Indentation Spacer */}
                <div
                  style={{ width: `${line.indent * indentPx}px` }}
                  className="shrink-0 flex items-center justify-end relative h-8"
                />

                {/* Tokens with Blanks */}
                <div className="flex items-center flex-wrap gap-y-2">
                  {/* Subject-Predicate vertical bar indicator */}
                  {showGuides && (line.role === 'subject' || line.role === 'predicate') && (
                    <div
                      className={`w-1.5 self-stretch rounded-full mr-1.5 ${
                        line.role === 'subject' ? 'bg-indigo-400' : 'bg-emerald-400'
                      }`}
                    />
                  )}

                  {line.tokens.map((tok, tIdx) => {
                    if (tok.isSpace) {
                      return <span key={tIdx} className="whitespace-pre">{tok.text}</span>;
                    }

                    if (!tok.isBlank) {
                      return (
                        <span key={tIdx} className="font-semibold text-slate-800 px-0.5">
                          {tok.prefix}{tok.coreWord}{tok.suffix}
                        </span>
                      );
                    }

                    // Blank Item Component
                    const blankId = tok.blankId!;
                    const blankItem = blankItems.find((b) => b.id === blankId);
                    const blankIdx = blankItems.findIndex((b) => b.id === blankId);
                    const userVal = userInputs[blankId] || '';
                    const isRevealed = showAnswerMap[blankId] || revealedAll;
                    const isCorrect = userVal.trim().toLowerCase() === tok.cleanAnswer;
                    const hasInput = userVal.trim().length > 0;

                    // Width calculation based on word length
                    const inputWidthCh = Math.max(tok.coreWord.length + 2, 7);

                    return (
                      <span key={tIdx} className="inline-flex items-center relative mx-1">
                        {tok.prefix && <span className="font-semibold text-slate-700">{tok.prefix}</span>}

                        <span className="relative inline-flex items-center">
                          <input
                            ref={(el) => {
                              inputRefs.current[blankId] = el;
                            }}
                            type="text"
                            value={isRevealed ? tok.coreWord : userVal}
                            onChange={(e) => handleInputChange(blankId, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, blankIdx)}
                            onFocus={() => setActiveHintId(blankId)}
                            style={{ width: `${inputWidthCh}ch` }}
                            placeholder={`${tok.coreWord.charAt(0)}...`}
                            disabled={isRevealed}
                            className={`px-2 py-0.5 text-center font-bold border-b-2 rounded-t-md font-inherit transition-all outline-hidden ${
                              isRevealed
                                ? 'bg-amber-50 border-amber-400 text-amber-900 font-extrabold'
                                : hasChecked || hasInput
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-200'
                                  : 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-200'
                                : 'bg-slate-100/90 border-indigo-400 text-indigo-950 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200'
                            }`}
                          />

                          {/* Quick Correct / Incorrect Status Icon */}
                          {(hasChecked || hasInput) && !isRevealed && (
                            <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-xs">
                              {isCorrect ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                              )}
                            </span>
                          )}
                        </span>

                        {tok.suffix && <span className="font-semibold text-slate-700">{tok.suffix}</span>}

                        {/* Hint Button next to blank */}
                        <button
                          type="button"
                          onClick={() => handleToggleSingleReveal(blankId)}
                          className="ml-1 text-slate-400 hover:text-indigo-600 p-0.5 rounded transition-colors"
                          title="이 단어 힌트/정답 확인"
                        >
                          <Lightbulb className="w-3 h-3" />
                        </button>
                      </span>
                    );
                  })}

                  {/* Grammar Role Tag on the right */}
                  <span className="ml-2 text-[10px] text-slate-400 font-sans select-none">
                    [{getRoleDisplayName(line.role, grammarTermMode)}]
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Hint / Explanation Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          {activeHintId ? (
            <span>
              <strong>선택된 빈칸 힌트:</strong>{' '}
              {blankItems.find((b) => b.id === activeHintId)?.hint || '문맥과 사다리 위치를 참고하세요.'}
            </span>
          ) : (
            <span>빈칸을 클릭하면 구문 역할 및 첫 글자 힌트가 여기에 표시됩니다. (Enter/Tab 키로 다음 빈칸 이동)</span>
          )}
        </div>

        {/* Action button to evaluate */}
        <div className="flex items-center gap-2">
          {!hasChecked ? (
            <button
              onClick={() => setHasChecked(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Check className="w-4 h-4" />
              <span>정답 채점하기</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 도전하기</span>
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {stats.isCompleted && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-amber-300 animate-bounce" />
            <div>
              <p className="font-extrabold text-sm sm:text-base">축하합니다! 모든 빈칸을 완벽하게 맞혔습니다!</p>
              <p className="text-xs text-emerald-100">
                사다리 통사 구조의 연결 관계를 온전히 마스터했습니다.
              </p>
            </div>
          </div>
          <button
            onClick={handleListen}
            className="px-3 py-1.5 bg-white text-emerald-900 font-bold text-xs rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>완성된 문장 듣기</span>
          </button>
        </div>
      )}
    </div>
  );
};
