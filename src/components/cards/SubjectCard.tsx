
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
  
  // Enhanced card styles based on age group
  const cardStyle = ageGroup === 'young' 
    ? 'rounded-xl shadow-md border-2' 
    : 'rounded-lg shadow-sm border';
    
  // More dynamic header styles for young mode
  const getHeaderStyle = () => {
    if (ageGroup === 'young') {
      return `${color} p-4 flex justify-center items-center animate-pulse`;
    }
    return `${color} p-4 flex justify-center`;
  };
  
  // Card border color for young mode
  const cardBorder = ageGroup === 'young' && colorMode === 'light'
    ? color.replace('bg-', 'border-')
    : colorMode === 'dark' ? 'border-gray-700' : 'border-gray-100';
  
  return (
    <div className={`
      ${colorMode === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} 
      backdrop-blur-sm ${cardStyle} overflow-hidden 
      hover:shadow-lg transition-shadow ${cardBorder}
    `}>
      <div className={getHeaderStyle()}>
        <Icon className={`text-white ${ageGroup === 'young' ? 'w-16 h-16 animate-float' : 'w-12 h-12'}`} />
      </div>
      
      <div className="p-4">
        <h3 className={`${fontClass} font-bold ${ageGroup === 'young' ? 'text-xl mb-3' : 'text-lg mb-2'}`}>{name}</h3>
        <p className={`${fontClass} text-sm mb-4 ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <Button 
          onClick={onClick}
          className={`
            w-full ${fontClass} micro-pop 
            ${ageGroup === 'young' ? 'rounded-xl text-base py-3' : 'rounded-md'}
          `}
          variant={ageGroup === 'young' ? 'outline' : 'default'}
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
