
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import TutorCharacter from '@/components/characters/TutorCharacter';

export type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  characterType?: 'owl' | 'robot' | 'book';
}

const ChatMessage = ({ type, content, characterType = 'owl' }: ChatMessageProps) => {
  const { ageGroup } = useTheme();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  if (type === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className={`${fontClass} max-w-[80%] rounded-2xl rounded-tr-sm bg-primary/20 px-4 py-2 text-gray-800`}>
          {content}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex gap-2 mb-4 items-end">
      <TutorCharacter type={characterType} size="sm" />
      <div className={`${fontClass} max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-4 py-2 shadow-sm`}>
        {content}
      </div>
    </div>
  );
};

export default ChatMessage;
