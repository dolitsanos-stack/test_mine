import { useState } from "react";
import { Globe2, Eye, Wand2, Share2, Copy } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

export default function LandingPage() {
  const [headline, setHeadline] = useState("Accept every payment. Settle the same day.");
  const [sub, setSub] = useState(
    "Viva.com is the only European bank + acquirer that unifies card-present, online and BNPL in one account."
  );
  const [cta, setCta] = useState("Open a Viva merchant account");
  const [accent, setAccent] = useState("teal");

  const accentClass =
    accent === "teal"
      ? "from-viva-500 to-viva-700"
      : accent === "indigo"
      ? "from-indigo-500 to-indigo-700"
      : "from-rose-500 to-rose-700";

  return (
    <div>
      <PageHero
        title="Landing Page Builder"
        subtitle="Spin up a merchant-specific landing page in minutes. Pulls brand voice and product copy from the Knowledge Base automatically."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="card p-5 lg:col-span-2 space-y-4">
          <SectionHeader title="Content" subtitle="Edit copy below — preview updates live" />
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Headline</span>
            <input className="input mt-1" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">Subheadline</span>
            <textarea className="input mt-1" rows={3} value={sub} onChange={(e) => setSub(e.target.value)} />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-500">CTA text</span>
            <input className="input mt-1" value={cta} onChange={(e) => setCta(e.target.value)} />
          </label>
          <div>
            <span className="text-xs font-medium text-slate-500">Accent colour</span>
            <div className="flex gap-2 mt-2">
              {["teal", "indigo", "rose"].map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    accent === c ? "border-white" : "border-white/10"
                  } ${
                    c === "teal" ? "bg-viva-500" : c === "indigo" ? "bg-indigo-500" : "bg-rose-500"
                  }`}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="btn btn-primary"><Wand2 size={14} /> Auto-fill from KB</button>
            <button className="btn btn-outline"><Share2 size={14} /> Publish</button>
          </div>
        </div>

        <div className="card p-5 lg:col-span-3">
          <SectionHeader
            title="Live preview"
            subtitle="merchant.viva.com/your-campaign"
            right={
              <div className="flex gap-2">
                <Badge color="viva"><Eye size={12} /> Preview</Badge>
                <button className="btn btn-ghost text-xs"><Copy size={12} /> Copy URL</button>
              </div>
            }
          />
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-ink-900">
            <div
              className={`bg-gradient-to-br ${accentClass} p-10 text-white`}
            >
              <div className="text-xs uppercase tracking-[0.18em] opacity-80 font-semibold">
                viva.com · merchant solutions
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight">{headline}</h1>
              <p className="mt-3 text-white/90 max-w-xl">{sub}</p>
              <button className="mt-6 px-5 py-3 rounded-xl bg-white text-ink-900 font-semibold">
                {cta}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-ink-900">
              {[
                { k: "+22%", v: "Checkout conversion" },
                { k: "48h", v: "Time to go-live" },
                { k: "Same-day", v: "Settlement to your IBAN" }
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-white/5 p-4">
                  <div className="text-2xl font-bold text-viva-300">{s.k}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-white/5 bg-ink-850 flex items-center justify-between text-xs text-slate-500">
              <span>© {new Date().getFullYear()} viva.com · Licensed EU bank</span>
              <span>Privacy · Terms · Contact</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
