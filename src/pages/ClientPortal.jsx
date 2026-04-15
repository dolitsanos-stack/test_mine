import { Monitor, Link2, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const PORTALS = [
  { id: "p1", merchant: "Ionian Resorts", slug: "ionian-resorts", docs: 12, approvals: 3, status: "Active", lastSeen: "1h ago" },
  { id: "p2", merchant: "Olive & Vine", slug: "olive-vine", docs: 7, approvals: 1, status: "Active", lastSeen: "Yesterday" },
  { id: "p3", merchant: "Urban Beans", slug: "urban-beans", docs: 9, approvals: 0, status: "Pending", lastSeen: "3d ago" },
  { id: "p4", merchant: "Nova Mobility", slug: "nova-mobility", docs: 15, approvals: 2, status: "Active", lastSeen: "Today" },
  { id: "p5", merchant: "Aegean Threads", slug: "aegean-threads", docs: 4, approvals: 0, status: "Draft", lastSeen: "—" }
];

const STATUS_COLOR = { Active: "green", Pending: "amber", Draft: "slate" };

export default function ClientPortal() {
  return (
    <div>
      <PageHero
        title="Client Portal"
        subtitle="Shared, branded workspace per merchant — proposals, documents, onboarding checklists and live Q&A."
        right={<button className="btn btn-primary"><Link2 size={14} /> New Portal</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { k: "14", v: "Active portals" },
          { k: "82", v: "Shared documents" },
          { k: "6", v: "Pending approvals" },
          { k: "3m 12s", v: "Avg. first view" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <SectionHeader title="Portals" subtitle="One shared space per merchant" />
          <ul className="divide-y divide-white/5">
            {PORTALS.map((p) => (
              <li key={p.id} className="py-3 flex items-center gap-4 flex-wrap">
                <div className="w-10 h-10 rounded-lg bg-viva-500/10 text-viva-300 grid place-items-center">
                  <Monitor size={16} />
                </div>
                <div className="flex-1 min-w-[160px]">
                  <div className="font-medium text-slate-100">{p.merchant}</div>
                  <div className="text-xs text-slate-400">portal.viva.com/{p.slug}</div>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>{p.docs} docs</span>
                  {p.approvals > 0 && <Badge color="amber"><AlertCircle size={10} /> {p.approvals} to approve</Badge>}
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.lastSeen}</span>
                </div>
                <Badge color={STATUS_COLOR[p.status]}>{p.status}</Badge>
                <button className="btn btn-outline text-xs"><Eye size={12} /> Open</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <SectionHeader title="Portal preview" subtitle="Ionian Resorts — portal.viva.com/ionian-resorts" />
          <div className="rounded-2xl border border-white/5 overflow-hidden bg-ink-900">
            <div className="p-4 bg-gradient-to-br from-viva-500 to-viva-800 text-ink-950">
              <div className="text-xs uppercase font-semibold tracking-[0.18em] opacity-80">viva.com · partner portal</div>
              <div className="text-lg font-extrabold mt-1">Welcome, Ionian Resorts</div>
            </div>
            <div className="p-4 space-y-2">
              {[
                { t: "Commercial proposal v2.3", s: "Pending signature", c: "amber" },
                { t: "KYB documents", s: "Approved", c: "green" },
                { t: "Terminals rollout plan", s: "In review", c: "slate" }
              ].map((x, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-ink-850 border border-white/5">
                  <div>
                    <div className="text-sm font-medium">{x.t}</div>
                    <div className="text-xs text-slate-400">{x.s}</div>
                  </div>
                  <Badge color={x.c}>
                    {x.c === "green" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    {x.s}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
