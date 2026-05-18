let audioCtx: AudioContext | null = null;
let ambient: HTMLAudioElement | null = null;
let muted = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return audioCtx;
}

function ensureAudio() {
  if (typeof window === "undefined") return null;
  if (!ambient) {
    ambient = new Audio("/audio/background.m4a");
    ambient.loop = true;
    ambient.volume = 0.4;
  }
  return ambient;
}

export function unlockAudio() {
  const ctx = getCtx();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  const a = ensureAudio();
  if (a) {
    a.muted = false;
    a.play().catch(() => {});
  }
}

export function startAmbient() {
  const a = ensureAudio();
  if (a) {
    a.muted = muted;
    a.play().catch(() => {});
  }
}

export function stopAmbient() {
  if (ambient) ambient.pause();
}

export function ambientPlaying() {
  return ambient ? !ambient.paused : false;
}

export function setMuted(m: boolean) {
  muted = m;
  if (ambient) ambient.muted = m;
}

export function isMuted() {
  return muted;
}

export function playKey() {
  if (muted) return;
  const ctx = getCtx();
  if (!ctx) return;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1);
}
