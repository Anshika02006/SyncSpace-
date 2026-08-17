import React, {
  useState,
} from "react";

import CodeEditor from "./components/CodeEditor";

function App() {
  const [userName, setUserName] =
    useState("Sayali");

  const [editingName, setEditingName] =
    useState(false);

  const [nameInput, setNameInput] =
    useState("Sayali");

  const saveName = () => {
    const name =
      nameInput.trim() ||
      "Guest";

    setUserName(name);

    localStorage.setItem(
      "syncspace-name",
      name
    );

    setEditingName(false);

    window.location.reload();
  };

  return (
    <div className="app">

      <CodeEditor
        userName={
          userName
        }
      />

      {editingName && (
        <div className="name-modal">

          <div className="name-box">

            <h2>
              Change your name
            </h2>

            <input
              value={
                nameInput
              }
              onChange={(event) =>
                setNameInput(
                  event.target
                    .value
                )
              }
              onKeyDown={(event) => {
                if (
                  event.key ===
                  "Enter"
                ) {
                  saveName();
                }
              }}
              autoFocus
            />

            <div className="name-buttons">

              <button
                className="cancel"
                onClick={() =>
                  setEditingName(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                className="save"
                onClick={
                  saveName
                }
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default App;