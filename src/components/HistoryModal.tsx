import React from 'react';
import { Trophy, Clock, X, Trash2, Award, Zap } from 'lucide-react';
import { TestResultRecord } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: TestResultRecord[];
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onClearHistory
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const bestWpm = records.length > 0 ? Math.max(...records.map((r) => r.wpm)) : 0;
  const avgWpm = records.length > 0 ? Math.round(records.reduce((acc, r) => acc + r.wpm, 0) / records.length) : 0;
  const avgAccuracy = records.length > 0 ? Math.round(records.reduce((acc, r) => acc + r.accuracy, 0) / records.length) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-xl rounded-3xl ${theme.cardBg} border border-slate-700 p-6 shadow-2xl relative max-h-[85vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-slate-100">Typing Performance & History</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-0.5 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Personal Best</span>
            </div>
            <div className="text-2xl font-black text-amber-400">{bestWpm} <span className="text-xs font-normal">WPM</span></div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-0.5 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Average Speed</span>
            </div>
            <div className="text-2xl font-black text-cyan-400">{avgWpm} <span className="text-xs font-normal">WPM</span></div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-0.5 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Avg Accuracy</span>
            </div>
            <div className="text-2xl font-black text-emerald-400">{avgAccuracy}%</div>
          </div>
        </div>

        {/* Records List */}
        <div className="flex-1 overflow-y-auto my-2 pr-1 space-y-2">
          {records.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              No tests completed yet. Start typing to record your stats!
            </div>
          ) : (
            records.slice().reverse().map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-200">{record.wpm} WPM</span>
                    <span className="text-xs text-emerald-400 font-medium">{record.accuracy}% acc</span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {record.mode}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{record.date}</div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono-code">
                  {record.durationSeconds}s
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {records.length > 0 && (
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500">Total sessions: {records.length}</span>
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
