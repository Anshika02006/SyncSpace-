import { useEffect, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export const useYjsWhiteboard = (roomName = 'syncspace-room') => {
  const ydocRef = useRef(null);
  const yarrayRef = useRef(null);
  const providerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Yjs document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // 2. Create a shared array for strokes
    const yarray = ydoc.getArray('strokes');
    yarrayRef.current = yarray;

    // 3. Connect to WebSocket provider (backend needed, but uses localhost:1234 by default)
    const provider = new WebsocketProvider('ws://localhost:1234', roomName, ydoc);
    providerRef.current = provider;

    // Cleanup on unmount
    return () => {
      provider.destroy();
      ydoc.destroy();
    };
  }, [roomName]);

  // Helper to add a stroke to the shared array
  const addStroke = (stroke) => {
    if (yarrayRef.current) {
      yarrayRef.current.push([stroke]); // Y.Array pushes an array of items
    }
  };

  // Helper to clear all strokes
  const clearStrokes = () => {
    if (yarrayRef.current) {
      yarrayRef.current.delete(0, yarrayRef.current.length);
    }
  };

  return { yarray: yarrayRef.current, addStroke, clearStrokes };
};