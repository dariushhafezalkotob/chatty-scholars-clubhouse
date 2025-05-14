import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import TutorCharacter from '@/components/characters/TutorCharacter';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export type MessageType = 'user' | 'assistant';

interface ChatMessageProps {
  type: MessageType;
  content: string;
  characterType?: 'owl' | 'robot' | 'book';
}

// Function to detect if a line contains primarily mathematical content
const isMathLine = (line: string): boolean => {
  // Check for common math patterns - equations, operations, etc.
  const mathPatterns = [
    /\d+[\+\-\*\/=×÷]+\d+/,     // Basic operations
    /\\frac{.+}{.+}/,           // Fractions
    /\\sum|\\int|\\lim/,         // Calculus symbols
    /[a-z]\^[0-9]/i,            // Powers
    /\\sqrt{.+}/,               // Square roots
    /\$\$.+\$\$/,               // LaTeX math block
    /\$.+\$/                    // LaTeX inline math
  ];
  
  return mathPatterns.some(pattern => pattern.test(line));
};

// Function to format mathematical expressions for better display
const formatMathExpression = (expression: string): string => {
  // If it's already in LaTeX format, return as is
  if (expression.startsWith('$') || expression.startsWith('\\(') || expression.startsWith('\\[')) {
    return expression;
  }
  
  // Otherwise, wrap it in LaTeX delimiters for proper rendering
  return `<span class="math-expression" dir="ltr">$${expression}$</span>`;
};

// Function to format message content with proper line breaks, RTL/LTR handling, and math formatting
const formatMessageContent = (content: string, language: string, direction: string): React.ReactNode => {
  // Split the content by paragraphs (double new lines)
  const paragraphs = content.split('\n\n');

  return paragraphs.map((paragraph, pIndex) => {
    // Split paragraph into lines (single new lines)
    const lines = paragraph.split('\n');

    return (
      <div key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
        {lines.map((line, lIndex) => {
          // Check if the line is primarily mathematical content
          const isMath = isMathLine(line);
          
          // Process the line differently based on whether it's math content or regular text
          let processedLine = line;
          
          if (isMath) {
            // Format the entire line as a math expression
            processedLine = formatMathExpression(line);
            
            return (
              <div key={lIndex} className={cn(
                "my-2 p-2 bg-secondary/10 rounded text-center overflow-x-auto",
                direction === 'rtl' ? "dir-ltr" : ""
              )}>
                <span dangerouslySetInnerHTML={{ __html: processedLine }} />
              </div>
            );
          } else {
            // For regular text, handle embedded math expressions within the text
            processedLine = line.replace(/(\d+[\+\-\*\/=×÷]+\d+|\(.+\)=.+)/g, (match) => {
              return formatMathExpression(match);
            });
            
            return (
              <div key={lIndex} className={lIndex > 0 && !isMath ? 'mt-1' : ''}>
                <span dangerouslySetInnerHTML={{ __html: processedLine }} />
              </div>
            );
          }
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
