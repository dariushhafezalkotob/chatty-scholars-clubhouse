
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
      className="transform transition-all duration-300 hover:scale-110 cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      <div className={`
        relative rounded-3xl overflow-hidden 
        ${subject.color} ${subject.shadowColor}
        ${isHovered ? 'shadow-2xl shadow-current' : 'shadow-xl'}
        ${isPressed ? 'scale-95' : ''}
        transition-all duration-200 p-4
        border-4 border-white/30
      `}>
        {/* Image Container */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white/20 backdrop-blur-sm">
          <img 
            src={subject.image}
            alt={subject.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              // Fallback to a solid color if image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Fun floating elements */}
          <div className="absolute top-2 right-2 text-2xl animate-pulse">
            {subject.id === 'english' && '📚'}
            {subject.id === 'math' && '🔢'}
            {subject.id === 'science' && '🔬'}
          </div>
        </div>

        {/* Subject Name - Large and fun */}
        <div className="text-center">
          <h3 className="font-comic text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {subject.name}
          </h3>
        </div>

        {/* Animated border effect */}
        <div className={`
          absolute inset-0 rounded-3xl border-4 border-white/50
          ${isHovered ? 'animate-pulse' : ''}
          transition-all duration-300
        `}></div>
      </div>
    </div>
  );
};

export default PreschoolCard;
