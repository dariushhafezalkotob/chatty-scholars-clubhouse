
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  const { ageGroup } = useTheme();
  const { translations } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // Get translated title
  const titleText = translations['chat.title'] || 'Chat with Your Tutor';
  
  // Get translated welcome message
  const welcomeMessage = translations['chat.welcome.general'] || 
    "Hi there! I'm your friendly tutor. What subject would you like to explore today?";
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          {titleText}
        </h1>
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md min-h-[600px]">
        <ChatInterface 
          initialMessage={welcomeMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
