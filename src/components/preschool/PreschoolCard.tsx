
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
        ${isHovered ? 'shadow-2xl shadow-current scale-105' : 'shadow-xl'}
        ${isPressed ? 'scale-95' : ''}
        transition-all duration-300 p-6
        border-4 border-white/40 
        backdrop-blur-sm
      `}>
        {/* Character Icon - Large and Centered */}
        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          {/* Large animated character */}
          <div className="text-8xl animate-bounce" style={{ animationDelay: `${delay}ms` }}>
            {subject.id === 'english' && '🐸'}
            {subject.id === 'math' && '🐘'}
            {subject.id === 'science' && '🐰'}
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute top-2 right-2 text-2xl animate-pulse opacity-80">✨</div>
          <div className="absolute bottom-2 left-2 text-xl animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}>⭐</div>
          
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-white/50"></div>
        </div>

        {/* Subject Name - Large and playful */}
        <div className="text-center">
          <h3 className="font-comic text-3xl md:text-4xl font-bold text-white drop-shadow-xl tracking-wide">
            {subject.name}
          </h3>
          {/* Fun subtitle */}
          <p className="font-comic text-lg text-white/90 mt-2 drop-shadow-md">
            {subject.id === 'english' && 'Words & Letters!'}
            {subject.id === 'math' && 'Count & Play!'}
            {subject.id === 'science' && 'Explore & Discover!'}
          </p>
        </div>

        {/* Magical border effect */}
        <div className={`
          absolute inset-0 rounded-3xl border-4 border-white/60
          ${isHovered ? 'animate-pulse border-white/80' : ''}
          transition-all duration-300
        `}></div>
        
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 text-xl animate-bounce opacity-70">🌟</div>
        <div className="absolute bottom-2 right-2 text-xl animate-bounce opacity-70" style={{ animationDelay: '0.3s' }}>🎨</div>
      </div>
    </div>
  );
};

export default PreschoolCard;
