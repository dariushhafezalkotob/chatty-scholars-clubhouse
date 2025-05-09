
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressTrackerProps {
  progress: number;
  stars: number;
  subject?: string;
}

const ProgressTracker = ({ progress, stars, subject }: ProgressTrackerProps) => {
  const { ageGroup, colorMode } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  const progressColors = ageGroup === 'young'
    ? 'bg-sky-blue' 
    : 'bg-primary';
  
  return (
    <div className={`
      ${colorMode === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} 
      backdrop-blur-sm p-4 rounded-xl shadow-md border
      ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-100'}
    `}>
      <h3 className={`${fontClass} font-bold text-lg mb-2`}>
        {subject ? `${subject} Progress` : 'Your Progress'}
      </h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className={`${fontClass} text-sm ${colorMode === 'dark' ? 'text-gray-300' : ''}`}>Level Progress</span>
          <span className={`${fontClass} text-sm font-bold`}>{progress}%</span>
        </div>
        <Progress value={progress} className={`h-3 rounded-full ${progressColors}`} />
      </div>
      
      <div className="flex items-center gap-1">
        <span className={`${fontClass} font-bold mr-1`}>Stars:</span>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            className={`w-5 h-5 ${i < stars ? 'text-sunshine-yellow fill-sunshine-yellow' : 'text-muted stroke-muted'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
