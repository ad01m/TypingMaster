import React from 'react';
import { 
  Clock, 
  FileText, 
  Quote as QuoteIcon, 
  GraduationCap, 
  Code as CodeIcon, 
  Edit3 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TestMode, TimeOption, WordCountOption, CodeLanguage } from '../types';

interface ModeSelectorProps {
  mode: TestMode;
  onSelectMode: (mode: TestMode) => void;
  timeOption: TimeOption;
  onSelectTime: (time: TimeOption) => void;
  wordOption: WordCountOption;
  onSelectWordCount: (count: WordCountOption) => void;
  codeLang: CodeLanguage;
  onSelectCodeLang: (lang: CodeLanguage) => void;
  lessonTitle?: string;
  onOpenCustomModal: () => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  mode,
  onSelectMode,
  timeOption,
  onSelectTime,
  wordOption,
  onSelectWordCount,
  codeLang,
  onSelectCodeLang,
  lessonTitle,
  onOpenCustomModal
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-4xl mx-auto my-4 flex flex-col items-center gap-2.5">
      {/* Primary Mode Tabs Bar */}
      <div className={`p-1.5 rounded-2xl ${theme.cardBg} flex flex-wrap items-center justify-center gap-1.5 shadow-lg border border-slate-800/80`}>
        <button
          onClick={() => onSelectMode('time')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'time'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Time</span>
        </button>

        <button
          onClick={() => onSelectMode('words')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'words'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Words</span>
        </button>

        <button
          onClick={() => onSelectMode('quote')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'quote'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <QuoteIcon className="w-3.5 h-3.5" />
          <span>Quote</span>
        </button>

        <button
          onClick={() => onSelectMode('lessons')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'lessons'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Typing Lessons</span>
        </button>

        <button
          onClick={() => onSelectMode('code')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'code'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <CodeIcon className="w-3.5 h-3.5" />
          <span>Code Drill</span>
        </button>

        <button
          onClick={onOpenCustomModal}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            mode === 'custom'
              ? `${theme.accent} shadow-md`
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Custom Text</span>
        </button>
      </div>

      {/* Sub-Options Bar */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        {mode === 'time' && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800">
            <span>Duration:</span>
            {([15, 30, 60, 120] as TimeOption[]).map((t) => (
              <button
                key={t}
                onClick={() => onSelectTime(t)}
                className={`px-2 py-0.5 rounded-lg font-medium transition ${
                  timeOption === t
                    ? `${theme.accentText} font-bold underline bg-cyan-500/10`
                    : 'hover:text-slate-200'
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        )}

        {mode === 'words' && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800">
            <span>Word Count:</span>
            {([10, 25, 50, 100] as WordCountOption[]).map((w) => (
              <button
                key={w}
                onClick={() => onSelectWordCount(w)}
                className={`px-2 py-0.5 rounded-lg font-medium transition ${
                  wordOption === w
                    ? `${theme.accentText} font-bold underline bg-cyan-500/10`
                    : 'hover:text-slate-200'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        )}

        {mode === 'code' && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800">
            <span>Language:</span>
            {(['javascript', 'python', 'html'] as CodeLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onSelectCodeLang(lang)}
                className={`px-2 py-0.5 rounded-lg capitalize font-medium transition ${
                  codeLang === lang
                    ? `${theme.accentText} font-bold underline bg-cyan-500/10`
                    : 'hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        {mode === 'lessons' && lessonTitle && (
          <div className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5 font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Active: {lessonTitle}</span>
          </div>
        )}
      </div>
    </div>
  );
};
