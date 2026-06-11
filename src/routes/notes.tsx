import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes · GrowthOS" },
      { name: "description", content: "Your searchable knowledge base." },
    ],
  }),
  component: NotesPage,
});

const NOTES = [
  { topic: "HTTP Protocol", date: "Today", excerpt: "Stateless app-layer protocol. Core methods: GET, POST, PUT, DELETE..." },
  { topic: "Internet Basics", date: "3 days ago", excerpt: "DNS resolves human-readable names to IPs. TCP guarantees ordered delivery..." },
  { topic: "RESTful APIs", date: "1 week ago", excerpt: "Resources are nouns, methods are verbs. Statelessness enables horizontal scale..." },
];

function NotesPage() {
  return (
    <div>
      <header className="ambient-glow border-b border-border">
        <div className="max-w-4xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Smart Notes
          </div>
          <h1 className="display text-4xl md:text-5xl font-semibold mt-3">
            Your knowledge base
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            23 notes across 14 topics — captured in your own words.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        <div className="relative mb-5">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search notes…"
            className="w-full bg-card border border-border rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[var(--ink)]/40"
          />
        </div>
        <div className="space-y-2">
          {NOTES.map((n) => (
            <div
              key={n.topic}
              className="p-4 rounded-xl border border-border bg-card hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm text-[var(--ink)]">{n.topic}</h3>
                <span className="text-[11px] font-mono text-muted-foreground">{n.date}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
