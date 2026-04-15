import { useState } from "react";
import { Sparkles, Search, Globe, Building2, TrendingUp, ExternalLink } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const SIGNALS = [
  { type: "Growth", text: "Ionian Resorts acquired 4 boutique properties in Cyclades (Jan '26)", source: "News", weight: 92 },
  { type: "Hiring", text: "Olive & Vine posted 'Head of E-commerce' role — scaling DTC", source: "LinkedIn", weight: 87 },
  { type: "Funding", text: "Nova Mobility closed €18M Series B for EU fleet expansion", source: "TechCrunch", weight: 85 },
  { type: "Tech", text: "Urban Beans switched POS vendor — incumbent disengaged", source: "BuiltWith", weight: 78 },
  { type: "Event", text: "Marina Bistro featured in Condé Nast — seasonal surge likely", source: "Press", weight: 71 },
  { type: "Competitor", text: "Competitor processor (Stripe) pushed 12% rate increase to merchants <€2M/y", source: "Industry", weight: 88 }
];

export default function EnhanceResearch() {
  const [query, setQuery] = useState("Ionian Resorts");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PageHero
        title="Enhance & Research"
        subtitle="AI-powered research layer that enriches merchant profiles with live signals — growth, hiring, funding, tech stack and competitive events."
      />

      <div className="card p-5 mb-6">
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[260px]">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
            <input
              className="input pl-9"
              placeholder="Search a company, domain, or merchant…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 650);
            }}
          >
            <Sparkles size={14} /> {loading ? "Researching…" : "Enhance"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-1">
          <SectionHeader title="Company profile" subtitle={query} />
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-viva-500/10 text-viva-300 grid place-items-center">
                <Building2 size={18} />
              </div>
              <div>
                <div className="font-semibold">{query}</div>
                <div className="text-xs text-slate-400">Hospitality · Greece · 38 locations</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/5 p-3">
                <div className="text-slate-500">Est. monthly volume</div>
                <div className="font-semibold text-slate-100 mt-0.5">€3.2M</div>
              </div>
              <div className="rounded-xl border border-white/5 p-3">
                <div className="text-slate-500">Current PSP</div>
                <div className="font-semibold text-slate-100 mt-0.5">Alpha Bank</div>
              </div>
              <div className="rounded-xl border border-white/5 p-3">
                <div className="text-slate-500">Website</div>
                <div className="font-semibold text-slate-100 mt-0.5 flex items-center gap-1">
                  ionian.example <ExternalLink size={10} />
                </div>
              </div>
              <div className="rounded-xl border border-white/5 p-3">
                <div className="text-slate-500">Employees</div>
                <div className="font-semibold text-slate-100 mt-0.5">210–500</div>
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mt-4 mb-2">Top products to pitch</div>
              <div className="flex flex-wrap gap-1.5">
                <Badge color="viva">Card Terminals</Badge>
                <Badge color="viva">Business Banking</Badge>
                <Badge color="viva">Merchant Cash Advance</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-5 lg:col-span-2">
          <SectionHeader
            title="Live signals"
            subtitle="Buying triggers detected in the last 30 days"
            right={<Badge color="green"><TrendingUp size={12} /> 6 new</Badge>}
          />
          <ul className="divide-y divide-white/5">
            {SIGNALS.map((s, i) => (
              <li key={i} className="py-3 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-ink-800 text-viva-300 grid place-items-center shrink-0">
                  <Globe size={14} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge color="viva">{s.type}</Badge>
                    <span className="text-xs text-slate-500">{s.source}</span>
                  </div>
                  <div className="text-sm text-slate-200 mt-1">{s.text}</div>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <div className="font-semibold text-viva-300">{s.weight}</div>
                  <div>intent</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
