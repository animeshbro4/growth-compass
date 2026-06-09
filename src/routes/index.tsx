import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Map,
  StickyNote,
  Hammer,
  ClipboardCheck,
  Settings,
  CheckCircle2,
  Circle,
  Lock,
  PlayCircle,
  Flame,
  Target,
  TrendingUp,
  Clock,
  Video,
  FileText,
  Pen,
  Eraser,
  Square as SquareIcon,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Code,
  List,
  X,
  ChevronRight,
  Github,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GrowthOS — Dashboard" },
      { name: "description", content: "Direction-first learning dashboard for developers." },
    ],
  }),
  component: GrowthOSApp,
});

type NavKey = "dashboard" | "roadmap" | "notes" | "projects" | "assessments" | "settings";

/* ─────────────────── ROOT APP ─────────────────── */
function GrowthOSApp() {
  const [active, setActive] = useState<NavKey>("dashboard");
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      <Sidebar active={active} onChange={setActive} />

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {active === "dashboard" && (
          <Dashboard onStartQuiz={() => setQuizOpen(true)} />
        )}
        {active === "roadmap" && (
          <Roadmap onOpenTopic={(t) => setOpenTopic(t)} />
        )}
        {active === "notes" && <NotesView />}
        {active === "projects" && <ProjectsView />}
        {active === "assessments" && (
          <AssessmentsView onStartQuiz={() => setQuizOpen(true)} />
        )}
        {active === "settings" && <SettingsView />}
      </main>

      <TopicDrawer
        topic={openTopic}
        onClose={() => setOpenTopic(null)}
        onStartQuiz={() => setQuizOpen(true)}
      />
      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}

