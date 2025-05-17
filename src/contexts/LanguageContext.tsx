import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'fa' | 'fr' | 'de' | 'es' | 'ar';

// Define language direction
export type Direction = 'ltr' | 'rtl';

type LanguageContextType = {
  language: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
};

const languageDirections: Record<Language, Direction> = {
  en: 'ltr',
  fa: 'rtl',
  fr: 'ltr',
  de: 'ltr',
  es: 'ltr',
  ar: 'rtl'
};

const languages = {
  en: { name: 'English', nativeName: 'English' },
  fa: { name: 'Farsi', nativeName: 'فارسی' },
  fr: { name: 'French', nativeName: 'Français' },
  de: { name: 'German', nativeName: 'Deutsch' },
  es: { name: 'Spanish', nativeName: 'Español' },
  ar: { name: 'Arabic', nativeName: 'العربية' },
};

export const languageList = Object.entries(languages).map(([code, names]) => ({
  code: code as Language,
  ...names
}));

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<Direction>('ltr');

  // Set language and load translations
  const setLanguage = async (newLanguage: Language) => {
    // Keep track of the language's natural direction
    const newDirection = languageDirections[newLanguage];
    setDirection(newDirection);
    
    // Set HTML lang attribute but don't change document direction
    // This way we respect the language but don't flip the entire layout
    document.documentElement.lang = newLanguage;
    
    // Load translations dynamically
    try {
      // Import the translation file dynamically
      const translationsModule = await import(`../translations/${newLanguage}.ts`);
      setTranslations(translationsModule.default);
      console.log(`Loaded translations for ${newLanguage}:`, translationsModule.default);
    } catch (error) {
      console.error(`Failed to load translations for ${newLanguage}`, error);
      // Fallback to empty translations if loading fails
      setTranslations({});
    }
    
    // Set the language state
    setLanguageState(newLanguage);
    
    // Store the selected language in local storage
    localStorage.setItem('selectedLanguage', newLanguage);
  };

  // Initialize translations on mount - with stored preference if available
  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage') as Language;
    setLanguage(storedLanguage || 'en');
  }, []); 

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        translations
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get a translation
export const t = (key: string, context?: LanguageContextType) => {
  if (!context) {
    // When used outside of a component (like in a utility function)
    return key;
  }
  return context.translations[key] || key;
};
