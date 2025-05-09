
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface DailyActivityCardProps {
  activity: string;
  subjectColor?: string;
  onStart?: () => void;
}

const DailyActivityCard = ({ 
  activity, 
  subjectColor = 'bg-mint-green',
  onStart 
}: DailyActivityCardProps) => {
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden`}>
      <div className={`${subjectColor} p-2 flex items-center gap-2`}>
        <div className="bg-white/30 p-1.5 rounded-full">
          <Lightbulb className="text-white w-5 h-5" />
        </div>
        <h3 className={`${fontClass} font-bold text-white`}>Today's Smart Plan</h3>
      </div>
      
      <div className="p-4">
        <p className={`${fontClass} text-lg mb-4`}>{activity}</p>
        
        <Button 
          onClick={onStart} 
          className={`w-full ${fontClass} micro-pop rounded-xl`}
          variant="default"
        >
          Let's Start!
        </Button>
      </div>
    </div>
  );
};

export default DailyActivityCard;
