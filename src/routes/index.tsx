import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Target, Flame, TrendingUp, ArrowRight } from "lucide-react";
import { Heatmap, StatCard, QuizDrawer } from "@/components/growth/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home · GrowthOS" },
      { name: "description", content: "Your daily mission, streak, and consistency at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [checks, setChecks] = useState<Record<string, boolean>>({
    theory: true, capture: false, build: false, ship: false,
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
    <div>
      {/* Hero */}
      <section className="ambient-glow border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <h1 className="display text-4xl md:text-6xl font-semibold mt-3 leading-[1.05] max-w-3xl">
            {greeting} Animesh.
            <br />
            <span className="text-muted-foreground">What will you make today?</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/topic/$topicId" params={{ topicId: "http" }} className="btn-pill-primary">
              Resume HTTP Protocol <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/roadmap" className="btn-pill">See full roadmap</Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Active mission */}
        <section className="rounded-2xl border border-border bg-card p-6 md:p-7">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[var(--available)]">
                Active mission · today
              </div>
              <h2 className="display text-2xl md:text-3xl font-semibold mt-2">HTTP & REST basics</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                ~1h 20m left · Read → capture → build → ship.
              </p>
            </div>
            <button onClick={() => setQuizOpen(true)} className="btn-pill">
              Quick check
            </button>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-2">
            {[
              { id: "theory", label: "Read the theory" },
              { id: "capture", label: "Capture in your own words" },
              { id: "build", label: "Build a small project" },
              { id: "ship", label: "Push the repo & scan" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => toggle(t.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border bg-[var(--surface)] hover:bg-[var(--surface-2)] text-left transition-colors"
              >
                <span
                  className={`w-4 h-4 rounded-[5px] border grid place-items-center shrink-0 ${
                    checks[t.id]
                      ? "bg-[var(--completed)] border-[var(--completed)]"
                      : "border-border"
                  }`}
                >
                  {checks[t.id] && (
                    <CheckCircle2 className="w-3 h-3 text-background" strokeWidth={3} />
                  )}
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

        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-3">
          <StatCard icon={Target} label="Topics done" value="14 / 82" progress={14 / 82} accent="var(--in-progress)" />
          <StatCard icon={Flame} label="Current streak" value="12 days" sub="Longest: 21" accent="var(--available)" />
          <StatCard icon={TrendingUp} label="Interview-ready" value="45%" progress={0.45} accent="var(--completed)" />
        </section>

        {/* Heatmap */}
        <section className="rounded-2xl border border-border bg-card p-6 md:p-7">
          <div className="flex items-baseline justify-between mb-5 flex-wrap gap-2">
            <div>
              <h3 className="display text-lg font-semibold">Consistency · last 24 weeks</h3>
              <p className="text-xs text-muted-foreground mt-0.5">184 active days · longest streak 21</p>
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

      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
