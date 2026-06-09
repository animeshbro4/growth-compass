import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TOPICS,
  StatusNode,
  StatusBadge,
  TopicDrawer,
  QuizDrawer,
} from "@/components/growth/shared";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap · GrowthOS" },
      { name: "description", content: "Your full path from fundamentals to interview-ready." },
    ],
  }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-8">
        <div className="text-xs font-mono text-muted-foreground mb-2">THE COMPASS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Backend Developer Path
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          14 of 82 topics completed · ~6 months to interview-ready
        </p>
      </header>

      <ol className="relative">
        {TOPICS.map((t, i) => (
          <li key={t.id} className="relative pl-12 pb-4">
            {i < TOPICS.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[15px] top-9 bottom-0 w-[2px] bg-border"
              />
            )}
            <StatusNode status={t.status} />
            <button
              onClick={() => t.status !== "locked" && setOpenTopic(t.id)}
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

      <TopicDrawer
        topic={openTopic}
        onClose={() => setOpenTopic(null)}
        onStartQuiz={() => setQuizOpen(true)}
      />
      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
