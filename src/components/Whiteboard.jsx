import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  MousePointer2,
  Pencil,
  Square,
  Circle,
  ArrowUpRight,
  Type,
  StickyNote,
  Eraser,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Trash2,
  Download,
} from "lucide-react";

/**
 * SyncSpace Whiteboard
 * -------------------------------------------------------------
 * Drop-in collaborative whiteboard panel matching the SyncSpace
 * "Workspace" tab (pen, shapes, text, sticky notes, eraser, zoom,
 * undo/redo). Pure client-side canvas for now — see the
 * `onChange` prop for wiring up real-time sync (e.g. broadcast
 * `elements` over your room's websocket/CRDT channel and call
 * `applyRemoteElements` on incoming updates).
 *
 * Usage:
 *   <Whiteboard roomCode="ABCD12" onChange={(elements) => sendToRoom(elements)} />
 */

const CANVAS_W = 2200;
const CANVAS_H = 1300;
const GRID_GAP = 28;

const COLORS = ["#F8FAFC", "#3b82f6", "#60a5fa", "#8b5cf6", "#22c55e"];
const STICKY_COLORS = [
  "rgba(59,130,246,0.16)", // blue tint
  "rgba(139,92,246,0.16)", // purple tint
  "rgba(34,197,94,0.16)", // green tint
  "rgba(96,165,250,0.16)", // light blue tint
];
const STICKY_BORDERS = ["#3b82f6", "#8b5cf6", "#22c55e", "#60a5fa"];

const TOOLS = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "pen", icon: Pencil, label: "Pen" },
  { id: "rect", icon: Square, label: "Rectangle" },
  { id: "ellipse", icon: Circle, label: "Ellipse" },
  { id: "arrow", icon: ArrowUpRight, label: "Arrow" },
  { id: "text", icon: Type, label: "Text" },
  { id: "sticky", icon: StickyNote, label: "Sticky note" },
  { id: "eraser", icon: Eraser, label: "Eraser" },
];

let uid = 1;
const nextId = () => `el_${uid++}`;

