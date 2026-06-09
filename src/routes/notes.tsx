import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Smart Notes · GrowthOS" },
      { name: "description", content: "Your searchable knowledge base." },
    ],
  }),
  component: NotesPage,
});

const NOTES = [
  {
    topic: "HTTP Protocol",
    date: "Today",
    excerpt: "Stateless app-layer protocol. Core methods: GET, POST, PUT, DELETE...",
  },
  {
    topic: "Internet Basics",
    date: "3 days ago",
    excerpt: "DNS resolves human-readable names to IPs. TCP guarantees ordered delivery...",
  },
  {
    topic: "RESTful APIs",
    date: "1 week ago",
    excerpt:
      "Resources are nouns, methods are verbs. Statelessness enables horizontal scale...",
  },
];

function NotesPage() {
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
        {NOTES.map((n) => (
          <div
            key={n.topic}
            className="p-4 rounded-md border border-border bg-card hover:bg-[var(--surface-2)] cursor-pointer transition-colors"
          >
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
