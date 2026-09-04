import { useState } from "react";
import {
  X,
  Copy,
  Check,
  Globe2,
  Lock,
  ChevronDown,
  CheckCircle2,
  Share2,
  Pencil,
} from "lucide-react";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
function generateRoomCode(length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export default function CreateRoomModal({ isOpen, onClose, onGoToRoom }) {
  const [step, setStep] = useState("details"); // "details" | "success"
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [accessType, setAccessType] = useState("public"); // "public" | "private"
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const resetAndClose = () => {
    setStep("details");
    setRoomName("");
    setDescription("");
    setAccessType("public");
    setAdvancedOpen(false);
    setRoomCode("");
    setCopied(false);
    setError("");
    onClose();
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      setError("Please enter a room name");
      return;
    }
    setError("");
    setRoomCode(generateRoomCode());
    setStep("success");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  return (
    <div
      onClick={resetAndClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44, 42, 38, 0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#faf7ef",
          borderRadius: 18,
          padding: "28px 28px 24px",
          boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {step === "details" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#2c2a26", margin: 0 }}>
                Create a New Room
              </h2>
              <button
                onClick={resetAndClose}
                aria-label="Close"
                style={{ border: "none", background: "transparent", cursor: "pointer", color: "#9a9384", padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#8a8478", margin: "0 0 20px" }}>
              Set up your room and start collaborating
            </p>

            {/* Room Name */}
            <label style={{ fontSize: 13, fontWeight: 600, color: "#2c2a26", display: "block", marginBottom: 6 }}>
              Room Name
            </label>
            <input
              type="text"
              placeholder="e.g. Project Discussion"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
                setError("");
              }}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: 10,
                border: `1px solid ${error ? "#d64545" : "#e3ddcd"}`,
                background: "#f1ede1",
                fontSize: 14,
                color: "#2c2a26",
                outline: "none",
                marginBottom: error ? 4 : 16,
              }}
            />
            {error && (
              <p style={{ fontSize: 12, color: "#d64545", margin: "0 0 16px 2px" }}>{error}</p>
            )}

            {/* Description */}
            <label style={{ fontSize: 13, fontWeight: 600, color: "#2c2a26", display: "block", marginBottom: 6 }}>
              Room Description (Optional)
            </label>
            <textarea
              placeholder="Add a short description about this room..."
              value={description}
              maxLength={150}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: 10,
                border: "1px solid #e3ddcd",
                background: "#f1ede1",
                fontSize: 14,
                color: "#2c2a26",
                outline: "none",
                resize: "none",
                fontFamily: "inherit",
              }}
            />
            <div style={{ textAlign: "right", fontSize: 11, color: "#9a9384", marginBottom: 16 }}>
              {description.length}/150
            </div>

            {/* Access Type */}
            <label style={{ fontSize: 13, fontWeight: 600, color: "#2c2a26", display: "block", marginBottom: 8 }}>
              Access Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
              <AccessCard
                icon={<Globe2 size={16} />}
                title="Public Room"
                description="Anyone with the code can join"
                selected={accessType === "public"}
                onClick={() => setAccessType("public")}
              />
              <AccessCard
                icon={<Lock size={16} />}
                title="Private Room"
                description="Only invited persons"
                selected={accessType === "private"}
                onClick={() => setAccessType("private")}
              />
            </div>

            {/* Advanced Options */}
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "transparent",
                border: "none",
                borderTop: "1px solid #e3ddcd",
                padding: "14px 0",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                color: "#2c2a26",
              }}
            >
              Advanced Options
              <ChevronDown
                size={16}
                style={{ transform: advancedOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
              />
            </button>
            {advancedOpen && (
              <div style={{ padding: "4px 0 14px", fontSize: 13, color: "#8a8478" }}>
                More settings (participant limit, recording, etc.) can go here.
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button
                type="button"
                onClick={resetAndClose}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  borderRadius: 10,
                  border: "1px solid #e3ddcd",
                  background: "#faf7ef",
                  color: "#2c2a26",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateRoom}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  borderRadius: 10,
                  border: "none",
                  background: "#f2b53d",
                  color: "#2c2a26",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Create Room
              </button>
            </div>
          </>
        ) : (
          <RoomCreatedSuccess
            roomName={roomName}
            accessType={accessType}
            roomCode={roomCode}
            copied={copied}
            onCopy={handleCopy}
            onGoToRoom={() => {
              onGoToRoom?.({ roomName, accessType, roomCode });
              resetAndClose();
            }}
            onClose={resetAndClose}
          />
        )}
      </div>
    </div>
  );
}

