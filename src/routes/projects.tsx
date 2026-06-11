import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { StatusBadge, type TopicStatus } from "@/components/growth/shared";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · GrowthOS" },
      { name: "description", content: "Milestone projects to prove your skills." },
    ],
  }),
  component: ProjectsPage,
});

const PROJECTS: { name: string; status: TopicStatus; desc: string }[] = [
  { name: "URL Shortener API", status: "in_progress", desc: "REST + Postgres + JWT auth" },
  { name: "Realtime Chat", status: "available", desc: "WebSockets + Redis pub/sub" },
  { name: "E-commerce Backend", status: "locked", desc: "Carts, orders, payments" },
  { name: "Rate-Limited Gateway", status: "locked", desc: "Token bucket + Redis" },
];

function ProjectsPage() {
  return (
    <div>
      <header className="ambient-glow border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Project Builder
          </div>
          <h1 className="display text-4xl md:text-5xl font-semibold mt-3">Build to prove it</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md">
            Milestone projects unlocked by your roadmap progress. Each ships to GitHub
            and gets scanned before it counts.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 grid sm:grid-cols-2 gap-3">
        {PROJECTS.map((p) => (
          <div key={p.name} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between mb-2 gap-3">
              <h3 className="font-semibold text-[var(--ink)]">{p.name}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <button
              disabled={p.status === "locked"}
              className="btn-pill text-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Github className="w-3.5 h-3.5" /> Connect repo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