export default function Whiteboard({ roomCode = "ABCD12", onChange }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [elements, setElements] = useState([]);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [zoom, setZoom] = useState(1);

  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const drawingRef = useRef(null); // in-progress element while pointer is down
  const dragRef = useRef(null); // { id, offsetX, offsetY } while moving a selected element
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null); // text/sticky currently being typed into
  const [editValue, setEditValue] = useState("");

  // ---------- history ----------
  const commit = useCallback(
    (next) => {
      setHistory((h) => [...h, elements]);
      setRedoStack([]);
      setElements(next);
      onChange?.(next);
    },
    [elements, onChange]
  );

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setRedoStack((r) => [elements, ...r]);
    setElements(prev);
    onChange?.(prev);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setRedoStack((r) => r.slice(1));
    setHistory((h) => [...h, elements]);
    setElements(next);
    onChange?.(next);
  };

  const clearAll = () => commit([]);

  // Call this when a real-time update arrives from another participant.
  const applyRemoteElements = (remote) => setElements(remote);
  void applyRemoteElements; // exported via ref pattern if needed by parent

  // ---------- coordinate helpers ----------
  const toCanvasPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    };
  };

  const hitTest = (pt) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (el.type === "rect" || el.type === "sticky") {
        const x1 = Math.min(el.x, el.x + el.w);
        const x2 = Math.max(el.x, el.x + el.w);
        const y1 = Math.min(el.y, el.y + el.h);
        const y2 = Math.max(el.y, el.y + el.h);
        if (pt.x >= x1 && pt.x <= x2 && pt.y >= y1 && pt.y <= y2) return el;
      } else if (el.type === "ellipse") {
        const cx = el.x + el.w / 2;
        const cy = el.y + el.h / 2;
        const rx = Math.abs(el.w / 2) || 1;
        const ry = Math.abs(el.h / 2) || 1;
        if (((pt.x - cx) ** 2) / (rx * rx) + ((pt.y - cy) ** 2) / (ry * ry) <= 1)
          return el;
      } else if (el.type === "text") {
        const w = (el.text?.length || 4) * el.fontSize * 0.55;
        if (
          pt.x >= el.x &&
          pt.x <= el.x + w &&
          pt.y >= el.y - el.fontSize &&
          pt.y <= el.y + 8
        )
          return el;
      } else if (el.type === "path") {
        for (const p of el.points) {
          if (Math.hypot(p.x - pt.x, p.y - pt.y) < 10) return el;
        }
      } else if (el.type === "arrow") {
        const d = distToSegment(pt, { x: el.x1, y: el.y1 }, { x: el.x2, y: el.y2 });
        if (d < 8) return el;
      }
    }
    return null;
  };

  // ---------- pointer handlers ----------
  const onPointerDown = (e) => {
    const pt = toCanvasPoint(e);

    if (tool === "select") {
      const hit = hitTest(pt);
      setSelectedId(hit?.id ?? null);
      if (hit) {
        const originX = hit.x ?? hit.x1 ?? hit.points?.[0]?.x ?? 0;
        const originY = hit.y ?? hit.y1 ?? hit.points?.[0]?.y ?? 0;
        dragRef.current = { id: hit.id, dx: pt.x - originX, dy: pt.y - originY, start: hit };
      }
      return;
    }

    if (tool === "eraser") {
      const hit = hitTest(pt);
      if (hit) commit(elements.filter((el) => el.id !== hit.id));
      return;
    }

    if (tool === "text") {
      const el = { id: nextId(), type: "text", x: pt.x, y: pt.y, text: "", color, fontSize: 20 };
      commit([...elements, el]);
      setEditingId(el.id);
      setEditValue("");
      setTool("select");
      return;
    }

    if (tool === "sticky") {
      const idx = elements.filter((e) => e.type === "sticky").length % STICKY_COLORS.length;
      const stickyColor = STICKY_COLORS[idx];
      const borderColor = STICKY_BORDERS[idx];
      const el = { id: nextId(), type: "sticky", x: pt.x, y: pt.y, w: 160, h: 130, text: "", color: stickyColor, borderColor };
      commit([...elements, el]);
      setEditingId(el.id);
      setEditValue("");
      setTool("select");
      return;
    }

    if (tool === "pen") {
      drawingRef.current = { id: nextId(), type: "path", points: [pt], color, width: strokeWidth };
      return;
    }

    if (tool === "rect" || tool === "ellipse") {
      drawingRef.current = { id: nextId(), type: tool, x: pt.x, y: pt.y, w: 0, h: 0, color, width: strokeWidth };
      return;
    }

    if (tool === "arrow") {
      drawingRef.current = { id: nextId(), type: "arrow", x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y, color, width: strokeWidth };
      return;
    }
  };

  const onPointerMove = (e) => {
    const pt = toCanvasPoint(e);

    if (dragRef.current) {
      const { id, dx, dy, start } = dragRef.current;
      setElements((prev) =>
        prev.map((el) => {
          if (el.id !== id) return el;
          if (el.type === "path") {
            const moveX = pt.x - dx - (start.points[0]?.x ?? 0);
            const moveY = pt.y - dy - (start.points[0]?.y ?? 0);
            return { ...el, points: start.points.map((p) => ({ x: p.x + moveX, y: p.y + moveY })) };
          }
          if (el.type === "arrow") {
            const moveX = pt.x - dx - start.x1;
            const moveY = pt.y - dy - start.y1;
            return { ...el, x1: start.x1 + moveX, y1: start.y1 + moveY, x2: start.x2 + moveX, y2: start.y2 + moveY };
          }
          return { ...el, x: pt.x - dx, y: pt.y - dy };
        })
      );
      return;
    }

    if (!drawingRef.current) return;
    const d = drawingRef.current;

    if (d.type === "path") {
      d.points.push(pt);
      setElements((prev) => redrawPreview(prev, d));
    } else if (d.type === "rect" || d.type === "ellipse") {
      d.w = pt.x - d.x;
      d.h = pt.y - d.y;
      setElements((prev) => redrawPreview(prev, d));
    } else if (d.type === "arrow") {
      d.x2 = pt.x;
      d.y2 = pt.y;
      setElements((prev) => redrawPreview(prev, d));
    }
  };

  // keep a live preview element at the end of the array while drawing
  const redrawPreview = (prev, d) => {
    const withoutPreview = prev.filter((el) => el.id !== d.id);
    return [...withoutPreview, { ...d }];
  };

  const onPointerUp = () => {
    if (dragRef.current) {
      dragRef.current = null;
      setHistory((h) => [...h, elements]);
      onChange?.(elements);
      return;
    }
    if (drawingRef.current) {
      commit(elements);
      drawingRef.current = null;
    }
  };

  // ---------- render loop ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_W * zoom;
    canvas.height = CANVAS_H * zoom;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(zoom, 0, 0, zoom, 0, 0);
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // dotted grid background
    ctx.fillStyle = "#0b1120";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#22314d";
    for (let x = GRID_GAP; x < CANVAS_W; x += GRID_GAP) {
      for (let y = GRID_GAP; y < CANVAS_H; y += GRID_GAP) {
        ctx.beginPath();
        ctx.arc(x, y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const el of elements) drawElement(ctx, el, el.id === selectedId);
  }, [elements, zoom, selectedId]);

  function drawElement(ctx, el, selected) {
    ctx.save();
    ctx.strokeStyle = el.color;
    ctx.fillStyle = el.color;
    ctx.lineWidth = el.width || 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    if (el.type === "path") {
      ctx.beginPath();
      el.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
    } else if (el.type === "rect") {
      ctx.strokeRect(el.x, el.y, el.w, el.h);
    } else if (el.type === "ellipse") {
      ctx.beginPath();
      ctx.ellipse(el.x + el.w / 2, el.y + el.h / 2, Math.abs(el.w / 2), Math.abs(el.h / 2), 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (el.type === "arrow") {
      drawArrow(ctx, el.x1, el.y1, el.x2, el.y2);
    } else if (el.type === "text") {
      ctx.font = `600 ${el.fontSize}px 'Inter', system-ui, sans-serif`;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(el.text || "", el.x, el.y);
    } else if (el.type === "sticky") {
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = "#111c2e";
      roundRect(ctx, el.x, el.y, el.w, el.h, 8);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.fillStyle = el.color;
      roundRect(ctx, el.x, el.y, el.w, el.h, 8);
      ctx.fill();
      ctx.strokeStyle = el.borderColor || "#3b82f6";
      ctx.lineWidth = 1.5;
      roundRect(ctx, el.x, el.y, el.w, el.h, 8);
      ctx.stroke();
      ctx.restore();
      ctx.fillStyle = "#E2E8F0";
      ctx.font = "500 14px 'Inter', system-ui, sans-serif";
      wrapText(ctx, el.text || "Double-click to edit", el.x + 12, el.y + 24, el.w - 24, 18);
    }

    if (selected) {
      ctx.save();
      ctx.strokeStyle = "#60a5fa";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      const b = boundsOf(el);
      ctx.strokeRect(b.x - 6, b.y - 6, b.w + 12, b.h + 12);
      ctx.restore();
    }
    ctx.restore();
  }

  const startEditing = (e) => {
    if (tool !== "select") return;
    const pt = toCanvasPoint(e);
    const hit = hitTest(pt);
    if (hit && (hit.type === "text" || hit.type === "sticky")) {
      setEditingId(hit.id);
      setEditValue(hit.text || "");
    }
  };

  const commitEdit = () => {
    if (!editingId) return;
    commit(elements.map((el) => (el.id === editingId ? { ...el, text: editValue } : el)));
    setEditingId(null);
  };

  const editingEl = elements.find((el) => el.id === editingId);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
        userSelect: "none",
        overflow: "hidden",
        borderRadius: 12,
        border: "1px solid #1e293b",
        background: "#0b1120",
      }}
    >
      {/* Vertical toolbar */}
      <div
        style={{
          zIndex: 10,
          display: "flex",
          width: 56,
          flexShrink: 0,
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          borderRight: "1px solid #1e293b",
          background: "#111c2e",
          padding: "12px 0",
        }}
      >
        {TOOLS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            title={label}
            onClick={() => setTool(id)}
            style={{
              display: "flex",
              height: 36,
              width: 36,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: tool === id ? "#3b82f6" : "transparent",
              color: tool === id ? "#F8FAFC" : "#7d8ba8",
            }}
          >
            <Icon size={18} strokeWidth={2} />
          </button>
        ))}

        <div style={{ margin: "8px 0", height: 1, width: 32, background: "#1e293b" }} />

        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            title={c}
            style={{
              height: 24,
              width: 24,
              borderRadius: "50%",
              cursor: "pointer",
              background: c,
              border: color === c ? "2px solid #60a5fa" : "1px solid rgba(255,255,255,0.15)",
            }}
          />
        ))}

        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          style={{ marginTop: 8, width: 12, height: 64, accentColor: "#3b82f6" }}
          orient="vertical"
          title="Stroke width"
        />
      </div>

      {/* Canvas area */}
      <div style={{ position: "relative", flex: 1, overflow: "auto" }} ref={containerRef}>
        <canvas
          ref={canvasRef}
          style={{ width: CANVAS_W * zoom, height: CANVAS_H * zoom, display: "block", cursor: cursorFor(tool) }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onDoubleClick={startEditing}
        />

        {editingEl && (
          <textarea
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && editingEl.type === "text") {
                e.preventDefault();
                commitEdit();
              }
              if (e.key === "Escape") commitEdit();
            }}
            style={{
              position: "absolute",
              resize: "none",
              borderRadius: 6,
              border: "2px solid #3b82f6",
              padding: "4px 8px",
              fontSize: 14,
              outline: "none",
              left: (editingEl.x - 2) * zoom,
              top: (editingEl.type === "sticky" ? editingEl.y : editingEl.y - editingEl.fontSize - 4) * zoom,
              width: (editingEl.type === "sticky" ? editingEl.w - 20 : 200) * zoom,
              height: (editingEl.type === "sticky" ? editingEl.h - 20 : 32) * zoom,
              background: "#111c2e",
              color: "#F8FAFC",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          />
        )}

        {/* Bottom-left control pill */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 999,
            padding: "6px 8px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.45)",
            background: "#111c2e",
            border: "1px solid #1e293b",
          }}
        >
          <IconBtn onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))} icon={ZoomOut} />
          <span style={{ width: 48, textAlign: "center", fontSize: 12, fontWeight: 600, color: "#F8FAFC" }}>
            {Math.round(zoom * 100)}%
          </span>
          <IconBtn onClick={() => setZoom((z) => Math.min(2, +(z + 0.1).toFixed(2)))} icon={ZoomIn} />
          <div style={{ margin: "0 4px", height: 20, width: 1, background: "#1e293b" }} />
          <IconBtn onClick={undo} icon={Undo2} disabled={history.length === 0} />
          <IconBtn onClick={redo} icon={Redo2} disabled={redoStack.length === 0} />
          <div style={{ margin: "0 4px", height: 20, width: 1, background: "#1e293b" }} />
          <IconBtn onClick={clearAll} icon={Trash2} />
          <IconBtn onClick={() => downloadPNG(canvasRef.current)} icon={Download} />
        </div>
      </div>
    </div>
  );
}

