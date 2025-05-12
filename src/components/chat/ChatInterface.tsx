import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage, { MessageType } from './ChatMessage';
import TutorCharacter from '@/components/characters/TutorCharacter';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: MessageType;
  content: string;
}

interface ChatInterfaceProps {
  subject?: string;
  characterType?: 'owl' | 'robot' | 'book';
  initialMessage?: string;
}

const ChatInterface = ({
  subject,
  characterType = 'owl',
  initialMessage = "Hi there! I'm your friendly tutor. What would you like to learn today?"
}: ChatInterfaceProps) => {
  const { ageGroup } = useTheme();
  const { translations } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: initialMessage,
    },
  ]);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAssistantResponse(input, subject),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const getAssistantResponse = (userInput: string, subject?: string): string => {
    if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
      return translations['chat.welcome.general'] || "Hello! How can I help you learn today?";
    }
    if (subject === 'math') {
      return translations['chat.welcome.math'] || "That's a great math question! Let's solve it step by step...";
    }
    if (userInput.toLowerCase().includes('help')) {
      return "I'm here to help! What would you like to know?";
    }
    return "That's interesting! Would you like to learn more about this topic?";
  };

  const placeholderText = translations['chat.placeholder'] || "Type your message...";
  const tutorTitle = subject && translations[`subject.${subject.toLowerCase()}`]
    ? `${translations[`subject.${subject.toLowerCase()}`]} ${translations['chat.title'] || 'Tutor'}`
    : `${subject} Tutor`;

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Character and welcome */}
      <div className="flex flex-col items-center mb-4">
        <TutorCharacter type={characterType} size="lg" />
        {subject && (
          <h2 className={`${fontClass} font-bold text-lg mt-2 text-center`}>
            {tutorTitle}
          </h2>
        )}
      </div>

      {/* Messages container with fixed height and scrollable */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 mb-4 p-4 bg-secondary/20 rounded-xl overflow-hidden"
      >
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              type={message.type}
              content={message.content}
              characterType={characterType}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          className={`flex-1 ${fontClass} text-base py-6 rounded-xl`}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          onClick={handleSend}
          className="rounded-xl micro-pop"
          size="icon"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
