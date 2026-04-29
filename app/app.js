const CSV_PATH = "../output/greece_acquiring_census_top500_by_vertical.csv";

const state = {
  rows: [],
  filteredRows: [],
  verticals: new Map(),
};

function parseCsv(text) {
  const rows = [];
  let current = "";
  let inQuotes = false;
  const parsed = [];
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      parsed.push(current);
      current = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      parsed.push(current);
      if (parsed.length > 1 || parsed[0] !== "") {
        rows.push(parsed.slice());
      }
      parsed.length = 0;
      current = "";
      continue;
    }
    current += char;
  }
  if (current || parsed.length) {
    parsed.push(current);
    rows.push(parsed);
  }

  const [header, ...data] = rows;
  return data.map((line) => {
    const item = {};
    header.forEach((key, index) => {
      item[key] = line[index] ?? "";
    });
    return item;
  });
}

function asNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalizeRows(rows) {
  return rows.map((row) => ({
    ...row,
    rank: asNumber(row.rank),
    acquiring_likelihood_score: asNumber(row.acquiring_likelihood_score),
    evidence_count: asNumber(row.evidence_count),
  }));
}

function uniqueVerticals(rows) {
  const map = new Map();
  rows.forEach((row) => {
    if (!map.has(row.vertical_code)) {
      map.set(row.vertical_code, row.vertical_name);
    }
  });
  return new Map([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function setupFilters() {
  const verticalFilter = document.getElementById("verticalFilter");
  state.verticals.forEach((name, code) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} ${name}`;
    verticalFilter.appendChild(option);
  });

  const scoreFilter = document.getElementById("scoreFilter");
  const scoreValue = document.getElementById("scoreValue");
  scoreFilter.addEventListener("input", () => {
    scoreValue.textContent = scoreFilter.value;
    applyFiltersAndRender();
  });

  ["verticalFilter", "confidenceFilter", "searchFilter", "limitFilter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", applyFiltersAndRender);
  });
}

function applyFiltersAndRender() {
  const vertical = document.getElementById("verticalFilter").value;
  const confidence = document.getElementById("confidenceFilter").value;
  const minScore = asNumber(document.getElementById("scoreFilter").value);
  const search = document.getElementById("searchFilter").value.trim().toLowerCase();

  const filtered = state.rows.filter((row) => {
    if (vertical !== "all" && row.vertical_code !== vertical) return false;
    if (confidence !== "all" && row.confidence !== confidence) return false;
    if (row.acquiring_likelihood_score < minScore) return false;
    if (search && !row.company_name.toLowerCase().includes(search)) return false;
    return true;
  });

  state.filteredRows = filtered.sort((a, b) => {
    if (b.acquiring_likelihood_score !== a.acquiring_likelihood_score) {
      return b.acquiring_likelihood_score - a.acquiring_likelihood_score;
    }
    return b.evidence_count - a.evidence_count;
  });

  renderKpis();
  renderVerticalSummary();
  renderTopLeads();
  renderLeadTable();
}

function renderKpis() {
  const rows = state.filteredRows;
  const total = rows.length;
  const high = rows.filter((row) => row.confidence === "high").length;
  const medium = rows.filter((row) => row.confidence === "medium").length;
  const avg = total
    ? Math.round(rows.reduce((sum, row) => sum + row.acquiring_likelihood_score, 0) / total)
    : 0;

  const kpis = [
    { label: "Filtered companies", value: total.toLocaleString() },
    { label: "High confidence", value: high.toLocaleString() },
    { label: "Medium confidence", value: medium.toLocaleString() },
    { label: "Average score", value: avg.toString() },
  ];
  const grid = document.getElementById("kpiGrid");
  grid.innerHTML = "";
  kpis.forEach((kpi) => {
    const card = document.createElement("article");
    card.className = "panel kpi";
    card.innerHTML = `<p class="label">${kpi.label}</p><p class="value">${kpi.value}</p>`;
    grid.appendChild(card);
  });
}

function renderVerticalSummary() {
  const body = document.getElementById("verticalSummaryBody");
  body.innerHTML = "";
  const grouped = new Map();
  state.filteredRows.forEach((row) => {
    const key = `${row.vertical_code}|${row.vertical_name}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        vertical_code: row.vertical_code,
        vertical_name: row.vertical_name,
        count: 0,
        high: 0,
        scoreSum: 0,
      });
    }
    const bucket = grouped.get(key);
    bucket.count += 1;
    bucket.scoreSum += row.acquiring_likelihood_score;
    if (row.confidence === "high") bucket.high += 1;
  });

  [...grouped.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 13)
    .forEach((item) => {
      const tr = document.createElement("tr");
      const avg = item.count ? Math.round(item.scoreSum / item.count) : 0;
      tr.innerHTML = `
        <td>${item.vertical_code} ${item.vertical_name}</td>
        <td>${item.count.toLocaleString()}</td>
        <td>${avg}</td>
        <td>${item.high.toLocaleString()}</td>
      `;
      body.appendChild(tr);
    });
}

function renderTopLeads() {
  const body = document.getElementById("topLeadsBody");
  body.innerHTML = "";
  state.filteredRows.slice(0, 10).forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(row.company_name)}</td>
      <td>${row.vertical_code} ${escapeHtml(row.vertical_name)}</td>
      <td>${row.acquiring_likelihood_score}</td>
      <td><span class="confidence-pill ${row.confidence}">${row.confidence}</span></td>
    `;
    body.appendChild(tr);
  });
}

function renderLeadTable() {
  const limit = asNumber(document.getElementById("limitFilter").value);
  const body = document.getElementById("leadTableBody");
  body.innerHTML = "";
  state.filteredRows.slice(0, limit).forEach((row, index) => {
    const website = row.website
      ? `<a href="${escapeHtml(row.website)}" target="_blank" rel="noopener">Visit</a>`
      : "—";
    const signals = row.signals ? escapeHtml(row.signals.replaceAll(",", ", ")) : "—";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${escapeHtml(row.company_name)}</td>
      <td>${row.vertical_code}</td>
      <td>${row.acquiring_likelihood_score}</td>
      <td>${signals}</td>
      <td>${website}</td>
      <td>${escapeHtml(row.phone || "—")}</td>
      <td>${escapeHtml(row.address || "—")}</td>
    `;
    body.appendChild(tr);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function init() {
  const target = document.getElementById("recordCount");
  try {
    const response = await fetch(CSV_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load CSV (${response.status})`);
    }
    const text = await response.text();
    state.rows = normalizeRows(parseCsv(text));
    state.verticals = uniqueVerticals(state.rows);
    target.textContent = `${state.rows.length.toLocaleString()} companies loaded`;

    setupFilters();
    applyFiltersAndRender();
  } catch (error) {
    target.textContent = "Could not load dataset";
    console.error(error);
    alert(
      "The dashboard could not load the CSV. Start a local server from repo root, e.g. `python3 -m http.server 8080` and open /app/."
    );
  }
}

init();
