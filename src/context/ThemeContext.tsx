import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeId, ThemeConfig } from '../types';

export const themes: Record<ThemeId, ThemeConfig> = {
  'dark-cyber': {
    id: 'dark-cyber',
    name: 'Cyberpunk Neon',
    bg: 'bg-[#0b0f19]',
    cardBg: 'bg-[#111827]/80 backdrop-blur-md border border-cyan-500/20',
    accent: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/30',
    accentText: 'text-cyan-400',
    textMuted: 'text-slate-500',
    textBright: 'text-cyan-100',
    errorColor: 'text-rose-500 bg-rose-500/20',
    correctColor: 'text-cyan-300',
    keyboardBg: 'bg-slate-900/90 border border-slate-800',
    keyDefaultBg: 'bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:bg-slate-700/80',
    keyActiveBg: 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/50 scale-95 border-cyan-300',
    cursorColor: 'bg-cyan-400'
  },
  'midnight': {
    id: 'midnight',
    name: 'Midnight Sapphire',
    bg: 'bg-[#090d16]',
    cardBg: 'bg-[#0f172a]/90 backdrop-blur-md border border-indigo-500/20',
    accent: 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/30',
    accentText: 'text-indigo-400',
    textMuted: 'text-slate-500',
    textBright: 'text-slate-100',
    errorColor: 'text-red-400 bg-red-500/20',
    correctColor: 'text-indigo-300',
    keyboardBg: 'bg-[#0b1120]/90 border border-slate-800',
    keyDefaultBg: 'bg-slate-800/70 text-slate-300 border border-slate-700/50',
    keyActiveBg: 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50 scale-95 border-indigo-300',
    cursorColor: 'bg-indigo-400'
  },
  'terminal': {
    id: 'terminal',
    name: 'Matrix Terminal',
    bg: 'bg-[#030704]',
    cardBg: 'bg-[#061208]/90 backdrop-blur-md border border-emerald-500/30',
    accent: 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/40',
    accentText: 'text-emerald-400',
    textMuted: 'text-emerald-800',
    textBright: 'text-emerald-300',
    errorColor: 'text-red-400 bg-red-900/40',
    correctColor: 'text-emerald-400 font-bold',
    keyboardBg: 'bg-[#051108]/95 border border-emerald-900/60',
    keyDefaultBg: 'bg-[#091a0c] text-emerald-400 border border-emerald-800/40',
    keyActiveBg: 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/60 scale-95 border-emerald-200',
    cursorColor: 'bg-emerald-400'
  },
  'monokai': {
    id: 'monokai',
    name: 'Monokai Pro',
    bg: 'bg-[#1e1f1c]',
    cardBg: 'bg-[#272822]/90 backdrop-blur-md border border-yellow-500/20',
    accent: 'bg-[#e6db74] hover:bg-[#f8f08e] text-black shadow-yellow-500/30',
    accentText: 'text-[#e6db74]',
    textMuted: 'text-[#75715e]',
    textBright: 'text-[#f8f8f2]',
    errorColor: 'text-[#f92672] bg-[#f92672]/20',
    correctColor: 'text-[#a6e22e]',
    keyboardBg: 'bg-[#22231e]/90 border border-slate-700',
    keyDefaultBg: 'bg-[#2d2e28] text-[#f8f8f2] border border-stone-700',
    keyActiveBg: 'bg-[#fd971f] text-black shadow-lg shadow-[#fd971f]/50 scale-95 border-amber-300',
    cursorColor: 'bg-[#fd971f]'
  },
  'light': {
    id: 'light',
    name: 'Minimalist Clean',
    bg: 'bg-slate-100',
    cardBg: 'bg-white/95 backdrop-blur-md border border-slate-200 shadow-md',
    accent: 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20',
    accentText: 'text-slate-900',
    textMuted: 'text-slate-400',
    textBright: 'text-slate-800',
    errorColor: 'text-rose-600 bg-rose-100',
    correctColor: 'text-teal-600 font-medium',
    keyboardBg: 'bg-slate-200/90 border border-slate-300',
    keyDefaultBg: 'bg-white text-slate-700 border border-slate-300 shadow-sm hover:bg-slate-50',
    keyActiveBg: 'bg-teal-500 text-white shadow-md shadow-teal-500/40 scale-95 border-teal-600',
    cursorColor: 'bg-teal-500'
  }
};

interface ThemeContextType {
  themeId: ThemeId;
  theme: ThemeConfig;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('typemaster_theme') as ThemeId;
      if (saved && themes[saved]) return saved;
    }
    return 'dark-cyber';
  });

  const setThemeId = (id: ThemeId) => {
    setThemeIdState(id);
    localStorage.setItem('typemaster_theme', id);
  };

  const theme = themes[themeId];

  return (
    <ThemeContext.Provider value={{ themeId, theme, setThemeId }}>
      <div className={`min-h-screen ${theme.bg} ${theme.textBright} transition-colors duration-300`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
