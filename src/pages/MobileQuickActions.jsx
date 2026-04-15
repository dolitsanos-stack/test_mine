import { Smartphone, Phone, Mail, Calendar, Camera, Mic, QrCode, Zap } from "lucide-react";
import { PageHero, SectionHeader, Badge } from "../components/ui.jsx";

const QUICK = [
  { id: "q1", icon: Phone, label: "Log a call", desc: "Dictate a call summary — saved to the lead", color: "viva" },
  { id: "q2", icon: Mail, label: "Send follow-up", desc: "Draft & send in 2 taps", color: "indigo" },
  { id: "q3", icon: Calendar, label: "Book demo", desc: "Create calendar event + invite merchant", color: "sky" },
  { id: "q4", icon: Camera, label: "Scan business card", desc: "OCR → new CRM contact", color: "amber" },
  { id: "q5", icon: Mic, label: "Voice note to deal", desc: "Attach a voice memo", color: "rose" },
  { id: "q6", icon: QrCode, label: "Activate terminal", desc: "Scan QR on-site to provision a POS", color: "green" }
];

export default function MobileQuickActions() {
  return (
    <div>
      <PageHero
        title="Mobile Quick Actions"
        subtitle="Streamline field sales — log a call, send a follow-up, book a demo, scan a business card or provision a terminal, all from your phone."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK.map((q) => {
            const Icon = q.icon;
            return (
              <button
                key={q.id}
                className="card card-hover p-5 text-left"
              >
                <div className="w-11 h-11 rounded-xl bg-viva-500/10 text-viva-300 grid place-items-center">
                  <Icon size={20} />
                </div>
                <div className="mt-4 font-semibold text-slate-100">{q.label}</div>
                <div className="text-xs text-slate-400 mt-1">{q.desc}</div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge color={q.color}><Zap size={12} /> 2 taps</Badge>
                </div>
              </button>
            );
          })}
        </div>

        <div className="card p-5 flex items-center justify-center">
          <div className="relative">
            {/* Phone mockup */}
            <div className="w-64 h-[520px] rounded-[36px] bg-ink-950 border-[10px] border-ink-700 shadow-glow overflow-hidden">
              <div className="h-7 bg-ink-800 flex items-center justify-center text-[10px] text-slate-500">
                viva.com · InsightFlow
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-slate-500">Good morning</div>
                <div className="text-lg font-bold text-slate-100">Alex</div>

                <div className="mt-4 rounded-xl bg-gradient-to-br from-viva-500 to-viva-700 p-4 text-ink-950">
                  <Smartphone size={18} />
                  <div className="text-xs uppercase tracking-wider mt-2 font-semibold opacity-80">
                    Quick action
                  </div>
                  <div className="text-lg font-extrabold mt-1">Log today's call</div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[Phone, Mail, Calendar, Camera].map((I, i) => (
                    <div key={i} className="rounded-xl bg-ink-900 border border-white/5 p-3 grid place-items-center">
                      <I size={18} className="text-viva-300" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  Tap any tile to launch the flow — works offline, syncs when back online.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
