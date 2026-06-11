import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · GrowthOS" },
      { name: "description", content: "Preferences and integrations." },
    ],
  }),
  component: SettingsPage,
});

const SETTINGS = [
  { label: "Daily goal", val: "2 hours" },
  { label: "Current path", val: "Backend Developer" },
  { label: "GitHub", val: "Not connected" },
  { label: "Time zone", val: "Asia/Kolkata" },
  { label: "Theme", val: "Dark · warm" },
];

function SettingsPage() {
  return (
    <div>
      <header className="ambient-glow border-b border-border">
        <div className="max-w-2xl mx-auto px-6 md:px-10 pt-12 pb-10">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Settings
          </div>
          <h1 className="display text-4xl md:text-5xl font-semibold mt-3">Preferences</h1>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-6 md:px-10 py-10 space-y-3">
        {SETTINGS.map((s) => (
          <div key={s.label} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <div className="text-sm text-[var(--ink)]">{s.label}</div>
            <div className="text-sm text-muted-foreground font-mono">{s.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
