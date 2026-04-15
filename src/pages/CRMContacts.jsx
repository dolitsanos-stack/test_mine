import { useMemo, useState } from "react";
import { Filter, Download, Plus, Mail, Phone, MoreHorizontal } from "lucide-react";
import { PageHero, Badge, ScoreBar, formatCurrency } from "../components/ui.jsx";
import { LEADS, LEAD_STATUSES, INDUSTRIES, COUNTRIES } from "../data/mockData.js";

const STATUS_COLORS = {
  New: "sky",
  Contacted: "indigo",
  Qualified: "green",
  Nurturing: "amber",
  Unqualified: "rose"
};

export default function CRMContacts() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [country, setCountry] = useState("All");

  const filtered = useMemo(() => {
    return LEADS.filter((l) => {
      if (status !== "All" && l.status !== status) return false;
      if (industry !== "All" && l.industry !== industry) return false;
      if (country !== "All" && l.country !== country) return false;
      if (q) {
        const n = q.toLowerCase();
        return (
          l.name.toLowerCase().includes(n) ||
          l.company.toLowerCase().includes(n) ||
          l.email.toLowerCase().includes(n)
        );
      }
      return true;
    });
  }, [q, status, industry, country]);

  return (
    <div>
      <PageHero
        title="CRM Contacts"
        subtitle="Every merchant contact across your pipeline — enriched, scored and owner-assigned."
        right={<button className="btn btn-primary"><Plus size={14} /> Add Contact</button>}
      />

      <div className="card p-4 mb-4 flex flex-col lg:flex-row gap-3 lg:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input flex-1"
          placeholder="Search contacts by name, company, email…"
        />
        <div className="flex flex-wrap gap-2">
          <select className="input !w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="input !w-auto" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option>All</option>
            {INDUSTRIES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="input !w-auto" value={country} onChange={(e) => setCountry(e.target.value)}>
            <option>All</option>
            {COUNTRIES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="btn btn-outline"><Filter size={14} /> More</button>
          <button className="btn btn-outline"><Download size={14} /> Export</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {LEAD_STATUSES.map((s) => {
          const count = LEADS.filter((l) => l.status === s).length;
          return (
            <div key={s} className="card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500">{s}</span>
                <Badge color={STATUS_COLORS[s]}>{count}</Badge>
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-100">{count}</div>
            </div>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-white/5">
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Monthly €</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover-row">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-viva-400 to-viva-700 text-ink-950 grid place-items-center text-xs font-bold">
                        {lead.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-slate-100">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-200">{lead.company}</td>
                  <td className="py-3 px-4 text-slate-400">{lead.industry}</td>
                  <td className="py-3 px-4 text-slate-400">{lead.country}</td>
                  <td className="py-3 px-4 font-medium">{formatCurrency(lead.monthlyVolume)}</td>
                  <td className="py-3 px-4"><ScoreBar value={lead.score} /></td>
                  <td className="py-3 px-4"><Badge color={STATUS_COLORS[lead.status]}>{lead.status}</Badge></td>
                  <td className="py-3 px-4 text-slate-400">{lead.owner}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-white/5 text-slate-400" title="Email"><Mail size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-white/5 text-slate-400" title="Call"><Phone size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-white/5 text-slate-400"><MoreHorizontal size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500">
                    No contacts match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5 text-sm text-slate-400">
          <div>Showing {filtered.length} of {LEADS.length} contacts</div>
          <div className="flex gap-2">
            <button className="btn btn-outline">Previous</button>
            <button className="btn btn-outline">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
