
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

const SubjectCard = ({ name, description, icon: Icon, color, onClick }: SubjectCardProps) => {
  const { ageGroup, colorMode } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // Card styles based on age group
  const cardStyle = ageGroup === 'young' 
    ? 'rounded-xl shadow-md' 
    : 'rounded-lg shadow-sm';
  
  return (
    <div className={`
      ${colorMode === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} 
      backdrop-blur-sm ${cardStyle} overflow-hidden 
      hover:shadow-lg transition-shadow border
      ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-100'}
    `}>
      <div className={`${color} p-4 flex justify-center`}>
        <Icon className="text-white w-12 h-12" />
      </div>
      
      <div className="p-4">
        <h3 className={`${fontClass} font-bold text-lg mb-2`}>{name}</h3>
        <p className={`${fontClass} text-sm mb-4 ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <Button 
          onClick={onClick}
          className={`w-full ${fontClass} micro-pop ${ageGroup === 'young' ? 'rounded-xl' : 'rounded-md'}`}
          variant={ageGroup === 'young' ? 'outline' : 'default'}
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
