import {
  useEffect,
  useRef,
} from "react";

function RemoteCursors({
  editor,
  monaco,
  awareness,
}) {
  const decorationsRef =
    useRef([]);

  useEffect(() => {
    if (
      !editor ||
      !monaco ||
      !awareness
    ) {
      return;
    }

    const updateCursors =
      () => {
        const currentClientId =
          awareness.clientID;

        const decorations =
          [];

        const states =
          Array.from(
            awareness
              .getStates()
              .entries()
          );

        states.forEach(
          ([
            clientId,
            state,
          ]) => {
            if (
              clientId ===
                currentClientId
            ) {
              return;
            }

            if (
              !state?.user ||
              !state?.cursor
            ) {
              return;
            }

            const cursor =
              state.cursor;

            const name =
              state.user.name ||
              "Guest";

            const color =
              state.user.color ||
              "#7c3aed";

            decorations.push(
              {
                range:
                  new monaco.Range(
                    cursor.lineNumber,
                    cursor.column,
                    cursor.lineNumber,
                    cursor.column
                  ),

                options: {
                  className:
                    `remote-cursor-${clientId}`,

                  after: {
                    contentText:
                      name,

                    inlineClassName:
                      `remote-cursor-name-${clientId}`,
                  },

                  overviewRuler: {
                    color,

                    position:
                      monaco.editor
                        .OverviewRulerLane
                        .Right,
                  },
                },
              }
            );
          }
        );

        decorationsRef.current =
          editor.deltaDecorations(
            decorationsRef.current,
            decorations
          );

        updateCursorStyles(
          awareness
        );
      };

    updateCursors();

    awareness.on(
      "change",
      updateCursors
    );

    return () => {
      awareness.off(
        "change",
        updateCursors
      );

      editor.deltaDecorations(
        decorationsRef.current,
        []
      );
    };
  }, [
    editor,
    monaco,
    awareness,
  ]);

  return null;
}

function updateCursorStyles(
  awareness
) {
  const styleId =
    "remote-cursor-styles";

  let style =
    document.getElementById(
      styleId
    );

  if (!style) {
    style =
      document.createElement(
        "style"
      );

    style.id = styleId;

    document.head.appendChild(
      style
    );
  }

  let css = "";

  awareness
    .getStates()
    .forEach(
      (state, clientId) => {
        if (
          !state?.user
        ) {
          return;
        }

        const color =
          state.user.color ||
          "#7c3aed";

        css += `
          .remote-cursor-${clientId} {
            border-left:
              2px solid ${color};
          }

          .remote-cursor-name-${clientId} {
            background:
              ${color};
            color:
              white;
            padding:
              2px 6px;
            margin-left:
              4px;
            border-radius:
              3px;
            font-size:
              10px;
            font-weight:
              600;
            white-space:
              nowrap;
          }
        `;
      }
    );

  style.textContent =
    css;
}

export default RemoteCursors;