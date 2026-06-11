import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  CheckCircle2,
  FileText,
  Github,
  Loader2,
  Lightbulb,
  PenLine,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";
import { TOPICS } from "@/components/growth/shared";

export const Route = createFileRoute("/topic/$topicId")({
  head: ({ params }) => {
    const t = TOPICS.find((x) => x.id === params.topicId);
    const title = t?.title ?? "Topic";
    return {
      meta: [
        { title: `${title} · GrowthOS` },
        { name: "description", content: `Study, capture, and prove your work for ${title}.` },
      ],
    };
  },
  component: TopicPage,
});

type Phase = "theory" | "capture" | "practical" | "scan" | "complete";

const PHASE_ORDER: Phase[] = ["theory", "capture", "practical", "scan", "complete"];
const PHASE_LABEL: Record<Phase, string> = {
  theory: "Theory",
  capture: "Capture",
  practical: "Practical",
  scan: "Repo scan",
  complete: "Complete",
};

const RESOURCES: Record<string, { type: "video" | "article"; title: string; src: string; dur: string }[]> = {
  http: [
    { type: "video", title: "HTTP Crash Course — MDN", src: "MDN", dur: "24 min" },
    { type: "article", title: "Methods, Status Codes, Headers", src: "web.dev", dur: "12 min" },
    { type: "article", title: "REST vs HTTP — high-level", src: "blog", dur: "8 min" },
  ],
  rest: [
    { type: "video", title: "REST API Design Principles", src: "YouTube", dur: "32 min" },
    { type: "article", title: "Statelessness & idempotency", src: "MDN", dur: "10 min" },
  ],
  internet: [
    { type: "video", title: "How the Internet Works", src: "Vox", dur: "15 min" },
    { type: "article", title: "DNS, TCP/IP for developers", src: "Cloudflare", dur: "18 min" },
  ],
};

const AI_IDEAS: Record<string, { title: string; brief: string }[]> = {
  http: [
    { title: "Tiny HTTP echo server", brief: "Parse raw method + headers, respond with the same body." },
    { title: "Status-code playground", brief: "REST endpoint returning every code on demand for testing clients." },
    { title: "Idempotent webhook receiver", brief: "Dedupe identical POSTs by a header key over 24h." },
  ],
  rest: [
    { title: "URL shortener API", brief: "POST /links, GET /:slug, basic rate limit." },
    { title: "Notes CRUD with versions", brief: "Resource per note, sub-resource per revision." },
  ],
  internet: [
    { title: "DNS lookup CLI", brief: "Resolve A, MX, TXT records; cache results in memory." },
  ],
};

