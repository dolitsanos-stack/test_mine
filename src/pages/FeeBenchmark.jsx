import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from "recharts";

const BENCHMARK = [
  { psp: "Viva.com", rate: 1.05, colour: "#1ddcb6" },
  { psp: "Stripe", rate: 1.42, colour: "#8b95b8" },
  { psp: "Adyen", rate: 1.38, colour: "#8b95b8" },
  { psp: "SumUp", rate: 1.95, colour: "#8b95b8" },
  { psp: "Mollie", rate: 1.5, colour: "#8b95b8" },
  { psp: "Nexi", rate: 1.65, colour: "#8b95b8" },
  { psp: "Worldline", rate: 1.58, colour: "#8b95b8" }
];

const COMPETITORS = [
  { name: "Stripe", cardCP: "1.40% + €0.25", cardCNP: "1.40% + €0.25", mca: "—", banking: "—", settlement: "T+2" },
  { name: "Adyen", cardCP: "Interchange + 0.60%", cardCNP: "Interchange + 0.60%", mca: "Capital add-on", banking: "—", settlement: "T+1" },
  { name: "SumUp", cardCP: "1.95%", cardCNP: "2.50%", mca: "—", banking: "Basic", settlement: "Next-day" },
  { name: "Mollie", cardCP: "—", cardCNP: "1.50% + €0.25", mca: "Capital", banking: "—", settlement: "T+2" },
  { name: "Viva.com", cardCP: "0.95% + €0.05", cardCNP: "1.00% + €0.10", mca: "Up to €400k", banking: "Full IBAN", settlement: "Same-day" }
];

export default function FeeBenchmark() {
  return (
    <div>
      <PageHero
        title="Fee Benchmark"
        subtitle="Compare Viva.com pricing against the European PSP landscape. Use the data live in pitches, offers and objection handling."
      />

      <div className="card p-5 mb-6">
        <SectionHeader
          title="Blended card rate (merchant ≤ €500k/mo)"
          subtitle="Lower is better — Viva.com vs. key competitors"
          right={<Badge color="viva">Updated Apr 2026</Badge>}
        />
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={BENCHMARK}>
              <CartesianGrid stroke="#141a2f" vertical={false} />
              <XAxis dataKey="psp" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                contentStyle={{
                  background: "#0b1122",
                  borderRadius: 12,
                  border: "1px solid #1d2749",
                  color: "#e2e8f0",
                  fontSize: 12
                }}
                formatter={(v) => `${v}%`}
              />
              <Bar dataKey="rate" radius={[8, 8, 0, 0]}>
                {BENCHMARK.map((b, i) => (
                  <Cell key={i} fill={b.colour} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card p-5">
        <SectionHeader
          title="Side-by-side matrix"
          subtitle="Including add-on services"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/5">
                <th className="py-3 px-4">PSP</th>
                <th className="py-3 px-4">Card-present</th>
                <th className="py-3 px-4">Card-not-present</th>
                <th className="py-3 px-4">Merchant finance</th>
                <th className="py-3 px-4">Banking</th>
                <th className="py-3 px-4">Settlement</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c) => {
                const isViva = c.name === "Viva.com";
                return (
                  <tr
                    key={c.name}
                    className={`border-b border-white/5 ${isViva ? "bg-viva-500/5" : ""}`}
                  >
                    <td className="py-3 px-4 font-semibold">
                      {isViva ? <span className="text-viva-300">{c.name}</span> : c.name}
                    </td>
                    <td className="py-3 px-4">{c.cardCP}</td>
                    <td className="py-3 px-4">{c.cardCNP}</td>
                    <td className="py-3 px-4">{c.mca}</td>
                    <td className="py-3 px-4">{c.banking}</td>
                    <td className="py-3 px-4">{c.settlement}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
