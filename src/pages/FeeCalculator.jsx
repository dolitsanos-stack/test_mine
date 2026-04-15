import { useMemo, useState } from "react";
import { Calculator, TrendingDown, TrendingUp } from "lucide-react";
import { PageHero, SectionHeader, Badge, formatCurrency } from "../components/ui.jsx";

export default function FeeCalculator() {
  const [volume, setVolume] = useState(250); // €k/month
  const [mix, setMix] = useState({ cardCP: 60, cardCNP: 30, bnpl: 10 });
  const [currentRate, setCurrentRate] = useState(1.45);

  const vivaBlended = useMemo(() => {
    const cp = 0.95;
    const cnp = 1.0;
    const bnpl = 2.9;
    const total = (mix.cardCP * cp + mix.cardCNP * cnp + mix.bnpl * bnpl) / 100;
    return Number(total.toFixed(2));
  }, [mix]);

  const vivaMonthly = Math.round((volume * 1000 * vivaBlended) / 100);
  const currentMonthly = Math.round((volume * 1000 * currentRate) / 100);
  const saving = currentMonthly - vivaMonthly;
  const annualSaving = saving * 12;

  function updateMix(k, v) {
    const rest = Object.keys(mix).filter((x) => x !== k);
    const otherTotal = 100 - Number(v);
    const ratio = mix[rest[0]] + mix[rest[1]];
    const a = ratio === 0 ? otherTotal / 2 : (mix[rest[0]] / ratio) * otherTotal;
    const b = otherTotal - a;
    setMix({ ...mix, [k]: Number(v), [rest[0]]: Math.round(a), [rest[1]]: Math.round(b) });
  }

  return (
    <div>
      <PageHero
        title="Fee Calculator"
        subtitle="Model a merchant's total cost of acceptance on Viva.com vs. their current PSP. Use the saving live in your pitch."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="card p-5 lg:col-span-2 space-y-5">
          <SectionHeader title="Inputs" right={<Calculator size={16} className="text-viva-300" />} />

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Monthly card volume</span>
              <span className="font-semibold text-viva-300">€{volume}k</span>
            </div>
            <input
              type="range" min="20" max="2000" step="10"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full mt-2 accent-viva-500"
            />
          </label>

          <div className="space-y-3">
            {[
              { k: "cardCP", label: "Card-present (%)" },
              { k: "cardCNP", label: "Card-not-present (%)" },
              { k: "bnpl", label: "BNPL (%)" }
            ].map((f) => (
              <label key={f.k} className="block">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{f.label}</span>
                  <span className="font-semibold text-slate-200">{mix[f.k]}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5"
                  value={mix[f.k]}
                  onChange={(e) => updateMix(f.k, e.target.value)}
                  className="w-full mt-2 accent-viva-500"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Current blended rate (%)</span>
              <span className="font-semibold text-slate-200">{currentRate}%</span>
            </div>
            <input
              type="range" min="0.9" max="2.8" step="0.05"
              value={currentRate}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              className="w-full mt-2 accent-viva-500"
            />
          </label>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="card p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">Current monthly cost</div>
              <div className="mt-1 text-3xl font-bold text-slate-100">{formatCurrency(currentMonthly)}</div>
              <div className="text-xs text-slate-400 mt-1">at {currentRate}% blended</div>
            </div>
            <div className="card p-5">
              <div className="text-xs uppercase tracking-wider text-slate-500">Viva.com monthly cost</div>
              <div className="mt-1 text-3xl font-bold text-viva-300">{formatCurrency(vivaMonthly)}</div>
              <div className="text-xs text-slate-400 mt-1">at {vivaBlended}% blended</div>
            </div>
          </div>

          <div className="card p-6 bg-gradient-to-br from-viva-500/10 to-viva-800/10 border-viva-500/20">
            <div className="text-xs uppercase tracking-wider text-viva-300 font-semibold">
              Estimated merchant saving
            </div>
            <div className="mt-1 flex items-end gap-4 flex-wrap">
              <div>
                <div className="text-4xl font-extrabold text-viva-300">{formatCurrency(saving)}/mo</div>
                <div className="text-sm text-slate-400 mt-1">{formatCurrency(annualSaving)} / year</div>
              </div>
              <Badge color={saving > 0 ? "green" : "rose"}>
                {saving > 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                {saving > 0 ? "Cost down" : "Cost up"} vs current
              </Badge>
            </div>
          </div>

          <div className="card p-5">
            <SectionHeader title="Assumptions" subtitle="Used for Viva blended rate" />
            <ul className="text-sm text-slate-400 list-disc pl-5 space-y-1">
              <li>Card-present: 0.95% + €0.05 per transaction</li>
              <li>Card-not-present (Smart Checkout): 1.00% + €0.10 per transaction</li>
              <li>BNPL: 2.90% + €0.20 per instalment sale</li>
              <li>Figures exclude interchange++ opt-in for merchants ≥€250k/mo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
