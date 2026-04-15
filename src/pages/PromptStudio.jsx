import { useState } from "react";
import { Terminal, Play, Save, Variable, Sparkles } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const PROMPTS = [
  {
    id: "p1",
    name: "ICP Merchant Research",
    desc: "Summarise a merchant into 5 bullets with fit for Viva products.",
    body: `You are a senior sales analyst at Viva.com.
Given the merchant profile: {{merchant_profile}},
produce a concise 5-bullet fit analysis covering:
• vertical fit • monthly volume & trajectory • current PSP & pain
• recommended Viva products • suggested next action.`
  },
  {
    id: "p2",
    name: "Objection Handler",
    desc: "Draft a compliant, concise rebuttal from the KB.",
    body: `Persona: Viva.com merchant account executive.
Objection: {{objection}}
Respond in 2 short paragraphs, cite a relevant KB tag, offer a clear next step.`
  },
  {
    id: "p3",
    name: "Commercial Offer Summary",
    desc: "Turn deal parameters into a one-paragraph summary for a proposal.",
    body: `Create a polished 4-sentence commercial summary for {{company}} based on:
- monthly volume €{{volume}}
- products: {{products}}
- blended rate: {{rate}}
- term: {{term}} months.`
  }
];

export default function PromptStudio() {
  const [active, setActive] = useState(PROMPTS[0]);
  const [body, setBody] = useState(PROMPTS[0].body);
  const [out, setOut] = useState("");
  const [running, setRunning] = useState(false);

  function run() {
    setRunning(true);
    setTimeout(() => {
      setOut(
        `# ${active.name} · run ${new Date().toLocaleTimeString()}\n\n` +
          `Output will appear here. In production this calls the LLM API with your prompt + variables,\n` +
          `grounded on the Knowledge Base.`
      );
      setRunning(false);
    }, 600);
  }

  return (
    <div>
      <PageHero
        title="Prompt Studio"
        subtitle="Author, test and version the prompts that power the content generation pipeline. Grounded on the Knowledge Base with Viva brand guardrails."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="card p-5 lg:col-span-1">
          <SectionHeader title="Prompts" right={<Terminal size={16} className="text-viva-300" />} />
          <div className="space-y-2">
            {PROMPTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActive(p);
                  setBody(p.body);
                }}
                className={`w-full text-left rounded-xl p-3 border transition ${
                  active.id === p.id
                    ? "border-viva-500/40 bg-viva-500/10"
                    : "border-white/5 bg-ink-900 hover:border-white/15"
                }`}
              >
                <div className="text-sm font-semibold text-slate-100">{p.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{p.desc}</div>
              </button>
            ))}
            <button className="btn btn-soft w-full justify-center mt-3">+ New prompt</button>
          </div>
        </div>

        <div className="card p-5 lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Editing</div>
              <h3 className="font-semibold text-lg">{active.name}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge color="viva"><Variable size={12} /> 2 variables</Badge>
              <Badge color="green">v1.3</Badge>
              <button className="btn btn-outline"><Save size={14} /> Save</button>
              <button className="btn btn-primary" onClick={run} disabled={running}>
                <Play size={14} /> {running ? "Running…" : "Run"}
              </button>
            </div>
          </div>

          <textarea
            rows={12}
            className="input font-mono text-sm resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div>
            <SectionHeader
              title="Output"
              right={<Badge color="viva"><Sparkles size={12} /> LLM</Badge>}
            />
            <pre className="rounded-xl border border-white/5 bg-ink-900 p-4 text-sm text-slate-200 whitespace-pre-wrap font-mono min-h-[160px]">
{out || "Press Run to execute against the current prompt."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
