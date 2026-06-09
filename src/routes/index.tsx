import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, Target, Flame, TrendingUp } from "lucide-react";
import { Heatmap, StatCard, QuizDrawer } from "@/components/growth/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · GrowthOS" },
      { name: "description", content: "Your daily mission, streak, and consistency at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [quizOpen, setQuizOpen] = useState(false);
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
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {greeting} Animesh.{" "}
          <span className="text-muted-foreground">Ready to write some code?</span>
        </h1>
      </header>

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
            onClick={() => setQuizOpen(true)}
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

      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
