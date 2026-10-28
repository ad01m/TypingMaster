import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  TestMode, 
  TimeOption, 
  WordCountOption, 
  CodeLanguage, 
  Lesson, 
  TypingStats, 
  TestResultRecord, 
  SoundType, 
  KeystrokeTimelinePoint 
} from '../types';
import { getRandomWords } from '../data/wordLists';
import { getRandomQuote } from '../data/quotes';
import { getCodeSnippetsByLang } from '../data/codeSnippets';
import { typingLessons } from '../data/lessons';
import { playKeySound, playErrorSound, playCompletionChime } from '../utils/sound';
import { calculateWpmStats } from '../utils/wpmCalculator';

export function useTypingEngine(soundType: SoundType) {
  const [mode, setMode] = useState<TestMode>('time');
  const [timeOption, setTimeOption] = useState<TimeOption>(30);
  const [wordOption, setWordOption] = useState<WordCountOption>(25);
  const [codeLang, setCodeLang] = useState<CodeLanguage>('javascript');
  const [currentLesson, setCurrentLesson] = useState<Lesson>(typingLessons[0]);
  const [customText, setCustomText] = useState<string>('');

  const [targetText, setTargetText] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Live stats & error analysis
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [errorKeys, setErrorKeys] = useState<Record<string, number>>({});
  const [timeline, setTimeline] = useState<KeystrokeTimelinePoint[]>([]);
  const [finalStats, setFinalStats] = useState<TypingStats | null>(null);

  // Stored tests history
  const [records, setRecords] = useState<TestResultRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('typemaster_history');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  // Generate target text on mode change or restart
  const generateNewText = useCallback(() => {
    let text = '';
    if (mode === 'time') {
      text = getRandomWords(70);
    } else if (mode === 'words') {
      text = getRandomWords(wordOption);
    } else if (mode === 'quote') {
      text = getRandomQuote().text;
    } else if (mode === 'lessons') {
      text = currentLesson.text;
    } else if (mode === 'code') {
      const snippets = getCodeSnippetsByLang(codeLang);
      text = snippets.length > 0 ? snippets[Math.floor(Math.random() * snippets.length)].code : 'const app = true;';
    } else if (mode === 'custom') {
      text = customText || 'Practice makes perfect!';
    }
    setTargetText(text);
    setUserInput('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeLeft(mode === 'time' ? timeOption : 0);
    setElapsedTime(0);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setErrorCount(0);
    setErrorKeys({});
    setTimeline([]);
    setFinalStats(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [mode, timeOption, wordOption, codeLang, currentLesson, customText]);

  // Initial text generation
  useEffect(() => {
    generateNewText();
  }, [generateNewText]);

  // Finish test and calculate stats
  const finishTest = useCallback((finalElapsed: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setIsFinished(true);
    setIsStarted(false);
    playCompletionChime();

    // Calculate characters breakdown
    let correct = 0;
    let incorrect = 0;
    const inputChars = userInput.split('');
    const targetChars = targetText.split('');

    for (let i = 0; i < inputChars.length; i++) {
      if (inputChars[i] === targetChars[i]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    const duration = Math.max(finalElapsed, 1);
    const stats = calculateWpmStats(
      inputChars.length,
      correct,
      incorrect,
      0,
      Math.max(0, targetChars.length - inputChars.length),
      duration,
      errorKeys,
      timeline
    );

    setFinalStats(stats);

    // Save record to local storage
    const newRecord: TestResultRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      mode,
      modeDetail: mode === 'time' ? `${timeOption}s` : mode === 'words' ? `${wordOption} words` : mode,
      wpm: stats.wpm,
      accuracy: stats.accuracy,
      netWpm: stats.netWpm,
      durationSeconds: Math.round(duration),
      theme: 'dark-cyber'
    };

    setRecords((prev) => {
      const updated = [...prev, newRecord].slice(-50);
      try {
        localStorage.setItem('typemaster_history', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, [userInput, targetText, errorKeys, timeline, mode, timeOption, wordOption]);

  // Main 1-second interval loop
  useEffect(() => {
    if (!isStarted || isFinished) return;

    timerRef.current = setInterval(() => {
      setElapsedTime((prevElapsed) => {
        const nextElapsed = prevElapsed + 1;

        // In time mode, countdown
        if (mode === 'time') {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              finishTest(timeOption);
              return 0;
            }
            return prevTime - 1;
          });
        }

        // Calculate live WPM
        const minutes = nextElapsed / 60;
        let correct = 0;
        const inputChars = userInput.split('');
        const targetChars = targetText.split('');
        inputChars.forEach((ch, idx) => {
          if (ch === targetChars[idx]) correct++;
        });

        const currentWpm = Math.round((correct / 5) / Math.max(minutes, 0.0167));
        setLiveWpm(currentWpm);

        // Record timeline point for graph
        setTimeline((prevTl) => [
          ...prevTl,
          {
            second: nextElapsed,
            wpm: currentWpm,
            rawWpm: Math.round((inputChars.length / 5) / Math.max(minutes, 0.0167)),
            errors: errorCount
          }
        ]);

        return nextElapsed;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isFinished, mode, timeOption, userInput, targetText, errorCount, finishTest]);

  // Handle Input typing changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const value = e.target.value;

    // Start timer on first keystroke
    if (!isStarted && value.length > 0) {
      setIsStarted(true);
    }

    const prevLength = userInput.length;
    const newLength = value.length;

    // Character added
    if (newLength > prevLength) {
      const addedChar = value[newLength - 1];
      const targetChar = targetText[newLength - 1];

      if (addedChar === targetChar) {
        playKeySound(soundType, addedChar === ' ');
      } else {
        playErrorSound();
        setErrorCount((prev) => prev + 1);
        setErrorKeys((prev) => ({
          ...prev,
          [targetChar || 'extra']: (prev[targetChar || 'extra'] || 0) + 1
        }));
      }
    }

    setUserInput(value);

    // Live accuracy calculation
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === targetText[i]) correct++;
    }
    const acc = value.length > 0 ? Math.round((correct / value.length) * 100) : 100;
    setLiveAccuracy(acc);

    // Check completion for text-length based modes
    if (mode !== 'time' && value.length >= targetText.length) {
      finishTest(elapsedTime + 1);
    }
  };

  // Physical key down detection for keyboard illumination and hotkeys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setActiveKey(e.key);

    // Hotkey: Tab + Enter or Escape to restart
    if (e.key === 'Tab') {
      e.preventDefault();
      generateNewText();
      return;
    }
    if (e.key === 'Escape') {
      generateNewText();
      return;
    }
  };

  // Clear active key highlight on key release
  useEffect(() => {
    const handleKeyUp = () => setActiveKey(null);
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('typemaster_history');
    setRecords([]);
  };

  const targetKey = userInput.length < targetText.length ? targetText[userInput.length] : null;

  return {
    mode,
    setMode,
    timeOption,
    setTimeOption,
    wordOption,
    setWordOption,
    codeLang,
    setCodeLang,
    currentLesson,
    setCurrentLesson,
    customText,
    setCustomText,
    targetText,
    userInput,
    isStarted,
    isFinished,
    timeLeft,
    totalTime: timeOption,
    liveWpm,
    liveAccuracy,
    errorCount,
    finalStats,
    activeKey,
    targetKey,
    inputRef,
    isFocused,
    setIsFocused,
    records,
    handleInputChange,
    handleKeyDown,
    restartTest: generateNewText,
    clearHistory: handleClearHistory
  };
}
