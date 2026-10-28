export type TestMode = 'time' | 'words' | 'quote' | 'lessons' | 'code' | 'custom';

export type TimeOption = 15 | 30 | 60 | 120;
export type WordCountOption = 10 | 25 | 50 | 100;
export type CodeLanguage = 'javascript' | 'python' | 'html';

export type SoundType = 'clicky' | 'thock' | 'typewriter' | 'off';

export type ThemeId = 'dark-cyber' | 'midnight' | 'terminal' | 'light' | 'monokai';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  bg: string;
  cardBg: string;
  accent: string;
  accentText: string;
  textMuted: string;
  textBright: string;
  errorColor: string;
  correctColor: string;
  keyboardBg: string;
  keyDefaultBg: string;
  keyActiveBg: string;
  cursorColor: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: 'Home Row' | 'Top Row' | 'Bottom Row' | 'Full Alphabet' | 'Numbers & Symbols';
  description: string;
  targetKeys: string[];
  text: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  source?: string;
}

export interface CodeSnippet {
  id: string;
  language: CodeLanguage;
  title: string;
  code: string;
}

export interface KeystrokeTimelinePoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TypingStats {
  wpm: number;
  netWpm: number;
  rawWpm: number;
  accuracy: number;
  cpm: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  elapsedTime: number;
  errorKeys: Record<string, number>;
  timeline: KeystrokeTimelinePoint[];
}

export interface TestResultRecord {
  id: string;
  date: string;
  mode: TestMode;
  modeDetail: string;
  wpm: number;
  accuracy: number;
  netWpm: number;
  durationSeconds: number;
  theme: ThemeId;
}
