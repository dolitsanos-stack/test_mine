import { FileSignature, Plus, Eye, Send, Download, Clock } from "lucide-react";
import { PageHero, SectionHeader, Badge, formatCurrency } from "../components/ui.jsx";
import { DEALS } from "../data/mockData.js";

const OFFERS = DEALS.slice(0, 10).map((d, i) => ({
  id: `offer-${i + 1}`,
  number: `VV-2026-${1000 + i}`,
  merchant: d.company,
  amount: d.value,
  status: i % 4 === 0 ? "Draft" : i % 4 === 1 ? "Sent" : i % 4 === 2 ? "Viewed" : "Accepted",
  updated: `${Math.max(1, i + 1)}d ago`,
  expires: `${14 - i}d`
}));

const STATUS_COLOR = {
  Draft: "slate",
  Sent: "sky",
  Viewed: "amber",
  Accepted: "green"
};

export default function CommercialOffers() {
  return (
    <div>
      <PageHero
        title="Commercial Offers"
        subtitle="Generate, send and track merchant-specific commercial offers. Automatically uses the latest approved fee matrix and product bundles."
        right={
          <button className="btn btn-primary"><Plus size={14} /> New Offer</button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { k: "38", v: "Open offers", color: "viva" },
          { k: "12", v: "Accepted (MTD)", color: "green" },
          { k: "€412k", v: "Value in review", color: "sky" },
          { k: "21%", v: "Acceptance rate", color: "amber" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/5">
                <th className="py-3 px-4">Offer #</th>
                <th className="py-3 px-4">Merchant</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Expires</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {OFFERS.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover-row">
                  <td className="py-3 px-4 font-mono text-xs text-slate-400">{o.number}</td>
                  <td className="py-3 px-4 font-medium text-slate-100">{o.merchant}</td>
                  <td className="py-3 px-4">{formatCurrency(o.amount)}</td>
                  <td className="py-3 px-4">
                    <Badge color={STATUS_COLOR[o.status]}>
                      <FileSignature size={12} /> {o.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-1 text-slate-400">
                    <Clock size={12} /> {o.expires}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{o.updated}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="btn btn-ghost text-xs"><Eye size={12} /></button>
                      <button className="btn btn-ghost text-xs"><Send size={12} /></button>
                      <button className="btn btn-ghost text-xs"><Download size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
