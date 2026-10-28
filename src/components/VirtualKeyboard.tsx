import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface VirtualKeyboardProps {
  activeKey: string | null;
  targetKey: string | null;
  showFingers: boolean;
  onToggleFingers: () => void;
}

interface KeyDef {
  key: string;
  display?: string;
  width?: string;
  finger: 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th';
}

const fingerColors: Record<string, { name: string; color: string; border: string }> = {
  lp: { name: 'Left Pinky', color: 'bg-rose-500', border: 'border-b-rose-500' },
  lr: { name: 'Left Ring', color: 'bg-orange-500', border: 'border-b-orange-500' },
  lm: { name: 'Left Middle', color: 'bg-amber-400', border: 'border-b-amber-400' },
  li: { name: 'Left Index', color: 'bg-emerald-400', border: 'border-b-emerald-400' },
  ri: { name: 'Right Index', color: 'bg-cyan-400', border: 'border-b-cyan-400' },
  rm: { name: 'Right Middle', color: 'bg-blue-400', border: 'border-b-blue-400' },
  rr: { name: 'Right Ring', color: 'bg-purple-400', border: 'border-b-purple-400' },
  rp: { name: 'Right Pinky', color: 'bg-pink-400', border: 'border-b-pink-400' },
  th: { name: 'Thumb', color: 'bg-indigo-400', border: 'border-b-indigo-400' },
};

