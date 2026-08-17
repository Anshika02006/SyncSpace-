import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import Editor from "@monaco-editor/react";

import {
  MonacoBinding,
} from "y-monaco";

import {
  createCollaboration,
} from "../collaboration/collaboration";

import OnlineUsers from "./OnlineUsers";

import RemoteCursors from "./RemoteCursors";

function CodeEditor({
  userName,
}) {
  const editorRef =
    useRef(null);

  const monacoRef =
    useRef(null);

  const bindingRef =
    useRef(null);

  const collaborationRef =
    useRef(null);

  const [awareness, setAwareness] =
    useState(null);

  const [editorReady, setEditorReady] =
    useState(false);

  const [
    connectionStatus,
    setConnectionStatus,
  ] = useState(
    "connecting"
  );

  useEffect(() => {
    const collaboration =
      createCollaboration(
        userName
      );

    collaborationRef.current =
      collaboration;

    setAwareness(
      collaboration.awareness
    );

    collaboration.provider.on(
      "status",
      ({ status }) => {
        setConnectionStatus(
          status
        );
      }
    );

    return () => {
      bindingRef.current?.destroy();

      collaboration.provider.destroy();

      collaboration.doc.destroy();
    };
  }, [userName]);

  const handleEditorMount =
    (editor, monaco) => {
      editorRef.current =
        editor;

      monacoRef.current =
        monaco;

      const collaboration =
        collaborationRef.current;

      if (!collaboration) {
        return;
      }

      const model =
        editor.getModel();

      if (!model) {
        return;
      }

      /*
       * Monaco ↔ Yjs
       *
       * This is the important
       * y-monaco integration.
       */

      bindingRef.current =
        new MonacoBinding(
          collaboration.codeText,

          model,

          new Set([
            editor,
          ]),

          collaboration.awareness
        );

      /*
       * Set local cursor
       */

      updateCursor();

      /*
       * Listen for cursor
       * movement.
       */

      editor.onDidChangeCursorPosition(
        updateCursor
      );

      editor.onDidChangeCursorSelection(
        updateCursor
      );

      setEditorReady(
        true
      );
    };

  const updateCursor =
    () => {
      const editor =
        editorRef.current;

      const collaboration =
        collaborationRef.current;

      if (
        !editor ||
        !collaboration
      ) {
        return;
      }

      const position =
        editor.getPosition();

      if (!position) {
        return;
      }

      collaboration.awareness.setLocalStateField(
        "cursor",
        {
          lineNumber:
            position.lineNumber,

          column:
            position.column,
        }
      );
    };

  return (
    <div className="code-editor-page">

      {/* Header */}

      <header className="editor-header">

        <div className="brand-area">

          <div className="brand-icon">
            S
          </div>

          <div>
            <h1>
              SyncSpace
            </h1>

            <p>
              Collaborative Code Editor
            </p>
          </div>

        </div>

        <div className="connection">

          <span
            className={`connection-dot ${connectionStatus}`}
          />

          {connectionStatus ===
          "connected"
            ? "Connected"
            : connectionStatus ===
                "connecting"
              ? "Connecting..."
              : "Disconnected"}

        </div>

      </header>

      {/* Main */}

      <main className="editor-workspace">

        <section className="editor-panel">

          <div className="file-header">

            <div className="file-name">
              <span className="js-dot" />
              main.js
            </div>

            <span className="language">
              JavaScript
            </span>

          </div>

          <div className="monaco-wrapper">

            <Editor
              height="100%"
              width="100%"
              defaultLanguage="javascript"

              defaultValue={`// SyncSpace Collaborative Editor

function welcome(name) {
  return \`Hello, \${name}!\`;
}

console.log(welcome("SyncSpace"));
`}

              theme="vs-dark"

              onMount={
                handleEditorMount
              }

              options={{
                automaticLayout:
                  true,

                minimap: {
                  enabled:
                    false,
                },

                fontSize:
                  15,

                lineHeight:
                  23,

                tabSize: 2,

                wordWrap:
                  "on",

                scrollBeyondLastLine:
                  false,

                smoothScrolling:
                  true,

                cursorBlinking:
                  "smooth",

                padding: {
                  top: 16,
                  bottom: 16,
                },
              }}
            />

          </div>

        </section>

        <OnlineUsers
          awareness={
            awareness
          }
        />

      </main>

      <footer className="footer">

        <span>
          Monaco Editor
        </span>

        <span>•</span>

        <span>
          Yjs
        </span>

        <span>•</span>

        <span>
          y-monaco
        </span>

        <span>•</span>

        <span>
          Awareness
        </span>

      </footer>

      {editorReady &&
        monacoRef.current &&
        editorRef.current &&
        awareness && (
          <RemoteCursors
            editor={
              editorRef.current
            }
            monaco={
              monacoRef.current
            }
            awareness={
              awareness
            }
          />
        )}
    </div>
  );
}

export default CodeEditor;