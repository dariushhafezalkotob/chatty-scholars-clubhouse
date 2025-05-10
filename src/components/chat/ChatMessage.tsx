
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import TutorCharacter from '@/components/characters/TutorCharacter';
import { useLanguage } from '@/contexts/LanguageContext';

export type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  characterType?: 'owl' | 'robot' | 'book';
}

const ChatMessage = ({ type, content, characterType = 'owl' }: ChatMessageProps) => {
  const { ageGroup, colorMode } = useTheme();
  const { direction } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // More vibrant colors for kid mode
  const getUserBubbleColor = () => {
    if (ageGroup === 'young') {
      return colorMode === 'dark' 
        ? 'bg-gradient-to-br from-sky-blue/50 to-mint-green/40 text-gray-100' 
        : 'bg-gradient-to-br from-sky-blue to-mint-green/70 text-gray-800';
    } else {
      return colorMode === 'dark' 
        ? 'bg-primary/30 text-gray-200' 
        : 'bg-primary/20 text-gray-800';
    }
  };
  
  const getAssistantBubbleColor = () => {
    if (ageGroup === 'young') {
      return colorMode === 'dark' 
        ? 'bg-gradient-to-br from-coral-pink/40 to-sunshine-yellow/30 text-gray-100' 
        : 'bg-gradient-to-br from-coral-pink/80 to-sunshine-yellow/60 text-gray-800';
    } else {
      return colorMode === 'dark' 
        ? 'bg-gray-700 text-gray-100' 
        : 'bg-white text-gray-800';
    }
  };
  
  if (type === 'user') {
    return (
      <div className={`flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'} mb-4`}>
        <div className={`
          ${fontClass} max-w-[80%] rounded-2xl 
          ${direction === 'rtl' ? 'rounded-tl-sm' : 'rounded-tr-sm'} 
          ${getUserBubbleColor()}
          px-4 py-2
        `}>
          {content}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex gap-2 mb-4 items-end ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
      <TutorCharacter type={characterType} size="sm" />
      <div className={`
        ${fontClass} max-w-[80%] rounded-2xl 
        ${direction === 'rtl' ? 'rounded-tr-sm' : 'rounded-tl-sm'} 
        ${getAssistantBubbleColor()}
        px-4 py-2 shadow-sm
      `}>
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
