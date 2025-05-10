
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface DailyActivityCardProps {
  activity: string;
  subjectColor?: string;
  onStart?: () => void;
  translationKey?: string;
}

const DailyActivityCard = ({ 
  activity, 
  subjectColor = 'bg-mint-green',
  onStart,
  translationKey
}: DailyActivityCardProps) => {
  const { ageGroup, colorMode } = useTheme();
  const { translations } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // Get translated activity if translation key is available
  const displayActivity = translationKey ? 
    translations[`activity.${translationKey}`] || activity : activity;
  
  // Get translated title
  const titleText = translations['activity.title'] || "Today's Smart Plan";
  
  // Get translated button text
  const buttonText = translations['button.lets.start'] || "Let's Start!";
  
  return (
    <div className={`
      ${colorMode === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}
      backdrop-blur-sm rounded-xl shadow-md overflow-hidden border
      ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-100'}
    `}>
      <div className={`${subjectColor} p-2 flex items-center gap-2`}>
        <div className="bg-white/30 p-1.5 rounded-full">
          <Lightbulb className="text-white w-5 h-5" />
        </div>
        <h3 className={`${fontClass} font-bold text-white`}>{titleText}</h3>
      </div>
      
      <div className="p-4">
        <p className={`${fontClass} text-lg mb-4 ${colorMode === 'dark' ? 'text-gray-200' : ''}`}>
          {displayActivity}
        </p>
        
        <Button 
          onClick={onStart} 
          className={`
            w-full ${fontClass} micro-pop 
            ${ageGroup === 'young' ? 'rounded-xl text-base' : 'rounded-md text-sm'}
          `}
          variant={ageGroup === 'young' ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default DailyActivityCard;
