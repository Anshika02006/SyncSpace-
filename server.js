const { WebSocketServer } = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils.js');

const port = 1234;
const wss = new WebSocketServer({ port });

wss.on('connection', (ws, req) => {
  setupWSConnection(ws, req, { gc: true });
});

console.log(`Yjs server running on ws://localhost:${port}`);