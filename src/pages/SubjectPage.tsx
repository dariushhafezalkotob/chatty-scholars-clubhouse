
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Star, BookOpen, Calculator, Microscope, Lock } from 'lucide-react';
import PreschoolLesson from '@/components/preschool/PreschoolLesson';

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { ageGroup, colorMode } = useTheme();
  const { translations } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  
  // Track completed lessons - in a real app, this would come from a database
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([0])); // First lesson is always unlocked

  // Check if user is preschool age
  const isPreschool = user?.childAge && user.childAge >= 5 && user.childAge <= 6;

  const getSubjectInfo = () => {
    switch (subjectId) {
      case 'math':
        return {
          name: translations['subject.mathematics'] || 'Mathematics',
          icon: Calculator,
          color: 'bg-gradient-to-br from-blue-400 to-cyan-400',
          shadowColor: 'shadow-blue-400/50',
          description: 'Learn numbers, counting, and basic math concepts!',
          character: '🐻' // Bear for math
        };
      case 'science':
        return {
          name: translations['subject.science'] || 'Science',
          icon: Microscope,
          color: 'bg-gradient-to-br from-green-400 to-emerald-400',
          shadowColor: 'shadow-green-400/50',
          description: 'Explore the world around us through fun experiments!',
          character: '🦉' // Owl for science
        };
      case 'english':
        return {
          name: translations['subject.language'] || 'Language',
          icon: BookOpen,
          color: 'bg-gradient-to-br from-pink-400 to-red-400',
          shadowColor: 'shadow-pink-400/50',
          description: 'Learn letters, sounds, and basic words!',
          character: '🐰' // Rabbit for language
        };
      default:
        return {
          name: 'Unknown Subject',
          icon: BookOpen,
          color: 'bg-gray-500',
          shadowColor: 'shadow-gray-400/50',
          description: 'Subject not found',
          character: '🎭'
        };
    }
  };

  const subject = getSubjectInfo();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';

  const handleLessonComplete = (lessonNumber: number) => {
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonNumber);
    setCompletedLessons(newCompleted);
    setCurrentLesson(null);
  };

  // If preschool and lesson is selected, show the lesson component
  if (isPreschool && currentLesson !== null) {
    return (
      <PreschoolLesson
        subjectId={subjectId!}
        lessonNumber={currentLesson}
        onBack={() => setCurrentLesson(null)}
        onComplete={() => handleLessonComplete(currentLesson)}
      />
    );
  }

  // Preschool lesson selection with progressive unlocking
  if (isPreschool) {
    const lessons = [
      { id: 1, title: '🌟 Lesson 1', description: 'Let\'s start learning!' },
      { id: 2, title: '🎈 Lesson 2', description: 'More fun awaits!' },
      { id: 3, title: '🌈 Lesson 3', description: 'Keep going!' },
      { id: 4, title: '⭐ Lesson 4', description: 'You\'re amazing!' },
      { id: 5, title: '🎉 Lesson 5', description: 'Almost there!' },
      { id: 6, title: '🏆 Lesson 6', description: 'Final challenge!' }
    ];

    const isLessonUnlocked = (lessonId: number) => {
      return completedLessons.has(lessonId - 1) || lessonId === 1;
    };

    const isLessonCompleted = (lessonId: number) => {
      return completedLessons.has(lessonId);
    };

    return (
      <div className={`min-h-screen ${colorMode === 'dark' ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' : 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200'} p-6`}>
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="mr-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </Button>
            <div className="flex items-center">
              <div className="text-6xl mr-4 animate-bounce">
                {subject.character}
              </div>
              <h1 className="font-comic text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {subject.name}
              </h1>
            </div>
          </div>

          {/* Lesson Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => {
              const isUnlocked = isLessonUnlocked(lesson.id);
              const isCompleted = isLessonCompleted(lesson.id);
              
              return (
                <div
                  key={lesson.id}
                  onClick={() => isUnlocked && setCurrentLesson(lesson.id)}
                  className={`
                    transform transition-all duration-300 
                    ${isUnlocked ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  `}
                >
                  <div className={`
                    rounded-3xl p-6 relative overflow-hidden
                    ${isUnlocked ? subject.color : 'bg-gray-400'}
                    ${isUnlocked ? subject.shadowColor : 'shadow-gray-400/50'}
                    shadow-xl hover:shadow-2xl
                    border-4 border-white/30
                    backdrop-blur-sm
                  `}>
                    {/* Lock overlay for locked lessons */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10">
                        <Lock className="w-12 h-12 text-white/80" />
                      </div>
                    )}

                    {/* Completion badge */}
                    {isCompleted && (
                      <div className="absolute top-2 right-2 z-20">
                        <div className="bg-yellow-400 rounded-full p-2 animate-pulse">
                          <Star className="w-6 h-6 text-white fill-current" />
                        </div>
                      </div>
                    )}

                    <div className="text-center relative z-5">
                      {/* Character */}
                      <div className="text-8xl mb-4">
                        {subject.character}
                      </div>
                      
                      {/* Play button */}
                      <div className={`
                        mb-4 ${isUnlocked ? 'animate-bounce' : ''} 
                        ${isCompleted ? 'text-yellow-400' : 'text-white'}
                      `} 
                      style={{ animationDelay: `${index * 200}ms` }}>
                        {isCompleted ? (
                          <Star className="w-16 h-16 mx-auto drop-shadow-lg fill-current" />
                        ) : (
                          <Play className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="font-comic text-white text-lg">Progress:</span>
              <div className="flex space-x-1">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`w-3 h-3 rounded-full ${
                      completedLessons.has(lesson.id) 
                        ? 'bg-yellow-400' 
                        : isLessonUnlocked(lesson.id) 
                          ? 'bg-white/50' 
                          : 'bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              <span className="font-comic text-white text-sm">
                {completedLessons.size}/{lessons.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular subject page for older kids
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${subject.color} mr-4`}>
            <subject.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
              {subject.name}
            </h1>
            <p className={`${fontClass} text-gray-600 dark:text-gray-300`}>
              {subject.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample lessons for older kids */}
        {[1, 2, 3, 4, 5, 6].map((lessonNum) => (
          <div
            key={lessonNum}
            className={`
              ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'} 
              rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`${fontClass} font-bold text-lg`}>
                Lesson {lessonNum}
              </h3>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <p className={`${fontClass} text-sm text-gray-600 dark:text-gray-300 mb-4`}>
              Interactive lesson content here...
            </p>
            <Button className="w-full">Start Lesson</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPage;
