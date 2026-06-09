import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QuizDrawer } from "@/components/growth/shared";

export const Route = createFileRoute("/assessments")({
  head: () => ({
    meta: [
      { title: "Assessments · GrowthOS" },
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
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-8">
      <header className="mb-6">
        <div className="text-xs font-mono text-muted-foreground mb-2">ASSESSMENTS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Checkpoints</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Validate your understanding before unlocking what's next
        </p>
      </header>
      <div className="space-y-2">
        {ASSESSMENTS.map((a) => (
          <div
            key={a.t}
            className="flex items-center justify-between p-4 rounded-md border border-border bg-card gap-3"
          >
            <div className="min-w-0">
              <div className="font-medium text-sm">{a.t}</div>
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {a.q} questions · ~10 min
                {a.score !== undefined ? ` · last score ${a.score}%` : ""}
              </div>
            </div>
            <button
              onClick={() => setQuizOpen(true)}
              className="text-xs font-medium px-3 py-2 rounded-md border border-border bg-[var(--surface-2)] hover:bg-[var(--muted)] shrink-0"
            >
              {a.score !== undefined ? "Retake →" : "Start →"}
            </button>
          </div>
        ))}
      </div>
      <QuizDrawer open={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
}
