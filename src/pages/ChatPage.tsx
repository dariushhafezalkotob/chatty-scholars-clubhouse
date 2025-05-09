
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ChatInterface from '@/components/chat/ChatInterface';

const ChatPage = () => {
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className={`${fontClass} text-2xl md:text-3xl font-bold`}>
          Chat with Your Tutor
        </h1>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md min-h-[600px]">
        <ChatInterface 
          initialMessage="Hi there! I'm your friendly tutor. What subject would you like to explore today?"
        />
      </div>
    </div>
  );
};

export default ChatPage;