function AccessCard({ icon, title, description, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "12px 14px",
        borderRadius: 10,
        border: `1.5px solid ${selected ? "#f2b53d" : "#e3ddcd"}`,
        background: selected ? "#fdf3dc" : "#f1ede1",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#2c2a26" }}>
        {icon}
        {title}
      </span>
      <span style={{ fontSize: 11, color: "#8a8478", lineHeight: 1.4 }}>{description}</span>
    </button>
  );
}
  
  function RoomCreatedSuccess({ roomName, accessType, roomCode, copied, onCopy, onGoToRoom, onClose }) {
  const codeChars = roomCode.split("");
  const [linkCopied, setLinkCopied] = useState(false);     

  const inviteLink = `${window.location.origin}/join/${roomCode}`;      

  const handleShareLink = async () => {                     
    if (navigator.share) {
      
      try {
        await navigator.share({
          title: `Join "${roomName}" on SyncSpace`,
          text: `Join my room on SyncSpace using this link:`,
          url: inviteLink,
        });
      } catch (err) {
        
      }
    } else {
     
      try {
        await navigator.clipboard.writeText(inviteLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 1500);
      } catch {
       
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#9a9384",
          float: "right",
        }}
      >
        <X size={18} />
      </button>

      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#fdf3dc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "8px auto 16px",
        }}
      >
        <CheckCircle2 size={28} color="#f2b53d" />
      </div>

      <h2 style={{ fontSize: 19, fontWeight: 700, color: "#2c2a26", margin: "0 0 4px" }}>
        Room Created Successfully! ⭐
      </h2>
      <p style={{ fontSize: 13, color: "#8a8478", margin: "0 0 20px" }}>
        Share this code with others to invite them.
      </p>

      <div style={{ fontSize: 12, fontWeight: 600, color: "#2c2a26", textAlign: "left", marginBottom: 8 }}>
        Room Code
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#f1ede1",
          border: "1px solid #e3ddcd",
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 18,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          {codeChars.map((ch, i) => (
            <span
              key={i}
              style={{
                width: 28,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#faf7ef",
                border: "1px solid #e3ddcd",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 700,
                color: "#2c2a26",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <button
          onClick={onCopy}
          aria-label="Copy room code"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: copied ? "#2f9e57" : "#9a9384",
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div style={{ textAlign: "left", marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#2c2a26", marginBottom: 6 }}>Room Name</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f1ede1",
            border: "1px solid #e3ddcd",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 14,
            color: "#2c2a26",
          }}
        >
          {roomName}
          <Pencil size={14} color="#9a9384" />
        </div>
      </div>

      <div style={{ textAlign: "left", marginBottom: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#2c2a26", marginBottom: 6 }}>Access Type</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#f1ede1",
            border: "1px solid #e3ddcd",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 14,
            color: "#2c2a26",
          }}
        >
          {accessType === "public" ? <Globe2 size={15} /> : <Lock size={15} />}
          {accessType === "public" ? "Public Room" : "Private Room"}
        </div>
      </div>

      <button
        onClick={onGoToRoom}
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 10,
          border: "none",
          background: "#f2b53d",
          color: "#2c2a26",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        Go to Room
      </button>

      <button
        onClick={handleShareLink}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#c9861f",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <Share2 size={14} />
        {linkCopied ? "Link copied!" : "Share Invite Link"}
      </button>
    </div>
  );
}