function IconBtn({ icon: Icon, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        height: 28,
        width: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
        color: "#E2E8F0",
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <Icon size={15} />
    </button>
  );
}

function cursorFor(tool) {
  if (tool === "select") return "default";
  if (tool === "eraser") return "cell";
  if (tool === "text") return "text";
  return "crosshair";
}

function drawArrow(ctx, x1, y1, x2, y2) {
  const headLen = 10;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") {
      ctx.fillText(line, x, curY);
      line = word + " ";
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, curY);
}

function boundsOf(el) {
  if (el.type === "path") {
    const xs = el.points.map((p) => p.x);
    const ys = el.points.map((p) => p.y);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
  }
  if (el.type === "arrow") {
    const x = Math.min(el.x1, el.x2);
    const y = Math.min(el.y1, el.y2);
    return { x, y, w: Math.abs(el.x2 - el.x1), h: Math.abs(el.y2 - el.y1) };
  }
  if (el.type === "text") {
    const w = (el.text?.length || 4) * el.fontSize * 0.55;
    return { x: el.x, y: el.y - el.fontSize, w, h: el.fontSize + 6 };
  }
  const x = Math.min(el.x, el.x + el.w);
  const y = Math.min(el.y, el.y + el.h);
  return { x, y, w: Math.abs(el.w), h: Math.abs(el.h) };
}

function distToSegment(p, a, b) {
  const l2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  if (l2 === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  const proj = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) };
  return Math.hypot(p.x - proj.x, p.y - proj.y);
}

function downloadPNG(canvas) {
  if (!canvas) return;
  const link = document.createElement("a");
  link.download = "syncspace-whiteboard.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}