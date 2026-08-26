import "./Dashboard.css";

const sessions = [
  {
    name: "Rahul",
    type: "Whiteboard + Code",
    avatar: "R",
  },
  {
    name: "Priya",
    type: "Coding Interview",
    avatar: "P",
  },
  {
    name: "Amit",
    type: "Architecture Review",
    avatar: "A",
  },
];

const workspaces = [
  {
    icon: "⌘",
    title: "Backend Interview",
    members: "3 members",
    time: "Active now",
    active: true,
  },
  {
    icon: "◇",
    title: "System Design",
    members: "2 members",
    time: "2h ago",
    active: false,
  },
  {
    icon: "</>",
    title: "Frontend Challenge",
    members: "4 members",
    time: "Yesterday",
    active: false,
  },
];

function Dashboard() {
  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="brand">
          <div className="brand-icon">S</div>
          <span>SYNC</span>SPACE
        </div>

        <div className="header-right">
          <button className="icon-button" aria-label="Notifications">
            🔔
            <span className="notification-dot"></span>
          </button>

          <div className="profile">
            <div className="profile-avatar">P</div>
            <div className="profile-info">
              <strong>Pooja</strong>
              <span>Developer</span>
            </div>
            <span className="arrow">⌄</span>
          </div>
        </div>
      </header>

      <div className="layout">

        {/* ================= SIDEBAR ================= */}
        <aside className="sidebar">

          <div>
            <div className="menu-title">WORKSPACE</div>

            <nav className="navigation">

              <button className="nav-link active">
                <span className="nav-icon">▦</span>
                <span>Dashboard</span>
              </button>

              <button className="nav-link">
                <span className="nav-icon">□</span>
                <span>My Rooms</span>
                <span className="nav-count">4</span>
              </button>

              <button className="nav-link">
                <span className="nav-icon">◷</span>
                <span>Recent</span>
              </button>

              <button className="nav-link">
                <span className="nav-icon">◇</span>
                <span>Templates</span>
              </button>

              <div className="menu-title second">INSIGHTS</div>

              <button className="nav-link">
                <span className="nav-icon">▥</span>
                <span>Analytics</span>
              </button>

              <button className="nav-link">
                <span className="nav-icon">⚙</span>
                <span>Settings</span>
              </button>

            </nav>
          </div>

          {/* Sidebar bottom */}
          <div className="sidebar-bottom">

            <div className="connection">
              <span className="connection-indicator"></span>

              <div>
                <strong>Connected</strong>
                <span>Real-time sync active</span>
              </div>
            </div>

            <div className="version">
              SyncSpace v1.0
            </div>

          </div>

        </aside>

        {/* ================= MAIN ================= */}
        <main className="main">

          {/* Welcome */}
          <section className="welcome">

            <div>
              <p className="welcome-label">DASHBOARD</p>

              <h1>
                Good evening, Pooja
                <span>👋</span>
              </h1>

              <p className="welcome-text">
                Ready to collaborate and build something amazing?
              </p>
            </div>

            <div className="online-status">
              <span></span>
              Online
            </div>

          </section>

          {/* ================= ACTION CARDS ================= */}
          <section className="action-grid">

            <button className="action-card create-room">

              <div className="action-content">
                <div className="action-icon blue">
                  +
                </div>

                <div>
                  <h3>Create Workspace</h3>
                  <p>Start a new collaborative session</p>
                </div>
              </div>

              <span className="action-arrow">→</span>

            </button>

            <button className="action-card join-room">

              <div className="action-content">
                <div className="action-icon purple">
                  ↗
                </div>

                <div>
                  <h3>Join Room</h3>
                  <p>Enter a room code to collaborate</p>
                </div>
              </div>

              <span className="action-arrow">→</span>

            </button>

          </section>

          {/* ================= LIVE COLLABORATION ================= */}
          <section className="content-section">

            <div className="section-header">

              <div>
                <h2>Live Collaboration</h2>
                <p>People working together right now</p>
              </div>

              <div className="live-badge">
                <span></span>
                LIVE
              </div>

            </div>

            <div className="live-card">

              <div className="live-header">
                <div className="active-title">
                  <span className="pulse"></span>
                  <strong>3 Active Sessions</strong>
                </div>

                <button className="view-button">
                  View all →
                </button>
              </div>

              <div className="session-list">

                {sessions.map((session) => (
                  <div className="session-row" key={session.name}>

                    <div className="session-user">

                      <div className="session-avatar">
                        {session.avatar}
                      </div>

                      <div>
                        <strong>{session.name}</strong>
                        <span>
                          <i></i>
                          Active now
                        </span>
                      </div>

                    </div>

                    <div className="session-type">
                      {session.type}
                    </div>

                    <button className="open-button">
                      Open →
                    </button>

                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* ================= RECENT WORKSPACES ================= */}
          <section className="content-section">

            <div className="section-header">

              <div>
                <h2>Recent Workspaces</h2>
                <p>Your recently accessed collaborative rooms</p>
              </div>

              <button className="view-button">
                View all →
              </button>

            </div>

            <div className="workspace-grid">

              {workspaces.map((workspace) => (
                <div className="workspace-card" key={workspace.title}>

                  <div className="workspace-top">

                    <div className="workspace-icon">
                      {workspace.icon}
                    </div>

                    <button className="more-button">
                      ⋮
                    </button>

                  </div>

                  <h3>{workspace.title}</h3>

                  <p className="workspace-members">
                    <span>♙</span>
                    {workspace.members}
                  </p>

                  <div className="workspace-footer">

                    <span
                      className={
                        workspace.active
                          ? "status active"
                          : "status"
                      }
                    >
                      <span></span>
                      {workspace.time}
                    </span>

                    <span className="workspace-arrow">
                      →
                    </span>

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