const keyboardLayout: KeyDef[][] = [
  [
    { key: '`', display: '~ `', finger: 'lp' },
    { key: '1', display: '1', finger: 'lp' },
    { key: '2', display: '2', finger: 'lr' },
    { key: '3', display: '3', finger: 'lm' },
    { key: '4', display: '4', finger: 'li' },
    { key: '5', display: '5', finger: 'li' },
    { key: '6', display: '6', finger: 'ri' },
    { key: '7', display: '7', finger: 'ri' },
    { key: '8', display: '8', finger: 'rm' },
    { key: '9', display: '9', finger: 'rr' },
    { key: '0', display: '0', finger: 'rp' },
    { key: '-', display: '-', finger: 'rp' },
    { key: '=', display: '=', finger: 'rp' },
    { key: 'Backspace', display: 'Backspace', width: 'w-20', finger: 'rp' }
  ],
  [
    { key: 'Tab', display: 'Tab', width: 'w-16', finger: 'lp' },
    { key: 'q', display: 'Q', finger: 'lp' },
    { key: 'w', display: 'W', finger: 'lr' },
    { key: 'e', display: 'E', finger: 'lm' },
    { key: 'r', display: 'R', finger: 'li' },
    { key: 't', display: 'T', finger: 'li' },
    { key: 'y', display: 'Y', finger: 'ri' },
    { key: 'u', display: 'U', finger: 'ri' },
    { key: 'i', display: 'I', finger: 'rm' },
    { key: 'o', display: 'O', finger: 'rr' },
    { key: 'p', display: 'P', finger: 'rp' },
    { key: '[', display: '[', finger: 'rp' },
    { key: ']', display: ']', finger: 'rp' },
    { key: '\\', display: '\\', width: 'w-12', finger: 'rp' }
  ],
  [
    { key: 'CapsLock', display: 'Caps', width: 'w-18', finger: 'lp' },
    { key: 'a', display: 'A', finger: 'lp' },
    { key: 's', display: 'S', finger: 'lr' },
    { key: 'd', display: 'D', finger: 'lm' },
    { key: 'f', display: 'F', finger: 'li' },
    { key: 'g', display: 'G', finger: 'li' },
    { key: 'h', display: 'H', finger: 'ri' },
    { key: 'j', display: 'J', finger: 'ri' },
    { key: 'k', display: 'K', finger: 'rm' },
    { key: 'l', display: 'L', finger: 'rr' },
    { key: ';', display: ';', finger: 'rp' },
    { key: "'", display: "'", finger: 'rp' },
    { key: 'Enter', display: 'Enter', width: 'w-22', finger: 'rp' }
  ],
  [
    { key: 'Shift', display: 'Shift', width: 'w-24', finger: 'lp' },
    { key: 'z', display: 'Z', finger: 'lp' },
    { key: 'x', display: 'X', finger: 'lr' },
    { key: 'c', display: 'C', finger: 'lm' },
    { key: 'v', display: 'V', finger: 'li' },
    { key: 'b', display: 'B', finger: 'li' },
    { key: 'n', display: 'N', finger: 'ri' },
    { key: 'm', display: 'M', finger: 'ri' },
    { key: ',', display: ',', finger: 'rm' },
    { key: '.', display: '.', finger: 'rr' },
    { key: '/', display: '/', finger: 'rp' },
    { key: 'ShiftRight', display: 'Shift', width: 'w-24', finger: 'rp' }
  ],
  [
    { key: 'Control', display: 'Ctrl', width: 'w-16', finger: 'lp' },
    { key: 'Alt', display: 'Alt', width: 'w-14', finger: 'th' },
    { key: ' ', display: 'Space', width: 'w-72', finger: 'th' },
    { key: 'AltGraph', display: 'Alt', width: 'w-14', finger: 'th' },
    { key: 'ControlRight', display: 'Ctrl', width: 'w-16', finger: 'rp' }
  ]
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeKey,
  targetKey,
  showFingers,
  onToggleFingers
}) => {
  const { theme } = useTheme();

  // Normalize keys for matching
  const normalizedActive = activeKey ? activeKey.toLowerCase() : null;
  const normalizedTarget = targetKey ? (targetKey === ' ' ? ' ' : targetKey.toLowerCase()) : null;

  return (
    <div className={`w-full max-w-4xl mx-auto p-4 rounded-2xl ${theme.keyboardBg} shadow-2xl transition-all duration-300`}>
      {/* Top Header / Legend Toggle */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-wider text-slate-400">On-Screen Keyboard</span>
          {targetKey && (
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Next Key: <span className="font-bold underline">{targetKey === ' ' ? 'Space' : targetKey}</span>
            </span>
          )}
        </div>
        <button
          onClick={onToggleFingers}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
        >
          {showFingers ? 'Hide Finger Guides' : 'Show Finger Guides'}
        </button>
      </div>

      {/* Keys Grid */}
      <div className="flex flex-col gap-1.5 select-none font-mono-code">
        {keyboardLayout.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1.5 w-full">
            {row.map((item, keyIdx) => {
              const isMatchActive =
                normalizedActive === item.key.toLowerCase() ||
                (item.key === ' ' && normalizedActive === ' ');

              const isMatchTarget =
                normalizedTarget === item.key.toLowerCase() ||
                (item.key === ' ' && normalizedTarget === ' ');

              // Home row tactile bump (F and J)
              const hasBump = item.key === 'f' || item.key === 'j';

              let keyStyle = theme.keyDefaultBg;
              if (isMatchActive) {
                keyStyle = theme.keyActiveBg;
              } else if (isMatchTarget) {
                keyStyle = 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400 animate-pulse shadow-md shadow-cyan-500/20';
              }

              const widthClass = item.width || 'w-11';
              const fingerInfo = fingerColors[item.finger];

              return (
                <div
                  key={keyIdx}
                  className={`relative h-11 ${widthClass} flex flex-col items-center justify-center rounded-lg text-xs font-semibold cursor-pointer transition-all duration-75 shadow-sm border ${keyStyle} ${
                    showFingers && !isMatchActive && !isMatchTarget ? `border-b-2 ${fingerInfo.border}` : ''
                  }`}
                >
                  <span>{item.display}</span>
                  {hasBump && (
                    <span className="absolute bottom-1 w-2.5 h-0.5 bg-slate-400/80 rounded-full" />
                  )}
                  {showFingers && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-lg opacity-40 ${fingerInfo.color}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Finger Legend Bar */}
      {showFingers && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300 mr-1">Fingers:</span>
          {Object.entries(fingerColors).map(([code, info]) => (
            <div key={code} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${info.color}`} />
              <span>{info.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
