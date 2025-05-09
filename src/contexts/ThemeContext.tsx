
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AgeGroup = 'young' | 'teen';

interface ThemeContextType {
  ageGroup: AgeGroup;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  themeClass: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('young');
  
  const themeClass = ageGroup === 'young' ? 'young-theme' : 'teen-theme';

  return (
    <ThemeContext.Provider value={{ ageGroup, setAgeGroup, themeClass }}>
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
