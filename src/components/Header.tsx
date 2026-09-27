import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  FileText, 
  Eye, 
  Printer,
  GraduationCap,
  PenTool
} from 'lucide-react';

import { GrammarTermMode } from '../types/vstf';

export type FontMode = 'mono' | 'sans' | 'serif';
export type ViewTab = 'converter' | 'quiz' | 'batch' | 'principles';

interface HeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  showGuides: boolean;
  onToggleGuides: () => void;
  showGrammarColors: boolean;
  onToggleGrammarColors: () => void;
  grammarTermMode: GrammarTermMode;
  onToggleGrammarTermMode: () => void;
  fontMode: FontMode;
  onFontModeChange: (font: FontMode) => void;
  indentSpaces: number;
  onIndentSpacesChange: (spaces: number) => void;
  fontSize: 'sm' | 'md' | 'lg';
  onFontSizeChange: (size: 'sm' | 'md' | 'lg') => void;
  isAiEnabled: boolean;
  onQuickPrint?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  showGuides,
  onToggleGuides,
  showGrammarColors,
  onToggleGrammarColors,
  grammarTermMode,
  onToggleGrammarTermMode,
  fontMode,
  onFontModeChange,
  indentSpaces,
  onIndentSpacesChange,
  fontSize,
  onFontSizeChange,
  onQuickPrint
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Tier 1: Brand Title & Teaching Toolbar */}
        <div className="flex items-center justify-between py-2 sm:py-2.5 border-b border-slate-100 gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="px-2 h-8 sm:h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs sm:text-sm tracking-tight shadow-2xs shrink-0">
              루트원
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight truncate">
                  루트원 영어 계단
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-1.5 sm:px-2 py-0.2 rounded-full shrink-0">
                  <GraduationCap className="w-3 h-3 text-indigo-600" />
                  교사용·수업용
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block truncate">
                시각적-통사적 텍스트 포맷 (VSTF) 구문 독해 학습 시스템
              </p>
            </div>
          </div>

          {/* Quick Teaching Tools & View Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Print Button */}
            {onQuickPrint && (
              <button
                onClick={onQuickPrint}
                title="수업용 학습지/워크시트 즉시 인쇄"
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">학습지 인쇄</span>
              </button>
            )}

            {/* Guides Toggle */}
            <button
              onClick={onToggleGuides}
              title="사다리 수직축 및 연결 가이드선 켜기/끄기"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition-all ${
                showGuides
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">가이드선</span>
            </button>

            {/* Grammar Colors Toggle */}
            <button
              onClick={onToggleGrammarColors}
              title="문법 품사 성분 색상 하이라이트 켜기/끄기"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition-all ${
                showGrammarColors
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline">품사 색상</span>
            </button>

            {/* Student Easy Term vs Teacher Professional Term Toggle */}
            <button
              onClick={onToggleGrammarTermMode}
              title="초·중등 학생용 쉬운 용어('누가/한다/무엇을')와 교사용 전문 문법 용어('주어/동사/목적어') 전환"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold border transition-all ${
                grammarTermMode === 'student'
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs ring-1 ring-amber-200'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-xs">{grammarTermMode === 'student' ? '🐣' : '🎓'}</span>
              <span>{grammarTermMode === 'student' ? '쉬운 용어(학생용)' : '전문 용어(교사용)'}</span>
            </button>

            {/* Font Size Selector (보통/크게) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px]">
              <span className="px-1.5 text-slate-400 font-medium hidden lg:inline">글자:</span>
              <button
                onClick={() => onFontSizeChange('sm')}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md font-semibold transition-all ${
                  fontSize === 'sm' ? 'bg-white shadow-2xs font-bold text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="기본 크기"
              >
                기본
              </button>
              <button
                onClick={() => onFontSizeChange('md')}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md font-semibold transition-all ${
                  fontSize === 'md' ? 'bg-white shadow-2xs font-bold text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="수업용 보통 크기"
              >
                보통
              </button>
              <button
                onClick={() => onFontSizeChange('lg')}
                className={`px-1.5 sm:px-2 py-0.5 rounded-md font-semibold transition-all ${
                  fontSize === 'lg' ? 'bg-white shadow-2xs font-bold text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="전자칠판/빔프로젝터용 큰 글씨"
              >
                크게
              </button>
            </div>

            {/* Indent Spaces Selector */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 pl-1.5 border-l border-slate-200">
              <span className="text-slate-400">간격:</span>
              <button
                onClick={() => onIndentSpacesChange(2)}
                className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold ${
                  indentSpaces === 2 ? 'bg-slate-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="들여쓰기 2칸"
              >
                2
              </button>
              <button
                onClick={() => onIndentSpacesChange(3)}
                className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold ${
                  indentSpaces === 3 ? 'bg-slate-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="들여쓰기 3칸 (권장)"
              >
                3
              </button>
              <button
                onClick={() => onIndentSpacesChange(4)}
                className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold ${
                  indentSpaces === 4 ? 'bg-slate-800 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="들여쓰기 4칸"
              >
                4
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2: Dedicated Clean Navigation Tabs Bar */}
        <div className="flex items-center justify-between py-1.5 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1 bg-slate-100/80 p-0.5 sm:p-1 rounded-xl">
            <button
              onClick={() => onTabChange('converter')}
              className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentTab === 'converter'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>실시간 변환</span>
            </button>

            <button
              onClick={() => onTabChange('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentTab === 'quiz'
                  ? 'bg-white text-purple-700 shadow-xs ring-1 ring-purple-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenTool className="w-3.5 h-3.5 text-purple-600" />
              <span>빈칸 퀴즈</span>
            </button>

            <button
              onClick={() => onTabChange('batch')}
              className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentTab === 'batch'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>지문 일괄 파싱</span>
            </button>

            <button
              onClick={() => onTabChange('principles')}
              className={`flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                currentTab === 'principles'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>4대 원칙 도감</span>
            </button>
          </nav>

          {/* Quick Info text on the right of tab bar */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span>주어-동사 정렬 & 계단식 들여쓰기</span>
          </div>
        </div>
      </div>
    </header>
  );
};
