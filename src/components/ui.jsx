import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function formatCurrency(n, currency = "EUR") {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(n);
}

export function formatNumber(n) {
  return new Intl.NumberFormat("en-GB").format(n);
}

export function StatCard({ label, value, delta, deltaLabel = "vs last 30d", icon: Icon }) {
  const positive = delta >= 0;
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
        {Icon ? (
          <span className="w-9 h-9 rounded-xl grid place-items-center bg-viva-500/10 text-viva-300">
            <Icon size={16} />
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-3xl font-bold text-slate-100 tracking-tight">{value}</div>
      {delta !== undefined && (
        <div
          className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
            positive ? "text-viva-300" : "text-rose-400"
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {positive ? "+" : ""}
          {delta}% <span className="text-slate-500 font-normal">{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}

export function PageHero({ title, subtitle, right }) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-viva-300 tracking-tight">{title}</h1>
          {subtitle && <p className="text-sm text-slate-400 max-w-3xl mt-2">{subtitle}</p>}
        </div>
        {right}
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Badge({ children, color = "slate" }) {
  const map = {
    slate: "bg-white/5 text-slate-300 border border-white/10",
    viva: "bg-viva-500/10 text-viva-300 border border-viva-500/20",
    green: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
    sky: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    indigo: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
    orange: "bg-orange-500/10 text-orange-300 border border-orange-500/20",
    purple: "bg-purple-500/10 text-purple-300 border border-purple-500/20"
  };
  return <span className={`chip ${map[color] || map.slate}`}>{children}</span>;
}

export function ScoreBar({ value }) {
  const color =
    value >= 75 ? "bg-viva-400" : value >= 50 ? "bg-amber-400" : "bg-rose-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium w-6 text-right text-slate-300">{value}</span>
    </div>
  );
}

export function BigStat({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-ink-850/70 p-6 text-center">
      <div className="stat-num">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
        {label}
      </div>
    </div>
  );
}
