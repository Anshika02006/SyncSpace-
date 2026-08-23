import { create } from 'zustand';

export const useWhiteboardStore = create((set) => ({
  tool: 'pen', // 'pen' | 'rect' | 'line' | 'text' | 'highlighter'
  color: '#000000',
  strokeWidth: 3,
  textSize: 24, // Font size for text
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
  setTextSize: (size) => set({ textSize: size }),
}));