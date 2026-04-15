import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BookOpenCheck,
  Sparkles,
  Wand2,
  Globe2,
  Terminal,
  FileSignature,
  Kanban,
  CalendarClock,
  Calculator,
  Workflow,
  Smartphone,
  LayoutTemplate,
  Users,
  FileText,
  Receipt,
  Mail,
  Monitor,
  Plug,
  Search,
  HelpCircle
} from "lucide-react";

const NAV = [
  { to: "/knowledge", label: "Knowledge Base", icon: BookOpenCheck },
  { to: "/enhance", label: "Enhance & Research", icon: Sparkles },
  { to: "/generate", label: "Generate Content", icon: Wand2 },
  { to: "/landing", label: "Landing Page", icon: Globe2 },
  { to: "/prompt-studio", label: "Prompt Studio", icon: Terminal },
  { to: "/offers", label: "Commercial Offers", icon: FileSignature },
  { to: "/pipeline", label: "Sales Pipeline", icon: Kanban },
  { to: "/activities", label: "Activity Planner", icon: CalendarClock },
  { to: "/fee-benchmark", label: "Fee Benchmark", icon: Calculator },
  { to: "/workflow", label: "Workflow Automation", icon: Workflow },
  { to: "/mobile", label: "Mobile Quick Actions", icon: Smartphone },
  { to: "/template-designer", label: "Template Designer", icon: LayoutTemplate },
  { to: "/crm", label: "CRM Contacts", icon: Users },
  { to: "/proposal-builder", label: "Proposal Builder", icon: FileText },
  { to: "/fee-calculator", label: "Fee Calculator", icon: Receipt },
  { to: "/email-campaigns", label: "Email Campaigns", icon: Mail },
  { to: "/client-portal", label: "Client Portal", icon: Monitor },
  { to: "/integrations", label: "Integrations", icon: Plug }
];

export default function AppShell() {
  const location = useLocation();
  const current = NAV.find((n) => n.to === location.pathname);

  return (
    <div className="app-shell min-h-screen flex text-slate-100">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-ink-950/90 border-r border-white/5 flex flex-col sticky top-0 h-screen">
        <div className="px-5 pt-5 pb-3">
          <div className="text-2xl font-extrabold tracking-tight text-viva-400">
            viva<span className="text-slate-400 font-semibold">.com</span>
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
            Service Content Intelligence
            <br />
            Platform
          </div>
        </div>

        <nav className="px-3 flex-1 overflow-y-auto pb-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link mb-1 ${isActive ? "active" : ""}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-5 pb-5 border-t border-white/5 pt-4">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
            AI-Powered Content Generation
          </div>
          <div className="text-xs text-slate-400 mt-1">Institutional-Grade Output</div>
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-ink-950/75 backdrop-blur border-b border-white/5">
          <div className="flex items-center gap-4 px-8 py-4">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-semibold text-viva-300">
              <span className="status-dot" />
              Platform Active
            </div>
            <div className="flex-1" />
            <div className="relative w-96 max-w-full">
              <Search size={15} className="absolute left-3 top-2.5 text-slate-500" />
              <input
                className="input pl-9 pr-14"
                placeholder="Search KB & content..."
              />
              <span className="absolute right-3 top-1.5 text-[10px] text-slate-500 border border-white/10 rounded-md px-1.5 py-0.5 font-mono">
                ⌘K
              </span>
            </div>
            <button className="btn btn-ghost p-2" aria-label="Help">
              <HelpCircle size={18} />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-viva-400 to-viva-700 text-ink-950 grid place-items-center font-bold">
              AK
            </div>
          </div>
        </header>

        <div className="px-8 py-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
