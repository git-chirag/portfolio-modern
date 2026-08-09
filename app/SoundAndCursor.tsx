"use client";

import { useCallback, useEffect, useRef } from "react";

type SafariAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

export function SoundAndCursor() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTipRef = useRef<HTMLDivElement | null>(null);

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

      const makeSound = () => {
        if (context.state !== "running") return;

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
      };

      if (context.state === "suspended") {
        void context.resume().then(makeSound).catch(() => undefined);
      } else {
        makeSound();
      }
    },
    [getAudioContext],
  );

  useEffect(() => {
    const handleInteractiveClick = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const noteSet = [523.25, 587.33, 659.25, 783.99];
      const note = noteSet[Math.abs(Math.round(event.clientX)) % noteSet.length];
      const isInteractive = Boolean(target.closest("a, button, summary"));
      playTone(note, isInteractive ? 0.08 : 0.055, isInteractive ? 0.04 : 0.022, "triangle");
    };

    window.addEventListener("pointerdown", handleInteractiveClick);
    return () => window.removeEventListener("pointerdown", handleInteractiveClick);
  }, [playTone]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    const tip = cursorTipRef.current;
    if (!cursor || !tip) return;

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
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      tip.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) rotate(45deg)`;
      cursor.classList.add("is-visible");
      tip.classList.add("is-visible");
    };

    const handleOver = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive = target instanceof Element && Boolean(target.closest("a, button, summary"));
      cursor.classList.toggle("is-hovering", isInteractive);
    };

    const handleDown = () => {
      cursor.classList.add("is-clicking");
      tip.classList.add("is-clicking");
      window.clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        cursor.classList.remove("is-clicking");
        tip.classList.remove("is-clicking");
      }, 150);
    };

    const handleLeave = () => {
      cursor.classList.remove("is-visible");
      tip.classList.remove("is-visible");
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
      const context = audioContextRef.current;
      if (context && context.state !== "closed") void context.close();
    };
  }, []);

  return (
    <>
      <div className="fun-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
      <div className="fun-cursor-tip" ref={cursorTipRef} aria-hidden="true" />
    </>
  );
}
