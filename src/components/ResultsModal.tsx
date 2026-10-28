import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  ArrowRight, 
  Share2, 
  CheckCircle, 
  Activity, 
  AlertTriangle,
  Zap,
  Target,
  Clock
} from 'lucide-react';
import { TypingStats } from '../types';
import { getSpeedRank } from '../utils/wpmCalculator';
import { useTheme } from '../context/ThemeContext';

interface ResultsModalProps {
  stats: TypingStats | null;
  isOpen: boolean;
  onRestart: () => void;
  onNext: () => void;
  onClose: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  stats,
  isOpen,
  onRestart,
  onNext,
  onClose
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && stats) {
      if (stats.wpm >= 50 || stats.accuracy >= 95) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.debug(e);
        }
      }
    }
  }, [isOpen, stats]);

  if (!isOpen || !stats) return null;

  const rank = getSpeedRank(stats.wpm, stats.accuracy);

  // SVG Chart points calculation
  const timeline = stats.timeline || [];
  const maxWpm = Math.max(...timeline.map((p) => p.wpm), stats.wpm, 40);
  const chartHeight = 120;
  const chartWidth = 500;

  const chartPoints = timeline.map((point, index) => {
    const x = timeline.length > 1 ? (index / (timeline.length - 1)) * chartWidth : chartWidth / 2;
    const y = chartHeight - (point.wpm / maxWpm) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(' ');

  const handleShare = () => {
    const shareText = `🚀 TypeMaster Pro Results:\n⚡ Speed: ${stats.wpm} WPM (Raw: ${stats.rawWpm})\n🎯 Accuracy: ${stats.accuracy}%\n🏆 Rank: ${rank.badge} ${rank.title}\n⏱️ Time: ${stats.elapsedTime}s`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Sort top missed keys
  const topErrors = Object.entries(stats.errorKeys || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-3xl ${theme.cardBg} border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden`}>
        {/* Header Rank Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${rank.color} flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/20`}>
              {rank.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-100">{rank.title}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Completed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">{rank.description}</p>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Share Score</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Net WPM</span>
            </div>
            <div className="text-3xl font-black text-cyan-400">{stats.wpm}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Raw: {stats.rawWpm}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Accuracy</span>
            </div>
            <div className="text-3xl font-black text-emerald-400">{stats.accuracy}%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{stats.incorrectChars} mistakes</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              <span>Speed (CPM)</span>
            </div>
            <div className="text-3xl font-black text-purple-400">{stats.cpm}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Chars / min</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Time</span>
            </div>
            <div className="text-3xl font-black text-amber-400">{stats.elapsedTime}s</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{stats.totalChars} typed</div>
          </div>
        </div>

        {/* Speed Chart / Timeline */}
        {timeline.length > 2 && (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Speed Timeline (WPM)</span>
              <span>Peak: {maxWpm} WPM</span>
            </div>
            <div className="w-full overflow-hidden">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-24 overflow-visible">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area fill */}
                <polygon
                  points={`0,${chartHeight} ${chartPoints} ${chartWidth},${chartHeight}`}
                  fill="url(#chartGradient)"
                />
                {/* Line stroke */}
                <polyline
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartPoints}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Problem Keys / Heatmap Insights */}
        {topErrors.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Keys to Practice:</span>
            </div>
            <div className="flex items-center gap-2">
              {topErrors.map(([key, count]) => (
                <span
                  key={key}
                  className="px-2.5 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 font-mono-code font-bold text-xs border border-rose-500/40"
                >
                  {key === ' ' ? 'Space' : key}: {count}×
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onNext}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm ${theme.accent} shadow-lg transition`}
          >
            <span>Next Exercise</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
