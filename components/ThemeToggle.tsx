"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme == "light"}
        onChange={toggleTheme}
      />
      <div className="button">
        <div className="light"></div>
        <div className="dots"></div>
        <div className="characters"></div>
        <div className="shine"></div>
        <div className="shadow"></div>
      </div>
    </label>
  );
}
