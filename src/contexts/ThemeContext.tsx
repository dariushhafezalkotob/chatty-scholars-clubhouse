
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
    
    // Set up a listener for changes in system color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setColorMode(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Apply the color mode to the document
  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('learnquest-theme', JSON.stringify({ ageGroup, colorMode }));
  }, [ageGroup, colorMode]);
  
  // Load preferences from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('learnquest-theme');
    if (savedTheme) {
      try {
        const { ageGroup: savedAgeGroup, colorMode: savedColorMode } = JSON.parse(savedTheme);
        if (savedAgeGroup) setAgeGroup(savedAgeGroup);
        if (savedColorMode) setColorMode(savedColorMode);
      } catch (error) {
        console.error("Error parsing saved theme preferences:", error);
      }
    }
  }, []);
  
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
