
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, languageList } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageList.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`${fontClass} ${language === lang.code ? 'font-bold' : ''}`}
          >
            <span className="mr-2">{lang.nativeName}</span>
            <span className="text-muted-foreground">({lang.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
