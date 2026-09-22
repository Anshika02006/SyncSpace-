import { useRef, useState } from "react";

const CODE_LENGTH = 6;

export default function JoinMeetingModal({ onCancel, onJoin }) {
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const setDigit = (index, value) => {
    const char = value.slice(-1).toUpperCase();
    setDigits((prev) => { const next = [...prev]; next[index] = char; return next; });
    setError("");
    if (char && index < CODE_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text").trim().toUpperCase();
    if (!text) return;
    e.preventDefault();
    const chars = text.slice(0, CODE_LENGTH).split("");
    setDigits((prev) => { const next = [...prev]; chars.forEach((c, i) => { next[i] = c; }); return next; });
    inputsRef.current[Math.min(chars.length, CODE_LENGTH - 1)]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < CODE_LENGTH) { setError("Enter the full 6-character code."); return; }
    onJoin(code);
  };

  return (
    <div className="ssj-overlay" onClick={onCancel}>
      <style>{`
        .ssj-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center; z-index: 40; padding: 24px;
          font-family: "Poppins", "Segoe UI", system-ui, sans-serif;
        }
        .ssj-overlay * { box-sizing: border-box; }
        .ssj-modal {
          background: #111c2e;
          color: #f1f5f9;
          border-radius: 18px; width: 100%; max-width: 400px;
          padding: 28px 28px 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          border: 1px solid rgba(59,130,246,0.2);
          text-align: center;
        }
        .ssj-modal-icon {
          width: 56px; height: 56px; border-radius: 14px;
          background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff;
          display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 16px;
        }
        .ssj-modal h2 { font-size: 19px; font-weight: 600; margin: 0 0 4px; color: #f1f5f9; }
        .ssj-modal-header p { font-size: 13.5px; color: #94a3b8; margin: 0 0 22px; }
        .ssj-code-inputs { display: flex; justify-content: center; gap: 8px; margin-bottom: 8px; }
        .ssj-code-input {
          width: 44px; height: 54px; text-align: center; font-size: 20px; font-weight: 700;
          border: 1.5px solid rgba(59,130,246,0.25); border-radius: 10px;
          background: #0b1120; color: #f1f5f9;
        }
        .ssj-code-input:focus { outline: 2px solid #3b82f6; outline-offset: 1px; border-color: #3b82f6; }
        .ssj-field-error { color: #f87171; font-size: 12.5px; margin: 6px 0 14px; min-height: 16px; }
        .ssj-modal-actions { display: flex; gap: 10px; margin-top: 8px; }
        .ssj-modal-actions .ssj-btn { flex: 1; }
        .ssj-btn { border: none; border-radius: 10px; font-weight: 600; font-size: 14px; padding: 11px 22px; cursor: pointer; }
        .ssj-btn-primary { background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; }
        .ssj-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(59,130,246,0.35); }
        .ssj-btn-ghost { background: transparent; color: #94a3b8; border: 1px solid rgba(59,130,246,0.2); }
        .ssj-btn-ghost:hover { background: rgba(59,130,246,0.08); color: #f1f5f9; }
      `}</style>

      <form className="ssj-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="ssj-modal-icon">👥</div>
        <div className="ssj-modal-header">
          <h2>Join the Meeting</h2>
          <p>Enter the room code shared by the host</p>
        </div>

        <div className="ssj-code-inputs" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              className="ssj-code-input"
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              maxLength={1}
              inputMode="text"
              autoFocus={i === 0}
            />
          ))}
        </div>
        <div className="ssj-field-error">{error}</div>

        <div className="ssj-modal-actions">
          <button type="button" className="ssj-btn ssj-btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="ssj-btn ssj-btn-primary">Join Room</button>
        </div>
      </form>
    </div>
  );
}