/* ─────────────────── SIDEBAR ─────────────────── */
function Sidebar({
  active,
  onChange,
}: {
  active: NavKey;
  onChange: (k: NavKey) => void;
}) {
  const items: { key: NavKey; label: string; icon: any }[] = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "roadmap", label: "Learning Roadmap", icon: Map },
    { key: "notes", label: "Smart Notes", icon: StickyNote },
    { key: "projects", label: "Project Builder", icon: Hammer },
    { key: "assessments", label: "Assessments", icon: ClipboardCheck },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-[var(--surface)] sticky top-0 h-screen">
      <div className="px-5 py-5 flex items-center gap-2 border-b border-border">
        <div className="w-8 h-8 rounded-md bg-foreground text-background grid place-items-center">
          <Terminal className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">GrowthOS</div>
          <div className="text-[11px] text-muted-foreground font-mono">v0.1 · personal</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-[var(--surface-2)] text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-[var(--surface-2)] border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="m-3 p-3 rounded-md border border-border bg-[var(--surface-2)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 grid place-items-center text-sm font-semibold">
            A
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">Animesh</div>
            <div className="text-[11px] text-muted-foreground font-mono truncate">
              Backend Developer
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-muted-foreground font-mono mb-1.5">
            <span>Today's goal</span>
            <span>1.5 / 2 hrs</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
            <div className="h-full bg-[var(--in-progress)]" style={{ width: "75%" }} />
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────── DASHBOARD ─────────────────── */
function Dashboard({ onStartQuiz }: { onStartQuiz: () => void }) {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    video: true,
    notes: false,
    quiz: false,
    commit: false,
  });
  const toggle = (k: string) => setChecks((c) => ({ ...c, [k]: !c[k] }));

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 5) return "Still up,";
    if (h < 12) return "Good morning,";
    if (h < 17) return "Good afternoon,";
    return "Good evening,";
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 space-y-8">
      <header>
        <div className="text-xs font-mono text-muted-foreground mb-2">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {greeting} Animesh. <span className="text-muted-foreground">Ready to write some code?</span>
        </h1>
      </header>

      {/* Active Mission */}
      <section className="rounded-lg border border-border bg-card p-5 md:p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-wider font-mono text-[var(--in-progress)] mb-1.5">
              Active Mission · Today
            </div>
            <h2 className="text-lg md:text-xl font-semibold">HTTP & REST Basics</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Estimated 1h 20m · Continue from "Methods & Status Codes"
            </p>
          </div>
          <button
            onClick={onStartQuiz}
            className="text-xs font-medium px-3 py-2 rounded-md border border-border bg-[var(--surface-2)] hover:bg-[var(--muted)] transition-colors"
          >
            Resume session →
          </button>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 gap-2">
          {[
            { id: "video", label: "Watch video lesson" },
            { id: "notes", label: "Take notes in workbench" },
            { id: "quiz", label: "Complete 10-min quiz" },
            { id: "commit", label: "Push 1 commit to repo" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md border border-border bg-[var(--surface)] hover:bg-[var(--surface-2)] text-left transition-colors"
            >
              <span
                className={`w-4 h-4 rounded-[4px] border grid place-items-center shrink-0 ${
                  checks[t.id]
                    ? "bg-[var(--completed)] border-[var(--completed)]"
                    : "border-border"
                }`}
              >
                {checks[t.id] && <CheckCircle2 className="w-3 h-3 text-background" strokeWidth={3} />}
              </span>
              <span
                className={`text-sm ${
                  checks[t.id] ? "text-muted-foreground line-through" : "text-foreground"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid sm:grid-cols-3 gap-3">
        <StatCard
          icon={Target}
          label="Topics done"
          value="14 / 82"
          progress={14 / 82}
          accent="var(--in-progress)"
        />
        <StatCard
          icon={Flame}
          label="Current streak"
          value="12 days"
          sub="Longest: 21 days"
          accent="var(--available)"
        />
        <StatCard
          icon={TrendingUp}
          label="Interview readiness"
          value="45%"
          progress={0.45}
          accent="var(--completed)"
        />
      </section>

      {/* Heatmap */}
      <section className="rounded-lg border border-border bg-card p-5 md:p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold">Consistency · last 24 weeks</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              184 active days · longest streak 21
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded-sm heat-0" />
            <span className="w-2.5 h-2.5 rounded-sm heat-1" />
            <span className="w-2.5 h-2.5 rounded-sm heat-2" />
            <span className="w-2.5 h-2.5 rounded-sm heat-3" />
            <span className="w-2.5 h-2.5 rounded-sm heat-4" />
            <span>More</span>
          </div>
        </div>
        <Heatmap />
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  progress,
  accent,
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
  progress?: number;
  accent: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground text-xs">
        <Icon className="w-3.5 h-3.5" strokeWidth={2} />
        <span className="font-mono uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1 font-mono">{sub}</div>}
      {progress !== undefined && (
        <div className="mt-3 h-1 rounded-full bg-[var(--muted)] overflow-hidden">
          <div
            className="h-full transition-all"
            style={{ width: `${progress * 100}%`, backgroundColor: accent }}
          />
        </div>
      )}
    </div>
  );
}

function Heatmap() {
  // 24 weeks × 7 days
  const cells = useMemo(() => {
    const arr: number[] = [];
    let seed = 7;
    for (let i = 0; i < 24 * 7; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      const r = seed / 233280;
      // weight to have some empty days
      const v = r < 0.25 ? 0 : r < 0.5 ? 1 : r < 0.75 ? 2 : r < 0.92 ? 3 : 4;
      arr.push(v);
    }
    return arr;
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="inline-grid grid-flow-col grid-rows-7 gap-1">
        {cells.map((v, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-[3px] heat-${v}`}
            title={`Level ${v}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── ROADMAP ─────────────────── */
type TopicStatus = "completed" | "in_progress" | "available" | "locked";
type Topic = {
  id: string;
  title: string;
  status: TopicStatus;
  meta?: string;
};

const TOPICS: Topic[] = [
  { id: "internet", title: "Internet Basics", status: "completed", meta: "DNS · TCP/IP · Browsers" },
  { id: "http", title: "HTTP Protocol", status: "in_progress", meta: "Methods · Status codes · Headers" },
  { id: "rest", title: "RESTful APIs", status: "available", meta: "Resources · Verbs · Statelessness" },
  { id: "db", title: "Relational Databases", status: "locked", meta: "Prerequisite: RESTful APIs" },
  { id: "auth", title: "Auth & Sessions", status: "locked", meta: "Prerequisite: Relational Databases" },
  { id: "caching", title: "Caching Strategies", status: "locked", meta: "Prerequisite: Relational Databases" },
];

function Roadmap({ onOpenTopic }: { onOpenTopic: (id: string) => void }) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2">THE COMPASS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Backend Developer Path</h1>
        <p className="text-sm text-muted-foreground mt-1">
          14 of 82 topics completed · ~6 months to interview-ready
        </p>
      </header>

      <ol className="relative">
        {TOPICS.map((t, i) => (
          <li key={t.id} className="relative pl-12 pb-4">
            {/* connector */}
            {i < TOPICS.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[15px] top-9 bottom-0 w-[2px] bg-border"
              />
            )}
            <StatusNode status={t.status} />

            <button
              onClick={() => t.status !== "locked" && onOpenTopic(t.id)}
              disabled={t.status === "locked"}
              className={`w-full text-left rounded-lg border border-border bg-card p-4 transition-colors ${
                t.status === "locked"
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-[var(--surface-2)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-1 font-mono">{t.meta}</div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StatusNode({ status }: { status: TopicStatus }) {
  const map: Record<TopicStatus, { color: string; Icon: any }> = {
    completed: { color: "var(--completed)", Icon: CheckCircle2 },
    in_progress: { color: "var(--in-progress)", Icon: PlayCircle },
    available: { color: "var(--available)", Icon: Circle },
    locked: { color: "var(--locked)", Icon: Lock },
  };
  const { color, Icon } = map[status];
  return (
    <span
      className="absolute left-0 top-3 w-8 h-8 rounded-full grid place-items-center border-2 bg-background z-10"
      style={{ borderColor: color, color }}
    >
      <Icon className="w-4 h-4" strokeWidth={2} />
    </span>
  );
}

function StatusBadge({ status }: { status: TopicStatus }) {
  const map: Record<TopicStatus, { label: string; color: string }> = {
    completed: { label: "Completed", color: "var(--completed)" },
    in_progress: { label: "Study now", color: "var(--in-progress)" },
    available: { label: "Available", color: "var(--available)" },
    locked: { label: "Locked", color: "var(--locked)" },
  };
  const { label, color } = map[status];
  return (
    <span
      className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md border whitespace-nowrap"
      style={{ color, borderColor: color, backgroundColor: `${color}14` }}
    >
      {label}
    </span>
  );
}

/* ─────────────────── TOPIC DRAWER (WORKBENCH) ─────────────────── */
function TopicDrawer({
  topic,
  onClose,
  onStartQuiz,
}: {
  topic: string | null;
  onClose: () => void;
  onStartQuiz: () => void;
}) {
  const [tab, setTab] = useState<"notes" | "canvas">("notes");
  const open = !!topic;

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-screen w-full md:w-[min(1100px,95vw)] bg-background border-l border-border z-50 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--in-progress)] border border-[var(--in-progress)] px-2 py-0.5 rounded-md">
              In progress
            </span>
            <h2 className="font-semibold text-lg">HTTP Protocol</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md border border-border hover:bg-[var(--surface-2)]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="grid md:grid-cols-[380px_1fr] h-[calc(100vh-65px)]">
          {/* Resources */}
          <div className="border-r border-border overflow-y-auto p-5 space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Resources
              </h3>
              <div className="space-y-2">
                {[
                  { title: "HTTP Crash Course — MDN", dur: "24 min", type: "Video" },
                  { title: "REST vs HTTP — high-level", dur: "11 min", type: "Article" },
                ].map((r) => (
                  <a
                    key={r.title}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-start gap-3 p-3 rounded-md border border-border bg-card hover:bg-[var(--surface-2)] transition-colors"
                  >
                    <div className="mt-0.5 w-8 h-8 rounded-md bg-[var(--surface-2)] border border-border grid place-items-center shrink-0">
                      {r.type === "Video" ? (
                        <Video className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <FileText className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{r.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {r.type}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-muted-foreground flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {r.dur}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Player
              </h3>
              <div className="aspect-video rounded-md border border-border bg-[var(--surface-2)] grid place-items-center">
                <div className="text-center">
                  <PlayCircle className="w-10 h-10 mx-auto text-muted-foreground" strokeWidth={1.5} />
                  <div className="text-xs text-muted-foreground font-mono mt-2">
                    Click to play · 24:01
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onStartQuiz}
              className="w-full px-3 py-2.5 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Take 10-min quiz →
            </button>
          </div>

          {/* Workbench */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center gap-1 px-4 pt-3 border-b border-border">
              <TabBtn active={tab === "notes"} onClick={() => setTab("notes")}>
                Notes
              </TabBtn>
              <TabBtn active={tab === "canvas"} onClick={() => setTab("canvas")}>
                Draw Canvas
              </TabBtn>
            </div>

            {tab === "notes" ? <NotesEditor /> : <CanvasPad />}
          </div>
        </div>
      </aside>
    </>
  );
}

function TabBtn({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${
        active
          ? "border-foreground text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function NotesEditor() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-[var(--surface)]">
        {[Heading1, Heading2, Bold, Italic, Code, List].map((Icon, i) => (
          <button
            key={i}
            className="p-1.5 rounded hover:bg-[var(--surface-2)] text-muted-foreground hover:text-foreground"
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
        <div className="ml-auto text-[10px] font-mono text-muted-foreground">
          Auto-saved · 2s ago
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <article className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">HTTP Protocol — my notes</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            HTTP is a stateless, application-layer protocol for distributed, collaborative,
            hypermedia information systems. Each request is independent.
          </p>
          <h2 className="text-base font-semibold mt-6">Core methods</h2>
          <ul className="text-sm space-y-1.5 text-foreground/90 list-disc list-inside marker:text-muted-foreground">
            <li>
              <span className="font-mono text-[var(--in-progress)]">GET</span> — read a resource
            </li>
            <li>
              <span className="font-mono text-[var(--completed)]">POST</span> — create a resource
            </li>
            <li>
              <span className="font-mono text-[var(--available)]">PUT</span> — replace a resource
            </li>
            <li>
              <span className="font-mono text-destructive">DELETE</span> — remove a resource
            </li>
          </ul>
          <pre className="font-mono text-xs bg-[var(--surface-2)] border border-border rounded-md p-4 overflow-x-auto">
{`GET /api/users/42 HTTP/1.1
Host: growthos.dev
Accept: application/json`}
          </pre>
        </article>
      </div>
    </div>
  );
}

function CanvasPad() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-[var(--surface)]">
        {[
          { Icon: Pen, label: "Pen" },
          { Icon: Eraser, label: "Eraser" },
          { Icon: SquareIcon, label: "Rectangle" },
        ].map(({ Icon, label }, i) => (
          <button
            key={i}
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs ${
              i === 0
                ? "bg-[var(--surface-2)] text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-[var(--surface-2)]"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>
      <div
        className="flex-1 relative"
        style={{
          backgroundImage:
            "radial-gradient(circle, #27272a 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-xs text-muted-foreground font-mono">
            Sketch ideas, diagrams, request flows...
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── QUIZ DRAWER ─────────────────── */
const QUIZ = {
  q: 4,
  total: 10,
  question: "Which HTTP status code represents a client unauthorized error?",
  options: [
    { id: "a", label: "200 OK" },
    { id: "b", label: "401 Unauthorized" },
    { id: "c", label: "403 Forbidden" },
    { id: "d", label: "500 Internal Server Error" },
  ],
  correct: "b",
};

function QuizDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 transition-opacity z-40 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-screen w-full md:w-[600px] bg-background border-l border-border z-50 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Assessment · HTTP Protocol
            </div>
            <div className="text-sm font-semibold mt-0.5">
              Question {QUIZ.q} of {QUIZ.total}
            </div>
          </div>
          <button
            onClick={() => {
              setPicked(null);
              onClose();
            }}
            className="p-1.5 rounded-md border border-border hover:bg-[var(--surface-2)]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* progress */}
        <div className="h-1 bg-[var(--muted)]">
          <div
            className="h-full bg-[var(--in-progress)] transition-all"
            style={{ width: `${(QUIZ.q / QUIZ.total) * 100}%` }}
          />
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-lg font-medium leading-relaxed">{QUIZ.question}</h2>

          <div className="space-y-2">
            {QUIZ.options.map((o) => {
              const isPicked = picked === o.id;
              const isCorrect = o.id === QUIZ.correct;
              const showResult = picked !== null;
              const state = !showResult
                ? "idle"
                : isPicked && isCorrect
                  ? "correct"
                  : isPicked && !isCorrect
                    ? "wrong"
                    : isCorrect
                      ? "reveal"
                      : "idle";

              const borderColor =
                state === "correct" || state === "reveal"
                  ? "var(--completed)"
                  : state === "wrong"
                    ? "var(--destructive)"
                    : "var(--border)";

              return (
                <button
                  key={o.id}
                  onClick={() => !showResult && setPicked(o.id)}
                  disabled={showResult}
                  className="w-full flex items-center gap-3 p-4 rounded-md border bg-card text-left transition-colors disabled:cursor-default hover:bg-[var(--surface-2)] disabled:hover:bg-card"
                  style={{ borderColor }}
                >
                  <span
                    className="w-5 h-5 rounded-full border-2 grid place-items-center shrink-0"
                    style={{ borderColor }}
                  >
                    {isPicked && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            state === "correct"
                              ? "var(--completed)"
                              : "var(--destructive)",
                        }}
                      />
                    )}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground w-5">
                    {o.id.toUpperCase()}.
                  </span>
                  <span className="text-sm flex-1">{o.label}</span>
                </button>
              );
            })}
          </div>

          {picked !== null && (
            <div
              className="rounded-md border p-4 text-sm"
              style={{
                borderColor:
                  picked === QUIZ.correct ? "var(--completed)" : "var(--destructive)",
                backgroundColor:
                  picked === QUIZ.correct ? "#10b98114" : "#ef444414",
              }}
            >
              <div className="font-medium mb-1">
                {picked === QUIZ.correct ? "Correct." : "Not quite."}
              </div>
              <div className="text-muted-foreground">
                <span className="font-mono">401 Unauthorized</span> means the request lacks valid
                authentication credentials. <span className="font-mono">403 Forbidden</span> is
                used when the server understands the request but refuses to authorize it.
              </div>
            </div>
          )}

          <div className="flex justify-between pt-2">
            <button className="text-sm text-muted-foreground hover:text-foreground">
              ← Previous
            </button>
            <button
              disabled={picked === null}
              onClick={() => setPicked(null)}
              className="px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next question <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────── PLACEHOLDER VIEWS ─────────────────── */
function NotesView() {
  const notes = [
    { topic: "HTTP Protocol", date: "Today", excerpt: "Stateless app-layer protocol. Core methods: GET, POST, PUT, DELETE..." },
    { topic: "Internet Basics", date: "3 days ago", excerpt: "DNS resolves human-readable names to IPs. TCP guarantees ordered delivery..." },
    { topic: "RESTful APIs", date: "1 week ago", excerpt: "Resources are nouns, methods are verbs. Statelessness enables horizontal scale..." },
  ];
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6">
        <div className="text-xs font-mono text-muted-foreground mb-2">SMART NOTES</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your knowledge base</h1>
        <p className="text-sm text-muted-foreground mt-1">23 notes across 14 topics</p>
      </header>
      <input
        placeholder="Search notes..."
        className="w-full bg-card border border-border rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--in-progress)] mb-4"
      />
      <div className="space-y-2">
        {notes.map((n) => (
          <div key={n.topic} className="p-4 rounded-md border border-border bg-card hover:bg-[var(--surface-2)] cursor-pointer transition-colors">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm">{n.topic}</h3>
              <span className="text-[11px] font-mono text-muted-foreground">{n.date}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsView() {
  const projects = [
    { name: "URL Shortener API", status: "in_progress", desc: "REST + Postgres + JWT auth" },
    { name: "Realtime Chat", status: "available", desc: "WebSockets + Redis pub/sub" },
    { name: "E-commerce Backend", status: "locked", desc: "Carts, orders, payments" },
  ];
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6">
        <div className="text-xs font-mono text-muted-foreground mb-2">PROJECT BUILDER</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Build to prove it</h1>
        <p className="text-sm text-muted-foreground mt-1">Milestone projects unlocked by your roadmap progress</p>
      </header>
      <div className="grid sm:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div key={p.name} className="p-5 rounded-lg border border-border bg-card">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{p.name}</h3>
              <StatusBadge status={p.status as TopicStatus} />
            </div>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <button className="text-xs font-medium px-3 py-1.5 rounded-md border border-border bg-[var(--surface-2)] hover:bg-[var(--muted)] flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" /> Connect repo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssessmentsView({ onStartQuiz }: { onStartQuiz: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6">
        <div className="text-xs font-mono text-muted-foreground mb-2">ASSESSMENTS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Checkpoints</h1>
        <p className="text-sm text-muted-foreground mt-1">Validate your understanding before unlocking what's next</p>
      </header>
      <div className="space-y-2">
        {[
          { t: "HTTP Protocol", q: 10, ready: true },
          { t: "Internet Basics", q: 8, ready: false, score: 90 },
          { t: "RESTful APIs", q: 10, ready: true },
        ].map((a) => (
          <div key={a.t} className="flex items-center justify-between p-4 rounded-md border border-border bg-card">
            <div>
              <div className="font-medium text-sm">{a.t}</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {a.q} questions · ~10 min {a.score !== undefined && `· last score ${a.score}%`}
              </div>
            </div>
            <button
              onClick={onStartQuiz}
              className="text-xs font-medium px-3 py-2 rounded-md border border-border bg-[var(--surface-2)] hover:bg-[var(--muted)]"
            >
              {a.score !== undefined ? "Retake →" : "Start →"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-8 space-y-6">
      <header>
        <div className="text-xs font-mono text-muted-foreground mb-2">SETTINGS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Preferences</h1>
      </header>
      {[
        { label: "Daily goal", val: "2 hours" },
        { label: "Current path", val: "Backend Developer" },
        { label: "GitHub", val: "Not connected" },
        { label: "Time zone", val: "Asia/Kolkata" },
      ].map((s) => (
        <div key={s.label} className="flex items-center justify-between p-4 rounded-md border border-border bg-card">
          <div className="text-sm">{s.label}</div>
          <div className="text-sm text-muted-foreground font-mono">{s.val}</div>
        </div>
      ))}
    </div>
  );
}
