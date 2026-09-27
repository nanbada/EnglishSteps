import React, { useState } from 'react';
import { VSTFSentence } from '../types/vstf';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  FileCode, 
  FileText,
  Share2,
  GraduationCap
} from 'lucide-react';

interface ExportModalProps {
  sentence: VSTFSentence;
  indentSpaces: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  sentence,
  indentSpaces,
  isOpen,
  onClose
}) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  // Plain Indented Text
  const plainText = sentence.lines
    .map((l) => `${' '.repeat(l.indent * indentSpaces)}${l.text}`)
    .join('\n');

  // Rich HTML for Word / HWP / Google Docs
  const richHtml = `
<div style="font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; font-size: 14px; line-height: 1.8; color: #1e293b;">
  <div style="font-size: 16px; font-weight: bold; margin-bottom: 6px; color: #0f172a;">${sentence.originalText}</div>
  <div style="color: #475569; font-size: 13px; margin-bottom: 14px; font-style: italic;">[해석] ${sentence.translationKo || ''}</div>
  <div style="border-left: 3px solid #6366f1; padding-left: 14px; margin-top: 8px;">
    ${sentence.lines
      .map(
        (l) =>
          `<div style="padding-left: ${l.indent * 28}px; margin-bottom: 4px; font-family: Consolas, monospace;">
            <span style="font-weight: ${l.role === 'subject' || l.role === 'predicate' ? 'bold' : 'normal'}; color: ${
            l.role === 'subject'
              ? '#1e1b4b'
              : l.role === 'predicate'
              ? '#064e3b'
              : l.role === 'conjunction'
              ? '#be123c'
              : '#334155'
          };">${l.text}</span>
            <span style="font-size: 11px; color: #64748b; margin-left: 8px;">(${l.roleKorean || l.role})</span>
          </div>`
      )
      .join('')}
  </div>
</div>
`;

  const copyToClipboard = async (content: string, type: string, isHtml = false) => {
    try {
      if (isHtml) {
        const blobHtml = new Blob([content], { type: 'text/html' });
        const blobPlain = new Blob([plainText], { type: 'text/plain' });
        const data = [new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobPlain })];
        await navigator.clipboard.write(data);
      } else {
        await navigator.clipboard.writeText(content);
      }
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (e) {
      console.error(e);
      await navigator.clipboard.writeText(plainText);
      setCopyStatus(type);
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const downloadTextFile = () => {
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `루트원-영어계단-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">
              문장 사다리 내보내기 & 수업 자료 복사
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 space-y-3.5">
          {/* Option 1: Word / HWP / Google Docs Rich HTML */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all bg-slate-50/50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-sm text-slate-900">한글(HWP) / 워드(Word) 서식 복사</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                들여쓰기와 품사 색상이 그대로 유지되어 시험지·학습지에 바로 붙여넣을 수 있습니다.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(richHtml, 'rich', true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
            >
              {copyStatus === 'rich' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyStatus === 'rich' ? '복사 완료' : '서식 복사'}</span>
            </button>
          </div>

          {/* Option 2: Plain Text with Indentation */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-slate-700" />
                <span className="font-bold text-sm text-slate-900">들여쓰기 텍스트 복사 (스페이스)</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                공백({indentSpaces}칸)으로 구조화된 순수 텍스트로 메신저나 메모장에 적합합니다.
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(plainText, 'plain')}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
            >
              {copyStatus === 'plain' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyStatus === 'plain' ? '복사 완료' : '텍스트 복사'}</span>
            </button>
          </div>

          {/* Option 3: Download .txt */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-sm text-slate-900">텍스트 파일로 저장 (.txt)</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                사다리 텍스트를 파일로 저장합니다.
              </p>
            </div>
            <button
              onClick={downloadTextFile}
              className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>파일 저장</span>
            </button>
          </div>

          {/* Option 4: Print */}
          <div className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-slate-600" />
                <span className="font-bold text-sm text-slate-900">수업용 워크시트 인쇄 (A4 / PDF)</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                학생 배포용 인쇄창을 엽니다.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                window.print();
              }}
              className="px-3.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shrink-0"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>인쇄하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
