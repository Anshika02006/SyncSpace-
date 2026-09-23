import { useState } from "react";

export default function RoomCreatedModal({ room, onGoToRoom, onBack }) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const copyCode = async () => {
    try { await navigator.clipboard.writeText(room.code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
  };

  const copyInviteLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/join/${room.code}`); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 1500); } catch {}
  };

  return (
    <div className="ssr-overlay">
      <style>{`
        .ssr-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center; z-index: 40; padding: 24px;
          font-family: "Poppins", "Segoe UI", system-ui, sans-serif;
        }
        .ssr-overlay * { box-sizing: border-box; }
        .ssr-modal {
          position: relative;
          background: #111c2e;
          color: #f1f5f9;
          border-radius: 18px; width: 100%; max-width: 440px;
          padding: 28px 28px 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          border: 1px solid rgba(59,130,246,0.2);
          max-height: 90vh; overflow-y: auto; text-align: left;
        }
        .ssr-back-circle {
          position: absolute;
          top: 18px;
          left: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(59,130,246,0.12);
          border: 1px solid rgba(59,130,246,0.2);
          color: #f1f5f9;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ssr-back-circle:hover {
          background: rgba(59,130,246,0.24);
        }
        .ssr-success-icon {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(59,130,246,0.16); color: #60a5fa;
          font-size: 26px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
        }
        .ssr-modal-header { text-align: center; }
        .ssr-modal-header h2 { font-size: 19px; font-weight: 600; margin: 0 0 4px; color: #f1f5f9; }
        .ssr-modal-header p { font-size: 13.5px; color: #94a3b8; margin: 0 0 22px; }
        .ssr-code-box {
          background: #0b1120; border: 1.5px dashed #3b82f6; border-radius: 12px;
          padding: 16px; text-align: center; margin-bottom: 18px;
        }
        .ssr-code-label { font-size: 12px; color: #94a3b8; margin-bottom: 8px; }
        .ssr-code-value { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .ssr-code-letters { font-size: 26px; font-weight: 700; letter-spacing: 6px; color: #f1f5f9; }
        .ssr-copy-btn { border: 1px solid rgba(59,130,246,0.2); background: #111c2e; color: #94a3b8; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; font-size: 13px; }
        .ssr-copy-btn.copied { border-color: #3b82f6; color: #60a5fa; }
        .ssr-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 13.5px; padding: 10px 0; border-bottom: 1px solid rgba(59,130,246,0.15); }
        .ssr-summary-row:last-of-type { border-bottom: none; }
        .ssr-label { color: #94a3b8; }
        .ssr-value { font-weight: 600; color: #f1f5f9; }
        .ssr-modal-actions { display: flex; gap: 10px; margin-top: 22px; }
        .ssr-modal-actions .ssr-btn { flex: 1; }
        .ssr-btn { border: none; border-radius: 10px; font-weight: 600; font-size: 14px; padding: 11px 22px; cursor: pointer; width: 100%; }
        .ssr-btn-primary { background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; }
        .ssr-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.35); }
        .ssr-share-link {
          display: block; text-align: center; margin-top: 14px; font-size: 13px; font-weight: 600;
          color: #60a5fa; background: none; border: none; cursor: pointer; width: 100%;
        }
      `}</style>

      <div className="ssr-modal">
        <button type="button" className="ssr-back-circle" onClick={onBack} aria-label="Back">
          ←
        </button>

        <div className="ssr-success-icon">✓</div>
        <div className="ssr-modal-header">
          <h2>Room Created Successfully!</h2>
          <p>Share this code with others to invite them</p>
        </div>

        <div className="ssr-code-box">
          <div className="ssr-code-label">Room Code</div>
          <div className="ssr-code-value">
            <span className="ssr-code-letters">{room.code}</span>
            <button type="button" className={`ssr-copy-btn${copied ? " copied" : ""}`} onClick={copyCode} aria-label="Copy room code">
              {copied ? "✓" : "⧉"}
            </button>
          </div>
        </div>

        <div className="ssr-summary-row">
          <span className="ssr-label">Room Name</span>
          <span className="ssr-value">{room.name}</span>
        </div>
        <div className="ssr-summary-row">
          <span className="ssr-label">Access Type</span>
          <span className="ssr-value">{room.access === "public" ? "Public Room" : "Private Room"}</span>
        </div>

        <div className="ssr-modal-actions">
          <button className="ssr-btn ssr-btn-primary" onClick={onGoToRoom}>Go to Room</button>
        </div>

        <button type="button" className="ssr-share-link" onClick={copyInviteLink}>
          {linkCopied ? "Invite link copied!" : "Share Invite Link"}
        </button>
      </div>
    </div>
  );
}
