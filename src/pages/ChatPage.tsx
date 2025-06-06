
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
  
  // Define a general system role for the chat
  const generalSystemRole = "You are a friendly and helpful AI tutor. You provide clear and concise explanations on various subjects. You're patient, encouraging, and adapt your teaching style to the user's needs. You ask questions to ensure understanding and provide examples to illustrate concepts.";
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-4">
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          {titleText}
        </h1>
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md h-[80vh] flex flex-col">
        <ChatInterface 
          initialMessage={welcomeMessage}
          useExternalLLM={true}
          apiEndpoint="https://openai-proxytest-1.onrender.com/chat"
          systemRole={generalSystemRole}
        />
      </div>
    </div>
  );
};

export default ChatPage;
