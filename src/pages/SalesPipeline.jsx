import { useMemo, useState } from "react";
import { DollarSign, Clock, User, Filter, Plus } from "lucide-react";
import { DEAL_STAGES, DEALS, PRODUCTS } from "../data/mockData.js";
import { PageHero, formatCurrency, Badge } from "../components/ui.jsx";

export default function SalesPipeline() {
  const [owner, setOwner] = useState("All");

  const dealsByStage = useMemo(() => {
    const map = {};
    DEAL_STAGES.forEach((s) => (map[s.id] = []));
    DEALS.forEach((d) => {
      if (owner !== "All" && d.owner !== owner) return;
      if (map[d.stage]) map[d.stage].push(d);
    });
    return map;
  }, [owner]);

  const productName = (id) => PRODUCTS.find((p) => p.id === id)?.name || id;

  const totalValue = (stageId) =>
    (dealsByStage[stageId] || []).reduce((sum, d) => sum + d.value, 0);

  const owners = Array.from(new Set(DEALS.map((d) => d.owner)));
  const totalPipeline = Object.values(dealsByStage).flat().reduce((a, b) => a + b.value, 0);

  return (
    <div>
      <PageHero
        title="Sales Pipeline"
        subtitle="Every merchant deal from discovery to closed-won. Drag cards across stages as opportunities progress."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
        {[
          { k: formatCurrency(totalPipeline), v: "Open pipeline" },
          { k: formatCurrency(totalValue("won")), v: "Closed won" },
          { k: Object.values(dealsByStage).flat().length, v: "Active deals" },
          { k: "18d", v: "Avg. cycle" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="card p-3 mb-4 flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-500 ml-2">Owner:</div>
        <select className="input !w-auto" value={owner} onChange={(e) => setOwner(e.target.value)}>
          <option>All</option>
          {owners.map((o) => <option key={o}>{o}</option>)}
        </select>
        <div className="flex-1" />
        <button className="btn btn-outline"><Filter size={14} /> Advanced</button>
        <button className="btn btn-primary"><Plus size={14} /> New Deal</button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {DEAL_STAGES.map((stage) => {
            const deals = dealsByStage[stage.id] || [];
            return (
              <div key={stage.id} className="kanban-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{stage.name}</span>
                    <span className="text-xs text-slate-500">{deals.length}</span>
                  </div>
                  <div className="text-xs font-semibold text-viva-300">
                    {formatCurrency(totalValue(stage.id))}
                  </div>
                </div>
                <div className="space-y-2">
                  {deals.map((d) => (
                    <div
                      key={d.id}
                      className="bg-ink-900 rounded-xl border border-white/5 p-3 hover:border-viva-500/30 transition cursor-grab"
                    >
                      <div className="text-sm font-semibold line-clamp-2 text-slate-100">{d.title}</div>
                      <div className="mt-2 flex items-center gap-1 flex-wrap">
                        <Badge color="viva">{productName(d.productId)}</Badge>
                        <Badge color="slate">{d.country}</Badge>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1"><DollarSign size={12} /> {formatCurrency(d.value)}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {d.closeInDays}d</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <User size={12} /> {d.owner}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full bg-viva-400"
                              style={{ width: `${d.probability}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-200">{d.probability}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {deals.length === 0 && (
                    <div className="text-xs text-slate-500 text-center py-8 border border-dashed border-white/10 rounded-xl">
                      No deals
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
