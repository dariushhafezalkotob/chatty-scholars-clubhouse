
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

// Function to format message content with proper line breaks and RTL/LTR handling
const formatMessageContent = (content: string, language: string, direction: string): React.ReactNode => {
  // Split the content by paragraphs (double new lines)
  const paragraphs = content.split('\n\n');

  return paragraphs.map((paragraph, pIndex) => {
    // Split paragraph into lines (single new lines)
    const lines = paragraph.split('\n');

    return (
      <div key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
        {lines.map((line, lIndex) => {
          // Special handling for mathematical expressions in RTL languages
          // Detect numerical expressions or mathematical operations
          const formattedLine = line.replace(/(\d+[\+\-\*\/=×÷]+\d+)/g, (match) => {
            return `<span dir="ltr" className="inline-block">${match}</span>`;
          });

          return (
            <div key={lIndex} className={lIndex > 0 ? 'mt-1' : ''}>
              {lIndex > 0 ? <br /> : null}
              <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
            </div>
          );
        })}
      </div>
    );
  });
};

const ChatMessage = ({ type, content, characterType = 'owl' }: ChatMessageProps) => {
  const { ageGroup, colorMode } = useTheme();
  const { language, direction } = useLanguage();
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
  
  const formattedContent = formatMessageContent(content, language, direction);
  
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-3">
        <div className={`
          ${fontClass} max-w-[80%] rounded-2xl 
          rounded-tr-sm
          ${getUserBubbleColor()}
          px-4 py-2
        `}>
          {formattedContent}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex gap-1 mb-3 items-end">
      <TutorCharacter type={characterType} size="sm" />
      <div className={`
        ${fontClass} max-w-[80%] rounded-2xl 
        rounded-tl-sm
        ${getAssistantBubbleColor()}
        px-4 py-2 shadow-sm
      `}>
        {formattedContent}
      </div>
    </div>
  );
};

export default ChatMessage;
