// Whiteboard.jsx
import { useState } from 'react';
import Toolbar from './Toolbar';
import DrawingCanvas from './DrawingCanvas';

function Whiteboard() {
  const [activeTool, setActiveTool] = useState('pen');
  const [color, setColor] = useState('#000000');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        color={color}
        setColor={setColor}
      />
      <DrawingCanvas
        activeTool={activeTool}
        color={color}
      />
    </div>
  );
}

export default Whiteboard;