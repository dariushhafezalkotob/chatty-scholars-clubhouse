
import React, { useState } from 'react';

interface PreschoolCardProps {
  subject: {
    id: string;
    name: string;
    image: string;
    color: string;
    shadowColor: string;
  };
  onClick: () => void;
  delay: number;
}

const PreschoolCard = ({ subject, onClick, delay }: PreschoolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div 
      className="transform transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      <div className={`
        aspect-square rounded-3xl
        ${subject.color}
        ${isHovered ? 'shadow-2xl scale-105' : 'shadow-xl'}
        ${isPressed ? 'scale-95' : ''}
        transition-all duration-300
        flex items-center justify-center
        border-4 border-white/20
      `}>
        {/* Simple large character */}
        <div className="text-9xl animate-bounce" style={{ animationDelay: `${delay}ms` }}>
          {subject.id === 'english' && '🐸'}
          {subject.id === 'math' && '🐘'}
          {subject.id === 'science' && '🐰'}
        </div>
      </div>
    </div>
  );
};

export default PreschoolCard;
