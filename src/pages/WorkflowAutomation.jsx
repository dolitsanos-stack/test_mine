import { Workflow, Zap, Play, Pause, Clock, CheckCircle2 } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const WORKFLOWS = [
  {
    id: "w1",
    name: "New Lead → Enrich → Score → Assign",
    trigger: "Lead created",
    actions: ["Enrich via Enhance & Research", "Score with ICP model", "Route to region owner"],
    active: true,
    runs: 342
  },
  {
    id: "w2",
    name: "Demo booked → Send prep pack",
    trigger: "Calendar event tagged 'Demo'",
    actions: ["Generate tailored deck", "Email prep pack to attendees", "Add to CRM timeline"],
    active: true,
    runs: 118
  },
  {
    id: "w3",
    name: "Proposal sent → Nudge at T+4 / T+9",
    trigger: "Proposal status = Sent",
    actions: ["Wait 4 days", "Send nudge email #1", "Wait 5 more days", "Send nudge email #2", "Create task if no response"],
    active: true,
    runs: 87
  },
  {
    id: "w4",
    name: "MCA eligibility check weekly",
    trigger: "Every Monday 08:00",
    actions: ["Query acquiring data", "Flag merchants above €40k/mo", "Create MCA offer drafts"],
    active: false,
    runs: 24
  }
];

export default function WorkflowAutomation() {
  return (
    <div>
      <PageHero
        title="Workflow Automation"
        subtitle="Wire Viva.com signals into repeatable outreach — lead enrichment, demo prep, proposal nudges, MCA eligibility and more."
        right={<button className="btn btn-primary"><Zap size={14} /> New Workflow</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { k: "4", v: "Active flows" },
          { k: "571", v: "Runs this month" },
          { k: "98.4%", v: "Success rate" },
          { k: "42h", v: "Hours saved / week" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {WORKFLOWS.map((w) => (
          <div key={w.id} className="card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <Workflow size={16} className="text-viva-300" />
                  <h3 className="font-semibold text-slate-100">{w.name}</h3>
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Trigger: <span className="text-slate-200">{w.trigger}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge color={w.active ? "green" : "slate"}>
                  {w.active ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {w.active ? "Active" : "Paused"}
                </Badge>
                <Badge color="viva">{w.runs} runs</Badge>
                <button className="btn btn-outline text-xs">
                  {w.active ? <><Pause size={12} /> Pause</> : <><Play size={12} /> Resume</>}
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
              {w.actions.map((a, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className="px-3 py-2 rounded-lg bg-ink-900 border border-white/5 text-xs font-medium whitespace-nowrap">
                    {a}
                  </div>
                  {i < w.actions.length - 1 && <span className="text-slate-500">→</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
