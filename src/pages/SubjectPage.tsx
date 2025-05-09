
import React from 'react';
import { useParams } from 'react-router-dom';
import { Book, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ChatInterface from '@/components/chat/ChatInterface';
import ProgressTracker from '@/components/progress/ProgressTracker';
import DailyActivityCard from '@/components/cards/DailyActivityCard';

const subjects = {
  math: { 
    name: 'Mathematics', 
    icon: Compass, 
    color: 'bg-sky-blue',
    character: 'robot',
    welcomeMessage: "Hi there! I'm your Math tutor. Ready to solve some fun problems together?",
    activity: "Let's practice multiplication tables today! Can you master the 7's?"
  },
  science: { 
    name: 'Science', 
    icon: Lightbulb, 
    color: 'bg-mint-green',
    character: 'owl',
    welcomeMessage: "Hello curious mind! I'm your Science guide. What shall we discover today?",
    activity: "Let's explore how plants grow from seeds to full plants!"
  },
  english: { 
    name: 'Language', 
    icon: Book, 
    color: 'bg-coral-pink',
    character: 'book',
    welcomeMessage: "Hi there, word explorer! Ready to read, write, and have fun with language?",
    activity: "Let's learn five new words and use them in a short story!"
  },
  history: { 
    name: 'History', 
    icon: GraduationCap, 
    color: 'bg-sunshine-yellow',
    character: 'owl',
    welcomeMessage: "Greetings time traveler! Ready to journey through history together?",
    activity: "Let's learn about Ancient Egypt and discover the secrets of the pyramids!"
  },
};

const SubjectPage = () => {
  const { subjectId = 'math' } = useParams();
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  const subject = subjects[subjectId as keyof typeof subjects] || subjects.math;
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          {subject.name}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <ChatInterface 
            subject={subject.name} 
            characterType={subject.character as 'owl' | 'robot' | 'book'} 
            initialMessage={subject.welcomeMessage}
          />
        </div>
        
        <div className="space-y-6">
          <DailyActivityCard
            activity={subject.activity}
            subjectColor={subject.color}
          />
          
          <ProgressTracker 
            progress={65} 
            stars={3} 
            subject={subject.name} 
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
