import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { StatusBadge, type TopicStatus } from "@/components/growth/shared";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Project Builder · GrowthOS" },
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
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6">
        <div className="text-xs font-mono text-muted-foreground mb-2">PROJECT BUILDER</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Build to prove it</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Milestone projects unlocked by your roadmap progress
        </p>
      </header>
      <div className="grid sm:grid-cols-2 gap-3">
        {PROJECTS.map((p) => (
          <div key={p.name} className="p-5 rounded-lg border border-border bg-card">
            <div className="flex items-start justify-between mb-2 gap-3">
              <h3 className="font-semibold">{p.name}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <button
              disabled={p.status === "locked"}
              className="text-xs font-medium px-3 py-1.5 rounded-md border border-border bg-[var(--surface-2)] hover:bg-[var(--muted)] flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-3.5 h-3.5" /> Connect repo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
