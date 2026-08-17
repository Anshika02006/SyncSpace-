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

1. Install dependencies:
bash <br>
npm install <br>

2. Start the Yjs WebSocket server
Open the first terminal and run:
npx y-websocket
The server will run on:
localhost:1234

3. Start the React development server
Open a second terminal in the same project folder and run:
npm run dev

4. Open the application
Open the URL shown by Vite, usually:
http://localhost:5173
