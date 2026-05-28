"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Salva no cookie — expira em 1 ano
    document.cookie = `fisio-theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Strict`;
    
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors cursor-pointer"
      aria-label="Alternar tema"
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? faSun : faMoon}
        width={16}
      />
    </button>
  );
}