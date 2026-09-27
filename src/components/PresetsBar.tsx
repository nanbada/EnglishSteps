import React, { useState } from 'react';
import { PRESET_BENCHMARKS, SchoolGrade, PresetBenchmark } from '../lib/vstfLocalParser';
import { GraduationCap, Sparkles, Filter } from 'lucide-react';

interface PresetsBarProps {
  onSelect: (sentence: string) => void;
  activeSentence: string;
}

const GRADE_FILTERS: Array<{ id: SchoolGrade; label: string }> = [
  { id: 'all', label: '전체 예문' },
  { id: 'elem', label: '🌟 초등 기본' },
  { id: 'mid1', label: '📘 중1 기초' },
  { id: 'mid2', label: '📗 중2 발전' },
  { id: 'mid3', label: '📙 중3 심화' },
  { id: 'principle', label: '🎓 4대 원칙' }
];

export const PresetsBar: React.FC<PresetsBarProps> = ({ onSelect, activeSentence }) => {
  const [selectedGrade, setSelectedGrade] = useState<SchoolGrade>('all');

  const filteredPresets = selectedGrade === 'all'
    ? PRESET_BENCHMARKS
    : PRESET_BENCHMARKS.filter((p) => p.grade === selectedGrade);

  return (
    <div className="bg-white border-b border-slate-200 py-2.5 px-3 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto space-y-2">
        {/* Grade Level Selector Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 whitespace-nowrap pr-2.5 border-r border-slate-200 shrink-0">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">교과과정 예문:</span>
          </div>

          <div className="flex items-center gap-1 flex-nowrap">
            {GRADE_FILTERS.map((filter) => {
              const isActive = selectedGrade === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedGrade(filter.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sentence Pills Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {filteredPresets.map((preset) => {
            const isSelected = activeSentence.trim() === preset.sentence.trim();
            return (
              <button
                key={preset.id}
                onClick={() => onSelect(preset.sentence)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 text-left ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-xs ring-2 ring-indigo-200 font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                }`}
                title={`[${preset.gradeLabel}] ${preset.title}\n해석: ${preset.translation}\n문장: ${preset.sentence}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                    {preset.grammarPoint}
                  </span>
                  <span className="text-slate-900 truncate max-w-[210px] inline-block font-mono-vstf text-[12px]">
                    {preset.sentence}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
