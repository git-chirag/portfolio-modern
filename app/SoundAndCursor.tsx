"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SafariAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

const pianoNotes = [
  { label: "C", frequency: 261.63 },
  { label: "D", frequency: 293.66 },
  { label: "E", frequency: 329.63 },
  { label: "F", frequency: 349.23 },
  { label: "G", frequency: 392 },
  { label: "A", frequency: 440 },
  { label: "B", frequency: 493.88 },
];

const birdMessages = ["Pip says hi!", "Nice scroll!", "Found anything fun?", "Try the tiny piano!", "Good systems, good vibes."];

export function SoundAndCursor() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTipRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const birdTimerRef = useRef<number | null>(null);
  const [pianoOpen, setPianoOpen] = useState(false);
  const [birdMessage, setBirdMessage] = useState("Pip says hi!");
  const [birdExcited, setBirdExcited] = useState(false);

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

  const cheerBird = useCallback((message: string, withChirp = true) => {
    setBirdMessage(message);
    setBirdExcited(true);
    if (birdTimerRef.current) window.clearTimeout(birdTimerRef.current);
    birdTimerRef.current = window.setTimeout(() => setBirdExcited(false), 1400);

    if (withChirp) {
      playTone(987.77, 0.1, 0.025, "sine");
      window.setTimeout(() => playTone(1318.51, 0.12, 0.02, "sine"), 75);
    }
  }, [playTone]);

  useEffect(() => {
    const handleInteractiveClick = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-piano-key]")) return;

      const noteSet = [523.25, 587.33, 659.25, 783.99];
      const note = noteSet[Math.abs(Math.round(event.clientX)) % noteSet.length];
      const isInteractive = Boolean(target.closest("a, button, summary"));
      playTone(note, isInteractive ? 0.08 : 0.055, isInteractive ? 0.04 : 0.022, "triangle");
    };

    window.addEventListener("pointerdown", handleInteractiveClick);
    return () => window.removeEventListener("pointerdown", handleInteractiveClick);
  }, [playTone]);

  useEffect(() => {
    const handleReward = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message ?? "Nice move!";
      cheerBird(message);
    };

    const handleContactSent = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message ?? "Message away!";
      cheerBird(message);
    };

    window.addEventListener("portfolio:reward", handleReward);
    window.addEventListener("contact:sent", handleContactSent);
    return () => {
      window.removeEventListener("portfolio:reward", handleReward);
      window.removeEventListener("contact:sent", handleContactSent);
    };
  }, [cheerBird]);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    let frame = 0;
    const updateProgress = () => {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const value = Math.min(Math.max(window.scrollY / maximum, 0), 1);
      progress.style.setProperty("--scroll-progress", String(value));
      progress.style.setProperty("--scroll-position", `${value * 100}%`);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
      if (birdTimerRef.current) window.clearTimeout(birdTimerRef.current);
    };
  }, []);

  return (
    <>
      <div className="crayon-progress" ref={progressRef} aria-hidden="true">
        <span /><i />
      </div>

      <button
        className={`site-bird${birdExcited ? " is-excited" : ""}`}
        type="button"
        aria-label="Say hello to Pip, the portfolio bird"
        onClick={() => cheerBird(birdMessages[Math.floor(Date.now() / 1000) % birdMessages.length])}
      >
        <span className="bird-speech" role="status">{birdMessage}</span>
        <span className="bird-body" aria-hidden="true">
          <i className="bird-eye" />
          <i className="bird-beak" />
          <span className="bird-wing bird-wing--front" />
          <span className="bird-wing bird-wing--back" />
          <span className="bird-tail" />
        </span>
      </button>

      <aside className={`pocket-piano${pianoOpen ? " is-open" : ""}`} aria-label="Pocket piano">
        <button
          className="pocket-piano__tab"
          type="button"
          aria-expanded={pianoOpen}
          aria-controls="pocket-piano-keys"
          onClick={() => setPianoOpen((current) => !current)}
        >
          <span aria-hidden="true">♫</span>
          Piano
        </button>
        <div className="pocket-piano__body" id="pocket-piano-keys">
          <p>Hover or tap a key</p>
          <div className="pocket-piano__keys">
            {pianoNotes.map((note, index) => (
              <button
                className={`piano-key piano-key--${index + 1}`}
                type="button"
                key={note.label}
                data-piano-key="true"
                aria-label={`Play ${note.label} note`}
                onPointerEnter={() => {
                  if (audioContextRef.current?.state === "running") {
                    playTone(note.frequency, 0.48, 0.045, "sine");
                  }
                }}
                onPointerDown={() => playTone(note.frequency, 0.48, 0.045, "sine")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playTone(note.frequency, 0.48, 0.045, "sine");
                  }
                }}
              >
                <span>{note.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="fun-cursor" ref={cursorRef} aria-hidden="true"><span /></div>
      <div className="fun-cursor-tip" ref={cursorTipRef} aria-hidden="true" />
    </>
  );
}
