
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Star, BookOpen, Calculator, Microscope } from 'lucide-react';
import PreschoolLesson from '@/components/preschool/PreschoolLesson';

const SubjectPage = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { ageGroup, colorMode } = useTheme();
  const { translations } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);

  // Check if user is preschool age
  const isPreschool = user?.childAge && user.childAge >= 5 && user.childAge <= 6;

  const getSubjectInfo = () => {
    switch (subjectId) {
      case 'math':
        return {
          name: translations['subject.mathematics'] || 'Mathematics',
          icon: Calculator,
          color: 'bg-sky-blue',
          description: 'Learn numbers, counting, and basic math concepts!'
        };
      case 'science':
        return {
          name: translations['subject.science'] || 'Science',
          icon: Microscope,
          color: 'bg-mint-green',
          description: 'Explore the world around us through fun experiments!'
        };
      case 'english':
        return {
          name: translations['subject.language'] || 'Language',
          icon: BookOpen,
          color: 'bg-coral-pink',
          description: 'Learn letters, sounds, and basic words!'
        };
      default:
        return {
          name: 'Unknown Subject',
          icon: BookOpen,
          color: 'bg-gray-500',
          description: 'Subject not found'
        };
    }
  };

  const subject = getSubjectInfo();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';

  // If preschool and lesson is selected, show the lesson component
  if (isPreschool && currentLesson !== null) {
    return (
      <PreschoolLesson
        subjectId={subjectId!}
        lessonNumber={currentLesson}
        onBack={() => setCurrentLesson(null)}
        onComplete={() => {
          setCurrentLesson(null);
          // Could add progress tracking here
        }}
      />
    );
  }

  // Preschool lesson selection
  if (isPreschool) {
    const lessons = [
      { id: 1, title: '🌟 Lesson 1', description: 'Let\'s start learning!' },
      { id: 2, title: '🎈 Lesson 2', description: 'More fun awaits!' },
      { id: 3, title: '🌈 Lesson 3', description: 'Keep going!' }
    ];

    return (
      <div className={`min-h-screen ${colorMode === 'dark' ? 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900' : 'bg-gradient-to-br from-yellow-200 via-pink-200 to-blue-200'} p-6`}>
        <div className="container mx-auto max-w-4xl">
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
            <h1 className="font-comic text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {subject.name}
            </h1>
          </div>

          {/* Lesson Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson.id)}
                className="cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className={`
                  rounded-3xl p-6 ${subject.color} 
                  shadow-xl hover:shadow-2xl
                  border-4 border-white/30
                  backdrop-blur-sm
                `}>
                  <div className="text-center">
                    <div className="text-4xl mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                      <Play className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
                    </div>
                    <h3 className="font-comic text-xl font-bold text-white mb-2">
                      {lesson.title}
                    </h3>
                    <p className="font-comic text-white/90">
                      {lesson.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
