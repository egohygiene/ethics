import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FlaskConical,
  Code2,
  Layers3,
  Moon,
  Menu,
  Network,
  Orbit,
  Scale,
  Sun,
  UserRound,
} from "lucide-react";
import Overview from "./components/Overview.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Workflow from "./components/Workflow.jsx";
import Methodology from "./components/Methodology.jsx";
import Perspectives from "./components/Perspectives.jsx";
import Research from "./components/Research.jsx";
import Resources from "./components/Resources.jsx";
import AuthorPerspective from "./components/AuthorPerspective.jsx";
const navigation = [
  { id: "overview", label: "Overview", icon: Compass },
  { id: "dashboard", label: "Data Dashboard", icon: Layers3 },
  { id: "perspectives", label: "Perspectives", icon: Scale },
  { id: "research", label: "Research & Solutions", icon: FlaskConical },
  { id: "resources", label: "Resources", icon: Network },
  { id: "methodology", label: "Methodology", icon: BookOpen },
  { id: "author", label: "Author's Perspective", icon: UserRound },
];
const mobileDock = [
  { id: "overview", label: "Discover", icon: Compass },
  { id: "dashboard", label: "Evidence", icon: Layers3 },
  { id: "perspectives", label: "Questions", icon: Scale },
  { id: "research", label: "Research", icon: FlaskConical },
];
const mobileMore = [
  { id: "workflow", label: "Workflow experiment" },
  { id: "resources", label: "Resources & organizations" },
  { id: "methodology", label: "Methodology & sources" },
  { id: "author", label: "Author\x27s perspective" },
];
function initialTheme() {
  try {
    const saved = localStorage.getItem("ethics-theme");
    if (["light", "dark"].includes(saved)) return saved;
  } catch {
    /* Storage is optional. */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
export default function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [active, setActive] = useState("overview");
  const [moreOpen, setMoreOpen] = useState(false);
  const [dimension, setDimension] = useState("all");
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("ethics-theme", theme);
    } catch {
      /* Optional local preference. */
    }
  }, [theme]);
  useEffect(() => {
    const controller = new AbortController();
    setError(false);
    fetch("/data/v1/observatory.json", {
      signal: controller.signal,
      credentials: "omit",
    })
      .then((r) => {
        if (!r.ok) throw Error("Evidence unavailable");
        return r.json();
      })
      .then((snapshot) => {
        if (
          snapshot.schemaVersion !== "1.0.0" ||
          !snapshot.observations?.length
        )
          throw Error("Unsupported evidence snapshot");
        setData(snapshot);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [attempt]);
  useEffect(() => {
    if (!data) return;
    try {
      const target = document.getElementById(
        decodeURIComponent(window.location.hash.slice(1)),
      );
      if (target)
        requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "instant" }),
        );
    } catch {
      /* An invalid fragment cannot block the app. */
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-8% 0px -65% 0px", threshold: 0 },
    );
    for (const id of [...navigation.map((item) => item.id), "workflow"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [data]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside className="sidebar">
        <a
          href="#overview"
          className="brand"
          aria-label="Ethics by Ego Hygiene, overview"
        >
          <span className="brand-mark">
            <Orbit size={32} strokeWidth={1.25} />
          </span>
          <span>
            ethics<span className="brand-by">by Ego Hygiene</span>
          </span>
        </a>
        <p className="nav-label">THE OBSERVATORY</p>
        <nav aria-label="Main navigation">
          {navigation.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setActive(id)}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
        <div className="sidebar-mantra">
          <span className="small-dot mint" />
          <p>
            A little less certainty.
            <br />A little more understanding.
          </p>
        </div>
        <div className="sidebar-bottom">
          <a href="https://github.com/egohygiene/ethics">
            <Code2 size={14} />
            Open source <ArrowUpRight size={13} />
          </a>
          <p>
            Independent by design.
            <br />
            Open to better evidence.
          </p>
          <span className="sidebar-version">EGO HYGIENE · v0.1</span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span>
            The observatory <span className="breadcrumb-separator">/</span>{" "}
            <span className="breadcrumb-current">
              {navigation.find((n) => n.id === active)?.label ?? "Workflow experiment"}
            </span>
          </span>
          <div>
            <a href="#methodology" className="release-label">
              <span className="small-dot mint" />
              Open evidence · First edition
            </a>
            <button
              className="icon-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {error ? (
            <div className="load-state" role="alert">
              <h1>Evidence could not be loaded.</h1>
              <p>
                The versioned snapshot is unavailable. You can retry or inspect
                the public repository.
              </p>
              <button
                className="primary-button"
                onClick={() => setAttempt(attempt + 1)}
              >
                Retry loading
              </button>
              <a href="https://github.com/egohygiene/ethics/tree/main/data/reviewed">
                Inspect source records ↗
              </a>
            </div>
          ) : !data ? (
            <div className="load-state" role="status">
              <Orbit size={28} />
              <p>Loading versioned evidence…</p>
            </div>
          ) : (
            <>
              <Overview data={data} onDimension={setDimension} />
              <Dashboard
                data={data}
                dimension={dimension}
                setDimension={setDimension}
              />
              <Workflow />
              <Perspectives data={data} />
              <Research data={data} />
              <Resources data={data} />
              <Methodology data={data} />
              <AuthorPerspective />
            </>
          )}
        </main>
        <footer>
          <a href="https://github.com/egohygiene" className="footer-brand">
            <Orbit size={16} /> Ego Hygiene
          </a>
          <span>
            Made with love. <span aria-label="love">❤️</span>
          </span>
          <div className="footer-links">
            <a href="https://civics.egohygiene.io">
              Civics <ArrowUpRight size={11} />
            </a>
            <a href="https://akashic.egohygiene.io">
              Akashic <ArrowUpRight size={11} />
            </a>
            <a href="https://github.com/egohygiene/ethics">
              Source <ArrowUpRight size={11} />
            </a>
          </div>
          <span className="footer-privacy">
            No ads. No trackers. Room to think.
          </span>
        </footer>
      </div>
      <nav className="mobile-dock" aria-label="Mobile quick navigation">
        <div className="mobile-more-panel" id="mobile-more-panel" hidden={!moreOpen}>
          <span className="mobile-more-heading">Keep exploring</span>
          {mobileMore.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => { setActive(id); setMoreOpen(false); }}
            >
              {label} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mobile-dock-items">
          {mobileDock.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => { setActive(id); setMoreOpen(false); }}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
          <button
            type="button"
            className={moreOpen || mobileMore.some(({ id }) => id === active) ? "active" : ""}
            aria-expanded={moreOpen}
            aria-controls="mobile-more-panel"
            aria-label="More sections"
            onClick={() => setMoreOpen((open) => !open)}
            onKeyDown={(event) => { if (event.key === "Escape") setMoreOpen(false); }}
          >
            <Menu size={19} aria-hidden="true" />
            <span>More</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
