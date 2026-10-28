import { SoundType } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playKeySound(type: SoundType, isSpace: boolean = false): void {
  if (type === 'off') return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    if (type === 'clicky') {
      // Crisp mechanical click (Cherry MX Blue style)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = isSpace ? 1400 : 2200 + Math.random() * 300;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);

      // Add slight snap noise
      const snap = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snap.type = 'sine';
      snap.frequency.setValueAtTime(isSpace ? 700 : 950, now);
      snap.frequency.exponentialRampToValueAtTime(150, now + 0.02);
      snapGain.gain.setValueAtTime(0.12, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      snap.connect(snapGain);
      snapGain.connect(ctx.destination);

      snap.start(now);
      snap.stop(now + 0.03);

    } else if (type === 'thock') {
      // Deep, damp, creamy thock (lubed tactile switch)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 0.06);

      const baseFreq = isSpace ? 160 : 240 + Math.random() * 40;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.065);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

    } else if (type === 'typewriter') {
      // Vintage mechanical typewriter clack
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(isSpace ? 450 : 850 + Math.random() * 100, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch (e) {
    // Graceful fallback if Web Audio is restricted
    console.debug('Sound error:', e);
  }
}

export function playErrorSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    console.debug('Error sound error:', e);
  }
}

export function playCompletionChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  } catch (e) {
    console.debug('Chime error:', e);
  }
}
