
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border-gray-300 dark:border-gray-600"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-gray-200" />
      ) : (
        <Sun className="h-4 w-4 text-gray-700" />
      )}
    </Button>
  );
}
