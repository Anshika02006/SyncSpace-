import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export const ROOM_NAME =
  "syncspace-code-editor-room";

export const WS_URL =
  "ws://localhost:1234";

const COLORS = [
  "#7c3aed",
  "#2563eb",
  "#059669",
  "#db2777",
  "#ea580c",
  "#0891b2",
  "#65a30d",
  "#9333ea",
];

export function createCollaboration(
  userName
) {
  const doc = new Y.Doc();

  const provider =
    new WebsocketProvider(
      WS_URL,
      ROOM_NAME,
      doc
    );

  const awareness =
    provider.awareness;

  const color =
    COLORS[
      Math.abs(doc.clientID) %
        COLORS.length
    ];

  awareness.setLocalStateField(
    "user",
    {
      name:
        userName || "Guest",

      color,
    }
  );

  const codeText =
    doc.getText("code");

  return {
    doc,
    provider,
    awareness,
    codeText,
  };
}