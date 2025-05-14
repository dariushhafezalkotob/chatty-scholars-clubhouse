
/// <reference types="vite/client" />

interface MathJaxConfig {
  tex: {
    inlineMath: string[][];
    displayMath: string[][];
    processEscapes: boolean;
  };
  svg: {
    fontCache: string;
  };
  options: {
    skipHtmlTags: string[];
  };
  typesetPromise?: () => Promise<any>;
}

interface Window {
  MathJax?: MathJaxConfig;
}
