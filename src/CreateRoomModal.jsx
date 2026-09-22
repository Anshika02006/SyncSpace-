import { useState } from "react";

const ACCESS_TYPES = [
  { id: "public", icon: "🌐", title: "Public Room", desc: "Anyone with the code can join" },
  { id: "private", icon: "🔒", title: "Private Room", desc: "Only invited people can join" },
];

export default function CreateRoomModal({ onCancel, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("public");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [allowChat, setAllowChat] = useState(true);
  const [allowRecording, setAllowRecording] = useState(false);

  const descLimit = 150;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), description: description.trim(), access, allowChat, allowRecording });
  };

  return (
    <div className="ss-overlay" onClick={onCancel}>
      <style>{`
        .ss-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center; z-index: 40; padding: 24px;
          font-family: "Poppins", "Segoe UI", system-ui, sans-serif;
        }
        .ss-overlay * { box-sizing: border-box; }
        .ss-modal {
          background: #111c2e !important;
          color: #f1f5f9 !important;
          border-radius: 18px; width: 100%; max-width: 440px;
          padding: 28px 28px 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          border: 1px solid rgba(59,130,246,0.2);
          max-height: 90vh; overflow-y: auto;
        }
        .ss-modal h2 { font-size: 19px; font-weight: 600; margin: 0 0 4px; color: #f1f5f9; }
        .ss-modal-header p { font-size: 13.5px; color: #94a3b8; margin: 0 0 22px; }
        .ss-field { margin-bottom: 16px; }
        .ss-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: #f1f5f9; }
        .ss-input, .ss-textarea {
          width: 100%; border: 1px solid rgba(59,130,246,0.25); border-radius: 10px; padding: 11px 13px;
          font-size: 14px; font-family: inherit; background: #0b1120 !important; color: #f1f5f9 !important;
        }
        .ss-input::placeholder, .ss-textarea::placeholder { color: #4b5563; }
        .ss-input:focus, .ss-textarea:focus { outline: 2px solid #3b82f6; outline-offset: 1px; }
        .ss-textarea { resize: none; min-height: 72px; }
        .ss-char-count { text-align: right; font-size: 11.5px; color: #94a3b8; margin-top: 4px; }
        .ss-access-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ss-access-card {
          border: 1.5px solid rgba(59,130,246,0.2); border-radius: 12px; padding: 14px; cursor: pointer;
          background: #0b1120 !important; position: relative; text-align: left; color: #f1f5f9;
        }
        .ss-access-card.selected { border-color: #3b82f6; background: rgba(59,130,246,0.12) !important; }
        .ss-access-icon { font-size: 17px; margin-bottom: 8px; }
        .ss-access-card strong { display: block; font-size: 13.5px; margin-bottom: 2px; color: #f1f5f9; }
        .ss-access-card span { font-size: 11.5px; color: #94a3b8; line-height: 1.4; display: block; }
        .ss-access-check {
          position: absolute; top: 10px; right: 10px; width: 16px; height: 16px; border-radius: 50%;
          background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; font-size: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .ss-advanced-toggle {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          background: none; border: none; border-top: 1px solid rgba(59,130,246,0.15); padding: 14px 2px 4px;
          font-size: 13.5px; font-weight: 600; cursor: pointer; color: #f1f5f9; margin-top: 6px;
        }
        .ss-advanced-panel { padding-top: 12px; display: flex; flex-direction: column; gap: 12px; }
        .ss-toggle-row { display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #f1f5f9; }
        .ss-switch { width: 38px; height: 22px; border-radius: 999px; background: #1e3a5f; position: relative; cursor: pointer; border: none; flex-shrink: 0; }
        .ss-switch.on { background: linear-gradient(135deg,#3b82f6,#8b5cf6); }
        .ss-switch-knob { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 0.15s ease; }
        .ss-switch.on .ss-switch-knob { transform: translateX(16px); }
        .ss-modal-actions { display: flex; gap: 10px; margin-top: 22px; }
        .ss-modal-actions .ss-btn { flex: 1; }
        .ss-btn { border: none; border-radius: 10px; font-weight: 600; font-size: 14px; padding: 11px 22px; cursor: pointer; }
        .ss-btn-primary { background: linear-gradient(135deg,#3b82f6,#8b5cf6) !important; color: #fff !important; }
        .ss-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.35); }
        .ss-btn-ghost { background: transparent !important; color: #94a3b8 !important; border: 1px solid rgba(59,130,246,0.2) !important; }
        .ss-btn-ghost:hover { background: rgba(59,130,246,0.08) !important; color: #f1f5f9 !important; }
      `}</style>

      <form className="ss-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="ss-modal-header">
          <h2>Create a New Room</h2>
          <p>Set up your room and start collaborating</p>
        </div>

        <div className="ss-field">
          <label htmlFor="room-name">Room Name</label>
          <input
            id="room-name"
            className="ss-input"
            placeholder="e.g. Project Discussion"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
          />
        </div>

        <div className="ss-field">
          <label htmlFor="room-desc">Room Description (Optional)</label>
          <textarea
            id="room-desc"
            className="ss-textarea"
            placeholder="Add a short description about this room..."
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, descLimit))}
          />
          <div className="ss-char-count">{description.length}/{descLimit}</div>
        </div>

        <div className="ss-field">
          <label>Access Type</label>
          <div className="ss-access-grid">
            {ACCESS_TYPES.map((type) => (
              <button
                type="button"
                key={type.id}
                className={`ss-access-card${access === type.id ? " selected" : ""}`}
                onClick={() => setAccess(type.id)}
              >
                {access === type.id && <span className="ss-access-check">✓</span>}
                <div className="ss-access-icon">{type.icon}</div>
                <strong>{type.title}</strong>
                <span>{type.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="ss-advanced-toggle" onClick={() => setShowAdvanced((v) => !v)}>
          Advanced Options
          <span>{showAdvanced ? "▲" : "▼"}</span>
        </button>

        {showAdvanced && (
          <div className="ss-advanced-panel">
            <div className="ss-toggle-row">
              <span>Allow in-room chat</span>
              <button type="button" className={`ss-switch${allowChat ? " on" : ""}`} onClick={() => setAllowChat((v) => !v)} aria-pressed={allowChat}>
                <span className="ss-switch-knob" />
              </button>
            </div>
            <div className="ss-toggle-row">
              <span>Allow session recording</span>
              <button type="button" className={`ss-switch${allowRecording ? " on" : ""}`} onClick={() => setAllowRecording((v) => !v)} aria-pressed={allowRecording}>
                <span className="ss-switch-knob" />
              </button>
            </div>
          </div>
        )}

        <div className="ss-modal-actions">
          <button type="button" className="ss-btn ss-btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="ss-btn ss-btn-primary">Create Room</button>
        </div>
      </form>
    </div>
  );
}