function TopicPage() {
  const { topicId } = Route.useParams();
  const navigate = useNavigate();
  const topic = TOPICS.find((t) => t.id === topicId);
  const [phase, setPhase] = useState<Phase>("theory");

  const idx = PHASE_ORDER.indexOf(phase);
  const goNext = () => {
    const next = PHASE_ORDER[Math.min(idx + 1, PHASE_ORDER.length - 1)];
    setPhase(next);
  };
  const goTo = (p: Phase) => setPhase(p);

  if (!topic) {
    return (
      <div className="min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <p className="text-muted-foreground">This topic could not be found.</p>
          <Link to="/roadmap" className="text-sm text-[var(--ink)] mt-3 inline-block">
            ← Back to roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="ambient-glow border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-8 pb-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Roadmap
          </Link>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Topic · {topic.id}
          </div>
          <h1 className="display text-3xl md:text-5xl font-semibold mt-2">
            {topic.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-xl">
            {topic.meta} — work through theory, capture what you learned, build something, and
            ship a repo to mark it done.
          </p>

          {/* Phase stepper */}
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {PHASE_ORDER.map((p, i) => {
              const done = i < idx;
              const active = i === idx;
              return (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className={`group flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition ${
                    active
                      ? "bg-[var(--ink)] text-background border-[var(--ink)]"
                      : done
                        ? "border-[var(--completed)]/40 text-[var(--completed)]"
                        : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full grid place-items-center text-[9px]">
                    {done ? <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} /> : i + 1}
                  </span>
                  {PHASE_LABEL[p]}
                  {i < PHASE_ORDER.length - 1 && (
                    <span className="ml-1 opacity-30">→</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
          {phase === "theory" && <TheoryPanel topicId={topicId} onDone={goNext} />}
          {phase === "capture" && <CapturePanel onDone={goNext} />}
          {phase === "practical" && <PracticalPanel topicId={topicId} onDone={goNext} />}
          {phase === "scan" && <ScanPanel onDone={goNext} />}
          {phase === "complete" && (
            <CompletePanel
              topicId={topicId}
              onNextTopic={() => navigate({ to: "/roadmap" })}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* ─────────── Theory ─────────── */
function TheoryPanel({ topicId, onDone }: { topicId: string; onDone: () => void }) {
  const items = RESOURCES[topicId] ?? RESOURCES.http;
  const [done, setDone] = useState<Record<number, boolean>>({});
  const completed = items.filter((_, i) => done[i]).length;
  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Phase 1"
        title="Soak up the theory"
        sub="Watch and read the curated resources. Tick them off as you go. No need to be perfect — you'll capture what you learned next."
      />
      <div className="grid gap-3">
        {items.map((r, i) => (
          <button
            key={i}
            onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
            className={`flex items-start gap-4 p-4 rounded-xl border bg-card text-left transition-colors ${
              done[i] ? "border-[var(--completed)]/40" : "border-border hover:bg-[var(--surface-2)]"
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-border grid place-items-center shrink-0">
              {r.type === "video" ? (
                <Video className="w-4 h-4 text-muted-foreground" />
              ) : (
                <FileText className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-[var(--ink)]">{r.title}</div>
              <div className="flex gap-3 items-center mt-1 text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>{r.type}</span>
                <span>·</span>
                <span>{r.src}</span>
                <span>·</span>
                <span>{r.dur}</span>
              </div>
            </div>
            <span
              className={`w-5 h-5 rounded-full border grid place-items-center shrink-0 mt-1 ${
                done[i] ? "bg-[var(--completed)] border-[var(--completed)]" : "border-border"
              }`}
            >
              {done[i] && <CheckCircle2 className="w-3 h-3 text-background" strokeWidth={3} />}
            </span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground font-mono">
          {completed} / {items.length} resources reviewed
        </div>
        <button onClick={onDone} className="btn-pill-primary">
          Capture what you learned →
        </button>
      </div>
    </section>
  );
}

/* ─────────── Capture ─────────── */
function CapturePanel({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"write" | "upload" | "camera">("write");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const ready = mode === "write" ? text.trim().length > 30 : !!fileName || mode === "camera";

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Phase 2"
        title="Capture it in your own words"
        sub="The act of restating turns reading into learning. Type, attach a written PDF, or snap a photo of your notebook."
      />

      <div className="flex flex-wrap gap-2">
        {([
          { id: "write", label: "Type notes", Icon: PenLine },
          { id: "upload", label: "Upload PDF", Icon: Upload },
          { id: "camera", label: "Camera capture", Icon: Camera },
        ] as const).map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] transition ${
              mode === id
                ? "bg-[var(--ink)] text-background border-[var(--ink)]"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        {mode === "write" && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="In your own words: what did you learn? What clicked? What's still fuzzy?"
            className="w-full min-h-[260px] bg-transparent text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none leading-relaxed"
          />
        )}
        {mode === "upload" && (
          <label className="block border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-[var(--ink)]/40 transition-colors">
            <Upload className="w-6 h-6 mx-auto text-muted-foreground mb-3" />
            <div className="text-sm text-[var(--ink)] font-medium">
              {fileName ?? "Drop a PDF of your handwritten notes"}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {fileName ? "Click to replace" : "PDF, PNG, JPG — up to 20 MB"}
            </div>
            <input
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        )}
        {mode === "camera" && (
          <div className="border-2 border-dashed border-border rounded-lg p-10 text-center">
            <Camera className="w-6 h-6 mx-auto text-muted-foreground mb-3" />
            <div className="text-sm text-[var(--ink)] font-medium">Camera capture</div>
            <div className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Snap a photo of your notebook page. We'll OCR and attach it to this topic.
            </div>
            <button className="btn-pill mt-4">Open camera</button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-muted-foreground font-mono">
          {mode === "write" && `${text.trim().split(/\s+/).filter(Boolean).length} words`}
          {mode === "upload" && (fileName ?? "No file attached")}
          {mode === "camera" && "Camera capture pending"}
        </div>
        <button onClick={onDone} disabled={!ready} className="btn-pill-primary disabled:opacity-40">
          End of theory · onto practical →
        </button>
      </div>
    </section>
  );
}

/* ─────────── Practical ─────────── */
function PracticalPanel({ topicId, onDone }: { topicId: string; onDone: () => void }) {
  const ideas = useMemo(() => AI_IDEAS[topicId] ?? AI_IDEAS.http, [topicId]);
  const [path, setPath] = useState<"ai" | "own" | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [own, setOwn] = useState("");
  const ready = (path === "ai" && picked !== null) || (path === "own" && own.trim().length > 3);

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Phase 3"
        title="Now build something small"
        sub="Theory only sticks when you make something with it. Pick a generated idea or bring your own."
      />

      <div className="grid sm:grid-cols-2 gap-3">
        <button
          onClick={() => { setPath("ai"); setOwn(""); }}
          className={`p-5 rounded-xl border text-left transition ${
            path === "ai" ? "border-[var(--ink)] bg-card" : "border-border bg-card hover:bg-[var(--surface-2)]"
          }`}
        >
          <Sparkles className="w-4 h-4 text-[var(--available)] mb-2" />
          <div className="font-semibold text-[var(--ink)]">AI-generated ideas</div>
          <div className="text-xs text-muted-foreground mt-1">
            Three project briefs tailored to this topic.
          </div>
        </button>
        <button
          onClick={() => { setPath("own"); setPicked(null); }}
          className={`p-5 rounded-xl border text-left transition ${
            path === "own" ? "border-[var(--ink)] bg-card" : "border-border bg-card hover:bg-[var(--surface-2)]"
          }`}
        >
          <Lightbulb className="w-4 h-4 text-[var(--available)] mb-2" />
          <div className="font-semibold text-[var(--ink)]">Bring your own</div>
          <div className="text-xs text-muted-foreground mt-1">
            Already have an idea? Name it and ship it.
          </div>
        </button>
      </div>

      {path === "ai" && (
        <div className="space-y-2">
          {ideas.map((idea, i) => (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition ${
                picked === i ? "border-[var(--ink)] bg-card" : "border-border bg-card hover:bg-[var(--surface-2)]"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 grid place-items-center shrink-0 mt-0.5 ${
                  picked === i ? "border-[var(--ink)] bg-[var(--ink)]" : "border-border"
                }`}
              >
                {picked === i && <span className="w-2 h-2 rounded-full bg-background" />}
              </span>
              <div>
                <div className="font-medium text-[var(--ink)]">{idea.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{idea.brief}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {path === "own" && (
        <div className="rounded-xl border border-border bg-card p-5">
          <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Project name
          </label>
          <input
            value={own}
            onChange={(e) => setOwn(e.target.value)}
            placeholder="e.g. weather CLI in Go"
            className="w-full mt-2 bg-transparent text-[15px] text-[var(--ink)] placeholder:text-muted-foreground focus:outline-none border-b border-border focus:border-[var(--ink)] py-2"
          />
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button onClick={onDone} disabled={!ready} className="btn-pill-primary disabled:opacity-40">
          Submit your repo →
        </button>
      </div>
    </section>
  );
}

/* ─────────── Scan ─────────── */
function ScanPanel({ onDone }: { onDone: () => void }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "scanning" | "ok" | "fail">("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    if (!/github\.com\//.test(url)) {
      setState("fail");
      return;
    }
    setState("scanning");
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 8 + Math.random() * 14;
        if (next >= 100) {
          clearInterval(id);
          setState("ok");
          return 100;
        }
        return next;
      });
    }, 220);
  };

  return (
    <section className="space-y-6">
      <SectionHeading
        eyebrow="Phase 4"
        title="Ship the repo"
        sub="Push your work to GitHub and paste the link. We scan for a README, commits, and a runnable entry point — once it passes, the topic is sealed."
      />

      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Github className="w-3.5 h-3.5" /> Repository URL
        </label>
        <input
          value={url}
          onChange={(e) => { setUrl(e.target.value); setState("idle"); }}
          placeholder="https://github.com/your-handle/your-project"
          className="w-full bg-transparent text-[15px] text-[var(--ink)] placeholder:text-muted-foreground focus:outline-none border-b border-border focus:border-[var(--ink)] py-2"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-muted-foreground">
            Don't have one yet?{" "}
            <button onClick={onDone} className="text-[var(--ink)] underline underline-offset-2">
              Skip & mark complete
            </button>
          </div>
          <button
            onClick={startScan}
            disabled={!url || state === "scanning"}
            className="btn-pill-primary disabled:opacity-40"
          >
            {state === "scanning" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Scanning…
              </>
            ) : (
              <>Run scan</>
            )}
          </button>
        </div>

        {state === "scanning" && (
          <div className="space-y-2">
            <div className="h-1 rounded-full bg-[var(--muted)] overflow-hidden">
              <div className="h-full bg-[var(--ink)] transition-all"
                style={{ width: `${progress}%` }} />
            </div>
            <div className="text-[11px] font-mono text-muted-foreground">
              {progress < 30 && "Cloning repository…"}
              {progress >= 30 && progress < 60 && "Reading README and structure…"}
              {progress >= 60 && progress < 90 && "Counting commits, checking entry points…"}
              {progress >= 90 && "Finalising…"}
            </div>
          </div>
        )}

        {state === "ok" && (
          <div className="rounded-lg border border-[var(--completed)]/40 bg-[var(--completed)]/5 p-4">
            <div className="flex items-center gap-2 text-[var(--completed)] font-medium">
              <CheckCircle2 className="w-4 h-4" /> Scan passed
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              README · 7 commits · entry point detected. Ready to seal the topic.
            </div>
            <button onClick={onDone} className="btn-pill-primary mt-4">
              Mark topic complete →
            </button>
          </div>
        )}

        {state === "fail" && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            That doesn't look like a GitHub URL. Try again — or skip for now.
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── Complete ─────────── */
function CompletePanel({ topicId, onNextTopic }: { topicId: string; onNextTopic: () => void }) {
  const topic = TOPICS.find((t) => t.id === topicId);
  return (
    <section className="ambient-glow rounded-2xl border border-border bg-card p-10 text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-[var(--completed)]/15 border border-[var(--completed)]/40 grid place-items-center">
        <CheckCircle2 className="w-6 h-6 text-[var(--completed)]" />
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-5">
        Topic sealed
      </div>
      <h2 className="display text-3xl md:text-4xl font-semibold mt-2">
        {topic?.title} — done.
      </h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto mt-3">
        You read it, you wrote it, you built it, and you shipped it. That's how the knowledge
        becomes yours.
      </p>
      <div className="flex justify-center gap-3 mt-7">
        <Link to="/roadmap" className="btn-pill">Back to roadmap</Link>
        <button onClick={onNextTopic} className="btn-pill-primary">Next topic →</button>
      </div>
    </section>
  );
}

/* ─────────── Shared bits ─────────── */
function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        <BookOpen className="w-3 h-3" /> {eyebrow}
      </div>
      <h2 className="display text-2xl md:text-3xl font-semibold mt-2">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-xl">{sub}</p>
    </div>
  );
}
