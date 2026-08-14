// Workspace.jsx
import Whiteboard from '../Whiteboard/Whiteboard';
import CodeEditor from '../CodeEditor/CodeEditor'; // Member 4's part

function Workspace() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Your Part - Left Side */}
      <div style={{ width: '50%', borderRight: '2px solid #ccc' }}>
        <Whiteboard />
      </div>

      {/* Member 4's Part - Right Side */}
      <div style={{ width: '50%' }}>
        <CodeEditor />
      </div>

    </div>
  );
}

export default Workspace;