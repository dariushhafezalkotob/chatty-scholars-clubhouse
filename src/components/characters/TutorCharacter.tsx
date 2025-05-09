
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

type CharacterType = 'owl' | 'robot' | 'book';

interface TutorCharacterProps {
  type?: CharacterType;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const TutorCharacter: React.FC<TutorCharacterProps> = ({
  type = 'owl',
  size = 'md',
  animate = true,
}) => {
  const { ageGroup } = useTheme();
  
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
  };
  
  const animationClass = animate ? 'animate-float' : '';
  
  const getCharacterEmoji = () => {
    switch (type) {
      case 'owl':
        return '🦉';
      case 'robot':
        return '🤖';
      case 'book':
        return '📚';
    }
  };
  
  return (
    <div className={`${sizeClasses[size]} ${animationClass} flex items-center justify-center`}>
      <div className="text-4xl md:text-5xl lg:text-6xl">
        {getCharacterEmoji()}
      </div>
    </div>
  );
};

export default TutorCharacter;
