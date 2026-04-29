#!/usr/bin/env python3
"""Build a fully offline CEO dashboard HTML from census CSV."""

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
    <title>Greece Acquiring Census Dashboard (Offline)</title>
    <style>
      :root {{
        color-scheme: light;
        --bg: #f4f7fb;
        --panel: #ffffff;
        --line: #dbe4f0;
        --text: #11223a;
        --muted: #60748c;
        --accent: #1d4ed8;
        --high: #166534;
        --medium: #b45309;
        --low: #9f1239;
      }}
      * {{ box-sizing: border-box; }}
      body {{
        margin: 0;
        font-family: "Inter", "Segoe UI", Roboto, sans-serif;
        background: var(--bg);
        color: var(--text);
      }}
      .hero {{
        background: linear-gradient(135deg, #0f1d40, #1f3f99);
        color: #f8fbff;
        padding: 1.5rem 2rem;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
      }}
      .eyebrow {{
        margin: 0 0 0.35rem;
        font-size: 0.85rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.85;
      }}
      h1 {{ margin: 0; font-size: 1.7rem; }}
      .subhead {{ margin: 0.4rem 0 0; max-width: 64ch; opacity: 0.9; }}
      .meta {{
        display: grid;
        gap: 0.25rem;
        font-size: 0.9rem;
        opacity: 0.9;
      }}
      main {{ padding: 1rem; max-width: 1420px; margin: 0 auto; }}
      .panel {{
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 12px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        padding: 1rem;
        margin-bottom: 1rem;
      }}
      .panel h2 {{ margin-top: 0; font-size: 1.05rem; }}
      .filters-grid {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 0.85rem;
      }}
      label {{
        display: grid;
        gap: 0.35rem;
        font-size: 0.9rem;
        color: var(--muted);
      }}
      input, select {{
        border: 1px solid #c9d7ea;
        border-radius: 8px;
        min-height: 36px;
        font-size: 0.92rem;
        padding: 0.45rem 0.55rem;
        color: var(--text);
        background: #ffffff;
      }}
      input[type="range"] {{ padding: 0; }}
      .kpi-grid {{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.8rem;
        margin-bottom: 1rem;
      }}
      .kpi .label {{ margin: 0; color: var(--muted); font-size: 0.84rem; }}
      .kpi .value {{ margin: 0.35rem 0 0; font-size: 1.3rem; font-weight: 700; }}
      .layout-grid {{
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }}
      @media (min-width: 1080px) {{
        .layout-grid {{ grid-template-columns: 1.2fr 1fr; }}
      }}
      table {{
        border-collapse: collapse;
        width: 100%;
        font-size: 0.87rem;
      }}
      th, td {{
        border-bottom: 1px solid var(--line);
        text-align: left;
        padding: 0.42rem 0.35rem;
        vertical-align: top;
      }}
      th {{
        color: var(--muted);
        font-weight: 600;
        white-space: nowrap;
      }}
      tbody tr:hover {{ background: #f8fbff; }}
      .pill {{
        display: inline-flex;
        align-items: center;
        padding: 0.15rem 0.45rem;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 600;
      }}
      .high {{ background: #dcfce7; color: var(--high); }}
      .medium {{ background: #fef3c7; color: var(--medium); }}
      .low {{ background: #ffe4e6; color: var(--low); }}
      a {{ color: #1d4ed8; }}
      .muted {{ color: var(--muted); }}
    </style>
  </head>
  <body>
    <header class="hero">
      <div>
        <p class="eyebrow">Executive Dashboard (Offline)</p>
        <h1>Greece Merchant Acquiring Census</h1>
        <p class="subhead">Standalone, no-installation dashboard. Open this HTML file directly and present.</p>
      </div>
      <div class="meta">
        <span id="recordCount"></span>
        <span>Generated at: __GENERATED_AT__</span>
      </div>
    </header>

    <main>
      <section class="panel">
        <h2>Filters</h2>
        <div class="filters-grid">
          <label>
            Vertical
            <select id="verticalFilter"><option value="all">All verticals</option></select>
          </label>
          <label>
            Confidence
            <select id="confidenceFilter">
              <option value="all">All confidence levels</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>
            Minimum score: <span id="scoreValue">0</span>
            <input id="scoreFilter" type="range" min="0" max="100" step="1" value="0" />
          </label>
          <label>
            Search company
            <input id="searchFilter" type="search" placeholder="e.g. Lidl, Avis, Zara" />
          </label>
          <label>
            Rows to show
            <select id="limitFilter">
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </section>

      <section class="kpi-grid" id="kpiGrid"></section>

      <section class="layout-grid">
        <article class="panel">
          <h2>Vertical performance snapshot</h2>
          <table>
            <thead>
              <tr>
                <th>Vertical</th>
                <th>Companies</th>
                <th>Avg score</th>
                <th>High confidence</th>
              </tr>
            </thead>
            <tbody id="verticalSummaryBody"></tbody>
          </table>
        </article>

        <article class="panel">
          <h2>Top opportunities (filtered)</h2>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Vertical</th>
                <th>Score</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody id="topLeadsBody"></tbody>
          </table>
        </article>
      </section>

      <section class="panel">
        <h2>Detailed lead list</h2>
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
              <th>Address</th>
            </tr>
          </thead>
          <tbody id="leadTableBody"></tbody>
        </table>
      </section>
    </main>

    <script>
      const ROWS = __EMBEDDED_DATA__;
      const state = {{
        rows: ROWS.map((row) => ({{
          ...row,
          rank: Number(row.rank) || 0,
          acquiring_likelihood_score: Number(row.acquiring_likelihood_score) || 0,
          evidence_count: Number(row.evidence_count) || 0,
        }})),
        filteredRows: [],
      }};

      function escapeHtml(value) {{
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }}

      function setupFilters() {{
        const verticalFilter = document.getElementById("verticalFilter");
        const verticals = new Map();
        state.rows.forEach((row) => {{
          if (!verticals.has(row.vertical_code)) {{
            verticals.set(row.vertical_code, row.vertical_name);
          }}
        }});
        [...verticals.entries()]
          .sort((a, b) => a[0].localeCompare(b[0]))
          .forEach(([code, name]) => {{
            const option = document.createElement("option");
            option.value = code;
            option.textContent = `${{code}} ${{name}}`;
            verticalFilter.appendChild(option);
          }});

        const scoreFilter = document.getElementById("scoreFilter");
        const scoreValue = document.getElementById("scoreValue");
        scoreFilter.addEventListener("input", () => {{
          scoreValue.textContent = scoreFilter.value;
          applyFiltersAndRender();
        }});

        ["verticalFilter", "confidenceFilter", "searchFilter", "limitFilter"].forEach((id) => {{
          document.getElementById(id).addEventListener("input", applyFiltersAndRender);
        }});
      }}

      function applyFiltersAndRender() {{
        const vertical = document.getElementById("verticalFilter").value;
        const confidence = document.getElementById("confidenceFilter").value;
        const minScore = Number(document.getElementById("scoreFilter").value) || 0;
        const search = document.getElementById("searchFilter").value.trim().toLowerCase();

        const filtered = state.rows.filter((row) => {{
          if (vertical !== "all" && row.vertical_code !== vertical) return false;
          if (confidence !== "all" && row.confidence !== confidence) return false;
          if (row.acquiring_likelihood_score < minScore) return false;
          if (search && !row.company_name.toLowerCase().includes(search)) return false;
          return true;
        }});

        state.filteredRows = filtered.sort((a, b) => {{
          if (b.acquiring_likelihood_score !== a.acquiring_likelihood_score) {{
            return b.acquiring_likelihood_score - a.acquiring_likelihood_score;
          }}
          return b.evidence_count - a.evidence_count;
        }});

        renderKpis();
        renderVerticalSummary();
        renderTopLeads();
        renderLeadTable();
      }}

      function renderKpis() {{
        const rows = state.filteredRows;
        const total = rows.length;
        const high = rows.filter((row) => row.confidence === "high").length;
        const medium = rows.filter((row) => row.confidence === "medium").length;
        const avg = total
          ? Math.round(rows.reduce((sum, row) => sum + row.acquiring_likelihood_score, 0) / total)
          : 0;

        const cards = [
          {{ label: "Filtered companies", value: total.toLocaleString() }},
          {{ label: "High confidence", value: high.toLocaleString() }},
          {{ label: "Medium confidence", value: medium.toLocaleString() }},
          {{ label: "Average score", value: String(avg) }},
        ];

        const grid = document.getElementById("kpiGrid");
        grid.innerHTML = "";
        cards.forEach((item) => {{
          const card = document.createElement("article");
          card.className = "panel kpi";
          card.innerHTML = `<p class="label">${{item.label}}</p><p class="value">${{item.value}}</p>`;
          grid.appendChild(card);
        }});
      }}

      function renderVerticalSummary() {{
        const body = document.getElementById("verticalSummaryBody");
        body.innerHTML = "";
        const grouped = new Map();
        state.filteredRows.forEach((row) => {{
          const key = `${{row.vertical_code}}|${{row.vertical_name}}`;
          if (!grouped.has(key)) {{
            grouped.set(key, {{
              vertical_code: row.vertical_code,
              vertical_name: row.vertical_name,
              count: 0,
              high: 0,
              score_sum: 0,
            }});
          }}
          const bucket = grouped.get(key);
          bucket.count += 1;
          bucket.score_sum += row.acquiring_likelihood_score;
          if (row.confidence === "high") bucket.high += 1;
        }});

        [...grouped.values()]
          .sort((a, b) => b.count - a.count)
          .forEach((item) => {{
            const avg = item.count ? Math.round(item.score_sum / item.count) : 0;
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${{escapeHtml(item.vertical_code)}} ${{escapeHtml(item.vertical_name)}}</td>
              <td>${{item.count.toLocaleString()}}</td>
              <td>${{avg}}</td>
              <td>${{item.high.toLocaleString()}}</td>
            `;
            body.appendChild(tr);
          }});
      }}

      function renderTopLeads() {{
        const body = document.getElementById("topLeadsBody");
        body.innerHTML = "";
        state.filteredRows.slice(0, 10).forEach((row) => {{
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${{escapeHtml(row.company_name)}}</td>
            <td>${{escapeHtml(row.vertical_code)}} ${{escapeHtml(row.vertical_name)}}</td>
            <td>${{row.acquiring_likelihood_score}}</td>
            <td><span class="pill ${{row.confidence}}">${{escapeHtml(row.confidence)}}</span></td>
          `;
          body.appendChild(tr);
        }});
      }}

      function renderLeadTable() {{
        const limit = Number(document.getElementById("limitFilter").value) || 20;
        const body = document.getElementById("leadTableBody");
        body.innerHTML = "";
        state.filteredRows.slice(0, limit).forEach((row, index) => {{
          const website = row.website
            ? `<a href="${{escapeHtml(row.website)}}" target="_blank" rel="noopener">Visit</a>`
            : "—";
          const signals = row.signals ? escapeHtml(row.signals.replaceAll(",", ", ")) : "—";
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${{index + 1}}</td>
            <td>${{escapeHtml(row.company_name)}}</td>
            <td>${{escapeHtml(row.vertical_code)}}</td>
            <td>${{row.acquiring_likelihood_score}}</td>
            <td>${{signals}}</td>
            <td>${{website}}</td>
            <td>${{escapeHtml(row.phone || "—")}}</td>
            <td>${{escapeHtml(row.address || "—")}}</td>
          `;
          body.appendChild(tr);
        }});
      }}

      function init() {{
        document.getElementById("recordCount").textContent =
          `${{state.rows.length.toLocaleString()}} companies loaded`;
        setupFilters();
        applyFiltersAndRender();
      }}

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
        help="Input census CSV path (default: output/greece_acquiring_census_top500_by_vertical.csv).",
    )
    parser.add_argument(
        "--output-html",
        default="output/greece_acquiring_census_dashboard_offline.html",
        help="Output standalone HTML path (default: output/greece_acquiring_census_dashboard_offline.html).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    input_csv = Path(args.input_csv)
    output_html = Path(args.output_html)
    output_html.parent.mkdir(parents=True, exist_ok=True)

    with input_csv.open("r", encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))

    embedded = json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    template = HTML_TEMPLATE.replace("{{", "{").replace("}}", "}")
    rendered = template.replace("__EMBEDDED_DATA__", embedded).replace(
        "__GENERATED_AT__", datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    )
    output_html.write_text(rendered, encoding="utf-8")
    print(f"Wrote standalone dashboard: {output_html}")


if __name__ == "__main__":
    main()
