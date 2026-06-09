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
  { label: "Theme", val: "Dark (humanized)" },
];

function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-8 space-y-4">
      <header className="mb-2">
        <div className="text-xs font-mono text-muted-foreground mb-2">SETTINGS</div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Preferences</h1>
      </header>
      {SETTINGS.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-between p-4 rounded-md border border-border bg-card"
        >
          <div className="text-sm">{s.label}</div>
          <div className="text-sm text-muted-foreground font-mono">{s.val}</div>
        </div>
      ))}
    </div>
  );
}
