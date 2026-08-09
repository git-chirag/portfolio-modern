"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SafariAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

export function SoundAndCursor() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambienceTimerRef = useRef<number | null>(null);
  const ambienceGainRef = useRef<GainNode | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);

  const getAudioContext = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;

    const AudioContextClass =
      window.AudioContext ?? (window as SafariAudioWindow).webkitAudioContext;

    if (!AudioContextClass) return null;

    const context = new AudioContextClass();
    audioContextRef.current = context;
    return context;
  }, []);

  const playTone = useCallback(
    (
      frequency: number,
      duration = 0.09,
      volume = 0.035,
      type: OscillatorType = "triangle",
    ) => {
      const context = getAudioContext();
      if (!context) return;
      if (context.state === "suspended") void context.resume();

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.025, now + duration);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.02);
    },
    [getAudioContext],
  );

  const stopAmbience = useCallback(() => {
    if (ambienceTimerRef.current !== null) {
      window.clearInterval(ambienceTimerRef.current);
      ambienceTimerRef.current = null;
    }

    const context = audioContextRef.current;
    const gain = ambienceGainRef.current;
    if (context && gain) {
      const now = context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      window.setTimeout(() => gain.disconnect(), 240);
    }
    ambienceGainRef.current = null;
  }, []);

  const startAmbience = useCallback(() => {
    const context = getAudioContext();
    if (!context || ambienceTimerRef.current !== null) return;
    if (context.state === "suspended") void context.resume();

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(0.22, context.currentTime);
    masterGain.connect(context.destination);
    ambienceGainRef.current = masterGain;

    const notes = [261.63, 329.63, 392, 523.25, 440, 329.63, 293.66, 392];
    let noteIndex = 0;

    const playAmbientNote = () => {
      if (!soundEnabledRef.current || !ambienceGainRef.current) return;

      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      const now = context.currentTime;
      const frequency = notes[noteIndex % notes.length];

      oscillator.type = noteIndex % 3 === 0 ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, now);
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.055, now + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);

      oscillator.connect(noteGain);
      noteGain.connect(masterGain);
      oscillator.start(now);
      oscillator.stop(now + 1.1);
      noteIndex += 1;
    };

    playAmbientNote();
    ambienceTimerRef.current = window.setInterval(playAmbientNote, 1180);
  }, [getAudioContext]);

  const toggleSound = () => {
    const nextValue = !soundEnabledRef.current;
    soundEnabledRef.current = nextValue;
    setSoundEnabled(nextValue);

    if (nextValue) {
      startAmbience();
      playTone(659.25, 0.13, 0.045, "sine");
      window.setTimeout(() => playTone(783.99, 0.12, 0.035, "sine"), 90);
    } else {
      playTone(392, 0.1, 0.028, "sine");
      stopAmbience();
    }
  };

  useEffect(() => {
    const handleInteractiveClick = (event: PointerEvent) => {
      if (!soundEnabledRef.current) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const interactive = target.closest("a, button, summary");
      if (!interactive || interactive.classList.contains("sound-toggle")) return;

      const noteSet = [523.25, 587.33, 659.25, 783.99];
      const note = noteSet[Math.abs(Math.round(event.clientX)) % noteSet.length];
      playTone(note, 0.075, 0.028, "triangle");
    };

    window.addEventListener("pointerdown", handleInteractiveClick);
    return () => window.removeEventListener("pointerdown", handleInteractiveClick);
  }, [playTone]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    document.body.classList.add("has-fun-cursor");
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let frame = 0;
    let clickTimer = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      cursor.classList.add("is-visible");
      dot.classList.add("is-visible");
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive = target instanceof Element && Boolean(target.closest("a, button, summary"));
      cursor.classList.toggle("is-hovering", isInteractive);
    };

    const handleDown = () => {
      cursor.classList.add("is-clicking");
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => cursor.classList.remove("is-clicking"), 150);
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible");
      dot.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    window.addEventListener("pointerdown", handleDown);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    frame = window.requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-fun-cursor");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(clickTimer);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (ambienceTimerRef.current !== null) window.clearInterval(ambienceTimerRef.current);
      const context = audioContextRef.current;
      if (context && context.state !== "closed") void context.close();
    };
  }, []);

  return (
    <>
      <div className="fun-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
      <div className="fun-cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <button
        className={`sound-toggle${soundEnabled ? " is-on" : ""}`}
        type="button"
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? "Turn website sounds off" : "Turn website sounds on"}
        onClick={toggleSound}
      >
        <span className="sound-toggle-icon" aria-hidden="true">{soundEnabled ? "♫" : "♪"}</span>
        <span>Sound {soundEnabled ? "on" : "off"}</span>
      </button>
    </>
  );
}
