#!/usr/bin/env python3
"""Build a Base44-style standalone HTML app from the census CSV."""

from __future__ import annotations

import argparse
import csv
import json
from datetime import datetime, timezone
from pathlib import Path


HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AcquirerOS Greece - Executive App</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0b1020;
        --bg-soft: #121933;
        --panel: #161f3f;
        --panel-2: #1d2850;
        --line: #2e3b6f;
        --text: #edf2ff;
        --muted: #9aabd5;
        --brand: #6ea8ff;
        --brand-2: #4f46e5;
        --high: #22c55e;
        --med: #f59e0b;
        --low: #fb7185;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Inter, "Segoe UI", Roboto, sans-serif;
        background: radial-gradient(circle at 15% 0%, #1a2450 0%, var(--bg) 45%);
        color: var(--text);
      }

      .app-shell {
        display: grid;
        grid-template-columns: 260px 1fr;
        min-height: 100vh;
      }

      .sidebar {
        border-right: 1px solid var(--line);
        background: rgba(9, 14, 31, 0.85);
        backdrop-filter: blur(10px);
        padding: 1.2rem;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        margin-bottom: 1.2rem;
      }

      .brand-badge {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--brand), var(--brand-2));
        display: grid;
        place-items: center;
        font-weight: 700;
        color: #081226;
      }

      .brand h1 {
        margin: 0;
        font-size: 1.02rem;
      }

      .brand p {
        margin: 0.15rem 0 0;
        color: var(--muted);
        font-size: 0.78rem;
      }

      .nav {
        display: grid;
        gap: 0.45rem;
      }

      .nav button {
        width: 100%;
        border: 1px solid transparent;
        border-radius: 10px;
        background: transparent;
        color: var(--text);
        text-align: left;
        padding: 0.68rem 0.75rem;
        font-size: 0.92rem;
        cursor: pointer;
      }

      .nav button.active {
        background: linear-gradient(120deg, #253565, #1d2a56);
        border-color: var(--line);
      }

      .side-note {
        margin-top: 1.2rem;
        padding: 0.8rem;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: rgba(19, 31, 65, 0.5);
        color: var(--muted);
        font-size: 0.82rem;
        line-height: 1.45;
      }

      .main {
        padding: 1.15rem;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 0.8rem;
        margin-bottom: 1rem;
      }

      .title-wrap h2 {
        margin: 0;
        font-size: 1.25rem;
      }

      .title-wrap p {
        margin: 0.3rem 0 0;
        color: var(--muted);
        font-size: 0.9rem;
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.45rem;
        justify-content: flex-end;
      }

      input,
      select {
        border-radius: 10px;
        border: 1px solid var(--line);
        background: var(--panel-2);
        color: var(--text);
        min-height: 36px;
        font-size: 0.88rem;
        padding: 0.42rem 0.52rem;
      }

      .screen {
        display: none;
      }

      .screen.active {
        display: block;
      }

      .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
        gap: 0.7rem;
        margin-bottom: 0.9rem;
      }

      .card,
      .panel {
        background: linear-gradient(150deg, rgba(27, 39, 82, 0.9), rgba(19, 28, 60, 0.9));
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 0.9rem;
      }

      .card .label {
        color: var(--muted);
        font-size: 0.81rem;
      }

      .card .value {
        margin-top: 0.28rem;
        font-size: 1.35rem;
        font-weight: 700;
      }

      .grid-2 {
        display: grid;
        grid-template-columns: 1.1fr 1fr;
        gap: 0.8rem;
      }

      @media (max-width: 1000px) {
        .app-shell {
          grid-template-columns: 1fr;
        }
        .sidebar {
          border-right: none;
          border-bottom: 1px solid var(--line);
        }
        .grid-2 {
          grid-template-columns: 1fr;
        }
      }

      h3 {
        margin: 0 0 0.65rem;
        font-size: 0.98rem;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.84rem;
      }

      th,
      td {
        text-align: left;
        border-bottom: 1px solid rgba(67, 86, 146, 0.55);
        padding: 0.42rem 0.3rem;
        vertical-align: top;
      }

      th {
        color: var(--muted);
        font-weight: 600;
        white-space: nowrap;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        padding: 0.12rem 0.45rem;
        border-radius: 999px;
        font-size: 0.73rem;
        font-weight: 700;
      }

      .high {
        color: #052e16;
        background: #86efac;
      }
      .medium {
        color: #422006;
        background: #fcd34d;
      }
      .low {
        color: #4c0519;
        background: #fda4af;
      }

      .bar-wrap {
        display: grid;
        gap: 0.35rem;
      }

      .bar-row {
        display: grid;
        gap: 0.2rem;
      }

      .bar-row .meta {
        display: flex;
        justify-content: space-between;
        color: var(--muted);
        font-size: 0.78rem;
      }

      .bar {
        height: 8px;
        border-radius: 999px;
        background: rgba(83, 104, 170, 0.35);
        overflow: hidden;
      }

      .bar > span {
        height: 100%;
        display: block;
        background: linear-gradient(90deg, #5ea7ff, #7b61ff);
      }

      .strategy {
        display: grid;
        gap: 0.65rem;
      }

      .strategy .item {
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 0.68rem;
        background: rgba(20, 33, 72, 0.55);
      }

      .muted {
        color: var(--muted);
      }

      a {
        color: #93c5fd;
      }
    </style>
  </head>
  <body>
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-badge">A</div>
          <div>
            <h1>AcquirerOS Greece</h1>
            <p>Base44-style executive app</p>
          </div>
        </div>

        <nav class="nav" id="navButtons">
          <button data-screen="overview" class="active">Overview</button>
          <button data-screen="verticals">Vertical Intelligence</button>
          <button data-screen="leads">Lead Workspace</button>
          <button data-screen="strategy">Action Plan</button>
        </nav>

        <div class="side-note">
          <div><strong>Generated:</strong> __GENERATED_AT__</div>
          <div><strong>Mode:</strong> Fully offline</div>
          <div><strong>Source:</strong> OSM + scoring</div>
        </div>
      </aside>

      <main class="main">
        <div class="topbar">
          <div class="title-wrap">
            <h2 id="screenTitle">Overview</h2>
            <p>Filter live, prioritize fast, present clearly.</p>
          </div>
          <div class="filters">
            <input id="searchFilter" type="search" placeholder="Search company..." />
            <select id="verticalFilter"><option value="all">All verticals</option></select>
            <select id="confidenceFilter">
              <option value="all">All confidence</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select id="limitFilter">
              <option value="20">Top 20</option>
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
            </select>
          </div>
        </div>

        <section id="overview" class="screen active">
          <div class="cards" id="kpiCards"></div>
          <div class="grid-2">
            <article class="panel">
              <h3>Top vertical opportunity density</h3>
              <div id="opportunityBars" class="bar-wrap"></div>
            </article>
            <article class="panel">
              <h3>Top opportunities now</h3>
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Vertical</th>
                    <th>Score</th>
                    <th>Conf.</th>
                  </tr>
                </thead>
                <tbody id="topNowBody"></tbody>
              </table>
            </article>
          </div>
        </section>

        <section id="verticals" class="screen">
          <article class="panel">
            <h3>Vertical performance matrix</h3>
            <table>
              <thead>
                <tr>
                  <th>Vertical</th>
                  <th>Companies</th>
                  <th>Avg score</th>
                  <th>High conf.</th>
                  <th>Opportunity idx</th>
                </tr>
              </thead>
              <tbody id="verticalMatrixBody"></tbody>
            </table>
          </article>
        </section>

        <section id="leads" class="screen">
          <article class="panel">
            <h3>Lead workspace</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Vertical</th>
                  <th>Score</th>
                  <th>Signals</th>
                  <th>Website</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody id="leadWorkspaceBody"></tbody>
            </table>
          </article>
        </section>

        <section id="strategy" class="screen">
          <article class="panel">
            <h3>CEO action plan (auto-generated)</h3>
            <div id="strategyItems" class="strategy"></div>
          </article>
        </section>
      </main>
    </div>

    <script id="seed-data" type="application/json">__EMBEDDED_DATA__</script>
    <script>
      const ROWS = JSON.parse(document.getElementById("seed-data").textContent);

      const state = {
        rows: ROWS.map((row) => ({
          ...row,
          rank: Number(row.rank) || 0,
          acquiring_likelihood_score: Number(row.acquiring_likelihood_score) || 0,
          evidence_count: Number(row.evidence_count) || 0,
        })),
        filteredRows: [],
      };

      function esc(value) {
        return String(value || "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function verticalStats(rows) {
        const grouped = new Map();
        rows.forEach((row) => {
          const key = row.vertical_code;
          if (!grouped.has(key)) {
            grouped.set(key, {
              vertical_code: row.vertical_code,
              vertical_name: row.vertical_name,
              count: 0,
              high: 0,
              score_sum: 0,
            });
          }
          const bucket = grouped.get(key);
          bucket.count += 1;
          bucket.score_sum += row.acquiring_likelihood_score;
          if (row.confidence === "high") bucket.high += 1;
        });

        return [...grouped.values()].map((item) => {
          const avg = item.count ? Math.round(item.score_sum / item.count) : 0;
          const highRate = item.count ? item.high / item.count : 0;
          const opp = Math.round(avg * 0.65 + highRate * 35);
          return {
            ...item,
            avg,
            highRate,
            opportunity: opp,
          };
        });
      }

      function getFilters() {
        return {
          vertical: document.getElementById("verticalFilter").value,
          confidence: document.getElementById("confidenceFilter").value,
          query: document.getElementById("searchFilter").value.trim().toLowerCase(),
          limit: Number(document.getElementById("limitFilter").value) || 20,
        };
      }

      function applyFilters() {
        const f = getFilters();
        state.filteredRows = state.rows
          .filter((row) => {
            if (f.vertical !== "all" && row.vertical_code !== f.vertical) return false;
            if (f.confidence !== "all" && row.confidence !== f.confidence) return false;
            if (f.query && !row.company_name.toLowerCase().includes(f.query)) return false;
            return true;
          })
          .sort((a, b) => {
            if (b.acquiring_likelihood_score !== a.acquiring_likelihood_score) {
              return b.acquiring_likelihood_score - a.acquiring_likelihood_score;
            }
            return b.evidence_count - a.evidence_count;
          });
      }

      function renderCards() {
        const rows = state.filteredRows;
        const high = rows.filter((r) => r.confidence === "high").length;
        const medium = rows.filter((r) => r.confidence === "medium").length;
        const avg = rows.length
          ? Math.round(rows.reduce((sum, r) => sum + r.acquiring_likelihood_score, 0) / rows.length)
          : 0;
        const stats = verticalStats(rows);
        const bestVertical = stats.sort((a, b) => b.opportunity - a.opportunity)[0];

        const cards = [
          { label: "Filtered companies", value: rows.length.toLocaleString() },
          { label: "High confidence", value: high.toLocaleString() },
          { label: "Medium confidence", value: medium.toLocaleString() },
          { label: "Average score", value: String(avg) },
          {
            label: "Top vertical now",
            value: bestVertical ? esc(bestVertical.vertical_name) : "—",
          },
        ];

        const el = document.getElementById("kpiCards");
        el.innerHTML = "";
        cards.forEach((card) => {
          const n = document.createElement("article");
          n.className = "card";
          n.innerHTML = `<div class="label">${card.label}</div><div class="value">${card.value}</div>`;
          el.appendChild(n);
        });
      }

      function renderOverview() {
        const bars = document.getElementById("opportunityBars");
        const top = verticalStats(state.filteredRows)
          .sort((a, b) => b.opportunity - a.opportunity)
          .slice(0, 8);

        bars.innerHTML = "";
        top.forEach((item) => {
          const row = document.createElement("div");
          row.className = "bar-row";
          row.innerHTML = `
            <div class="meta">
              <span>${esc(item.vertical_code)} ${esc(item.vertical_name)}</span>
              <span>IDX ${item.opportunity}</span>
            </div>
            <div class="bar"><span style="width:${Math.min(item.opportunity, 100)}%"></span></div>
          `;
          bars.appendChild(row);
        });

        const topNow = document.getElementById("topNowBody");
        topNow.innerHTML = "";
        state.filteredRows.slice(0, 10).forEach((row) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${esc(row.company_name)}</td>
            <td>${esc(row.vertical_code)}</td>
            <td>${row.acquiring_likelihood_score}</td>
            <td><span class="pill ${esc(row.confidence)}">${esc(row.confidence)}</span></td>
          `;
          topNow.appendChild(tr);
        });
      }

      function renderVerticalMatrix() {
        const body = document.getElementById("verticalMatrixBody");
        body.innerHTML = "";
        verticalStats(state.filteredRows)
          .sort((a, b) => b.opportunity - a.opportunity)
          .forEach((item) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${esc(item.vertical_code)} ${esc(item.vertical_name)}</td>
              <td>${item.count.toLocaleString()}</td>
              <td>${item.avg}</td>
              <td>${item.high.toLocaleString()}</td>
              <td>${item.opportunity}</td>
            `;
            body.appendChild(tr);
          });
      }

      function renderLeadWorkspace() {
        const { limit } = getFilters();
        const body = document.getElementById("leadWorkspaceBody");
        body.innerHTML = "";
        state.filteredRows.slice(0, limit).forEach((row, i) => {
          const website = row.website
            ? `<a href="${esc(row.website)}" target="_blank" rel="noopener">Open</a>`
            : '<span class="muted">—</span>';
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${esc(row.company_name)}</td>
            <td>${esc(row.vertical_code)} ${esc(row.vertical_name)}</td>
            <td>${row.acquiring_likelihood_score}</td>
            <td>${esc((row.signals || "").replaceAll(",", ", ") || "—")}</td>
            <td>${website}</td>
            <td>${esc(row.phone || "—")}</td>
          `;
          body.appendChild(tr);
        });
      }

      function renderStrategy() {
        const container = document.getElementById("strategyItems");
        const top3 = verticalStats(state.filteredRows)
          .sort((a, b) => b.opportunity - a.opportunity)
          .slice(0, 3);

        const items = [
          top3[0]
            ? `Prioritize <strong>${esc(top3[0].vertical_name)}</strong> first (opportunity index ${top3[0].opportunity}).`
            : "No rows match current filters.",
          top3[1]
            ? `Launch parallel outreach in <strong>${esc(top3[1].vertical_name)}</strong> as second wave.`
            : "Set broader filters to reveal more segments.",
          top3[2]
            ? `Use <strong>${esc(top3[2].vertical_name)}</strong> for conversion benchmarking and expansion.`
            : "Focus on high-confidence only for first wave.",
          `Current filtered scope includes <strong>${state.filteredRows.length.toLocaleString()}</strong> companies.`,
        ];

        container.innerHTML = "";
        items.forEach((text) => {
          const node = document.createElement("div");
          node.className = "item";
          node.innerHTML = text;
          container.appendChild(node);
        });
      }

      function renderAll() {
        applyFilters();
        renderCards();
        renderOverview();
        renderVerticalMatrix();
        renderLeadWorkspace();
        renderStrategy();
      }

      function initFilters() {
        const verticalMap = new Map();
        state.rows.forEach((row) => {
          if (!verticalMap.has(row.vertical_code)) {
            verticalMap.set(row.vertical_code, row.vertical_name);
          }
        });
        const verticalFilter = document.getElementById("verticalFilter");
        [...verticalMap.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .forEach(([code, name]) => {
            const opt = document.createElement("option");
            opt.value = code;
            opt.textContent = `${code} ${name}`;
            verticalFilter.appendChild(opt);
          });

        ["searchFilter", "verticalFilter", "confidenceFilter", "limitFilter"].forEach((id) => {
          document.getElementById(id).addEventListener("input", renderAll);
        });
      }

      function initNav() {
        const title = document.getElementById("screenTitle");
        const mapping = {
          overview: "Overview",
          verticals: "Vertical Intelligence",
          leads: "Lead Workspace",
          strategy: "Action Plan",
        };

        document.querySelectorAll("#navButtons button").forEach((btn) => {
          btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-screen");
            document.querySelectorAll("#navButtons button").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
            document.getElementById(key).classList.add("active");
            title.textContent = mapping[key];
          });
        });
      }

      function init() {
        initFilters();
        initNav();
        renderAll();
      }

      init();
    </script>
  </body>
</html>
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--input-csv",
        default="output/greece_acquiring_census_top500_by_vertical.csv",
        help="Input census CSV path.",
    )
    parser.add_argument(
        "--output-html",
        default="output/base44_style_greece_acquiring_app.html",
        help="Output standalone app HTML path.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    input_csv = Path(args.input_csv)
    output_html = Path(args.output_html)
    output_html.parent.mkdir(parents=True, exist_ok=True)

    with input_csv.open("r", encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))

    embedded = json.dumps(rows, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    rendered = (
        HTML_TEMPLATE.replace("__EMBEDDED_DATA__", embedded).replace(
            "__GENERATED_AT__", datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        )
    )
    output_html.write_text(rendered, encoding="utf-8")
    print(f"Wrote app: {output_html}")


if __name__ == "__main__":
    main()
