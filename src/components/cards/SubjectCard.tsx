
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Icon } from 'lucide-react';

interface SubjectCardProps {
  name: string;
  description: string;
  icon: Icon;
  color: string;
  onClick: () => void;
}

const SubjectCard = ({ name, description, icon: Icon, color, onClick }: SubjectCardProps) => {
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className={`${color} p-4 flex justify-center`}>
        <Icon className="text-white w-12 h-12" />
      </div>
      
      <div className="p-4">
        <h3 className={`${fontClass} font-bold text-lg mb-2`}>{name}</h3>
        <p className={`${fontClass} text-sm mb-4 text-gray-600`}>{description}</p>
        
        <Button 
          onClick={onClick}
          className={`w-full ${fontClass} micro-pop rounded-xl`}
          variant="outline"
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
