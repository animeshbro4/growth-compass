import { createFileRoute, Link } from "@tanstack/react-router";
import { TOPICS, StatusNode, StatusBadge } from "@/components/growth/shared";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap · GrowthOS" },
      { name: "description", content: "Your full path from fundamentals to interview-ready." },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  return (
    <div>
      <header className="ambient-glow border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            The Compass
          </div>
          <h1 className="display text-4xl md:text-5xl font-semibold mt-3">
            Backend developer path
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md">
            14 of 82 topics completed · roughly 6 months to interview-ready.
            Click a topic to start the full Theory → Capture → Build → Ship cycle.
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
        <ol className="relative">
          {TOPICS.map((t, i) => {
            const locked = t.status === "locked";
            const Card = (
              <div
                className={`rounded-xl border border-border bg-card p-4 transition-colors ${
                  locked ? "opacity-60" : "hover:bg-[var(--surface-2)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-[var(--ink)]">{t.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">{t.meta}</div>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            );
            return (
              <li key={t.id} className="relative pl-12 pb-4">
                {i < TOPICS.length - 1 && (
                  <span aria-hidden className="absolute left-[15px] top-9 bottom-0 w-[2px] bg-border" />
                )}
                <StatusNode status={t.status} />
                {locked ? (
                  <div>{Card}</div>
                ) : (
                  <Link
                    to="/topic/$topicId"
                    params={{ topicId: t.id }}
                    className="block"
                  >
                    {Card}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
