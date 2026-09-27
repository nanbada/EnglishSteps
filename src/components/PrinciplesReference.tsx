import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  CornerDownRight,
  GitBranch,
  MoveRight,
  Split
} from 'lucide-react';
import { PRESET_BENCHMARKS } from '../lib/vstfLocalParser';

interface PrinciplesReferenceProps {
  onSelectExample: (sentence: string) => void;
}

export const PrinciplesReference: React.FC<PrinciplesReferenceProps> = ({ onSelectExample }) => {
  return (
    <div className="space-y-8 py-6">
      {/* Introduction Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-indigo-300 text-xs font-bold tracking-wide uppercase mb-3 bg-white/10 px-3 py-1 rounded-full">
            <span>영어 문장 사다리 만들기 4대 원칙</span>
            <span className="text-slate-400">·</span>
            <span>VSTF Cascade Theory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            영어 문장 사다리의 4대 핵심 구조 원칙
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            복잡한 영어 문장의 통사 구조(Syntax)를 계층적 들여쓰기(Indentation)와 줄바꿈(Line breaks)으로 시각화하여 
            학생들이 주어-동사의 핵심 뼈대와 종속 수식 성분을 한눈에 파악하고 직독직해할 수 있도록 돕는 교육 설계 방식입니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="block text-indigo-300 font-extrabold mb-1">원칙 1</span>
              <span className="text-slate-200 font-medium">주어-동사 수직 정렬</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="block text-emerald-300 font-extrabold mb-1">원칙 2</span>
              <span className="text-slate-200 font-medium">종속 성분 계단식 들여쓰기</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="block text-amber-300 font-extrabold mb-1">원칙 3</span>
              <span className="text-slate-200 font-medium">도입부/배경 정보 들여쓰기</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="block text-rose-300 font-extrabold mb-1">원칙 4</span>
              <span className="text-slate-200 font-medium">병렬 그룹 정렬 & 접속사 오프셋</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quadrants Grid mimicking '영어 문장구조 변환.jpeg' */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Quadrant 1: Principle 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Principle 1
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Subjects and Predicates are aligned.
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                주어와 이에 대응하는 술어(동사)는 동일한 들여쓰기 라인에 수직으로 정렬됩니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example 1-A: The girl hopes... */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 1: 내포절 주어-동사 정렬</span>
                <div className="font-mono text-xs text-slate-800 space-y-1 relative pl-4 border-l-2 border-slate-300 py-1">
                  {/* Vertical indicator 1 */}
                  <div className="font-semibold text-indigo-900">The girl</div>
                  <div className="font-semibold text-indigo-900">hopes</div>
                  
                  <div className="pl-4 relative border-l-2 border-indigo-400 mt-1">
                    <div className="text-indigo-700 font-medium">her teacher</div>
                    <div className="text-indigo-700 font-medium">understands</div>
                    
                    <div className="pl-4 mt-1 text-slate-600">
                      <div>how hard</div>
                      <div className="pl-4 relative border-l-2 border-emerald-400">
                        <div className="text-emerald-800">she</div>
                        <div className="text-emerald-800">worked.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("The girl hopes her teacher understands how hard she worked.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Example 1-B: The singer who enjoys... */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 2: 관계절 삽입 후 주절 동사 복귀</span>
                <div className="font-mono text-xs text-slate-800 space-y-1 relative pl-4 border-l-2 border-indigo-500 py-1">
                  <div className="font-semibold text-indigo-950">The singer</div>
                  
                  <div className="pl-4 relative border-l-2 border-amber-400 my-1">
                    <div className="text-amber-800 font-medium">who</div>
                    <div className="text-amber-800 font-medium">enjoys</div>
                    <div className="pl-4 text-slate-600">
                      <div>performing</div>
                      <div>live</div>
                    </div>
                  </div>

                  <div className="font-semibold text-indigo-950">played</div>
                  <div className="pl-4 text-slate-600">an extra encore.</div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("The singer who enjoys performing live played an extra encore.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Quadrant 2: Principle 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Principle 2
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Dependents are indented under their head.
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                목적어, 전치사구, 수식어구 등 상위 성분(Head)에 종속되는 모든 구문은 하위 들여쓰기됩니다.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex flex-col justify-between h-[calc(100%-80px)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400">사례: 목적어 및 다중 전치사구 연쇄 수식</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">엘보우 계단식 종속</span>
              </div>
              
              <div className="font-mono text-xs text-slate-800 space-y-1.5 pl-3 py-2">
                <div className="font-semibold text-slate-900">Jackie</div>
                <div className="font-semibold text-slate-900">donated</div>
                
                {/* Branch 1: a book */}
                <div className="pl-4 flex items-start gap-1.5 text-emerald-900 font-medium">
                  <span className="text-emerald-500">↳</span>
                  <span>a book</span>
                </div>

                {/* Sub branch 1-1: about early immigrants */}
                <div className="pl-8 flex items-start gap-1.5 text-slate-700">
                  <span className="text-emerald-500">↳</span>
                  <span>about early immigrants</span>
                </div>

                {/* Sub-sub branch 1-1-1: to Florida */}
                <div className="pl-12 flex items-start gap-1.5 text-slate-600">
                  <span className="text-emerald-500">↳</span>
                  <span>to Florida</span>
                </div>

                {/* Branch 2 directly under donated: to the town library */}
                <div className="pl-4 flex items-start gap-1.5 text-slate-700">
                  <span className="text-emerald-500">↳</span>
                  <span>to the town library.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectExample("Jackie donated a book about early immigrants to Florida to the town library.")}
              className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors"
            >
              <span>이 예시 변환해보기</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quadrant 3: Principle 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  Principle 3
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Introductory information is indented.
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                문두 부사구나 종속접속사절은 들여쓰기되고, 주절 주어는 기본 위치(좌측)에 복귀합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example 3-A: After school, Janie... */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 1: 문두 전치사 부사구</span>
                <div className="font-mono text-xs text-slate-800 space-y-1.5 py-1">
                  {/* Introductory info */}
                  <div className="pl-6 flex items-center gap-1 text-amber-800 font-medium bg-amber-100/60 px-2 py-1 rounded">
                    <span className="text-amber-600 font-bold">⇨</span>
                    <span>After school,</span>
                  </div>
                  
                  {/* Main clause back to zero */}
                  <div className="font-semibold text-slate-900 pt-1">Janie</div>
                  <div className="font-semibold text-slate-900">ordered</div>
                  <div className="pl-4 text-slate-600">a sandwich.</div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("After school, Janie ordered a sandwich.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-amber-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Example 3-B: Although Seth knew... */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 2: 문두 종속접속사절</span>
                <div className="font-mono text-xs text-slate-800 space-y-1 py-1">
                  <div className="pl-4 border-l-2 border-amber-400 bg-amber-50/50 p-1.5 rounded-r">
                    <div className="text-amber-900 font-medium">Although Seth</div>
                    <div className="text-amber-900 font-medium">knew</div>
                    <div className="pl-3 text-slate-700">
                      <div>his wife</div>
                      <div>needed</div>
                      <div className="pl-3">a vacation,</div>
                    </div>
                  </div>

                  {/* Main clause resets to 0 */}
                  <div className="font-semibold text-slate-900 pt-1">he couldn't</div>
                  <div className="font-semibold text-slate-900 pl-4">afford</div>
                  <div className="pl-8 text-slate-600">one.</div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("Although Seth knew his wife needed a vacation, he couldn't afford one.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-amber-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Quadrant 4: Principle 4 */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                  Principle 4
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  Words in a group are aligned, and the entire group moves together.
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                등위접속사는 좌측으로 오프셋(Offset)되고, 대등한 연결 요소들은 동일한 들여쓰기에 정렬됩니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example 4-A: My daughter likes dogs and cats */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 1: 어휘 단위 병렬 & 접속사 오프셋</span>
                <div className="font-mono text-xs text-slate-800 space-y-1 py-1">
                  <div className="font-semibold text-slate-900">My daughter</div>
                  <div className="font-semibold text-slate-900">likes</div>
                  
                  {/* Group box with dotted line */}
                  <div className="mt-2 ml-4 p-2 bg-rose-50/50 border border-dashed border-rose-300 rounded-lg">
                    <div className="pl-6 font-semibold text-rose-950">dogs</div>
                    <div className="flex items-center">
                      <span className="text-rose-600 font-bold w-6">and</span>
                      <span className="font-semibold text-rose-950">cats.</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("My daughter likes dogs and cats.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-rose-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Example 4-B: Jonathan asked for... but */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">사례 2: 절 단위 등위 연결 (중문)</span>
                <div className="font-mono text-xs text-slate-800 space-y-1 py-1 relative pl-4 border-l-2 border-dotted border-slate-400">
                  <div className="font-semibold text-slate-900">Jonathan</div>
                  <div className="font-semibold text-slate-900">asked</div>
                  <div className="pl-4 text-slate-600">for a new bike</div>

                  {/* Offset coordinator */}
                  <div className="-ml-4 font-bold text-rose-600 py-0.5">but:</div>

                  <div className="font-semibold text-slate-900">his parents</div>
                  <div className="font-semibold text-slate-900">couldn't afford</div>
                  <div className="pl-4 text-slate-600">it.</div>
                </div>
              </div>
              <button
                onClick={() => onSelectExample("Jonathan asked for a new bike but his parents couldn't afford it.")}
                className="mt-4 flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-lg border border-slate-200 hover:border-rose-300 transition-colors"
              >
                <span>이 예시 변환해보기</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Why VSTF Works Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>왜 VSTF(시각적-통사적 텍스트 포맷)가 독해력을 혁신적으로 향상시킬까요?</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">1. 시선 이동(Saccades) 최소화</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              평면적인 줄글에서는 시선이 다음 줄 시작점으로 멀리 이동해야 하지만, VSTF는 짧은 의미 덩어리(Chunk)가 아래로 수직 캐스케이딩되어 인지 부하가 현저히 감소합니다.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">2. 통사적 계층(Syntactic Hierarchy) 직관화</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              주어-동사의 수직 정렬과 종속 요소의 계단식 들여쓰기는 문장의 핵심 뼈대(S-V)와 수식 성분을 시각적으로 즉시 분리하여 수능, 토플 등 긴 복합문의 구문 분석을 돕습니다.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">3. 난독증 및 학습자 친화적 설계</h4>
            <p className="text-xs leading-relaxed text-slate-500">
              줄바꿈 기준이 단순한 마침표나 임의의 글자 수가 아니라 의미 및 문법 단위로 결정되므로, 독서 장애나 주의력 결핍이 있는 학생들의 집중도와 이해도가 크게 향상됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
