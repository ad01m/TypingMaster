import { TypingStats, KeystrokeTimelinePoint } from '../types';

export function calculateWpmStats(
  totalChars: number,
  correctChars: number,
  incorrectChars: number,
  extraChars: number,
  missedChars: number,
  elapsedSeconds: number,
  errorKeys: Record<string, number>,
  timeline: KeystrokeTimelinePoint[]
): TypingStats {
  const elapsedMinutes = Math.max(elapsedSeconds / 60, 0.0167); // minimum 1 second equivalent

  // Standard formula: 5 characters equal 1 word
  const rawWpm = Math.round((totalChars / 5) / elapsedMinutes);
  const netWpm = Math.max(0, Math.round((correctChars / 5) / elapsedMinutes));
  const accuracy = totalChars > 0 ? Math.max(0, Math.min(100, Math.round((correctChars / totalChars) * 100))) : 100;
  const cpm = Math.round(correctChars / elapsedMinutes);

  return {
    wpm: netWpm,
    netWpm,
    rawWpm,
    accuracy,
    cpm,
    totalChars,
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    elapsedTime: Math.round(elapsedSeconds * 10) / 10,
    errorKeys,
    timeline
  };
}

export interface SpeedRank {
  title: string;
  badge: string;
  color: string;
  description: string;
}

export function getSpeedRank(wpm: number, accuracy: number): SpeedRank {
  if (wpm >= 110 && accuracy >= 95) {
    return {
      title: 'Typing Deity',
      badge: '🚀',
      color: 'from-amber-400 to-rose-500',
      description: 'Godlike speed! You rank in the top 0.1% of typists worldwide.'
    };
  }
  if (wpm >= 85 && accuracy >= 92) {
    return {
      title: 'Speed Demon',
      badge: '⚡',
      color: 'from-cyan-400 to-blue-600',
      description: 'Blazing fast! Flawless rhythm and incredible finger coordination.'
    };
  }
  if (wpm >= 65 && accuracy >= 90) {
    return {
      title: 'Cheetah Pro',
      badge: '🐆',
      color: 'from-emerald-400 to-teal-600',
      description: 'Professional grade speed! Far above average typists.'
    };
  }
  if (wpm >= 45 && accuracy >= 85) {
    return {
      title: 'Agile Fox',
      badge: '🦊',
      color: 'from-yellow-400 to-amber-600',
      description: 'Solid intermediate rhythm! With consistent practice you will reach pro tier.'
    };
  }
  if (wpm >= 25) {
    return {
      title: 'Swift Rabbit',
      badge: '🐇',
      color: 'from-indigo-400 to-purple-600',
      description: 'Good foundation. Focus on accuracy to build muscle memory.'
    };
  }
  return {
    title: 'Steady Learner',
    badge: '🐢',
    color: 'from-slate-400 to-slate-600',
    description: 'Every expert was once a beginner. Keep your eyes on the screen, not the keys!'
  };
}
