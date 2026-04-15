import { Mail, Send, Play, Pause, TrendingUp } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const CAMPAIGNS = [
  { id: "c1", name: "Greek Retail Q2 launch", audience: 842, sent: 842, opened: 512, replied: 72, status: "Running" },
  { id: "c2", name: "DTC Italy re-engage", audience: 410, sent: 410, opened: 208, replied: 41, status: "Running" },
  { id: "c3", name: "Hospitality Aegean 2026", audience: 228, sent: 228, opened: 159, replied: 38, status: "Completed" },
  { id: "c4", name: "MCA pre-approval drop", audience: 1260, sent: 0, opened: 0, replied: 0, status: "Draft" }
];

const TREND = [
  { day: "Mon", opens: 120, replies: 18 },
  { day: "Tue", opens: 182, replies: 26 },
  { day: "Wed", opens: 210, replies: 31 },
  { day: "Thu", opens: 168, replies: 22 },
  { day: "Fri", opens: 140, replies: 19 }
];

export default function EmailCampaigns() {
  return (
    <div>
      <PageHero
        title="Email Campaigns"
        subtitle="Launch targeted merchant email sequences from segments, auto-personalised from the Knowledge Base."
        right={<button className="btn btn-primary"><Send size={14} /> New Campaign</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { k: "4", v: "Active campaigns" },
          { k: "2,740", v: "Merchants reached" },
          { k: "54%", v: "Open rate" },
          { k: "8.2%", v: "Reply rate" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <SectionHeader
          title="This week's engagement"
          subtitle="Opens and replies"
          right={<Badge color="green"><TrendingUp size={12} /> up 12%</Badge>}
        />
        <div className="h-56">
          <ResponsiveContainer>
            <AreaChart data={TREND}>
              <defs>
                <linearGradient id="opens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1ddcb6" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#1ddcb6" stopOpacity={0.03} />
                </linearGradient>
                <linearGradient id="replies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eb8b2a" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#eb8b2a" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#141a2f" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#0b1122",
                  borderRadius: 12,
                  border: "1px solid #1d2749",
                  color: "#e2e8f0",
                  fontSize: 12
                }}
              />
              <Area type="monotone" dataKey="opens" stroke="#1ddcb6" fill="url(#opens)" strokeWidth={2} />
              <Area type="monotone" dataKey="replies" stroke="#eb8b2a" fill="url(#replies)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/5">
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4">Audience</th>
                <th className="py-3 px-4">Sent</th>
                <th className="py-3 px-4">Open rate</th>
                <th className="py-3 px-4">Reply rate</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {CAMPAIGNS.map((c) => {
                const open = c.sent ? Math.round((c.opened / c.sent) * 100) : 0;
                const reply = c.sent ? Math.round((c.replied / c.sent) * 100) : 0;
                const color = c.status === "Running" ? "green" : c.status === "Completed" ? "slate" : "amber";
                return (
                  <tr key={c.id} className="border-b border-white/5 hover-row">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <Mail size={14} className="text-viva-300" />
                      <span className="font-medium text-slate-100">{c.name}</span>
                    </td>
                    <td className="py-3 px-4">{c.audience.toLocaleString()}</td>
                    <td className="py-3 px-4">{c.sent.toLocaleString()}</td>
                    <td className="py-3 px-4">{open}%</td>
                    <td className="py-3 px-4">{reply}%</td>
                    <td className="py-3 px-4"><Badge color={color}>{c.status}</Badge></td>
                    <td className="py-3 px-4">
                      {c.status === "Running" ? (
                        <button className="btn btn-ghost text-xs"><Pause size={12} /></button>
                      ) : (
                        <button className="btn btn-ghost text-xs"><Play size={12} /></button>
                      )}
                    </td>
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
