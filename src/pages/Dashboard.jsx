import "./Dashboard.css";

const activeSessions = [
  {
    icon: "▣",
    iconClass: "purple",
    title: "Project Discussion",
    creator: "Created by You",
    members: "3 members",
    avatars: ["P", "A", "R"],
    type: "Whiteboard",
  },
  {
    icon: "</>",
    iconClass: "blue",
    title: "Code Review",
    creator: "Created by Anshika",
    members: "2 members",
    avatars: ["A", "P"],
    type: "Code Editor",
  },
  {
    icon: "▧",
    iconClass: "cyan",
    title: "UI Design Board",
    creator: "Created by Dev",
    members: "4 members",
    avatars: ["D", "P", "R", "A"],
    type: "Whiteboard",
  },
];

const recentRooms = [
  {
    icon: "▣",
    name: "Project Discussion",
    type: "Whiteboard",
    lastActive: "2 hours ago",
    members: ["P", "A", "R"],
  },
  {
    icon: "</>",
    name: "Code Review",
    type: "Code Editor",
    lastActive: "4 hours ago",
    members: ["A", "P"],
  },
  {
    icon: "▧",
    name: "UI Design Board",
    type: "Whiteboard",
    lastActive: "1 day ago",
    members: ["P", "R", "A"],
  },
  {
    icon: "▣",
    name: "Team Planning",
    type: "Code Editor",
    lastActive: "2 days ago",
    members: ["R", "P"],
  },
];

