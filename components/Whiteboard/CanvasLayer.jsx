import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import { useWhiteboardStore } from '../../store/whiteboardStore';
import { useYjsWhiteboard } from '../../hooks/useYjsWhiteboard';

const CanvasLayer = () => {
  const { tool, color, strokeWidth } = useWhiteboardStore();
  const { yarray, addStroke } = useYjsWhiteboard();

  const [localStrokes, setLocalStrokes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);

  // For Text tool
  const [isEditingText, setIsEditingText] = useState(false);
  const [textPosition, setTextPosition] = useState(null);
  const [textInput, setTextInput] = useState('');

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. Sync from Yjs
  useEffect(() => {
    if (!yarray) return;
    const handleChange = () => {
      const strokes = yarray.toArray();
      setLocalStrokes(strokes);
    };
    yarray.observe(handleChange);
    handleChange();
    return () => yarray.unobserve(handleChange);
  }, [yarray]);

  // 2. Resize canvas
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // --- MOUSE HANDLERS ---
  const handleMouseDown = (e) => {
    if (isEditingText || tool === 'text') return;
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);

    if (tool === 'pen') {
      setCurrentShape({ type: 'pen', points: [pos.x, pos.y] });
    } else if (tool === 'line') {
      setCurrentShape({ type: 'line', points: [pos.x, pos.y, pos.x, pos.y] });
    } else if (tool === 'rect') {
      setCurrentShape({ type: 'rect', x: pos.x, y: pos.y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === 'pen') {
      setCurrentShape({
        ...currentShape,
        points: [...currentShape.points, pos.x, pos.y]
      });
    } else if (tool === 'line') {
      // Only update the end point (keeps it a straight line)
      const updatedPoints = [currentShape.points[0], currentShape.points[1], pos.x, pos.y];
      setCurrentShape({ ...currentShape, points: updatedPoints });
    } else if (tool === 'rect') {
      const start = { x: currentShape.x, y: currentShape.y };
      const width = pos.x - start.x;
      const height = pos.y - start.y;
      setCurrentShape({
        ...currentShape,
        x: width > 0 ? start.x : pos.x,
        y: height > 0 ? start.y : pos.y,
        width: Math.abs(width),
        height: Math.abs(height),
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentShape) return;
    setIsDrawing(false);

    // --- SAVE TO Yjs ---
    if (tool === 'pen' && currentShape.points.length > 2) {
      addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
    } 
    else if (tool === 'line' && currentShape.points.length === 4) {
      // Only save if it's a real line (not a tiny click)
      if (Math.abs(currentShape.points[2] - currentShape.points[0]) > 5 || 
          Math.abs(currentShape.points[3] - currentShape.points[1]) > 5) {
        addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
      }
    } 
    else if (tool === 'rect' && currentShape.width > 5 && currentShape.height > 5) {
      addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
    }

    setCurrentShape(null);
  };

  // --- TEXT HANDLERS ---
  const handleDoubleClick = (e) => {
    if (tool !== 'text') return;
    const pos = e.target.getStage().getPointerPosition();
    setTextPosition({ x: pos.x, y: pos.y });
    setIsEditingText(true);
    setTextInput('');
  };

  const handleTextSubmit = (e) => {
    if (e.key === 'Enter' && textInput.trim() !== '') {
      addStroke({
        type: 'text',
        x: textPosition.x,
        y: textPosition.y,
        text: textInput,
        color: color,
        id: Date.now(),
      });
      setIsEditingText(false);
      setTextPosition(null);
      setTextInput('');
    } else if (e.key === 'Escape') {
      setIsEditingText(false);
      setTextPosition(null);
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', background: '#ffffff', position: 'relative' }}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDblClick={handleDoubleClick}
          style={{ cursor: 'crosshair' }}
        >
          <Layer>
            {/* Render saved strokes */}
            {localStrokes.map((stroke) => {
              if (stroke.type === 'pen' || stroke.type === 'line') {
                return (
                  <Line
                    key={stroke.id}
                    points={stroke.points}
                    stroke={stroke.color}
                    strokeWidth={stroke.strokeWidth || 3}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              }
              if (stroke.type === 'rect') {
                return (
                  <Rect
                    key={stroke.id}
                    x={stroke.x}
                    y={stroke.y}
                    width={stroke.width}
                    height={stroke.height}
                    stroke={stroke.color}
                    strokeWidth={stroke.strokeWidth || 3}
                    fill="transparent"
                  />
                );
              }
              if (stroke.type === 'text') {
                return (
                  <Text
                    key={stroke.id}
                    x={stroke.x}
                    y={stroke.y}
                    text={stroke.text}
                    fontSize={24}
                    fill={stroke.color}
                    fontFamily="Arial"
                  />
                );
              }
              return null;
            })}

            {/* Render active drawing preview */}
            {currentShape && (
              <>
                {(currentShape.type === 'pen' || currentShape.type === 'line') && (
                  <Line
                    points={currentShape.points}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    lineCap="round"
                    lineJoin="round"
                  />
                )}
                {currentShape.type === 'rect' && (
                  <Rect
                    x={currentShape.x}
                    y={currentShape.y}
                    width={currentShape.width}
                    height={currentShape.height}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                )}
              </>
            )}
          </Layer>
        </Stage>
      )}

      {/* Text Input Overlay */}
      {isEditingText && textPosition && (
        <input
          type="text"
          autoFocus
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={handleTextSubmit}
          onBlur={() => setIsEditingText(false)}
          style={{
            position: 'absolute',
            left: textPosition.x,
            top: textPosition.y,
            fontSize: '24px',
            color: color,
            background: 'transparent',
            border: '1px dashed #ccc',
            outline: 'none',
            padding: '2px 5px',
            fontFamily: 'Arial',
            zIndex: 10,
            minWidth: '50px'
          }}
        />
      )}
    </div>
  );
};

export default CanvasLayer;