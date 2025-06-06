
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
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      color: 'bg-gradient-to-br from-pink-400 to-red-400',
      shadowColor: 'shadow-pink-400/50'
    },
    {
      id: 'math',
      name: 'Numbers',
      image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=300&fit=crop',
      color: 'bg-gradient-to-br from-blue-400 to-cyan-400',
      shadowColor: 'shadow-blue-400/50'
    },
    {
      id: 'science',
      name: 'Science',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
      color: 'bg-gradient-to-br from-green-400 to-emerald-400',
      shadowColor: 'shadow-green-400/50'
    }
  ];

  const handleCardClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className={`min-h-screen ${colorMode === 'dark' ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' : 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200'} p-6`}>
      <div className="container mx-auto max-w-4xl">
        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h1 className="font-comic text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-bounce">
            🌟 Let's Learn! 🌟
          </h1>
          <p className="font-comic text-xl md:text-2xl text-white/90 drop-shadow-md">
            Choose what you want to learn today!
          </p>
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

        {/* Fun decorative elements */}
        <div className="mt-16 flex justify-center space-x-8">
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🎈</div>
          <div className="text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎉</div>
          <div className="text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🌈</div>
          <div className="text-6xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>
        </div>
      </div>
    </div>
  );
};

export default PreschoolLanding;
