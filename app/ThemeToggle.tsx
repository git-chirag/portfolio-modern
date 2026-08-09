"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

const storageKey = "chirag-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(storageKey)) return;
      const nextTheme = event.matches ? "dark" : "light";
      applyTheme(nextTheme);
    };

    const handleStoredTheme = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const nextTheme = event.newValue === "dark"
        ? "dark"
        : event.newValue === "light"
          ? "light"
          : media.matches
            ? "dark"
            : "light";
      applyTheme(nextTheme);
    };

    media.addEventListener("change", handleSystemTheme);
    window.addEventListener("storage", handleStoredTheme);

    return () => {
      media.removeEventListener("change", handleSystemTheme);
      window.removeEventListener("storage", handleStoredTheme);
    };
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">☾</span>
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀</span>
      <span className="theme-toggle__label theme-toggle__label--dark" aria-hidden="true">Dark</span>
      <span className="theme-toggle__label theme-toggle__label--light" aria-hidden="true">Light</span>
    </button>
  );
}
