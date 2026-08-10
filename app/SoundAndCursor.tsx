"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SafariAudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

type Guide = {
  target: string;
  message: string;
  side: "left" | "right";
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

const guideOrder = ["top", "about", "experience", "projects", "toolbox", "proof", "contact"] as const;

const sectionGuides: Record<(typeof guideOrder)[number], Guide> = {
  top: {
    target: ".hero-highlight",
    message: "Start here. Chirag builds the systems you do not see.",
    side: "right",
  },
  about: {
    target: "#about .about-grid",
    message: "These numbers come from real systems in production.",
    side: "left",
  },
  experience: {
    target: "#experience .experience-card",
    message: "This is where the backend miles add up.",
    side: "right",
  },
  projects: {
    target: "#projects .project-grid",
    message: "Look at the projects. Every card has something to try.",
    side: "left",
  },
  toolbox: {
    target: "#toolbox .skill-groups",
    message: "The toolbox behind the work lives here.",
    side: "right",
  },
  proof: {
    target: "#proof .proof-layout",
    message: "A little proof before you move on.",
    side: "left",
  },
  contact: {
    target: "#contact .contact-form-shell",
    message: "Want to talk? Send Chirag a note here.",
    side: "right",
  },
};

export function SoundAndCursor() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorTipRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const birdRef = useRef<HTMLButtonElement | null>(null);
  const activeSectionRef = useRef("");
  const hurryingRef = useRef(false);
  const speechTimerRef = useRef<number | null>(null);
  const excitedTimerRef = useRef<number | null>(null);
  const arrivalTimerRef = useRef<number | null>(null);
  const hurryTimerRef = useRef<number | null>(null);
  const petTimerRef = useRef<number | null>(null);
  const [pianoOpen, setPianoOpen] = useState(false);
  const [birdMessage, setBirdMessage] = useState("Pip is your tiny tour guide.");
  const [birdSpeaking, setBirdSpeaking] = useState(true);
  const [birdExcited, setBirdExcited] = useState(false);
  const [birdHurrying, setBirdHurrying] = useState(false);
  const [birdPetted, setBirdPetted] = useState(false);
  const [birdFacingLeft, setBirdFacingLeft] = useState(true);

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

  const playPianoNote = useCallback((frequency: number) => {
    playTone(frequency, 0.62, 0.11, "triangle");
    window.setTimeout(() => playTone(frequency * 2, 0.34, 0.032, "sine"), 24);
  }, [playTone]);

  const speak = useCallback((message: string, duration = 2800, withChirp = false) => {
    setBirdMessage(message);
    setBirdSpeaking(true);

    if (speechTimerRef.current) window.clearTimeout(speechTimerRef.current);
    speechTimerRef.current = window.setTimeout(() => setBirdSpeaking(false), duration);

    if (withChirp) {
      setBirdExcited(true);
      if (excitedTimerRef.current) window.clearTimeout(excitedTimerRef.current);
      excitedTimerRef.current = window.setTimeout(() => setBirdExcited(false), 1200);
      playTone(987.77, 0.1, 0.03, "sine");
      window.setTimeout(() => playTone(1318.51, 0.12, 0.025, "sine"), 75);
    }
  }, [playTone]);

  const petBird = useCallback(() => {
    setBirdPetted(true);
    if (petTimerRef.current) window.clearTimeout(petTimerRef.current);
    petTimerRef.current = window.setTimeout(() => setBirdPetted(false), 1300);
    speak("Pip loves that!", 1900, true);
  }, [speak]);

  useEffect(() => {
    const handleInteractiveClick = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-piano-key], .site-bird")) return;

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
      speak(message, 2200, true);
    };

    const handleContactSent = (event: Event) => {
      const message = (event as CustomEvent<{ message?: string }>).detail?.message ?? "Message away!";
      speak(message, 2400, true);
    };

    window.addEventListener("portfolio:reward", handleReward);
    window.addEventListener("contact:sent", handleContactSent);
    return () => {
      window.removeEventListener("portfolio:reward", handleReward);
      window.removeEventListener("contact:sent", handleContactSent);
    };
  }, [speak]);

  useEffect(() => {
    const progress = progressRef.current;
    const bird = birdRef.current;
    if (!progress || !bird) return;

    const sections = guideOrder
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    let frame = 0;
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const updateGuide = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const elapsed = Math.max(now - lastTime, 16);
      const distance = Math.abs(currentY - lastY);
      const speed = distance / elapsed;

      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const value = Math.min(Math.max(currentY / maximum, 0), 1);
      progress.style.setProperty("--scroll-progress", String(value));
      progress.style.setProperty("--scroll-position", `${value * 100}%`);

      if (distance > 80 && speed > 1.35) {
        if (!hurryingRef.current) speak("Wait for me!", 1000);
        hurryingRef.current = true;
        setBirdHurrying(true);
        if (hurryTimerRef.current) window.clearTimeout(hurryTimerRef.current);
        hurryTimerRef.current = window.setTimeout(() => {
          hurryingRef.current = false;
          setBirdHurrying(false);
        }, 650);
      }

      lastY = currentY;
      lastTime = now;

      const focusLine = window.innerHeight * 0.42;
      const activeSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= focusLine && rect.bottom >= focusLine;
      }) ?? sections.reduce((closest, section) => {
        const closestDistance = Math.abs(closest.getBoundingClientRect().top - focusLine);
        const sectionDistance = Math.abs(section.getBoundingClientRect().top - focusLine);
        return sectionDistance < closestDistance ? section : closest;
      }, sections[0]);

      const activeId = activeSection?.id as (typeof guideOrder)[number] | undefined;
      const guide = activeId ? sectionGuides[activeId] : sectionGuides.top;
      const target = document.querySelector<HTMLElement>(guide.target) ?? activeSection;

      if (activeId && activeId !== activeSectionRef.current) {
        activeSectionRef.current = activeId;
        setBirdSpeaking(false);
        if (arrivalTimerRef.current) window.clearTimeout(arrivalTimerRef.current);
        arrivalTimerRef.current = window.setTimeout(() => speak(guide.message, 3200), 820);
      }

      if (target) {
        const targetRect = target.getBoundingClientRect();
        const birdWidth = window.innerWidth <= 680 ? 58 : 66;
        const birdHeight = 58;
        const horizontalPadding = window.innerWidth <= 680 ? 12 : 18;
        const x = guide.side === "right"
          ? window.innerWidth - birdWidth - horizontalPadding
          : horizontalPadding;
        const visibleTop = Math.max(targetRect.top, 92);
        const visibleBottom = Math.min(targetRect.bottom, window.innerHeight - 28);
        const visibleHeight = Math.max(visibleBottom - visibleTop, 80);
        const y = Math.min(
          Math.max(visibleTop + Math.min(visibleHeight * 0.2, 70), 108),
          window.innerHeight - birdHeight - 38,
        );

        bird.style.setProperty("--bird-x", `${x}px`);
        bird.style.setProperty("--bird-y", `${y}px`);
        setBirdFacingLeft(guide.side === "right");
      }

      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateGuide);
    };

    updateGuide();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [speak]);

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
      const isElement = target instanceof Element;
      const isInteractive = isElement && Boolean(target.closest("a, button, summary"));
      const isPetting = isElement && Boolean(target.closest(".site-bird"));
      cursor.classList.toggle("is-hovering", isInteractive);
      cursor.classList.toggle("is-petting", isPetting);
      tip.classList.toggle("is-petting", isPetting);
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

  useEffect(() => () => {
    const context = audioContextRef.current;
    if (context && context.state !== "closed") void context.close();
    [speechTimerRef, excitedTimerRef, arrivalTimerRef, hurryTimerRef, petTimerRef].forEach((timer) => {
      if (timer.current) window.clearTimeout(timer.current);
    });
  }, []);

  return (
    <>
      <div className="crayon-progress" ref={progressRef} aria-hidden="true">
        <span /><i />
      </div>

      <button
        className={`site-bird${birdFacingLeft ? " is-facing-left" : ""}${birdSpeaking ? " is-speaking" : ""}${birdExcited ? " is-excited" : ""}${birdHurrying ? " is-hurrying" : ""}${birdPetted ? " is-petted" : ""}`}
        type="button"
        ref={birdRef}
        aria-label="Pet Pip, the portfolio bird and tour guide"
        onPointerEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) petBird();
        }}
        onClick={petBird}
      >
        <span className="bird-speech" role="status">{birdMessage}</span>
        <span className="bird-speed-lines" aria-hidden="true"><i /><i /><i /></span>
        <span className="bird-hearts" aria-hidden="true"><i>♥</i><i>♥</i><i>♥</i></span>
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
                  if (audioContextRef.current?.state === "running") playPianoNote(note.frequency);
                }}
                onPointerDown={() => playPianoNote(note.frequency)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    playPianoNote(note.frequency);
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
