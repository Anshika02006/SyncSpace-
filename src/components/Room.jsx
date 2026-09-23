import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Whiteboard from "./Whiteboard";

function Room() {
  const { roomId } = useParams();

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden", background: "#0b1020" }}>
      <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
        <Whiteboard roomCode={roomId} />
      </div>
      <div style={{ width: 2, background: "#1e293b", flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0, height: "100%" }}>
        <CodeEditor userName={localStorage.getItem("syncspace-name") || "Guest"} />
      </div>
    </div>
  );
}

export default Room;