import React, { useState } from 'react';
import { VSTFSentence } from '../types/vstf';
import { parseLocalVSTF } from '../lib/vstfLocalParser';
import { 
  Upload, 
  Play, 
  Copy, 
  Check, 
  Printer, 
  ChevronDown,
  ChevronUp,
  Layers,
  GraduationCap
} from 'lucide-react';
import { CascadeViewer } from './CascadeViewer';
import { FontMode } from './Header';

interface BatchProcessorProps {
  showGuides: boolean;
  showGrammarColors: boolean;
  fontMode: FontMode;
  indentSpaces: number;
  fontSize: 'sm' | 'md' | 'lg';
}

const SAMPLE_PASSAGE = `The girl hopes her teacher understands how hard she worked. The singer who enjoys performing live played an extra encore. Jackie donated a book about early immigrants to Florida to the town library. After school, Janie ordered a sandwich. Although Seth knew his wife needed a vacation, he couldn't afford one. My daughter likes dogs and cats. Jonathan asked for a new bike but his parents couldn't afford it.`;

export const BatchProcessor: React.FC<BatchProcessorProps> = ({
  showGuides,
  showGrammarColors,
  fontMode,
  indentSpaces,
  fontSize
}) => {
  const [inputText, setInputText] = useState(SAMPLE_PASSAGE);
  const [sentences, setSentences] = useState<VSTFSentence[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState<'continuous' | 'accordion'>('continuous');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  // Split input into sentences
  const splitSentences = (raw: string): string[] => {
    const cleaned = raw.replace(/\r\n/g, '\n').trim();
    if (!cleaned) return [];
    
    return cleaned
      .split(/(?<=[.?!])\s+(?=[A-Z"'])/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  };

  const handleProcessBatch = async () => {
    const rawSentences = splitSentences(inputText);
    if (rawSentences.length === 0) return;

    setIsProcessing(true);

    try {
      const parsed = rawSentences.map((s) => parseLocalVSTF(s));
      setSentences(parsed);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInputText(content);
      }
    };
    reader.readAsText(file);
  };

  // Full unified plain text export
  const fullCascadeText = sentences
    .map((s) =>
      s.lines
        .map((l) => `${' '.repeat(l.indent * indentSpaces)}${l.text}`)
        .join('\n')
    )
    .join('\n\n');

  const handleCopyFull = async () => {
    try {
      await navigator.clipboard.writeText(fullCascadeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 py-6">
      {/* Input & Control Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs no-print">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>장문 지문 및 시험문제 일괄 사다리 변환</span>
              </h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                교사용 학습지 제작
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              수능·내신 영어 교재 본문이나 긴 지문을 넣으면 모든 문장을 사다리 구조(VSTF)로 즉시 분해하여 수업용 워크시트로 완성합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200">
              <Upload className="w-3.5 h-3.5 text-slate-600" />
              <span>텍스트 파일 업로드 (.txt)</span>
              <input
                type="file"
                accept=".txt,.md,.text"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setInputText(SAMPLE_PASSAGE)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
            >
              수업용 예시 지문 채우기
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="변환할 여러 문장의 영어 지문을 입력하세요 (예: 교과서 본문, 모의고사 지문, 수능 지문)..."
          className="w-full p-4 border border-slate-200 rounded-xl focus:outline-emerald-500 font-sans text-sm text-slate-800 leading-relaxed resize-y bg-slate-50/50 focus:bg-white"
        />

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-slate-500 font-medium">
            총 <strong className="text-slate-800">{splitSentences(inputText).length}</strong>개 문장 감지됨
          </div>

          <button
            onClick={handleProcessBatch}
            disabled={isProcessing || !inputText.trim()}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-xs transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>전체 지문 사다리 일괄 변환</span>
          </button>
        </div>
      </div>

      {/* Output Results Section */}
      {sentences.length > 0 && (
        <div className="space-y-4">
          {/* Output Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">화면 보기 방식:</span>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setViewMode('continuous')}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    viewMode === 'continuous' ? 'bg-white shadow-2xs text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  연속 지문 읽기
                </button>
                <button
                  onClick={() => setViewMode('accordion')}
                  className={`px-3 py-1 rounded-md font-bold transition-all ${
                    viewMode === 'accordion' ? 'bg-white shadow-2xs text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  문장별 상세 검토
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyFull}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사 완료!' : '전체 사다리 텍스트 복사'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-700" />
                <span>수업용 학습지 인쇄 (A4 워크시트)</span>
              </button>
            </div>
          </div>

          {/* Continuous View */}
          {viewMode === 'continuous' ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8 vstf-card">
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span>영어 문장 사다리 전체 지문 (독해 워크시트)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold print-only">
                    학년 / 반: _______  이름: ____________
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  주어-동사의 수직 기둥선과 종속 성분의 계단식 사다리 형태를 파악하며 직독직해해 보세요.
                </p>
              </div>

              <div className="space-y-6">
                {sentences.map((sent, sIdx) => (
                  <div key={sent.id || sIdx} className="border-b border-slate-100 pb-6 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">문장 #{sIdx + 1}</span>
                      {sent.translationKo && (
                        <span className="text-slate-600 font-medium">· {sent.translationKo}</span>
                      )}
                    </div>
                    
                    <div className="font-mono-vstf text-sm leading-relaxed space-y-1.5 pl-2">
                      {sent.lines.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          style={{ paddingLeft: `${line.indent * indentSpaces * 14}px` }}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={
                              showGrammarColors
                                ? line.role === 'subject'
                                  ? 'text-indigo-900 font-bold'
                                  : line.role === 'predicate'
                                  ? 'text-emerald-900 font-bold'
                                  : line.role === 'conjunction'
                                  ? 'text-rose-600 font-extrabold'
                                  : line.role === 'introductory'
                                  ? 'text-purple-900 font-semibold'
                                  : 'text-slate-800 font-medium'
                                : 'text-slate-900 font-semibold'
                            }
                          >
                            {line.text}
                          </span>

                          {showGrammarColors && (
                            <span className="text-[10px] text-slate-400 font-sans">
                              ({line.roleKorean || line.role})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Accordion Mode */
            <div className="space-y-4">
              {sentences.map((sent, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div key={sent.id || idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/80 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{sent.originalText}</p>
                          {sent.translationKo && (
                            <p className="text-xs text-slate-500 mt-0.5">{sent.translationKo}</p>
                          )}
                        </div>
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 border-t border-slate-100">
                        <CascadeViewer
                          sentence={sent}
                          showGuides={showGuides}
                          showGrammarColors={showGrammarColors}
                          fontMode={fontMode}
                          indentSpaces={indentSpaces}
                          fontSize={fontSize}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
