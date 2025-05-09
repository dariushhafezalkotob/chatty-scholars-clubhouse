import React from 'react';
import { Book, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import SubjectCard from '@/components/cards/SubjectCard';
import DailyActivityCard from '@/components/cards/DailyActivityCard';
import ProgressTracker from '@/components/progress/ProgressTracker';

const subjects = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    icon: Compass, 
    color: 'bg-sky-blue',
    description: 'Learn numbers, shapes, and solve fun puzzles!'
  },
  { 
    id: 'science', 
    name: 'Science', 
    icon: Lightbulb, 
    color: 'bg-mint-green',
    description: 'Discover how the world works through experiments!'
  },
  { 
    id: 'english', 
    name: 'Language', 
    icon: Book, 
    color: 'bg-coral-pink',
    description: 'Develop your reading and writing skills'
  },
  { 
    id: 'history', 
    name: 'History', 
    icon: GraduationCap, 
    color: 'bg-sunshine-yellow',
    description: 'Travel back in time and meet amazing people!'
  },
];

const Index = () => {
  const { ageGroup, setAgeGroup, themeClass } = useTheme();
  const navigate = useNavigate();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  const handleSubjectClick = (subjectId: string) => {
    navigate(`/subject/${subjectId}`);
  };
  
  const toggleAgeGroup = () => {
    setAgeGroup(ageGroup === 'young' ? 'teen' : 'young');
  };
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`${fontClass} text-2xl md:text-3xl lg:text-4xl font-bold`}>
          Welcome to Learn Quest!
        </h1>
        
        <button 
          onClick={toggleAgeGroup}
          className="px-4 py-2 text-sm bg-primary/10 rounded-lg"
        >
          Switch to {ageGroup === 'young' ? 'Teen' : 'Kids'} Mode
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                name={subject.name}
                description={subject.description}
                icon={subject.icon}
                color={subject.color}
                onClick={() => handleSubjectClick(subject.id)}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <DailyActivityCard
            activity="Let's practice multiplication tables today! Can you master the 7's?"
            onStart={() => navigate('/subject/math')}
          />
          
          <ProgressTracker progress={65} stars={3} />
        </div>
      </div>
    </div>
  );
};

export default Index;
