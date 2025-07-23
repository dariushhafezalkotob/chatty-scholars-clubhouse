
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import PreschoolCard from './PreschoolCard';

const PreschoolLanding = () => {
  const { colorMode } = useTheme();
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'english',
      name: 'Language',
      image: '',
      color: 'bg-gradient-to-br from-pink-500 to-red-500',
      shadowColor: 'shadow-pink-500/60'
    },
    {
      id: 'math',
      name: 'Numbers',  
      image: '',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/60'
    },
    {
      id: 'science',
      name: 'Science',
      image: '',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500', 
      shadowColor: 'shadow-green-500/60'
    }
  ];

  const handleCardClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Welcome Message - More playful */}
        <div className="text-center mb-12 relative">
          <h1 className="font-comic text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6 animate-bounce tracking-wide">
            🌟 Let's Learn & Play! 🌟
          </h1>
          <p className="font-comic text-2xl md:text-3xl text-white drop-shadow-xl mb-4">
            Pick your favorite adventure!
          </p>
          <div className="text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎓</div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {subjects.map((subject, index) => (
            <PreschoolCard
              key={subject.id}
              subject={subject}
              onClick={() => handleCardClick(subject.id)}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Fun decorative elements - More colorful */}
        <div className="mt-20 relative">
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-7xl animate-bounce" style={{ animationDelay: '0s' }}>🎈</div>
            <div className="text-7xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
            <div className="text-7xl animate-bounce" style={{ animationDelay: '1s' }}>🌈</div>
            <div className="text-7xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>
          </div>
          
          {/* Additional playful elements */}
          <div className="flex justify-center space-x-12">
            <div className="text-5xl animate-pulse">🚀</div>
            <div className="text-5xl animate-pulse" style={{ animationDelay: '0.7s' }}>🎪</div>
            <div className="text-5xl animate-pulse" style={{ animationDelay: '1.4s' }}>🎨</div>
          </div>
          
          {/* Encouraging message */}
          <div className="text-center mt-8">
            <p className="font-comic text-xl text-white drop-shadow-lg animate-pulse">
              You're doing amazing! Keep learning! 🏆
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreschoolLanding;
