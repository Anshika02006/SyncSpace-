# SyncSpace – Collaborative Code Editor

A real-time collaborative code editor built with React, Vite, Monaco Editor, and Yjs.

## Features

- Monaco Editor integration
- Real-time collaborative code editing
- Yjs and y-monaco integration
- Live cursors for other users
- Remote user names
- Online users list
- Real-time user awareness

## Tech Stack

- React
- Vite
- Monaco Editor
- Yjs
- y-monaco
- y-websocket

## Run Locally

1. Install dependencies: <br>
bash <br>
npm install <br>

2. Start the Yjs WebSocket server <br>
Open the first terminal and run: <br>
npx y-websocket <br>
The server will run on: <br>
localhost:1234

3. Start the React development server <br>
Open a second terminal in the same project folder and run: <br>
npm run dev <br>

4. Open the application <br>
Open the URL shown by Vite, usually: <br>
http://localhost:5173 <br>
