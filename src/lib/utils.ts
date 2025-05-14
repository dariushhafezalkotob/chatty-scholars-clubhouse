
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to typeset MathJax after content updates
export function typesetMath() {
  if (typeof window !== 'undefined' && window.MathJax && window.MathJax.typesetPromise) {
    try {
      window.MathJax.typesetPromise();
    } catch (e) {
      console.error('MathJax typesetting failed:', e);
    }
  }
}
