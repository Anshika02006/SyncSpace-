import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';
import { useWhiteboardStore } from '../../store/whiteboardStore';
import { useYjsWhiteboard } from '../../hooks/useYjsWhiteboard';

const CanvasLayer = () => {
  const { tool, color, strokeWidth, textSize } = useWhiteboardStore();
  const { yarray, addStroke } = useYjsWhiteboard();

  const [savedShapes, setSavedShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);

  // For Text tool
  const [isEditingText, setIsEditingText] = useState(false);
  const [textPosition, setTextPosition] = useState(null);
  const [textInput, setTextInput] = useState('');

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Sync from Yjs
  useEffect(() => {
    if (!yarray) return;
    const handleChange = () => {
      setSavedShapes(yarray.toArray());
    };
    yarray.observe(handleChange);
    handleChange();
    return () => yarray.unobserve(handleChange);
  }, [yarray]);

  // Resize canvas
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

  // --- DRAWING HANDLERS ---

  const handleMouseDown = (e) => {
    if (tool === 'text' || isEditingText) return;
    
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);

    if (tool === 'pen' || tool === 'highlighter') {
      setCurrentShape({ tool, points: [pos.x, pos.y] });
    } 
    else if (tool === 'line') {
      setCurrentShape({ tool: 'line', points: [pos.x, pos.y, pos.x, pos.y] });
    } 
    else if (tool === 'rect') {
      setCurrentShape({ tool: 'rect', x: pos.x, y: pos.y, width: 0, height: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !currentShape) return;
    
    const pos = e.target.getStage().getPointerPosition();

    if (tool === 'pen' || tool === 'highlighter') {
      setCurrentShape({
        ...currentShape,
        points: [...currentShape.points, pos.x, pos.y]
      });
    } 
    else if (tool === 'line') {
      setCurrentShape({
        ...currentShape,
        points: [currentShape.points[0], currentShape.points[1], pos.x, pos.y]
      });
    } 
    else if (tool === 'rect') {
      const startX = currentShape.x;
      const startY = currentShape.y;
      const width = pos.x - startX;
      const height = pos.y - startY;
      setCurrentShape({
        ...currentShape,
        x: width > 0 ? startX : pos.x,
        y: height > 0 ? startY : pos.y,
        width: Math.abs(width),
        height: Math.abs(height),
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing || !currentShape) return;
    setIsDrawing(false);

    // Save to Yjs
    if (tool === 'pen' && currentShape.points.length > 2) {
      addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
    } 
    else if (tool === 'highlighter' && currentShape.points.length > 2) {
      addStroke({ ...currentShape, color, strokeWidth: strokeWidth * 3, opacity: 0.4, id: Date.now() });
    }
    else if (tool === 'line') {
      const dx = Math.abs(currentShape.points[2] - currentShape.points[0]);
      const dy = Math.abs(currentShape.points[3] - currentShape.points[1]);
      if (dx > 5 || dy > 5) {
        addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
      }
    } 
    else if (tool === 'rect') {
      if (currentShape.width > 5 && currentShape.height > 5) {
        addStroke({ ...currentShape, color, strokeWidth, id: Date.now() });
      }
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
        tool: 'text',
        x: textPosition.x,
        y: textPosition.y,
        text: textInput,
        color: color,
        fontSize: textSize, // Use adjustable text size
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

  // --- RENDER ---

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
            {/* Render all saved shapes */}
            {savedShapes.map((shape, index) => {
              if (shape.tool === 'pen' || shape.tool === 'highlighter' || shape.tool === 'line') {
                return (
                  <Line
                    key={index}
                    points={shape.points}
                    stroke={shape.color}
                    strokeWidth={shape.strokeWidth || 3}
                    opacity={shape.opacity || 1}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={shape.tool === 'highlighter' ? 'multiply' : 'source-over'}
                  />
                );
              }
              if (shape.tool === 'rect') {
                return (
                  <Rect
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    stroke={shape.color}
                    strokeWidth={shape.strokeWidth || 3}
                    fill="transparent"
                  />
                );
              }
              if (shape.tool === 'text') {
                return (
                  <Text
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    text={shape.text}
                    fontSize={shape.fontSize || 24}
                    fill={shape.color}
                    fontFamily="Arial"
                  />
                );
              }
              return null;
            })}

            {/* Render current active drawing */}
            {currentShape && (
              <>
                {(currentShape.tool === 'pen' || currentShape.tool === 'highlighter' || currentShape.tool === 'line') && (
                  <Line
                    points={currentShape.points}
                    stroke={color}
                    strokeWidth={currentShape.tool === 'highlighter' ? strokeWidth * 3 : strokeWidth}
                    opacity={currentShape.tool === 'highlighter' ? 0.4 : 1}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={currentShape.tool === 'highlighter' ? 'multiply' : 'source-over'}
                  />
                )}
                {currentShape.tool === 'rect' && (
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
            fontSize: `${textSize}px`, // Use adjustable text size
            color: color,
            background: 'transparent',
            border: '1px dashed #ccc',
            outline: 'none',
            padding: '2px 5px',
            fontFamily: 'Arial',
            zIndex: 10,
            minWidth: '50px',
          }}
        />
      )}
    </div>
  );
};

export default CanvasLayer;