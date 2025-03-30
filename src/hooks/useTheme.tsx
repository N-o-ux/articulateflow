
import { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme based on localStorage or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) return savedTheme;
      
      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    // Default to light mode
    return "light";
  });

  useEffect(() => {
    // Update theme in localStorage and on document
    localStorage.setItem("theme", theme);
    
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Set a data attribute for additional styling hooks
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
