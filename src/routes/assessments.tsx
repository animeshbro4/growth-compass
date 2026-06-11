import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizDrawer } from "@/components/growth/shared";

export const Route = createFileRoute("/assessments")({
  head: () => ({
    meta: [
      { title: "Checkpoints · GrowthOS" },
      { name: "description", content: "Validate your understanding with quick quizzes." },
    ],
  }),
  component: AssessmentsPage,
});

const ASSESSMENTS = [
  { t: "HTTP Protocol", q: 10, score: undefined as number | undefined },
  { t: "Internet Basics", q: 8, score: 90 },
  { t: "RESTful APIs", q: 10, score: undefined as number | undefined },
  { t: "Relational Databases", q: 12, score: undefined as number | undefined },
];

function AssessmentsPage() {
  const [quizOpen, setQuizOpen] = useState(false);
  return (
    <div>
      <header className="ambient-glow border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Checkpoints
          </div>
          <h1 className="display text-4xl md:text-5xl font-semibold mt-3">
            Prove you know it
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            Short quizzes per topic. Validate your understanding before unlocking what's next.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10 space-y-2">
        {ASSESSMENTS.map((a) => (
          <div
            key={a.t}
            className="flex items-center justify-between p-4 rounded-xl border border-border bg-card gap-3"
          >
            <div className="min-w-0">
              <div className="font-medium text-sm text-[var(--ink)]">{a.t}</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {a.q} questions · ~10 min
                {a.score !== undefined ? ` · last ${a.score}%` : ""}
              </div>
            </div>
            <button onClick={() => setQuizOpen(true)} className="btn-pill text-xs shrink-0">
              {a.score !== undefined ? "Retake →" : "Start →"}
            </button>
          </div>
        ))}
      </div>
      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
