import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export function setupYjs(roomId) {
  // Create shared document
  const ydoc = new Y.Doc()

  // Connect to backend websocket server
  const provider = new WebsocketProvider(
    'wss://demos.yjs.dev', // temporary public server for testing
    roomId,                 // room name
    ydoc
  )

  // Shared array for all shapes/lines
  const yLines = ydoc.getArray('lines')

  return { ydoc, provider, yLines }
}