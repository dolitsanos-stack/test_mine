import { useState } from "react";
import { LayoutTemplate, Copy, Plus, Type, Image as ImageIcon, Table2 } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const BLOCKS = [
  { id: "b1", label: "Hero heading", icon: Type },
  { id: "b2", label: "Two-column feature", icon: Table2 },
  { id: "b3", label: "Image banner", icon: ImageIcon },
  { id: "b4", label: "Pricing table", icon: Table2 },
  { id: "b5", label: "Quote / testimonial", icon: Type },
  { id: "b6", label: "Call to action", icon: Type }
];

const TEMPLATES = [
  { id: "t1", name: "Merchant cold outreach", type: "Email", uses: 128 },
  { id: "t2", name: "Proposal — Retail SMB", type: "Proposal", uses: 96 },
  { id: "t3", name: "Hospitality case study landing", type: "Landing", uses: 54 },
  { id: "t4", name: "MCA eligibility letter", type: "Email", uses: 41 },
  { id: "t5", name: "Enterprise pitch deck", type: "Deck", uses: 33 }
];

export default function TemplateDesigner() {
  const [active, setActive] = useState(TEMPLATES[0]);

  return (
    <div>
      <PageHero
        title="Template Designer"
        subtitle="Build reusable content blocks for emails, landing pages, proposals and decks. Drag blocks from the library into the canvas."
        right={<button className="btn btn-primary"><Plus size={14} /> New Template</button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="card p-5 lg:col-span-1 space-y-4">
          <div>
            <SectionHeader title="Block library" right={<LayoutTemplate size={16} className="text-viva-300" />} />
            <div className="space-y-2">
              {BLOCKS.map((b) => {
                const I = b.icon;
                return (
                  <div
                    key={b.id}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-ink-900 border border-white/5 hover:border-viva-500/30 transition cursor-grab text-sm"
                    draggable
                  >
                    <I size={14} className="text-viva-300" />
                    {b.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeader title="Templates" />
            <div className="space-y-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t)}
                  className={`w-full text-left rounded-lg p-2.5 border transition ${
                    active.id === t.id
                      ? "border-viva-500/40 bg-viva-500/10"
                      : "border-white/5 bg-ink-900 hover:border-white/15"
                  }`}
                >
                  <div className="text-sm font-medium text-slate-100">{t.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <Badge color="viva">{t.type}</Badge>
                    <span>{t.uses} uses</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5 lg:col-span-3">
          <SectionHeader
            title={active.name}
            subtitle={`${active.type} · ${active.uses} uses`}
            right={
              <div className="flex gap-2">
                <button className="btn btn-outline text-xs"><Copy size={12} /> Duplicate</button>
                <button className="btn btn-soft text-xs">Use in campaign</button>
              </div>
            }
          />
          <div className="space-y-3 rounded-2xl border border-dashed border-white/10 p-6 bg-ink-900/60 min-h-[360px]">
            <div className="rounded-xl border border-white/5 bg-ink-850 p-4">
              <div className="text-xs uppercase text-viva-300 font-semibold tracking-wider">Hero</div>
              <div className="text-xl font-bold mt-1">Accept every payment. Settle same-day.</div>
              <div className="text-sm text-slate-400 mt-1">Editable — click to change block content.</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/5 bg-ink-850 p-4">
                <div className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Feature</div>
                <div className="font-semibold mt-1">Smart Checkout</div>
                <div className="text-sm text-slate-400 mt-1">40+ payment methods, BNPL, 1-click returning shopper.</div>
              </div>
              <div className="rounded-xl border border-white/5 bg-ink-850 p-4">
                <div className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Feature</div>
                <div className="font-semibold mt-1">Merchant Cash Advance</div>
                <div className="text-sm text-slate-400 mt-1">Working capital in minutes, repaid from daily sales.</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-gradient-to-br from-viva-600/20 to-viva-800/20 p-4">
              <div className="text-xs uppercase text-viva-300 font-semibold tracking-wider">CTA</div>
              <div className="font-semibold mt-1">Open your Viva merchant account today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
