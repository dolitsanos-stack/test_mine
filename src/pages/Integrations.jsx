import { Plug, Check, Plus } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const GROUPS = [
  {
    title: "CRM & Sales",
    items: [
      { name: "Salesforce", desc: "2-way sync for Leads, Accounts, Opportunities", status: "Connected" },
      { name: "HubSpot", desc: "Contact + deal sync", status: "Available" },
      { name: "Pipedrive", desc: "Pipeline sync", status: "Available" },
      { name: "Zoho CRM", desc: "Contacts & deals", status: "Available" }
    ]
  },
  {
    title: "Communication",
    items: [
      { name: "Gmail", desc: "Send & log emails", status: "Connected" },
      { name: "Outlook", desc: "Calendar & email", status: "Available" },
      { name: "Slack", desc: "Deal & signal notifications", status: "Connected" },
      { name: "MS Teams", desc: "Channel alerts", status: "Available" }
    ]
  },
  {
    title: "Viva.com core",
    items: [
      { name: "Viva Banking", desc: "Real IBAN settlement account", status: "Connected" },
      { name: "Viva Acquiring", desc: "Card processing & terminals", status: "Connected" },
      { name: "Smart Checkout", desc: "Online payment orchestration", status: "Connected" },
      { name: "Merchant Cash Advance", desc: "Working-capital engine", status: "Connected" }
    ]
  },
  {
    title: "Data & Automation",
    items: [
      { name: "Zapier", desc: "Automations", status: "Connected" },
      { name: "Make", desc: "Automations", status: "Available" },
      { name: "Segment", desc: "Event streaming", status: "Available" },
      { name: "Snowflake", desc: "Warehouse reverse-ETL", status: "Available" }
    ]
  }
];

export default function Integrations() {
  return (
    <div>
      <PageHero
        title="Integrations"
        subtitle="Wire Viva InsightFlow into your tech stack — CRM, email, data and Viva.com's own banking & acquiring APIs."
        right={<button className="btn btn-primary"><Plus size={14} /> Browse marketplace</button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { k: "11", v: "Connected" },
          { k: "18", v: "Available" },
          { k: "24h", v: "Sync latency" },
          { k: "99.98%", v: "Uptime" }
        ].map((s) => (
          <div key={s.v} className="card p-4">
            <div className="text-xs uppercase tracking-wider text-slate-500">{s.v}</div>
            <div className="mt-1 text-2xl font-bold text-viva-300">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {GROUPS.map((g) => (
          <div key={g.title} className="card p-5">
            <SectionHeader title={g.title} right={<Plug size={16} className="text-viva-300" />} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {g.items.map((it) => {
                const connected = it.status === "Connected";
                return (
                  <div
                    key={it.name}
                    className={`rounded-xl border p-4 ${
                      connected
                        ? "border-viva-500/20 bg-viva-500/5"
                        : "border-white/5 bg-ink-900"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-slate-100">{it.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{it.desc}</div>
                      </div>
                      {connected ? (
                        <Badge color="green"><Check size={10} /> Connected</Badge>
                      ) : (
                        <Badge color="slate">Available</Badge>
                      )}
                    </div>
                    <div className="mt-3">
                      <button className={`btn text-xs ${connected ? "btn-outline" : "btn-soft"}`}>
                        {connected ? "Configure" : "Connect"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
