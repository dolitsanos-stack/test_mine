#!/usr/bin/env python3
"""Build a Greece merchant-acquiring census by MCC-style vertical."""

from __future__ import annotations

import argparse
import csv
import json
import re
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Tuple


OVERPASS_URL = "https://overpass-api.de/api/interpreter"
USER_AGENT = "greece-acquiring-census-bot/1.0"


@dataclass(frozen=True)
class Vertical:
    code: str
    name: str
    filters: Tuple[Tuple[str, str], ...]
    base_score: int


VERTICALS: Tuple[Vertical, ...] = (
    Vertical(
        "0001-1499",
        "Agricultural Services",
        (
            ("shop", "farm"),
            ("amenity", "veterinary"),
            ("craft", "agricultural_engines"),
            ("office", "agricultural"),
        ),
        24,
    ),
    Vertical(
        "1500-2999",
        "Contracted Services",
        (
            ("craft", "electrician|plumber|carpenter|painter|hvac"),
            ("office", "construction_company|architect|surveyor"),
            ("shop", "trade"),
        ),
        30,
    ),
    Vertical(
        "3000-3299",
        "Airlines",
        (
            ("office", "airline"),
            ("aeroway", "terminal"),
            ("amenity", "airport"),
        ),
        38,
    ),
    Vertical(
        "3300-3499",
        "Car Rental",
        (
            ("amenity", "car_rental"),
            ("shop", "car_rental"),
            ("office", "car_rental"),
        ),
        42,
    ),
    Vertical(
        "3500-3999",
        "Lodging",
        (
            ("tourism", "hotel|motel|hostel|guest_house|apartment"),
            ("tourism", "resort"),
        ),
        45,
    ),
    Vertical(
        "4000-4799",
        "Transportation Services",
        (
            ("amenity", "bus_station|taxi|ferry_terminal|parking"),
            ("railway", "station"),
            ("public_transport", "station"),
        ),
        38,
    ),
    Vertical(
        "4800-4999",
        "Utility Services",
        (
            ("office", "energy_supplier|water_utility|telecommunication"),
            ("power", "plant|substation"),
            ("man_made", "water_works"),
        ),
        18,
    ),
    Vertical(
        "5000-5599",
        "Retail Outlet Services",
        (
            ("shop", "supermarket|department_store|mall|convenience|wholesale"),
            ("amenity", "marketplace"),
        ),
        48,
    ),
    Vertical(
        "5600-5699",
        "Clothing Stores",
        (
            ("shop", "clothes|shoes|boutique|fashion_accessories"),
        ),
        50,
    ),
    Vertical(
        "5700-7299",
        "Miscellaneous Stores",
        (
            ("shop", "electronics|furniture|hardware|mobile_phone|beauty"),
            ("shop", "books|sports|toys|jewelry"),
        ),
        44,
    ),
    Vertical(
        "7300-7999",
        "Business Services",
        (
            ("office", "it|consulting|financial|advertising|coworking"),
            ("office", "company"),
        ),
        34,
    ),
    Vertical(
        "8000-8999",
        "Professional Services and Membership Organizations",
        (
            ("office", "lawyer|accountant|ngo|association"),
            ("amenity", "clinic|hospital|doctors"),
            ("amenity", "school|university"),
        ),
        34,
    ),
    Vertical(
        "9000-9999",
        "Government Services",
        (
            ("office", "government"),
            ("amenity", "townhall|courthouse|police|embassy"),
        ),
        12,
    ),
)


LEGAL_SUFFIXES = {
    "ae",
    "ae",
    "a.e",
    "sa",
    "ltd",
    "llc",
    "ike",
    "epe",
    "oe",
    "pc",
    "inc",
    "co",
    "company",
}


