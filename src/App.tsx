import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { ModeSelector } from './components/ModeSelector';
import { TypingArea } from './components/TypingArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { ResultsModal } from './components/ResultsModal';
import { HistoryModal } from './components/HistoryModal';
import { LessonModal } from './components/LessonModal';
import { CustomTextModal } from './components/CustomTextModal';
import { useTypingEngine } from './hooks/useTypingEngine';
import { SoundType } from './types';

const TypingMasterApp: React.FC = () => {
  const [soundType, setSoundType] = useState<SoundType>('clicky');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [showFingers, setShowFingers] = useState<boolean>(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isLessonsOpen, setIsLessonsOpen] = useState<boolean>(false);
  const [isCustomOpen, setIsCustomOpen] = useState<boolean>(false);

  const { theme } = useTheme();

  const cycleSound = () => {
    const sequence: SoundType[] = ['clicky', 'thock', 'typewriter', 'off'];
    const nextIdx = (sequence.indexOf(soundType) + 1) % sequence.length;
    setSoundType(sequence[nextIdx]);
  };

  const engine = useTypingEngine(soundType);

  return (
    <div className="min-h-screen flex flex-col justify-between px-3 sm:px-6 py-2 transition-colors duration-300">
      {/* Top Header */}
      <div>
        <Header
          soundType={soundType}
          onCycleSound={cycleSound}
          showKeyboard={showKeyboard}
          onToggleKeyboard={() => setShowKeyboard((prev) => !prev)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenLessons={() => setIsLessonsOpen(true)}
          onRestart={engine.restartTest}
        />

        {/* Mode Selector */}
        <ModeSelector
          mode={engine.mode}
          onSelectMode={engine.setMode}
          timeOption={engine.timeOption}
          onSelectTime={engine.setTimeOption}
          wordOption={engine.wordOption}
          onSelectWordCount={engine.setWordOption}
          codeLang={engine.codeLang}
          onSelectCodeLang={engine.setCodeLang}
          lessonTitle={engine.mode === 'lessons' ? engine.currentLesson.title : undefined}
          onOpenCustomModal={() => setIsCustomOpen(true)}
        />

        {/* Central Typing Area */}
        <main className="w-full flex flex-col items-center justify-center my-2">
          <TypingArea
            targetText={engine.targetText}
            userInput={engine.userInput}
            isStarted={engine.isStarted}
            isFinished={engine.isFinished}
            timeLeft={engine.timeLeft}
            totalTime={engine.totalTime}
            mode={engine.mode}
            liveWpm={engine.liveWpm}
            liveAccuracy={engine.liveAccuracy}
            errorCount={engine.errorCount}
            onInputChange={engine.handleInputChange}
            onKeyDown={engine.handleKeyDown}
            onRestart={engine.restartTest}
            inputRef={engine.inputRef}
            isFocused={engine.isFocused}
            setIsFocused={engine.setIsFocused}
          />

          {/* Interactive Virtual Keyboard */}
          {showKeyboard && (
            <div className="w-full mt-4">
              <VirtualKeyboard
                activeKey={engine.activeKey}
                targetKey={engine.targetKey}
                showFingers={showFingers}
                onToggleFingers={() => setShowFingers((prev) => !prev)}
              />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto py-4 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-3">
          <span>TypeMaster Pro &copy; 2026</span>
          <span>•</span>
          <span className="text-slate-400">Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Tab</kbd> to restart instantly</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLessonsOpen(true)}
            className="hover:text-cyan-400 transition"
          >
            Touch Typing Lessons
          </button>
          <span>•</span>
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="hover:text-cyan-400 transition"
          >
            Personal Bests
          </button>
        </div>
      </footer>

      {/* Results Modal */}
      <ResultsModal
        stats={engine.finalStats}
        isOpen={engine.isFinished}
        onRestart={engine.restartTest}
        onNext={engine.restartTest}
        onClose={engine.restartTest}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        records={engine.records}
        onClearHistory={engine.clearHistory}
      />

      {/* Lessons Curriculum Modal */}
      <LessonModal
        isOpen={isLessonsOpen}
        onClose={() => setIsLessonsOpen(false)}
        onSelectLesson={(lesson) => {
          engine.setMode('lessons');
          engine.setCurrentLesson(lesson);
        }}
        activeLessonId={engine.currentLesson.id}
      />

      {/* Custom Text Input Modal */}
      <CustomTextModal
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        onApplyCustomText={(text) => {
          engine.setCustomText(text);
          engine.setMode('custom');
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <TypingMasterApp />
    </ThemeProvider>
  );
}
