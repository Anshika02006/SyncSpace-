import { create } from 'zustand';

export const useWhiteboardStore = create((set) => ({
  tool: 'pen', // 'pen' | 'rect' | 'line' | 'text'
  color: '#000000',
  strokeWidth: 3,
  setTool: (tool) => set({ tool }),
  setColor: (color) => set({ color }),
  setStrokeWidth: (width) => set({ strokeWidth: width }),
}));