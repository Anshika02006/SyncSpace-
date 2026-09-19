import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Whiteboard from "../my-app/src/components/Whiteboard";

function App() {
  const [userName, setUserName] = useState(
    () => localStorage.getItem("syncspace-name") || "Guest"
  );

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: "#0b1020" }}>
      {/* Left: Whiteboard */}
      <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
        <Whiteboard roomCode="ABCD12" />
      </div>

      {/* Divider */}
      <div style={{ width: 2, background: "#1e293b", flexShrink: 0 }} />

      {/* Right: Code Editor */}
      <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
        <CodeEditor userName={userName} />
      </div>
    </div>
  );
}

export default App;