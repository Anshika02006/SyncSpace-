import React from 'react';
import { useWhiteboardStore } from '../../store/whiteboardStore';

const Toolbar = ({ onClear }) => {
  const { tool, setTool, color, setColor, strokeWidth, setStrokeWidth } = useWhiteboardStore();

  return (
    <div className="whiteboard-toolbar">
      <button 
        className={`tool-btn ${tool === 'pen' ? 'active' : ''}`} 
        onClick={() => setTool('pen')}
      >
        ✏️ Pen
      </button>
      <button 
        className={`tool-btn ${tool === 'rect' ? 'active' : ''}`} 
        onClick={() => setTool('rect')}
      >
        ▭ Rect
      </button>
      <button 
        className={`tool-btn ${tool === 'line' ? 'active' : ''}`} 
        onClick={() => setTool('line')}
      >
        ➖ Line
      </button>
      <button 
        className={`tool-btn ${tool === 'text' ? 'active' : ''}`} 
        onClick={() => setTool('text')}
      >
        T Text
      </button>

      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
        className="color-picker"
      />
      
      <input 
        type="range" 
        min="1" 
        max="20" 
        value={strokeWidth} 
        onChange={(e) => setStrokeWidth(Number(e.target.value))}
        style={{ width: '60px' }}
      />

      <button className="tool-btn clear-btn" onClick={onClear}>
        🗑 Clear
      </button>
    </div>
  );
};

export default Toolbar;