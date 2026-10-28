import React, { useRef, useEffect } from 'react';
import { RotateCcw, Zap, Target, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TestMode } from '../types';

interface TypingAreaProps {
  targetText: string;
  userInput: string;
  isStarted: boolean;
  isFinished: boolean;
  timeLeft: number;
  totalTime: number;
  mode: TestMode;
  liveWpm: number;
  liveAccuracy: number;
  errorCount: number;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRestart: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  targetText,
  userInput,
  isStarted,
  isFinished,
  timeLeft,
  totalTime,
  mode,
  liveWpm,
  liveAccuracy,
  errorCount,
  onInputChange,
  onKeyDown,
  onRestart,
  inputRef,
  isFocused,
  setIsFocused
}) => {
  const { theme } = useTheme();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Auto-scroll active line into view smoothly
  useEffect(() => {
    if (activeCharRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const activeChar = activeCharRef.current;

      const offsetTop = activeChar.offsetTop - container.offsetTop;
      if (offsetTop > 80) {
        container.scrollTo({
          top: offsetTop - 60,
          behavior: 'smooth'
        });
      } else {
        container.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }, [userInput]);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true);
    }
  };

  // Render text with character-by-character accuracy feedback
  const renderCharacters = () => {
    const chars = targetText.split('');
    const inputChars = userInput.split('');

    return chars.map((char, index) => {
      const isTyped = index < inputChars.length;
      const isCurrent = index === inputChars.length;
      const isCorrect = isTyped && inputChars[index] === char;
      const isIncorrect = isTyped && inputChars[index] !== char;

      let charClass = theme.textMuted;
      if (isCorrect) {
        charClass = theme.correctColor;
      } else if (isIncorrect) {
        charClass = `${theme.errorColor} underline font-bold rounded-xs px-0.5`;
      }

      return (
        <span
          key={index}
          ref={isCurrent ? activeCharRef : undefined}
          className={`relative inline-block transition-colors duration-75 text-2xl sm:text-3xl font-mono-code ${charClass}`}
        >
          {isCurrent && (
            <span
              className={`absolute -left-[2px] top-1 bottom-1 w-[3px] rounded-full ${theme.cursorColor} animate-caret shadow-md shadow-cyan-400/50`}
            />
          )}
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-3 flex flex-col items-center">
      {/* Live Stats Pill Bar */}
      <div className="w-full flex items-center justify-between mb-3 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm">
        <div className="flex items-center gap-6">
          {/* Live Speed */}
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">WPM:</span>
            <span className="font-bold text-lg text-slate-100">{liveWpm}</span>
          </div>

          {/* Live Accuracy */}
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Acc:</span>
            <span className="font-bold text-lg text-slate-100">{liveAccuracy}%</span>
          </div>

          {/* Errors Counter */}
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span className="text-slate-400">Errors:</span>
            <span className="font-semibold text-rose-400">{errorCount}</span>
          </div>
        </div>

        {/* Timer / Progress */}
        <div className="flex items-center gap-2 font-mono-code font-bold text-base text-cyan-400">
          <Clock className="w-4 h-4 text-cyan-400" />
          {mode === 'time' ? (
            <span>{timeLeft}s</span>
          ) : (
            <span>
              {userInput.length} / {targetText.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Text Display Container */}
      <div
        onClick={handleContainerClick}
        className={`relative w-full p-6 sm:p-8 rounded-3xl ${theme.cardBg} cursor-text transition-all duration-200 select-none ${
          isFocused ? 'ring-2 ring-cyan-500/40 shadow-2xl' : 'opacity-85'
        }`}
      >
        {/* Hidden Input Field to capture typing cleanly */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute opacity-0 pointer-events-none -left-9999px"
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />

        {/* Unfocused overlay prompt */}
        {!isFocused && !isFinished && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] rounded-3xl">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 text-sm font-semibold shadow-xl animate-pulse">
              Click anywhere to start typing
            </div>
          </div>
        )}

        {/* Scrollable Text View */}
        <div
          ref={textContainerRef}
          className="max-h-[160px] overflow-hidden leading-relaxed tracking-wide font-mono-code break-words"
        >
          {renderCharacters()}
        </div>

        {/* Bottom Hint / Quick Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono-code">Tab</span>
            <span>+</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono-code">Enter</span>
            <span className="text-slate-400">to quick restart</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
