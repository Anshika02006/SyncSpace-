import React from 'react';
import Whiteboard from '../Whiteboard/Whiteboard';

const Workspace = () => {
  return (
    <div className="workspace-container">
      {/* Left Panel: Whiteboard */}
      <div className="panel panel-whiteboard">
        <Whiteboard />
      </div>

      {/* Right Panel: Code Editor */}
      <div className="panel panel-editor">
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#888' 
        }}>
          <h3>Code Editor - Member 4</h3>
        </div>
      </div>
    </div>
  );
};

export default Workspace;