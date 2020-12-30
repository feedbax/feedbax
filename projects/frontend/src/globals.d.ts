declare module '*.png' {
  const path: string;
  export default path;
}

declare module '*.inline.svg' {
  const element: React.FC<React.SVGProps<SVGSVGElement>>;
  export default element;
}

declare module '*.svg' {
  const path: string;
  export default path;
}

declare module '*.woff' {
  const path: string;
  export default path;
}

declare module '*.woff2' {
  const path: string;
  export default path;
}

declare module '*.mdx' {
  const mdx: React.FC<unknown>;
  export default mdx;
}

declare module 'focus-visible';
declare module 'intersection-observer';

declare const ResizeObserver: typeof import('resize-observer').ResizeObserver;

declare const global: {
  window: Record<string, unknown>;
  rootDir: string;
};
