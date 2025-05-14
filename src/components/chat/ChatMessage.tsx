
import React, { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import TutorCharacter from '@/components/characters/TutorCharacter';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn, typesetMath } from '@/lib/utils';

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

// Function to format inline mathematical expressions
const formatInlineMathExpression = (text: string): string => {
  // Replace simple math expressions with LaTeX format
  return text.replace(/(\d+[\+\-\*\/=×÷]+\d+|\(.+\)=.+)/g, match => {
    if (match.startsWith('$') || match.startsWith('\\(')) {
      return match;
    }
    return `<span class="math-inline" dir="ltr">$${match}$</span>`;
  });
};

// Function to format block mathematical expressions for better display
const formatBlockMathExpression = (expression: string): string => {
  // If it's already in LaTeX format, return with proper formatting
  if (expression.startsWith('$$') && expression.endsWith('$$')) {
    return expression;
  }
  
  if (expression.startsWith('$') && expression.endsWith('$')) {
    return `$$${expression.substring(1, expression.length - 1)}$$`;
  }
  
  // Add display math delimiters for proper rendering in classic textbook style
  return `$$${expression}$$`;
};

// Function to process text and separate math content
const processParagraph = (paragraph: string, direction: string): React.ReactNode => {
  const lines = paragraph.split('\n');
  const elements: React.ReactNode[] = [];
  
  let currentTextBlock: string[] = [];
  
  // Process each line
  lines.forEach((line, index) => {
    if (isMathLine(line)) {
      // If we have accumulated text, add it first
      if (currentTextBlock.length > 0) {
        const textContent = currentTextBlock.join('\n');
        elements.push(
          <div key={`text-${index}`} className="text-block">
            <span dangerouslySetInnerHTML={{ __html: formatInlineMathExpression(textContent) }} />
          </div>
        );
        currentTextBlock = [];
      }
      
      // Add the math expression in a separate block
      elements.push(
        <div key={`math-${index}`} className={cn(
          "my-4 py-3 px-2 bg-secondary/10 rounded-md border border-secondary/20 overflow-x-auto text-center",
          direction === 'rtl' ? "dir-ltr" : ""
        )}>
          <span dangerouslySetInnerHTML={{ __html: formatBlockMathExpression(line) }} />
        </div>
      );
    } else {
      // Accumulate text content
      currentTextBlock.push(formatInlineMathExpression(line));
    }
  });
  
  // Add any remaining text content
  if (currentTextBlock.length > 0) {
    const textContent = currentTextBlock.join('\n');
    elements.push(
      <div key="text-final" className="text-block">
        <span dangerouslySetInnerHTML={{ __html: textContent }} />
      </div>
    );
  }
  
  return <>{elements}</>;
};

// Function to format message content with proper paragraphs and math formatting
const formatMessageContent = (content: string, language: string, direction: string): React.ReactNode => {
  // Split the content by paragraphs (double new lines)
  const paragraphs = content.split('\n\n');

  return paragraphs.map((paragraph, pIndex) => {
    return (
      <div key={pIndex} className={pIndex > 0 ? 'mt-4' : ''}>
        {processParagraph(paragraph, direction)}
      </div>
    );
  });
};

const ChatMessage = ({ type, content, characterType = 'owl' }: ChatMessageProps) => {
  const { ageGroup, colorMode } = useTheme();
  const { language, direction } = useLanguage();
  const fontClass = ageGroup === 'young' ? 'font-comic' : 'font-nunito';
  
  // Run MathJax typesetting after the component renders
  useEffect(() => {
    typesetMath();
  }, [content]);
  
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
