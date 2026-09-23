import React, {
  useEffect,
  useState,
} from "react";

function OnlineUsers({
  awareness,
}) {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    if (!awareness) {
      return;
    }

    const updateUsers = () => {
      const states =
        Array.from(
          awareness
            .getStates()
            .entries()
        );

      const onlineUsers =
        states
          .map(
            ([
              clientId,
              state,
            ]) => ({
              clientId,

              name:
                state?.user
                  ?.name ||
                "Guest",

              color:
                state?.user
                  ?.color ||
                "#7c3aed",
            })
          )
          .filter(
            (user) =>
              user.name
          );

      setUsers(
        onlineUsers
      );
    };

    updateUsers();

    awareness.on(
      "change",
      updateUsers
    );

    return () => {
      awareness.off(
        "change",
        updateUsers
      );
    };
  }, [awareness]);

  return (
    <aside className="online-users">
      <div className="online-title">
        <div>
          <h3>
            Online Users
          </h3>

          <p>
            {users.length}{" "}
            {users.length === 1
              ? "user"
              : "users"}{" "}
            online
          </p>
        </div>

        <span className="user-count">
          {users.length}
        </span>
      </div>

      <div className="users-list">
        {users.map(
          (user) => (
            <div
              className="online-user"
              key={
                user.clientId
              }
            >
              <div
                className="avatar"
                style={{
                  backgroundColor:
                    user.color,
                }}
              >
                {user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="user-details">
                <strong>
                  {user.name}
                </strong>

                <span>
                  <i
                    className="online-dot"
                    style={{
                      backgroundColor:
                        "#22c55e",
                    }}
                  />

                  Online
                </span>
              </div>
            </div>
          )
        )}

        {users.length === 0 && (
          <div className="no-users">
            No users online
          </div>
        )}
      </div>
    </aside>
  );
}

export default OnlineUsers;