import { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import RoomCreatedModal from "./RoomCreatedModal";
import JoinMeetingModal from "./JoinMeetingModal";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "rooms", icon: "🗂️", label: "Rooms" },
  { id: "meetings", icon: "🎥", label: "Meetings" },
  { id: "profile", icon: "👤", label: "Profile" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

const INITIAL_RECENT_ROOMS = [
  { id: 1, name: "Design Discussion", updated: "10m ago" },
  { id: 2, name: "Project Alpha", updated: "10h ago" },
  { id: 3, name: "Code Collaboration", updated: "16h ago" },
];

function randomRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  let code = "";
  for (let i = 0; ia < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function Dashboard({ userName, onJoinRoom, onEnterRoom }) {
  const [activeNav, setActiveNav] = useState("home");
  const [modal, setModal] = useState(null); // null | "create" | "created" | "join"
  const [createdRoom, setCreatedRoom] = useState(null);
  const [recentRooms, setRecentRooms] = useState(INITIAL_RECENT_ROOMS);

  const handleCreateRoom = (roomData) => {
    const room = { ...roomData, code: randomRoomCode() };
    setCreatedRoom(room);
    setModal("created");
    setRecentRooms((rooms) => [{ id: Date.now(), name: room.name, updated: "just now" }, ...rooms]);
  };

  const handleGoToRoom = () => {
    setModal(null);
    onEnterRoom?.(createdRoom);
  };

  const handleJoinRoom = (code) => {
    setModal(null);
    onJoinRoom?.(code);
  };

  return (
    <div className="ss-app">
      {/* All styling for THIS file lives right here — nothing to import. */}
      <style>{`
        .ss-app {
          --ss-bg: #0b1120;
          --ss-panel: #111c2e;
          --ss-ink: #f1f5f9;
          --ss-ink-soft: #94a3b8;
          --ss-border: rgba(59,130,246,0.15);
          --ss-gold: linear-gradient(135deg,#3b82f6,#8b5cf6);
          --ss-gold-solid: #3b82f6;
          --ss-gold-dark: #2563eb;
          --ss-gold-ink: #ffffff;
          --ss-white: #1e3a5f;
          --ss-radius: 14px;
          font-family: "Poppins", "Segoe UI", system-ui, -apple-system, sans-serif;
          color: var(--ss-ink);
          background: var(--ss-bg);
          min-height: 100vh;
          display: flex;
          position: relative;
        }
        .ss-app * { box-sizing: border-box; }

        /* ---- Sidebar ---- */
        .ss-sidebar {
          width: 240px;
          flex-shrink: 0;
          background: var(--ss-panel);
          border-right: 1px solid var(--ss-border);
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .ss-logo { display: flex; align-items: center; gap: 10px; padding: 0 8px; font-size: 19px; font-weight: 600; }
        .ss-logo-mark { font-size: 20px; }
        .ss-nav { display: flex; flex-direction: column; gap: 4px; }
        .ss-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 10px;
          font-size: 14.5px; font-weight: 500; color: var(--ss-ink-soft);
          cursor: pointer; border: none; background: transparent; text-align: left; width: 100%;
        }
        .ss-nav-item:hover { background: rgba(59,130,246,0.12); color: var(--ss-ink); }
        .ss-nav-item.active { background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; }
        .ss-nav-icon { font-size: 16px; width: 18px; text-align: center; }
        .ss-sidebar-footer { margin-top: auto; }
        .ss-logout {
          display: flex; align-items: center; gap: 10px; padding: 11px 14px;
          color: var(--ss-ink-soft); font-size: 14.5px; font-weight: 500;
          background: none; border: none; cursor: pointer;
        }
        .ss-logout:hover { color: var(--ss-ink); }

        /* ---- Main ---- */
        .ss-main { flex: 1; min-width: 0; padding: 32px 40px 48px; }
        .ss-topbar { display: flex; justify-content: flex-end; align-items: center; gap: 16px; margin-bottom: 18px; }
        .ss-bell {
          width: 38px; height: 38px; border-radius: 50%; background: #111c2e;
          border: 1px solid var(--ss-border); display: flex; align-items: center; justify-content: center;
          font-size: 16px; cursor: pointer;
        }
        .ss-avatar {
          width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff;
          display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px;
        }
        .ss-welcome h1 { font-size: 26px; font-weight: 600; margin: 0 0 4px; color: #ffffff; text-align: left; }
        .ss-welcome p { color: var(--ss-ink-soft); margin: 0 0 28px; font-size: 15px; text-align: left;}

        /* ---- Action cards ---- */
        .ss-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 36px; }
        .ss-action-card {
          background: var(--ss-panel); border: 1px solid var(--ss-border); border-radius: var(--ss-radius);
          padding: 30px 26px; text-align: center; display: flex; flex-direction: column; align-items: center;
        }
        .ss-action-icon {
          width: 56px; height: 56px; border-radius: 14px; background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff;
          display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px;
        }
        .ss-action-card h3 { font-size: 17px; font-weight: 600; margin: 0 0 6px; }
        .ss-action-card p { color: var(--ss-ink-soft); font-size: 13.5px; line-height: 1.5; margin: 0 0 20px; max-width: 240px; }

        .ss-btn { border: none; border-radius: 10px; font-weight: 600; font-size: 14px; padding: 11px 22px; cursor: pointer; }
        .ss-btn-primary { background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; }
        .ss-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.35); }
        .ss-btn-ghost { background: transparent; color: var(--ss-ink-soft); border: 1px solid var(--ss-border); }
        .ss-btn-ghost:hover { background: rgba(59,130,246,0.08); color: var(--ss-ink); }
        .ss-btn-small { padding: 7px 16px; font-size: 13px; }

        /* ---- Recent rooms ---- */
        .ss-recent-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
       .ss-recent-head h2 { font-size: 16px; font-weight: 600; margin: 0; color: #ffffff ;text-align: left; }
        .ss-view-all { font-size: 13.5px; color: #60a5fa; font-weight: 600; background: none; border: none; cursor: pointer; }
        .ss-recent-list { background: var(--ss-panel); border: 1px solid var(--ss-border); border-radius: var(--ss-radius); overflow: hidden; }
        .ss-recent-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--ss-border); }
        .ss-recent-row:last-child { border-bottom: none; }
        .ss-recent-info { display: flex; align-items: center; gap: 12px; }
        .ss-recent-dot {
          width: 34px; height: 34px; border-radius: 9px; background: rgba(59,130,246,0.16); color: #60a5fa;
          display: flex; align-items: center; justify-content: center; font-size: 15px;
        }
        .ss-recent-name { font-size: 14.5px; font-weight: 600; }
        .ss-recent-meta { font-size: 12.5px; color: var(--ss-ink-soft); }

        @media (max-width: 720px) {
          .ss-sidebar { display: none; }
          .ss-main { padding: 24px; }
          .ss-action-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <aside className="ss-sidebar">
        <div className="ss-logo">
          <span className="ss-logo-mark">&&</span>
          
        </div>

        <nav className="ss-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`ss-nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="ss-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ss-sidebar-footer">
          <button className="ss-logout">
            <span className="ss-nav-icon">↩</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="ss-main">
        <div className="ss-topbar">
          <button className="ss-bell" aria-label="Notifications">🔔</button>
          <div className="ss-avatar">{userName.charAt(0).toUpperCase()}</div>
        </div>

        <div className="ss-welcome">
          <h1>Welcome, {userName} 👋</h1>
          <p>What would you like to do today?</p>
        </div>

        <div className="ss-action-grid">
          <div className="ss-action-card">
            <div className="ss-action-icon">+</div>
            <h3>Create Room</h3>
            <p>Create a new room and invite others to collaborate.</p>
            <button className="ss-btn ss-btn-primary" onClick={() => setModal("create")}>Create Room</button>
          </div>

          <div className="ss-action-card">
            <div className="ss-action-icon">👥</div>
            <h3>Join the Meeting</h3>
            <p>Enter a code to join an existing session.</p>
            <button className="ss-btn ss-btn-primary" onClick={() => setModal("join")}>Join Meeting</button>
          </div>
        </div>

        <div className="ss-recent-head">
          <h2>Your Recent Rooms</h2>
          <button className="ss-view-all">View All</button>
        </div>

        <div className="ss-recent-list">
          {recentRooms.map((room) => (
            <div className="ss-recent-row" key={room.id}>
              <div className="ss-recent-info">
                <div className="ss-recent-dot">🗂️</div>
                <div>
                  <div className="ss-recent-name">{room.name}</div>
                  <div className="ss-recent-meta">Updated {room.updated}</div>
                </div>
              </div>
              <button className="ss-btn ss-btn-ghost ss-btn-small">Join</button>
            </div>
          ))}
        </div>
      </main>

      {modal === "create" && <CreateRoomModal onCancel={() => setModal(null)} onCreate={handleCreateRoom} />}

      {modal === "created" && createdRoom && (
        <RoomCreatedModal room={createdRoom} onGoToRoom={handleGoToRoom} onBack={() => setModal(null)} />
      )}

      {modal === "join" && (
        <JoinMeetingModal onCancel={() => setModal(null)} onJoin={handleJoinRoom} />
      )}
    </div>
  );
}