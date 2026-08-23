import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './space.css';

export default function Home() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim()) {
      navigate(`/workspace?room=${roomId.trim()}`);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="page-hero">
        <span className="page-badge">Welcome</span>
        <h1>Collaborate in real time,<br />from anywhere</h1>
        <p>SyncSpace brings your team together — share boards, chat, and work side by side in a live meeting room.</p>
      </section>

<section className="join-room-section">
  <div className="join-room-card">
    <div className="join-room-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    </div>
    <h2>Create a Meeting Room</h2>
    <p>A secure temporary workspace will be created instantly. You can give access to anyone by sharing the link.</p>
    <div className="join-room-input-row" style={{flexDirection:'column', gap:'10px'}}>
      <input type="text" className="join-room-input" placeholder="Your Name" value={createName} onChange={e => setCreateName(e.target.value)} />
      <input type="text" className="join-room-input" placeholder="Room ID (e.g. sync-123)" value={createRoomId} onChange={e => setCreateRoomId(e.target.value)} />
      <button className="btn-primary join-room-btn" onClick={handleCreate}>Create & Launch Workspace</button>
    </div>
  </div>
</section>




      <section className="join-room-section">
        <div className="join-room-card">
          <div className="join-room-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"/>
              <rect x="3" y="7" width="12" height="10" rx="2"/>
            </svg>
          </div>
          <h2>Join a Meeting Room</h2>
          <p>Enter a room ID to instantly join your team's live session.</p>
          <div className="join-room-input-row">
            <input
              type="text"
              className="join-room-input"
              placeholder="Enter Room ID (e.g. sync-123)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
            />
            <button className="btn-primary join-room-btn" onClick={handleJoin}>
              Join Room
            </button>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Don't have a room yet?</h2>
        <p>Create a new workspace and invite your team in seconds.</p>
        <button className="btn-primary" onClick={() => navigate('/workspace')}>
          Create Workspace
        </button>
      </section>
    </div>
  );
}