function AvatarGroup({ avatars }) {
  return (
    <div className="avatar-group">
      {avatars.map((avatar, index) => (
        <span
          className={`mini-avatar avatar-${index % 4}`}
          key={`${avatar}-${index}`}
        >
          {avatar}
        </span>
      ))}

      {avatars.length > 2 && (
        <span className="avatar-more">+{avatars.length}</span>
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <div className="dashboard">
      {/* ================= HEADER ================= */}

      <header className="top-header">
        <div className="logo">
          <div className="logo-mark">◇</div>

          <span>
            SYNC<span>SPACE</span>
          </span>
        </div>

        <div className="search-box">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search rooms, members..."
          />
        </div>

        <div className="header-right">
          <button className="header-icon" type="button">
            ♧
            <span className="notification"></span>
          </button>

          <div className="user-profile">
            <div className="profile-avatar">P</div>

            <div className="profile-name">
              <strong>Pooja</strong>
              <span>⌄</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN LAYOUT ================= */}

      <div className="dashboard-layout">

        {/* ================= SIDEBAR ================= */}

        <aside className="sidebar">
          <nav className="sidebar-nav">
            <button className="sidebar-link active" type="button">
              <span className="sidebar-icon">⌂</span>
              <span>Dashboard</span>
            </button>

            <button className="sidebar-link" type="button">
              <span className="sidebar-icon">▦</span>
              <span>My Rooms</span>
            </button>

            <button className="sidebar-link" type="button">
              <span className="sidebar-icon">◷</span>
              <span>Recent</span>
            </button>

            <button className="sidebar-link" type="button">
              <span className="sidebar-icon">▤</span>
              <span>Templates</span>
            </button>

            <button className="sidebar-link" type="button">
              <span className="sidebar-icon">⌁</span>
              <span>Analytics</span>
            </button>

            <button className="sidebar-link" type="button">
              <span className="sidebar-icon">⚙</span>
              <span>Settings</span>
            </button>
          </nav>

          <div className="sidebar-bottom">
            <div className="collaborate-icon">♣</div>

            <strong>Collaborate • Build • Create</strong>

            <p>
              Real-time whiteboard &amp; code editor
              for modern teams.
            </p>
          </div>
        </aside>

        {/* ================= CONTENT ================= */}

        <main className="content">

          {/* ================= TOP GRID ================= */}

          <section className="top-grid">

            {/* WELCOME */}

            <div className="welcome-card">
              <div className="welcome-content">
                <span className="welcome-small">
                  Welcome back,
                </span>

                <h1>
                  Pooja <span>👋</span>
                </h1>

                <p>
                  Collaborate in real-time, turn your ideas into reality.
                </p>

                <div className="welcome-actions">
                  <button className="primary-button" type="button">
                    <span>+</span>
                    Create Workspace
                  </button>

                  <button className="secondary-button" type="button">
                    <span>↗</span>
                    Join Room
                  </button>
                </div>
              </div>

              <div className="welcome-graphic">
                <div className="graphic-window">
                  <div className="graphic-top">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="graphic-lines">
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>

                  <div className="graphic-box"></div>
                </div>

                <div className="graphic-circle circle-one"></div>
                <div className="graphic-circle circle-two"></div>
              </div>
            </div>

            {/* STATS */}

            <div className="stats-grid">

              <div className="stat-card">
                <div className="stat-icon blue-icon">
                  ■
                </div>

                <div className="stat-info">
                  <span>Total Rooms</span>
                  <strong>8</strong>
                </div>

                <b>→</b>
              </div>

              <div className="stat-card">
                <div className="stat-icon green-icon">
                  +
                </div>

                <div className="stat-info">
                  <span>Active Sessions</span>
                  <strong>3</strong>
                </div>

                <b>→</b>
              </div>

              <div className="stat-card">
                <div className="stat-icon purple-icon">
                  ●
                </div>

                <div className="stat-info">
                  <span>Members</span>
                  <strong>5</strong>
                </div>

                <b>→</b>
              </div>

              <div className="stat-card">
                <div className="stat-icon yellow-icon">
                  ▦
                </div>

                <div className="stat-info">
                  <span>Templates</span>
                  <strong>4</strong>
                </div>

                <b>→</b>
              </div>

            </div>
          </section>

          {/* ================= MIDDLE GRID ================= */}

          <section className="middle-grid">

            {/* ACTIVE SESSIONS */}

            <div className="panel sessions-panel">
              <div className="panel-header">
                <div>
                  <h2>Active Sessions</h2>
                  <p>Rooms currently in use</p>
                </div>

                <button className="view-all" type="button">
                  View All →
                </button>
              </div>

              <div className="session-list">
                {activeSessions.map((session) => (
                  <div
                    className="session-item"
                    key={session.title}
                  >
                    <div
                      className={`session-icon ${session.iconClass}`}
                    >
                      {session.icon}
                    </div>

                    <div className="session-info">
                      <strong>{session.title}</strong>

                      <span>
                        {session.creator} • {session.members}
                      </span>

                      <AvatarGroup avatars={session.avatars} />
                    </div>

                    <div className="session-type">
                      <span className="live-label">
                        <i></i>
                        Live
                      </span>

                      <small>{session.type}</small>
                    </div>

                    <button className="join-button" type="button">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}

            <div className="panel quick-panel">
              <div className="panel-header">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Get started with your workspace</p>
                </div>
              </div>

              <div className="quick-grid">

                <button className="quick-card" type="button">
                  <div className="quick-icon blue-icon">
                    +
                  </div>

                  <strong>Create Workspace</strong>

                  <span>
                    Start a new whiteboard or code room
                  </span>
                </button>

                <button className="quick-card" type="button">
                  <div className="quick-icon purple-icon">
                    ↗
                  </div>

                  <strong>Join Room</strong>

                  <span>
                    Enter a room with a share link or room ID
                  </span>
                </button>

                <button className="quick-card" type="button">
                  <div className="quick-icon cyan-icon">
                    ▤
                  </div>

                  <strong>Browse Templates</strong>

                  <span>
                    Use pre-built templates for quick start
                  </span>
                </button>

                <button className="quick-card" type="button">
                  <div className="quick-icon yellow-icon">
                    +
                  </div>

                  <strong>Invite Members</strong>

                  <span>
                    Collaborate with your team and friends
                  </span>
                </button>

              </div>
            </div>
          </section>

          {/* ================= RECENT ROOMS ================= */}

          <section className="panel recent-panel">

            <div className="panel-header">
              <div>
                <h2>Recent Rooms</h2>
                <p>Quick access to your latest rooms</p>
              </div>

              <button className="view-all" type="button">
                View All →
              </button>
            </div>

            <div className="room-table">

              <div className="table-head">
                <span>Room Name</span>
                <span>Type</span>
                <span>Last Active</span>
                <span>Members</span>
                <span>Actions</span>
              </div>

              {recentRooms.map((room) => (
                <div
                  className="table-row"
                  key={room.name}
                >
                  <div className="room-name">
                    <div className="room-icon">
                      {room.icon}
                    </div>

                    <span>{room.name}</span>
                  </div>

                  <div>
                    <span
                      className={`room-type ${
                        room.type === "Code Editor"
                          ? "code-type"
                          : "whiteboard-type"
                      }`}
                    >
                      {room.type}
                    </span>
                  </div>

                  <span className="last-active">
                    {room.lastActive}
                  </span>

                  <AvatarGroup avatars={room.members} />

                  <div className="row-actions">
                    <button className="small-join" type="button">
                      Join
                    </button>

                    <button className="dots" type="button">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;