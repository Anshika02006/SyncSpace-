import React from 'react';
import { useWhiteboardStore } from '../../store/whiteboardStore';

const Toolbar = ({ onClear }) => {
  const { 
    tool, setTool, 
    color, setColor, 
    strokeWidth, setStrokeWidth, 
    textSize, setTextSize 
  } = useWhiteboardStore();

  return (
    <div className="whiteboard-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
      {/* Tools */}
      <button 
        className={`tool-btn ${tool === 'pen' ? 'active' : ''}`} 
        onClick={() => setTool('pen')}
      >
        ✏️ Pen
      </button>
      <button 
        className={`tool-btn ${tool === 'highlighter' ? 'active' : ''}`} 
        onClick={() => setTool('highlighter')}
      >
        🖍️ Highlighter
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

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: '#ccc', margin: '0 4px' }} />

      {/* Color Picker */}
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
        className="color-picker"
        title="Select Color"
      />

      {/* Pen Size Slider */}
      {(tool === 'pen' || tool === 'highlighter' || tool === 'line' || tool === 'rect') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>Size:</span>
          <input 
            type="range" 
            min="1" 
            max="30" 
            value={strokeWidth} 
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            style={{ width: '80px' }}
            title="Adjust stroke size"
          />
        </div>
      )}

      {/* Text Size Slider */}
      {tool === 'text' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>Text:</span>
          <input 
            type="range" 
            min="12" 
            max="72" 
            value={textSize} 
            onChange={(e) => setTextSize(Number(e.target.value))}
            style={{ width: '80px' }}
            title="Adjust text size"
          />
          <span style={{ fontSize: `${textSize / 2}px`, color: '#666' }}>T</span>
        </div>
      )}

      {/* Undo & Clear */}
      <button className="tool-btn" style={{ marginLeft: 'auto' }}>↩ Undo</button>
      <button className="tool-btn clear-btn" onClick={onClear}>🗑 Clear</button>
    </div>
  );
};

export default Toolbar;