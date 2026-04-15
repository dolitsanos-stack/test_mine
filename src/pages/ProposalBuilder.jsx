import { useState } from "react";
import { FileText, Sparkles, Download, Send, Plus, Trash2 } from "lucide-react";
import { PageHero, SectionHeader, Badge, formatCurrency } from "../components/ui.jsx";
import { PRODUCTS } from "../data/mockData.js";

export default function ProposalBuilder() {
  const [company, setCompany] = useState("Ionian Resorts");
  const [volume, setVolume] = useState(3200);
  const [items, setItems] = useState([
    { id: 1, product: "smart-checkout", qty: 1, rate: 0.95, monthly: 0 },
    { id: 2, product: "card-terminals", qty: 42, rate: 6, monthly: 252 },
    { id: 3, product: "banking", qty: 1, rate: 0, monthly: 0 }
  ]);

  const productName = (id) => PRODUCTS.find((p) => p.id === id)?.name || id;

  const monthlyFee = items.reduce((s, i) => s + Number(i.monthly || 0), 0);
  const processingSaving = Math.round(volume * 1000 * 0.0022); // assume 0.22% saving
  const netSaving = processingSaving - monthlyFee;

  function addItem() {
    setItems([...items, { id: Date.now(), product: "bnpl", qty: 1, rate: 2.9, monthly: 0 }]);
  }
  function updateItem(id, key, value) {
    setItems(items.map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  }
  function removeItem(id) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div>
      <PageHero
        title="Proposal Builder"
        subtitle="Assemble a merchant-specific commercial proposal in minutes. Pulls pricing, case studies and compliance content straight from the Knowledge Base."
        right={
          <div className="flex gap-2">
            <button className="btn btn-outline"><Download size={14} /> Export PDF</button>
            <button className="btn btn-primary"><Send size={14} /> Send</button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2 space-y-4">
          <SectionHeader title="Proposal details" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-medium text-slate-500">Merchant</span>
              <input className="input mt-1" value={company} onChange={(e) => setCompany(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-500">Est. monthly card volume (€k)</span>
              <input
                type="number"
                className="input mt-1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
              />
            </label>
          </div>

          <SectionHeader title="Line items" right={<button className="btn btn-soft text-xs" onClick={addItem}><Plus size={12} /> Add</button>} />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-white/5">
                  <th className="py-2 pr-2">Product</th>
                  <th className="py-2 pr-2 w-20">Qty</th>
                  <th className="py-2 pr-2 w-28">Rate (% or €)</th>
                  <th className="py-2 pr-2 w-32">Monthly €</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b border-white/5">
                    <td className="py-2 pr-2">
                      <select className="input" value={i.product} onChange={(e) => updateItem(i.id, "product", e.target.value)}>
                        {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </td>
                    <td className="py-2 pr-2">
                      <input className="input" type="number" value={i.qty} onChange={(e) => updateItem(i.id, "qty", Number(e.target.value))} />
                    </td>
                    <td className="py-2 pr-2">
                      <input className="input" type="number" step="0.01" value={i.rate} onChange={(e) => updateItem(i.id, "rate", Number(e.target.value))} />
                    </td>
                    <td className="py-2 pr-2">
                      <input className="input" type="number" value={i.monthly} onChange={(e) => updateItem(i.id, "monthly", Number(e.target.value))} />
                    </td>
                    <td>
                      <button className="btn btn-ghost text-xs" onClick={() => removeItem(i.id)}>
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="btn btn-soft">
            <Sparkles size={14} /> Auto-draft proposal narrative
          </button>
        </div>

        <div className="card p-5">
          <SectionHeader title="Commercial summary" subtitle={company} />
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-400">Monthly card volume</dt>
              <dd className="font-semibold">€{volume.toLocaleString()}k</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Monthly recurring fee</dt>
              <dd className="font-semibold">{formatCurrency(monthlyFee)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Estimated processing saving</dt>
              <dd className="font-semibold text-viva-300">{formatCurrency(processingSaving)}</dd>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between">
              <dt className="font-semibold">Net monthly saving</dt>
              <dd className="font-extrabold text-viva-300 text-lg">{formatCurrency(netSaving)}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <SectionHeader title="Bundle included" />
            <ul className="space-y-1.5">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between text-sm">
                  <span>{productName(i.product)}</span>
                  <Badge color="viva">x{i.qty}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 rounded-xl border border-viva-500/20 bg-viva-500/5 p-4 text-sm">
            <div className="flex items-center gap-2 font-semibold text-viva-300">
              <FileText size={14} /> Offer valid for 14 days
            </div>
            <div className="text-xs text-slate-400 mt-1">Subject to KYC/KYB approval and signed merchant agreement.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
