
import React from 'react';
import { Star, Award, Book, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';

const subjects = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    icon: Compass, 
    progress: 75, 
    stars: 4,
    translationKey: 'mathematics'
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: Lightbulb, 
    progress: 60, 
    stars: 3,
    translationKey: 'science'
  },
  { 
    id: 'english', 
    name: 'Language', 
    icon: Book, 
    progress: 90, 
    stars: 5,
    translationKey: 'language'
  },
  { 
    id: 'history', 
    name: 'History', 
    icon: GraduationCap, 
    progress: 40, 
    stars: 2,
    translationKey: 'history'
  },
];

const ProgressPage = () => {
  const { ageGroup } = useTheme();
  const { translations } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // Get translated texts
  const titleText = translations['progress.title'] || 'Your Learning Progress';
  const overallProgressText = translations['progress.overall'] || 'Overall Progress';
  const levelText = translations['progress.level'] || 'Level';
  const subjectProgressText = translations['progress.subject'] || 'Subject Progress';
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-primary" />
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          {titleText}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className={`${fontClass} text-xl font-bold`}>{overallProgressText}</h2>
            <div className="flex items-center">
              <span className={`${fontClass} text-lg font-bold mr-2`}>12</span>
              <Star className="h-6 w-6 text-sunshine-yellow fill-sunshine-yellow" />
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between mb-1">
              <span className={`${fontClass}`}>{levelText} 3</span>
              <span className={`${fontClass} font-bold`}>65%</span>
            </div>
            <Progress value={65} className="h-4 rounded-full" />
          </div>
          
          <h3 className={`${fontClass} text-lg font-bold mb-4`}>{subjectProgressText}</h3>
          
          <div className="space-y-6">
            {subjects.map((subject) => {
              // Get translated subject name
              const subjectName = subject.translationKey ?
                translations[`subject.${subject.translationKey}`] || subject.name : subject.name;
                
              return (
                <div key={subject.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <subject.icon className="w-5 h-5" />
                    </div>
                    <h4 className={`${fontClass} font-bold`}>{subjectName}</h4>
                    <div className="flex ml-auto">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < subject.stars ? 'text-sunshine-yellow fill-sunshine-yellow' : 'text-muted stroke-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="pl-10">
                    <div className="flex justify-between mb-1">
                      <span className={`${fontClass} text-sm`}>Progress</span>
                      <span className={`${fontClass} text-sm font-bold`}>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-3 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
