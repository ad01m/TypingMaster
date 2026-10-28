import React from 'react';
import { 
  Keyboard, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BarChart2, 
  Palette, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import { SoundType, ThemeId } from '../types';

interface HeaderProps {
  soundType: SoundType;
  onCycleSound: () => void;
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
  onOpenHistory: () => void;
  onOpenLessons: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundType,
  onCycleSound,
  showKeyboard,
  onToggleKeyboard,
  onOpenHistory,
  onOpenLessons,
  onRestart
}) => {
  const { theme, themeId, setThemeId } = useTheme();

  const getSoundLabel = (type: SoundType) => {
    switch (type) {
      case 'clicky': return 'Clicky Blue';
      case 'thock': return 'Thocky';
      case 'typewriter': return 'Typewriter';
      case 'off': return 'Muted';
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto pt-6 pb-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/40">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl ${theme.accent} shadow-md transition-all duration-300`}>
          <Keyboard className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">TypeMaster <span className={theme.accentText}>Pro</span></h1>
            <span className="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              v2.0
            </span>
          </div>
          <p className="text-xs text-slate-400">Master Speed, Accuracy & Touch Typing</p>
        </div>
      </div>

      {/* Control Buttons & Settings */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={onCycleSound}
          title={`Audio Switch: ${getSoundLabel(soundType)} (Click to switch)`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition shadow-sm"
        >
          {soundType === 'off' ? (
            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span className="capitalize">{getSoundLabel(soundType)}</span>
        </button>

        {/* Keyboard Toggle */}
        <button
          onClick={onToggleKeyboard}
          title="Toggle On-Screen Keyboard"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition shadow-sm ${
            showKeyboard
              ? `${theme.accentText} bg-cyan-500/10 border-cyan-500/30`
              : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
          }`}
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span>Keyboard</span>
        </button>

        {/* Lessons Library */}
        <button
          onClick={onOpenLessons}
          title="Explore Structured Lessons"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Lessons</span>
        </button>

        {/* History / Stats */}
        <button
          onClick={onOpenHistory}
          title="View Best Scores & History"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 transition shadow-sm"
        >
          <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Stats</span>
        </button>

        {/* Theme Picker Dropdown */}
        <div className="relative group">
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60 cursor-pointer hover:bg-slate-700/80 transition">
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={themeId}
              onChange={(e) => setThemeId(e.target.value as ThemeId)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {Object.values(themes).map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-100">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          title="Restart Test (Tab + Enter)"
          className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 border border-slate-700/60 transition shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