def normalize_name(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_value = ascii_value.lower()
    ascii_value = re.sub(r"[^a-z0-9\s]", " ", ascii_value)
    tokens = [tok for tok in ascii_value.split() if tok and tok not in LEGAL_SUFFIXES]
    return " ".join(tokens)


def build_overpass_query(vertical: Vertical) -> str:
    filter_lines = []
    for key, pattern in vertical.filters:
        filter_lines.append(f'  nwr(area.searchArea)["{key}"~"{pattern}"]["name"];')
    filters_block = "\n".join(filter_lines)
    return f"""
[out:json][timeout:240];
area["ISO3166-1"="GR"][admin_level=2]->.searchArea;
(
{filters_block}
);
out center tags qt;
""".strip()


def fetch_vertical(vertical: Vertical, retries: int = 3) -> List[Dict]:
    payload = urllib.parse.urlencode({"data": build_overpass_query(vertical)}).encode("utf-8")
    request = urllib.request.Request(
        OVERPASS_URL,
        data=payload,
        headers={"Content-Type": "application/x-www-form-urlencoded", "User-Agent": USER_AGENT},
        method="POST",
    )
    backoff = 2
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(request, timeout=300) as response:
                raw = response.read().decode("utf-8")
            data = json.loads(raw)
            return data.get("elements", [])
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            if attempt >= retries:
                raise RuntimeError(f"Overpass query failed for {vertical.code}: {exc}") from exc
            time.sleep(backoff)
            backoff *= 2
    return []


def get_lat_lon(element: Dict) -> Tuple[float | None, float | None]:
    if "lat" in element and "lon" in element:
        return element["lat"], element["lon"]
    center = element.get("center", {})
    return center.get("lat"), center.get("lon")


def score_entry(tags: Dict[str, str], base: int) -> Tuple[int, List[str]]:
    score = base
    signals: List[str] = []
    if tags.get("brand") or tags.get("brand:wikidata"):
        score += 16
        signals.append("brand")
    if tags.get("operator"):
        score += 10
        signals.append("operator")
    if tags.get("website") or tags.get("contact:website"):
        score += 12
        signals.append("website")
    if tags.get("phone") or tags.get("contact:phone"):
        score += 10
        signals.append("phone")
    if tags.get("opening_hours"):
        score += 8
        signals.append("opening_hours")
    if tags.get("addr:street") or tags.get("addr:city"):
        score += 5
        signals.append("address")
    if tags.get("payment:cards") in {"yes", "only"}:
        score += 14
        signals.append("cards_enabled")
    if tags.get("payment:visa") == "yes" or tags.get("payment:mastercard") == "yes":
        score += 8
        signals.append("scheme_support")

    name = tags.get("name", "")
    if re.search(r"\b(gr|ae|sa|ltd|group|holdings?)\b", name, flags=re.IGNORECASE):
        score += 6
        signals.append("corporate_name")

    return min(score, 100), signals


def confidence(score: int) -> str:
    if score >= 70:
        return "high"
    if score >= 50:
        return "medium"
    return "low"


def address_from_tags(tags: Dict[str, str]) -> str:
    parts = [
        tags.get("addr:street", ""),
        tags.get("addr:housenumber", ""),
        tags.get("addr:postcode", ""),
        tags.get("addr:city", ""),
    ]
    cleaned = " ".join(p for p in parts if p).strip()
    return re.sub(r"\s+", " ", cleaned)


def best_company_rows(vertical: Vertical, elements: Iterable[Dict], max_rows: int) -> List[Dict]:
    grouped: Dict[str, Dict] = {}
    for element in elements:
        tags = element.get("tags", {})
        name = (tags.get("name") or "").strip()
        if len(name) < 3:
            continue

        company_key = normalize_name(name)
        if len(company_key) < 3:
            continue

        score, signals = score_entry(tags, vertical.base_score)
        lat, lon = get_lat_lon(element)
        row = {
            "vertical_code": vertical.code,
            "vertical_name": vertical.name,
            "company_name": name,
            "company_key": company_key,
            "acquiring_likelihood_score": score,
            "confidence": confidence(score),
            "signals": ",".join(signals),
            "osm_type": element.get("type", ""),
            "osm_id": element.get("id", ""),
            "lat": lat if lat is not None else "",
            "lon": lon if lon is not None else "",
            "website": tags.get("website", tags.get("contact:website", "")),
            "phone": tags.get("phone", tags.get("contact:phone", "")),
            "address": address_from_tags(tags),
            "source_tags_json": json.dumps(tags, ensure_ascii=True, sort_keys=True),
        }

        current = grouped.get(company_key)
        if current is None:
            row["evidence_count"] = 1
            grouped[company_key] = row
            continue

        current["evidence_count"] += 1
        if score > current["acquiring_likelihood_score"]:
            row["evidence_count"] = current["evidence_count"]
            grouped[company_key] = row

    ranked = sorted(
        grouped.values(),
        key=lambda item: (item["acquiring_likelihood_score"], item["evidence_count"], item["company_name"]),
        reverse=True,
    )
    for idx, item in enumerate(ranked[:max_rows], start=1):
        item["rank"] = idx
    return ranked[:max_rows]


def write_csv(path: Path, rows: List[Dict]) -> None:
    if not rows:
        return
    fieldnames = [
        "vertical_code",
        "vertical_name",
        "rank",
        "company_name",
        "company_key",
        "acquiring_likelihood_score",
        "confidence",
        "signals",
        "evidence_count",
        "osm_type",
        "osm_id",
        "lat",
        "lon",
        "website",
        "phone",
        "address",
        "source_tags_json",
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def write_summary(path: Path, census_rows: List[Dict], per_vertical_counts: Dict[str, int]) -> None:
    lines = [
        "# Greece merchant-acquiring census",
        "",
        "Generated from OpenStreetMap (Overpass) data and ranked with a card-acquiring propensity score.",
        "",
        "| Vertical | Requested Top N | Delivered Companies |",
        "| --- | ---: | ---: |",
    ]
    for vertical in VERTICALS:
        lines.append(f"| {vertical.code} {vertical.name} | 500 | {per_vertical_counts.get(vertical.code, 0)} |")

    lines.extend(["", "## Top 10 highest-likelihood companies across all verticals", ""])
    top_global = sorted(
        census_rows,
        key=lambda item: (item["acquiring_likelihood_score"], item["evidence_count"]),
        reverse=True,
    )[:10]

    lines.append("| Company | Vertical | Score | Confidence |")
    lines.append("| --- | --- | ---: | --- |")
    for row in top_global:
        lines.append(
            f"| {row['company_name']} | {row['vertical_code']} {row['vertical_name']} | "
            f"{row['acquiring_likelihood_score']} | {row['confidence']} |"
        )

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def run(output_dir: Path, top_n: int, delay_seconds: float) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    all_rows: List[Dict] = []
    per_vertical_counts: Dict[str, int] = {}

    for idx, vertical in enumerate(VERTICALS):
        print(f"[{idx + 1}/{len(VERTICALS)}] Fetching {vertical.code} {vertical.name} ...")
        elements = fetch_vertical(vertical)
        rows = best_company_rows(vertical, elements, top_n)
        print(f"  -> fetched {len(elements)} entities, retained {len(rows)} companies")
        all_rows.extend(rows)
        per_vertical_counts[vertical.code] = len(rows)
        if delay_seconds > 0:
            time.sleep(delay_seconds)

    csv_path = output_dir / "greece_acquiring_census_top500_by_vertical.csv"
    summary_path = output_dir / "greece_acquiring_census_summary.md"
    write_csv(csv_path, all_rows)
    write_summary(summary_path, all_rows, per_vertical_counts)
    print(f"Wrote CSV: {csv_path}")
    print(f"Wrote summary: {summary_path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output-dir",
        default="output",
        help="Directory where census artifacts will be written (default: output).",
    )
    parser.add_argument(
        "--top-n",
        default=500,
        type=int,
        help="Maximum number of companies per vertical (default: 500).",
    )
    parser.add_argument(
        "--delay-seconds",
        default=1.0,
        type=float,
        help="Delay between Overpass calls to be polite (default: 1.0).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    run(Path(args.output_dir), top_n=args.top_n, delay_seconds=args.delay_seconds)


if __name__ == "__main__":
    main()
