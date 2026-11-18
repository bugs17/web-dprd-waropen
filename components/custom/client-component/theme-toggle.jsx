"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  window.dispatchEvent(new Event("theme-change"));
}

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const read = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    read();
    window.addEventListener("theme-change", read);
    return () => window.removeEventListener("theme-change", read);
  }, []);

  const toggleTheme = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      aria-pressed={isDark}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-app-line bg-app-surface text-app-ink transition-colors hover:border-app-gold hover:text-app-gold ${className}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
