import React from 'react';
import Toolbar from './Toolbar';
import CanvasLayer from './CanvasLayer'; // <-- Must be CanvasLayer!

const Whiteboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Toolbar />
      <div style={{ flex: 1, height: '100%' }}>
        <CanvasLayer />
      </div>
    </div>
  );
};

export default Whiteboard;