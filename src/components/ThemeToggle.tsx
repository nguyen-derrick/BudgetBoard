import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

type Theme = 'light' | 'dark';

type ThemeToggleProps = {
  theme: Theme;
  onToggle: (theme: Theme) => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      type="button"
      variant="secondary"
      className="h-12 w-12 rounded-2xl p-0"
      onClick={() => onToggle(nextTheme)}
      aria-pressed={theme === 'dark'}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  );
}
