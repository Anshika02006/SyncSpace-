// Toolbar.jsx
function Toolbar({ activeTool, setActiveTool, color, setColor, onUndo, onClear }) {
  return (
    <div style={{ 
      display: 'flex', 
      gap: '10px', 
      padding: '10px',
      background: '#1e1e1e',
      alignItems: 'center'
    }}>
      {/* Tool Buttons */}
      <button 
        onClick={() => setActiveTool('pen')}
        style={{ background: activeTool === 'pen' ? 'blue' : 'gray' }}
      >
        🖊 Pen
      </button>

      <button 
        onClick={() => setActiveTool('rect')}
        style={{ background: activeTool === 'rect' ? 'blue' : 'gray' }}
      >
        ▭ Rect
      </button>

      <button 
        onClick={() => setActiveTool('line')}
        style={{ background: activeTool === 'line' ? 'blue' : 'gray' }}
      >
        ╱ Line
      </button>

      <button 
        onClick={() => setActiveTool('text')}
        style={{ background: activeTool === 'text' ? 'blue' : 'gray' }}
      >
        T Text
      </button>

      {/* Color Picker */}
      <input 
        type="color" 
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* Undo + Clear */}
      <button onClick={onUndo}>↩ Undo</button>
      <button onClick={onClear}>🗑 Clear</button>
    </div>
  );
}

export default Toolbar;