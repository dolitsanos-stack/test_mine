import { useState } from "react";
import { Wand2, Copy, RefreshCw, FileText, Mail, Presentation, Megaphone, Code2 } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const CONTENT_TYPES = [
  { id: "email", label: "Sales Email", icon: Mail, sample:
`Subject: Cut card processing by 18% — 20 min this Thursday?

Hi {{first_name}},

Noticed {{company}} is scaling fast across {{country}}. We help similar merchants cut total cost of acceptance by 15–22% with Viva.com Smart Checkout, while adding BNPL and same-day settlement.

Worth a 20-minute call Thursday?

— Alex` },
  { id: "pitch", label: "Pitch Deck outline", icon: Presentation, sample:
`1. Executive Summary — merchant pain in numbers
2. Viva.com at a glance — licensed EU bank + acquirer
3. Smart Checkout — conversion lift ~22%
4. In-store — Android terminals + app marketplace
5. Financing — MCA up to €400k, same-day
6. Commercials — transparent interchange++
7. Onboarding timeline — live in 48h
8. Q&A` },
  { id: "landing", label: "Landing page copy", icon: Megaphone, sample:
`# One payments stack. Every channel.
Accept card, wallet, BNPL and tap-on-phone with one contract — and get the money settled same-day.

## Merchants switching to Viva.com see
- +22% checkout conversion
- –18% blended processing cost
- 48h to go-live` },
  { id: "proposal", label: "Proposal snippet", icon: FileText, sample:
`Commercial summary for {{company}}

Based on €{{volume}}k/mo of card acceptance we propose:
- Smart Checkout at 0.95% + €0.10 (interchange++)
- 50x Android terminals at €6/mo each
- Same-day settlement, Viva Banking included
- MCA pre-approval up to €{{mca_cap}}

Estimated net saving: €{{saving}}/mo.` },
  { id: "snippet", label: "API / plugin note", icon: Code2, sample:
`// Install the Smart Checkout plugin for Shopify
// Dashboard → Apps → Viva.com → Activate
// Webhook events: payment.success, payment.failed, dispute.opened
// Docs: developer.vivapayments.com
` }
];

export default function GenerateContent() {
  const [type, setType] = useState(CONTENT_TYPES[0]);
  const [prompt, setPrompt] = useState("DTC fashion brand in Italy, ~€180k/mo, currently on Stripe.");
  const [output, setOutput] = useState(CONTENT_TYPES[0].sample);
  const [loading, setLoading] = useState(false);

  function run() {
    setLoading(true);
    setTimeout(() => {
      setOutput(`${type.sample}\n\n-- generated for context --\n${prompt}`);
      setLoading(false);
    }, 600);
  }

  return (
    <div>
      <PageHero
        title="Generate Content"
        subtitle="Turn structured knowledge into merchant-ready assets — emails, landing copy, proposals and pitch outlines — with Viva brand guardrails."
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {CONTENT_TYPES.map((t) => {
          const Icon = t.icon;
          const active = type.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setType(t);
                setOutput(t.sample);
              }}
              className={`rounded-xl p-4 text-left border transition ${
                active
                  ? "border-viva-500/40 bg-viva-500/10 text-viva-200"
                  : "border-white/5 bg-ink-850/70 hover:border-white/15"
              }`}
            >
              <Icon size={18} className={active ? "text-viva-300" : "text-slate-400"} />
              <div className="mt-2 text-sm font-semibold">{t.label}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <SectionHeader
            title="Input context"
            subtitle="Anything the AI should know — merchant, tone, offer"
          />
          <textarea
            rows={10}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input resize-none font-sans"
            placeholder="Describe the merchant, their volume, vertical and pain points…"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <Badge color="viva">Viva brand voice</Badge>
              <Badge color="green">Compliance checked</Badge>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setOutput(type.sample)}>
                <RefreshCw size={14} /> Reset
              </button>
              <button className="btn btn-primary" onClick={run} disabled={loading}>
                <Wand2 size={14} /> {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <SectionHeader
            title="Generated output"
            subtitle={type.label}
            right={
              <button
                className="btn btn-soft text-xs"
                onClick={() => navigator.clipboard?.writeText(output)}
              >
                <Copy size={12} /> Copy
              </button>
            }
          />
          <pre className="text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed rounded-xl bg-ink-900/70 border border-white/5 p-4 min-h-[280px]">
{output}
          </pre>
        </div>
      </div>
    </div>
  );
}
