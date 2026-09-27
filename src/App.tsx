import React, { useState, useEffect, useTransition } from 'react';
import { 
  Header, 
  FontMode, 
  ViewTab 
} from './components/Header';
import { PresetsBar } from './components/PresetsBar';
import { CascadeViewer } from './components/CascadeViewer';
import { PrinciplesReference } from './components/PrinciplesReference';
import { BatchProcessor } from './components/BatchProcessor';
import { BlankQuizViewer } from './components/BlankQuizViewer';
import { ExportModal } from './components/ExportModal';
import { VSTFSentence, VSTFLine, GrammarTermMode } from './types/vstf';
import { parseLocalVSTF, PRESET_BENCHMARKS } from './lib/vstfLocalParser';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  Share2, 
  ArrowRight,
  BookOpen,
  AlertCircle,
  GraduationCap,
  Printer
} from 'lucide-react';

const INITIAL_SENTENCE = "The girl hopes her teacher understands how hard she worked.";

export default function App() {
  // Navigation & View states
  const [currentTab, setCurrentTab] = useState<ViewTab>('converter');
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [showGrammarColors, setShowGrammarColors] = useState<boolean>(true);
  const [grammarTermMode, setGrammarTermMode] = useState<GrammarTermMode>('student');
  const [fontMode, setFontMode] = useState<FontMode>('mono');
  const [indentSpaces, setIndentSpaces] = useState<number>(3);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Input & Parse state
  const [inputSentence, setInputSentence] = useState<string>(INITIAL_SENTENCE);
  const [activeSentenceResult, setActiveSentenceResult] = useState<VSTFSentence>(() =>
    parseLocalVSTF(INITIAL_SENTENCE)
  );
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [isAiResult, setIsAiResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Export modal state
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // React transition for live typing
  const [, startTransition] = useTransition();

  // Instant local parsing on typing
  const handleInputChange = (text: string) => {
    setInputSentence(text);
    setIsAiResult(false);
    setErrorMessage(null);

    startTransition(() => {
      if (text.trim()) {
        const local = parseLocalVSTF(text);
        setActiveSentenceResult(local);
      }
    });
  };

  // AI Deep Syntactic Precision Parse
  const handleAiParse = async () => {
    const textToParse = inputSentence.trim();
    if (!textToParse) return;

    setIsAiLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/vstf/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToParse }),
      });

      const data = await response.json();

      if (!response.ok || !data.sentences || data.sentences.length === 0) {
        throw new Error(data.error || 'AI 분석 응답을 파싱하지 못했습니다.');
      }

      setActiveSentenceResult(data.sentences[0]);
      setIsAiResult(true);
    } catch (err: any) {
      console.warn('AI Parsing fallback:', err);
      setErrorMessage(
        'Gemini 서버 연결 대기 중 고정밀 로컬 통사 엔진으로 자동 변환되었습니다.'
      );
      const fallbackResult = parseLocalVSTF(textToParse);
      setActiveSentenceResult(fallbackResult);
      setIsAiResult(false);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Preset selection
  const handleSelectPreset = (sentence: string) => {
    setInputSentence(sentence);
    setIsAiResult(false);
    setErrorMessage(null);
    const parsed = parseLocalVSTF(sentence);
    setActiveSentenceResult(parsed);
    setCurrentTab('converter');
  };

  // Line editing handlers
  const handleUpdateLine = (lineId: string, updated: Partial<VSTFLine>) => {
    setActiveSentenceResult((prev) => ({
      ...prev,
      lines: prev.lines.map((line) =>
        line.id === lineId ? { ...line, ...updated } : line
      ),
    }));
  };

  const handleAddLine = (afterLineId: string) => {
    const idx = activeSentenceResult.lines.findIndex((l) => l.id === afterLineId);
    if (idx === -1) return;

    const currentLine = activeSentenceResult.lines[idx];
    const newLine: VSTFLine = {
      id: `custom-line-${Date.now()}`,
      text: 'new word',
      indent: currentLine.indent + 1,
      role: 'dependent',
      roleKorean: '종속 성분',
      principle: 2,
    };

    const newLines = [...activeSentenceResult.lines];
    newLines.splice(idx + 1, 0, newLine);

    setActiveSentenceResult((prev) => ({
      ...prev,
      lines: newLines,
    }));
  };

  const handleRemoveLine = (lineId: string) => {
    if (activeSentenceResult.lines.length <= 1) return;
    setActiveSentenceResult((prev) => ({
      ...prev,
      lines: prev.lines.filter((l) => l.id !== lineId),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        showGuides={showGuides}
        onToggleGuides={() => setShowGuides(!showGuides)}
        showGrammarColors={showGrammarColors}
        onToggleGrammarColors={() => setShowGrammarColors(!showGrammarColors)}
        grammarTermMode={grammarTermMode}
        onToggleGrammarTermMode={() =>
          setGrammarTermMode((prev) => (prev === 'student' ? 'teacher' : 'student'))
        }
        fontMode={fontMode}
        onFontModeChange={setFontMode}
        indentSpaces={indentSpaces}
        onIndentSpacesChange={setIndentSpaces}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        isAiEnabled={true}
        onQuickPrint={() => window.print()}
      />

      {/* Quick Benchmark Presets Bar (Shown on Converter and Quiz tabs) */}
      {(currentTab === 'converter' || currentTab === 'quiz') && (
        <PresetsBar
          onSelect={handleSelectPreset}
          activeSentence={inputSentence}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'converter' && (
          <div className="space-y-6">
            {/* Input Box Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs no-print">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <label
                  htmlFor="sentence-input"
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-indigo-600" />
                  <span>영어 문장 입력 (실시간 자동 변환)</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleInputChange('')}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium px-1"
                  >
                    지우기
                  </button>
                  <button
                    onClick={() => setIsExportOpen(true)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors bg-indigo-50/70 hover:bg-indigo-100/70 px-2.5 py-1 rounded-lg border border-indigo-200/80"
                  >
                    <Share2 className="w-3 h-3 text-indigo-600" />
                    <span>내보내기 / 복사</span>
                  </button>
                </div>
              </div>

              {/* Text Input Row */}
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <input
                    id="sentence-input"
                    type="text"
                    value={inputSentence}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAiParse();
                      }
                    }}
                    placeholder="영어 문장을 입력하세요 (예: The girl hopes her teacher understands how hard she worked.)"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-600 text-slate-900 font-semibold text-sm sm:text-base transition-colors placeholder:text-slate-400"
                  />
                </div>

                {/* AI Deep Syntactic Parse Button */}
                <button
                  onClick={handleAiParse}
                  disabled={isAiLoading || !inputSentence.trim()}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
                  title="Gemini 인공지능을 통해 복합문/관계사/수식어구 심층 통사 정밀 분석을 실행합니다"
                >
                  {isAiLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-indigo-200" />
                  )}
                  <span>{isAiLoading ? 'AI 정밀 분석 중...' : 'AI 정밀 구문분석'}</span>
                </button>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Main Interactive Cascade Viewer */}
            <CascadeViewer
              sentence={activeSentenceResult}
              showGuides={showGuides}
              showGrammarColors={showGrammarColors}
              grammarTermMode={grammarTermMode}
              fontMode={fontMode}
              indentSpaces={indentSpaces}
              fontSize={fontSize}
              onUpdateLine={handleUpdateLine}
              onAddLine={handleAddLine}
              onRemoveLine={handleRemoveLine}
              isAiResult={isAiResult}
              onOpenQuiz={() => setCurrentTab('quiz')}
            />

            {/* Quick Principles Overview Footer Bar */}
            <div className="bg-slate-100/90 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>문장 사다리 4대 핵심 원칙:</span>
                </span>
                <span className="text-slate-600">
                  <strong className="text-indigo-700 font-bold">원칙 1.</strong> 주어-동사 수직 정렬
                </span>
                <span className="text-slate-600">
                  <strong className="text-emerald-700 font-bold">원칙 2.</strong> 종속 성분 계단식 들여쓰기
                </span>
                <span className="text-slate-600">
                  <strong className="text-amber-700 font-bold">원칙 3.</strong> 도입부 정보 들여쓰기
                </span>
                <span className="text-slate-600">
                  <strong className="text-rose-700 font-bold">원칙 4.</strong> 병렬 그룹 정렬 & 접속사 좌측 오프셋
                </span>
              </div>

              <button
                onClick={() => setCurrentTab('principles')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>4대 원칙 학습 도감 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Blank Quiz Mode */}
        {currentTab === 'quiz' && (
          <div className="space-y-6">
            {/* Context sentence bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                  현재 퀴즈 대상 영어 문장
                </span>
                <p className="font-bold text-slate-900 text-base sm:text-lg">
                  "{activeSentenceResult.originalText}"
                </p>
                {activeSentenceResult.translationKo && (
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    해석: {activeSentenceResult.translationKo}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('converter')}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  사다리 원본 보기
                </button>
              </div>
            </div>

            {/* Interactive Blank Quiz Board */}
            <BlankQuizViewer
              sentence={activeSentenceResult}
              indentSpaces={indentSpaces}
              fontSize={fontSize}
              fontMode={fontMode}
              showGuides={showGuides}
              grammarTermMode={grammarTermMode}
              onExitQuiz={() => setCurrentTab('converter')}
            />
          </div>
        )}

        {/* Batch / Passage Mode */}
        {currentTab === 'batch' && (
          <BatchProcessor
            showGuides={showGuides}
            showGrammarColors={showGrammarColors}
            fontMode={fontMode}
            indentSpaces={indentSpaces}
            fontSize={fontSize}
          />
        )}

        {/* 4 Core Principles Reference Guidebook */}
        {currentTab === 'principles' && (
          <PrinciplesReference onSelectExample={handleSelectPreset} />
        )}
      </main>

      {/* Export Modal */}
      <ExportModal
        sentence={activeSentenceResult}
        indentSpaces={indentSpaces}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            영어 문장 사다리 만들기 (Visual-Syntactic Text Format Engine) &copy; 2026. 교사용 영어 구문 독해 학습 설계 플랫폼.
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <span>VSTF 4대 원칙 준수</span>
            <span>·</span>
            <span>자연스러운 음성 엔진</span>
            <span>·</span>
            <span>인쇄 및 학습지 최적화</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
