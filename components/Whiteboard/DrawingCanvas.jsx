// DrawingCanvas.jsx (updated with Yjs)
import { Stage, Layer, Line } from 'react-konva';
import { useState, useEffect } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Setup Yjs
const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  'ws://localhost:3001',  // Member 5's backend URL
  'room-123',             // room ID (get from Member 2)
  ydoc
);
const yLines = ydoc.getArray('lines'); // shared array

function DrawingCanvas({ activeTool, color }) {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Listen for changes from OTHER users
  useEffect(() => {
    const updateLines = () => {
      setLines(yLines.toArray());
    };
    yLines.observe(updateLines);
    return () => yLines.unobserve(updateLines);
  }, []);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    // Push new line to Yjs — syncs to everyone automatically
    yLines.push([{ 
      points: [pos.x, pos.y], 
      color,
      tool: activeTool 
    }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const pos = e.target.getStage().getPointerPosition();
    // Update last line's points
    ydoc.transact(() => {
      const lastLine = yLines.get(yLines.length - 1);
      lastLine.points = [...lastLine.points, pos.x, pos.y];
      yLines.delete(yLines.length - 1, 1);
      yLines.push([lastLine]);
    });
  };

  const handleMouseUp = () => setIsDrawing(false);

  return (
    <Stage
      width={window.innerWidth / 2}
      height={window.innerHeight - 60}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={line.color}
            strokeWidth={3}
            tension={0.5}
            lineCap="round"
          />
        ))}
      </Layer>
    </Stage>
  );
}