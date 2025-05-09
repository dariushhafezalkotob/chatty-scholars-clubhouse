
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type AgeGroup = 'young' | 'teen';
type ColorMode = 'light' | 'dark';

interface ThemeContextType {
  ageGroup: AgeGroup;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
  themeClass: string;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('young');
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  
  // Check system preference on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setColorMode('dark');
    }
  }, []);
  
  // Apply the color mode to the document
  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);
  
  const toggleColorMode = () => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const ageThemeClass = ageGroup === 'young' ? 'young-theme' : 'teen-theme';
  const themeClass = `${ageThemeClass} ${colorMode}-mode`;

  return (
    <ThemeContext.Provider value={{ 
      ageGroup, 
      setAgeGroup, 
      colorMode,
      setColorMode,
      themeClass,
      toggleColorMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
