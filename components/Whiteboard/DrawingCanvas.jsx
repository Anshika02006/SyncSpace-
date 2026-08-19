import { Stage, Layer, Line, Rect } from 'react-konva';
import { useState } from 'react';

function DrawingCanvas({ activeTool, color, lines, setLines }) {
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();

    if (activeTool === 'pen' || activeTool === 'line') {
      setLines([...lines, { 
        tool: activeTool,
        points: [pos.x, pos.y], 
        color: color 
      }]);
    }

    if (activeTool === 'rect') {
      setLines([...lines, {
        tool: 'rect',
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        color: color
      }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const pos = e.target.getStage().getPointerPosition();
    const lastShape = lines[lines.length - 1];

    if (activeTool === 'pen') {
      lastShape.points = lastShape.points.concat([pos.x, pos.y]);
      setLines([...lines.slice(0, -1), lastShape]);
    }

    if (activeTool === 'rect') {
      lastShape.width = pos.x - lastShape.x;
      lastShape.height = pos.y - lastShape.y;
      setLines([...lines.slice(0, -1), lastShape]);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <Stage
      width={window.innerWidth / 2}
      height={window.innerHeight - 60}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ background: 'white', cursor: 'crosshair' }}
    >
      <Layer>
        {lines.map((shape, i) => {
          if (shape.tool === 'rect') {
            return (
              <Rect
                key={i}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke={shape.color}
                strokeWidth={3}
              />
            );
          }
          return (
            <Line
              key={i}
              points={shape.points}
              stroke={shape.color}
              strokeWidth={3}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          );
        })}
      </Layer>
    </Stage>
  );
}

export default DrawingCanvas;