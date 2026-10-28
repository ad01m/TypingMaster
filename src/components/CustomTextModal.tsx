import React, { useState } from 'react';
import { Edit3, X, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CustomTextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCustomText: (text: string) => void;
}

export const CustomTextModal: React.FC<CustomTextModalProps> = ({
  isOpen,
  onClose,
  onApplyCustomText
}) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length > 0) {
      onApplyCustomText(text.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className={`w-full max-w-lg rounded-3xl ${theme.cardBg} border border-slate-700 p-6 shadow-2xl relative`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Edit3 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-100">Custom Practice Text</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-xs font-semibold text-slate-400 mb-2">
            Paste your article, vocabulary list, or custom drill paragraph:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Type or paste any text here..."
            className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 text-sm font-mono-code focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
            autoFocus
          />

          <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={text.trim().length === 0}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold ${theme.accent} disabled:opacity-50 transition`}
            >
              <span>Practice Now</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
