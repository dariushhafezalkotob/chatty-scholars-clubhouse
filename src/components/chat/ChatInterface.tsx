import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage, { MessageType } from './ChatMessage';
import TutorCharacter from '@/components/characters/TutorCharacter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { typesetMath } from '@/lib/utils';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  role?: string; // Added for API compatibility
}

interface ChatInterfaceProps {
  subject?: string;
  characterType?: 'owl' | 'robot' | 'book';
  initialMessage?: string;
  useExternalLLM?: boolean; // New prop to toggle external LLM usage
  apiEndpoint?: string; // New prop for API endpoint
  systemRole?: string; // New prop for system role
}

const ChatInterface = ({
  subject,
  characterType = 'owl',
  initialMessage = "Hi there! I'm your friendly tutor. What would you like to learn today?",
  useExternalLLM = false,
  apiEndpoint = 'http://localhost:8000/chat', // Default endpoint
  systemRole, // Default is undefined
}: ChatInterfaceProps) => {
  const { ageGroup } = useTheme();
  const { translations } = useLanguage();
  const { toast } = useToast();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: initialMessage,
      role: 'assistant',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    // Wait for the message to be rendered before typesetting
    setTimeout(() => {
      typesetMath();
    }, 100);
  }, [messages]);

  const callExternalLLM = async (userInput: string) => {
    try {
      setIsLoading(true);
      
      // Convert our messages to the format expected by the API
      const apiMessages = messages.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      
      // Create a system message based on either the provided systemRole or the subject
      const defaultSystemContent = subject 
        ? `You are a helpful and knowledgeable ${subject} tutor.`
        : 'You are a helpful and friendly tutor.';
      
      // Use the provided system role if available, otherwise use the default
      const systemMessage = { 
        role: 'system', 
        content: systemRole || defaultSystemContent 
      };
        
      // Add the new user message
      apiMessages.push({ role: 'user', content: userInput });
      
      // Prepare the request payload
      const payload = {
        messages: [systemMessage, ...apiMessages]
      };
      
      // Make the API call
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the assistant's response from the API response
      let assistantResponse = '';
      if (data.choices && data.choices[0] && data.choices[0].message) {
        assistantResponse = data.choices[0].message.content;
      } else if (data.content) {
        assistantResponse = data.content;
      } else {
        assistantResponse = "I'm sorry, I couldn't generate a response.";
      }
      
      return assistantResponse;
    } catch (error) {
      console.error('Error calling external LLM:', error);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI service.",
        variant: "destructive",
      });
      return "I'm sorry, there was an error connecting to the AI service.";
    } finally {
      setIsLoading(false);
    }
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Handle response generation
    if (useExternalLLM) {
      // Add a temporary loading message
      const loadingId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          type: 'assistant',
          content: "...",
          role: 'assistant',
        },
      ]);
      
      // Get response from external LLM
      const response = await callExternalLLM(input);
      
      // Replace the loading message with the actual response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === loadingId 
            ? { ...msg, content: response } 
            : msg
        )
      );
    } else {
      // Use the original local response generation
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: getAssistantResponse(input, subject),
          role: 'assistant',
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Typeset math after message is added
        setTimeout(() => {
          typesetMath();
        }, 100);
      }, 1000);
    }
  };

  const placeholderText = translations['chat.placeholder'] || "Type your message...";
  const tutorTitle = subject && translations[`subject.${subject.toLowerCase()}`]
    ? `${translations[`subject.${subject.toLowerCase()}`]} ${translations['chat.title'] || 'Tutor'}`
    : `${subject} Tutor`;

  return (
    <div className="flex flex-col h-full">
      {/* Character and welcome - Made smaller and more compact */}
      <div className="flex items-center mb-2">
        <TutorCharacter type={characterType} size="md" />
        {subject && (
          <h2 className={`${fontClass} font-bold text-base ml-2`}>
            {tutorTitle}
          </h2>
        )}
      </div>

      {/* Messages container with increased height and scrollable */}
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
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          className="rounded-xl micro-pop"
          size="icon"
          disabled={isLoading}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;
