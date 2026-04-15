import { useMemo, useState } from "react";
import { Upload, Plus, Search, X, FileText, Tag, ChevronDown } from "lucide-react";
import { KB_ITEMS } from "../data/knowledge.js";
import { BigStat, PageHero, Badge } from "../components/ui.jsx";

export default function KnowledgeBase() {
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => {
    if (!q) return KB_ITEMS;
    const needle = q.toLowerCase();
    return KB_ITEMS.filter(
      (k) =>
        k.title.toLowerCase().includes(needle) ||
        k.body.toLowerCase().includes(needle) ||
        k.tags.some((t) => t.includes(needle))
    );
  }, [q]);

  const allTags = Array.from(new Set(KB_ITEMS.flatMap((k) => k.tags)));
  const categoryCount = new Set(KB_ITEMS.map((k) => k.category)).size;

  return (
    <div>
      <PageHero
        title="Knowledge Base"
        subtitle="Centralised repository of Viva.com product intelligence. Upload documents or add entries manually. The AI extracts structured commercial insights for downstream content generation."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <BigStat value={KB_ITEMS.length} label="Knowledge Items" />
        <BigStat value={categoryCount} label="Source Categories" />
        <BigStat value={allTags.length} label="Indexed Tags" />
      </div>

      <section className="card p-6 mb-6">
        <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-viva-300 mb-3">
          Ingest Source Material
        </div>
        <div className="border-2 border-dashed border-white/10 rounded-2xl py-12 px-6 text-center hover:border-viva-500/40 transition">
          <Upload size={28} className="mx-auto text-viva-400" />
          <div className="mt-3 font-semibold text-slate-100">Drop files here or click to browse</div>
          <div className="mt-1 text-xs text-slate-500">Supported: TXT · MD · CSV</div>
        </div>
        <div className="mt-4 flex justify-start">
          <button className="btn btn-soft">
            <Plus size={14} /> Add Entry Manually
          </button>
        </div>
      </section>

      <div className="mb-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            className="input pl-9"
            placeholder="Search knowledge base — titles, body, tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              onClick={() => setQ("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((k) => {
          const isOpen = openId === k.id;
          return (
            <article
              key={k.id}
              className="card card-hover overflow-hidden"
            >
              <button
                className="w-full text-left p-5 flex items-start gap-4"
                onClick={() => setOpenId(isOpen ? null : k.id)}
              >
                <div className="mt-0.5 w-9 h-9 rounded-xl bg-viva-500/10 text-viva-300 grid place-items-center shrink-0">
                  <FileText size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-100">{k.title}</h3>
                      <div className="text-xs text-viva-300 mt-0.5">{k.category}</div>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-slate-500 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {k.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {!isOpen && (
                    <p className="mt-3 text-sm text-slate-400 line-clamp-2">
                      {k.body.replace(/[#*]/g, "").trim().slice(0, 160)}…
                    </p>
                  )}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-[72px]">
                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
{k.body}
                  </pre>
                  <div className="mt-4 flex gap-2">
                    <button className="btn btn-soft text-xs">
                      <Tag size={12} /> Re-extract tags
                    </button>
                    <button className="btn btn-outline text-xs">Edit</button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
        {filtered.length === 0 && (
          <div className="card p-10 text-center text-slate-500">
            No knowledge items match your search.
          </div>
        )}
      </div>
    </div>
  );
}
