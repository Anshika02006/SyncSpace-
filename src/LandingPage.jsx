import { Link } from "react-router-dom";
import "./landing.css";

function LandingPage() {
  return (
    <div className="landing">
      {/* Nav */}
      <header className="landing-nav">
        <div className="landing-logo">&& </div>
        <nav className="landing-nav-links">
          {/* <a href="#features">Features</a> */}
         
        </nav>
        <div className="landing-nav-actions">
          <Link to="/signin" className="link-btn">Log in</Link>
          {/* <Link to="/signup" className="btn btn-dark">Get started</Link> */}
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Work together,
            <br />
            without the wait.
          </h1>
          <p className="hero-sub">
            SyncSpace puts your rooms, meetings, and notes in one place —
            so your team spends less time switching tabs and more time
            actually working together.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-yellow">Create your first room</Link>
           
          </div>
        </div>

        <div className="hero-visual">
          <div className="mock-card">
            <div className="mock-topbar">
              <span className="dot" /> <span className="dot" /> <span className="dot" />
            </div>
            <div className="mock-body">
              <div className="mock-row">
                <div className="mock-icon">+</div>
                <div>
                  <div className="mock-title">Create Room</div>
                  <div className="mock-line" />
                </div>
              </div>
              <div className="mock-row">
                <div className="mock-icon dark">👥</div>
                <div>
                  <div className="mock-title">Join Meeting</div>
                  <div className="mock-line short" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2>Everything your team needs, nothing it doesn't</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-box yellow">1</div>
            <h3>Rooms</h3>
            <p>Spin up a shared space for any project in seconds and invite the right people.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box dark">2</div>
            <h3>Meetings</h3>
            <p>Jump on a call straight from a room — no separate link to dig up.</p>
          </div>
          <div className="feature-card">
            <div className="icon-box yellow">3</div>
            <h3>Real-time sync</h3>
            <p>Changes show up for everyone instantly, so nobody's working off an old version.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how" id="how">
        <div className="how-text">
          <h2>Set up once. Sync forever.</h2>
          <p>
            Create a room, share the code, and your team is in — already
            seeing the same board, the same notes, the same call.
          </p>
          {/* <Link to="/signup" className="btn btn-yellow">Start for free</Link> */}
        </div>
      </section>

      {/* CTA band */}
      

    </div>
  );
}

export default LandingPage;