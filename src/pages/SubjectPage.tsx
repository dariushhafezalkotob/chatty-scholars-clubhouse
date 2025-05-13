
import React from 'react';
import { useParams } from 'react-router-dom';
import { Book, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
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
    activity: "Let's practice multiplication tables today! Can you master the 7's?",
    translationKey: 'mathematics',
    systemRole: "You are a math teacher. You try to explain topics step-by-step and make sure the user understands each step. For each topic, start with a real-life example to show how it's used in everyday life. Be friendly, patient, and always polite in your explanations."
  },
  science: { 
    name: 'Science', 
    icon: Lightbulb, 
    color: 'bg-mint-green',
    character: 'owl',
    welcomeMessage: "Hello curious mind! I'm your Science guide. What shall we discover today?",
    activity: "Let's explore how plants grow from seeds to full plants!",
    translationKey: 'science',
    systemRole: "You are a science teacher. Explain scientific concepts in a simple and engaging way. Use examples from nature and everyday phenomena to illustrate concepts. Ask questions to check understanding. Be enthusiastic about scientific discovery."
  },
  english: { 
    name: 'Language', 
    icon: Book, 
    color: 'bg-coral-pink',
    character: 'book',
    welcomeMessage: "Hi there, word explorer! Ready to read, write, and have fun with language?",
    activity: "Let's learn five new words and use them in a short story!",
    translationKey: 'language',
    systemRole: "You are a language and literature teacher. Help with vocabulary, grammar, and writing skills. Provide clear explanations of language rules. Suggest reading materials appropriate for the user's level. Be encouraging and supportive of creative expression."
  },
  history: { 
    name: 'History', 
    icon: GraduationCap, 
    color: 'bg-sunshine-yellow',
    character: 'owl',
    welcomeMessage: "Greetings time traveler! Ready to journey through history together?",
    activity: "Let's learn about Ancient Egypt and discover the secrets of the pyramids!",
    translationKey: 'history',
    systemRole: "You are a history teacher. Present historical events in a storytelling format. Connect past events to present situations to show relevance. Include interesting facts and details that make history come alive. Be respectful when discussing different cultures and perspectives."
  },
};

const SubjectPage = () => {
  const { subjectId = 'math' } = useParams();
  const { ageGroup, colorMode } = useTheme();
  const { translations, direction } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  const subject = subjects[subjectId as keyof typeof subjects] || subjects.math;
  
  // Get translated subject name
  const subjectName = subject.translationKey ?
    translations[`subject.${subject.translationKey}`] || subject.name : subject.name;
  
  // Get translated welcome message
  const welcomeMessage = subject.translationKey ?
    translations[`chat.welcome.${subject.translationKey.toLowerCase()}`] || subject.welcomeMessage : 
    subject.welcomeMessage;
  
  // Get translated activity
  const activity = subject.translationKey ?
    translations[`activity.${subject.translationKey.toLowerCase()}`] || subject.activity : 
    subject.activity;
  
  return (
    <div className="container mx-auto py-6" dir={direction}>
      <div className="mb-4">
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          {subjectName}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`
          md:col-span-2 
          ${colorMode === 'dark' ? 'bg-gray-800/80' : 'bg-white/80'} 
          backdrop-blur-sm p-6 rounded-xl shadow-md border
          ${colorMode === 'dark' ? 'border-gray-700' : 'border-gray-100'}
          h-[80vh]
        `}>
          <ChatInterface 
            subject={subjectName} 
            characterType={subject.character as 'owl' | 'robot' | 'book'} 
            initialMessage={welcomeMessage}
            useExternalLLM={true}
            apiEndpoint="https://openai-proxytest-1.onrender.com/chat"
            systemRole={subject.systemRole}
          />
        </div>
        
        <div className="space-y-6">
          <DailyActivityCard
            activity={activity}
            subjectColor={subject.color}
            translationKey={subject.translationKey?.toLowerCase()}
          />
          
          <ProgressTracker 
            progress={65} 
            stars={3} 
            subject={subjectName} 
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
