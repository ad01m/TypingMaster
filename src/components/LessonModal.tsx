import React from 'react';
import { BookOpen, X, Play, CheckCircle } from 'lucide-react';
import { Lesson } from '../types';
import { typingLessons } from '../data/lessons';
import { useTheme } from '../context/ThemeContext';

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  activeLessonId?: string;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  activeLessonId
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl rounded-3xl ${theme.cardBg} border border-slate-700 p-6 sm:p-8 shadow-2xl relative max-h-[85vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">TypingMaster Step-by-Step Lessons</h3>
              <p className="text-xs text-slate-400">Master touch typing muscle memory from Home Row to Numbers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="flex-1 overflow-y-auto my-4 pr-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          {typingLessons.map((lesson) => {
            const isActive = lesson.id === activeLessonId;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson);
                  onClose();
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {lesson.category}
                    </span>
                    {isActive && (
                      <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 mb-1">{lesson.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Keys:</span>
                    <div className="flex flex-wrap gap-1">
                      {lesson.targetKeys.slice(0, 6).map((k) => (
                        <span key={k} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono-code text-[10px]">
                          {k}
                        </span>
                      ))}
                      {lesson.targetKeys.length > 6 && (
                        <span className="text-[10px] text-slate-500">+{lesson.targetKeys.length - 6}</span>
                      )}
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-semibold text-cyan-400">
                    <span>Start</span>
                    <Play className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
