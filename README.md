# Greece Acquiring Census (Top-500 by Vertical)

This repository now contains a reproducible census builder for Greece-focused merchant targets, prioritized by likelihood to need/acquire card acquiring services.

## Output artifacts

After running the generator, two files are produced under `output/`:

- `greece_acquiring_census_top500_by_vertical.csv`  
  Ranked company-level census per vertical (up to 500 companies each).
- `greece_acquiring_census_summary.md`  
  Delivered counts by vertical and the highest-likelihood companies overall.

## Vertical coverage

The generator covers these MCC-style ranges:

- 0001-1499 Agricultural Services
- 1500-2999 Contracted Services
- 3000-3299 Airlines
- 3300-3499 Car Rental
- 3500-3999 Lodging
- 4000-4799 Transportation Services
- 4800-4999 Utility Services
- 5000-5599 Retail Outlet Services
- 5600-5699 Clothing Stores
- 5700-7299 Miscellaneous Stores
- 7300-7999 Business Services
- 8000-8999 Professional Services and Membership Organizations
- 9000-9999 Government Services

## Ranking logic

The script retrieves entities in Greece from OpenStreetMap via Overpass, then:

1. Maps entities into a target vertical using OSM tags.
2. Deduplicates records to company level using normalized company names.
3. Assigns an `acquiring_likelihood_score` (0-100) from card-acquiring signals such as:
   - brand/operator metadata
   - website and phone presence
   - opening hours and address completeness
   - card/scheme payment tags (`payment:cards`, `payment:visa`, `payment:mastercard`)
4. Ranks and keeps top `N` (default `500`) companies for each vertical.

## Run

```bash
python3 scripts/build_greece_acquiring_census.py --output-dir output --top-n 500 --delay-seconds 0.5
```

## HTML dashboard app (CEO-ready)

An interactive presentation dashboard is available at:

- `app/index.html`

It includes:

- executive KPI cards
- vertical coverage summary
- top opportunities table
- searchable/filterable lead list

### Launch locally

```bash
python3 -m http.server 8080
```

Then open:

- `http://localhost:8080/app/`

The app loads data from:

- `output/greece_acquiring_census_top500_by_vertical.csv`

## One-click offline HTML (no installation, no server)

If you want a single HTML file you can just double-click and present:

```bash
python3 scripts/build_offline_dashboard.py \
  --input-csv output/greece_acquiring_census_top500_by_vertical.csv \
  --output-html output/greece_acquiring_census_dashboard_offline.html
```

Then open this file directly in your browser:

- `output/greece_acquiring_census_dashboard_offline.html`

This standalone file already contains all dashboard code and all rows from the census CSV.

## Notes

- Some verticals may return fewer than 500 companies if source data is sparse.
- Scores represent prioritization signals, not ground-truth acquiring status.