// Mock data for the Viva InsightFlow sales enablement platform.
// All figures are illustrative and intended for demo purposes only.

export const COUNTRIES = [
  "Greece",
  "Italy",
  "Spain",
  "France",
  "Germany",
  "Belgium",
  "Austria",
  "Portugal",
  "Romania",
  "Cyprus",
  "Ireland",
  "UK",
  "Netherlands",
  "Bulgaria",
  "Croatia"
];

export const INDUSTRIES = [
  "Retail",
  "Hospitality",
  "F&B",
  "E-commerce",
  "Travel",
  "Healthcare",
  "Professional Services",
  "Automotive",
  "Entertainment",
  "Education",
  "Non-profit",
  "Fitness"
];

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Nurturing", "Unqualified"];

export const DEAL_STAGES = [
  { id: "discovery", name: "Discovery", color: "bg-slate-200 text-slate-700" },
  { id: "qualified", name: "Qualified", color: "bg-sky-100 text-sky-700" },
  { id: "demo", name: "Demo Booked", color: "bg-indigo-100 text-indigo-700" },
  { id: "proposal", name: "Proposal Sent", color: "bg-amber-100 text-amber-700" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-100 text-orange-700" },
  { id: "won", name: "Closed Won", color: "bg-emerald-100 text-emerald-700" },
  { id: "lost", name: "Closed Lost", color: "bg-rose-100 text-rose-700" }
];

export const PRODUCTS = [
  {
    id: "smart-checkout",
    name: "Smart Checkout",
    tagline: "One-click payments for e-commerce",
    category: "Online Payments",
    icon: "ShoppingCart",
    description:
      "A unified online checkout that supports cards, wallets, local methods and BNPL. Boosts conversion with 1-click returning customer flows.",
    idealFor: ["E-commerce", "Travel", "Subscriptions"],
    pricing: "From 1.0% + €0.10 per card transaction",
    conversionBoost: 23,
    avgSetup: "24h",
    benefits: [
      "40+ payment methods",
      "1-click returning shopper",
      "PCI DSS Level 1 compliant",
      "Smart routing to reduce declines"
    ],
    battleCard: {
      vs: "Stripe",
      winThemes: [
        "Lower interchange++ fees in EU",
        "Native Greek & Italian local methods",
        "Merchant cash advance bundled"
      ]
    }
  },
  {
    id: "card-terminals",
    name: "Card Terminals",
    tagline: "Android-powered smart POS terminals",
    category: "In-Store",
    icon: "Smartphone",
    description:
      "Next-gen Android smart POS that runs tap-to-pay, card, and app ecosystems. Ideal for retail, hospitality and mobile merchants.",
    idealFor: ["Retail", "F&B", "Hospitality"],
    pricing: "From €6/mo rental, 0.5% + €0.05 per transaction",
    conversionBoost: 12,
    avgSetup: "48h",
    benefits: [
      "Tap-to-phone included",
      "4G + Wi-Fi connectivity",
      "App marketplace for ERP/loyalty",
      "Same-day settlement"
    ],
    battleCard: {
      vs: "SumUp",
      winThemes: [
        "No lock-in contract",
        "Same-day settlement vs next-day",
        "Integrated business banking"
      ]
    }
  },
  {
    id: "tap-on-phone",
    name: "Tap on Phone",
    tagline: "Turn any Android into a payment terminal",
    category: "Mobile",
    icon: "Nfc",
    description:
      "SoftPOS solution — accept contactless card & wallet payments directly on a merchant's smartphone, with no extra hardware.",
    idealFor: ["Couriers", "Field Services", "Pop-ups"],
    pricing: "0.9% per transaction, no monthly fee",
    conversionBoost: 18,
    avgSetup: "15 min",
    benefits: [
      "Zero hardware cost",
      "PCI MPoC certified",
      "Available in 24 markets",
      "Instant onboarding via selfie KYC"
    ],
    battleCard: {
      vs: "Square",
      winThemes: [
        "No hardware required",
        "Broader EU coverage",
        "Bundled IBAN account"
      ]
    }
  },
  {
    id: "merchant-advance",
    name: "Merchant Cash Advance",
    tagline: "Instant working capital from future sales",
    category: "Financing",
    icon: "Banknote",
    description:
      "Unsecured funding repaid automatically as a small % of daily card turnover. Approval in minutes based on processing history.",
    idealFor: ["Retail", "Hospitality", "F&B"],
    pricing: "Fixed fee from 6% on advance",
    conversionBoost: 31,
    avgSetup: "Same day",
    benefits: [
      "No collateral required",
      "Flexible revenue-based repayment",
      "Approvals in minutes",
      "Up to €400,000 per location"
    ],
    battleCard: {
      vs: "Traditional bank loan",
      winThemes: [
        "No personal guarantee",
        "Repay only on sales days",
        "No paperwork"
      ]
    }
  },
  {
    id: "banking",
    name: "Business Banking",
    tagline: "A real IBAN for your merchants",
    category: "Banking",
    icon: "Landmark",
    description:
      "Full business IBAN account with same-day settlement, virtual & physical cards, FX at interbank rates and accounting integrations.",
    idealFor: ["All verticals"],
    pricing: "Free tier; premium €9/mo",
    conversionBoost: 15,
    avgSetup: "10 min",
    benefits: [
      "Same-day acquiring settlement",
      "Virtual + physical debit cards",
      "Multi-currency IBANs",
      "Xero / QuickBooks integration"
    ],
    battleCard: {
      vs: "Revolut Business",
      winThemes: [
        "Merchant acquiring under same roof",
        "Regulated EU bank",
        "Same-day settlement for card sales"
      ]
    }
  },
  {
    id: "bnpl",
    name: "Buy Now, Pay Later",
    tagline: "Split payments — higher AOV",
    category: "Online Payments",
    icon: "CreditCard",
    description:
      "Offer 3 or 4 interest-free instalments to shoppers at checkout. Merchant is paid upfront, Viva carries the risk.",
    idealFor: ["E-commerce", "Retail", "Travel"],
    pricing: "2.9% + €0.20 per instalment sale",
    conversionBoost: 27,
    avgSetup: "1 day",
    benefits: [
      "Upfront settlement to merchant",
      "Viva assumes credit risk",
      "Average +35% basket size",
      "Native in Smart Checkout"
    ],
    battleCard: {
      vs: "Klarna",
      winThemes: [
        "Lower merchant fee",
        "Embedded in checkout & POS",
        "Localised credit scoring"
      ]
    }
  }
];

// -- Lead factory ---------------------------------------------------------
const FIRST = ["Maria", "Alex", "Georgia", "Luca", "Sofia", "Nikos", "Elena", "Marco", "Chloe", "Ivan", "Jean", "Pablo", "Kira", "Tom", "Anna", "Dmitri", "Lena", "Hugo", "Marta", "Oscar"];
const LAST = ["Papadopoulos", "Rossi", "Garcia", "Dupont", "Müller", "Novak", "Ivanov", "De Luca", "Martin", "Andreou", "Kowalski", "Conti", "Fernandez", "Bauer", "Petrov", "Bianchi", "Silva", "Lambert", "Haas", "Reyes"];
const COMPANIES = ["Aegean Threads", "Olive & Vine", "Nova Mobility", "Ionian Resorts", "Urban Beans", "Helios Apparel", "Marina Bistro", "Praxis Clinics", "Akropolis Gyms", "Medusa Travel", "Neo Burger", "Azure Autos", "Vento Pizza", "Quill Bookstore", "Atlas Hotels", "Plaza Boutique", "Verde Market", "Lumio Lighting", "Delta Pharmacy", "Kore Cosmetics"];
const SOURCES = ["Website Form", "Referral", "Cold Outreach", "Partner", "Event: Money20/20", "LinkedIn Ads", "Trade Show", "Google Ads", "Inbound Chat"];

function pick(arr, i) {
  return arr[i % arr.length];
}

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const LEADS = Array.from({ length: 48 }).map((_, i) => {
  const first = pick(FIRST, i * 3 + 1);
  const last = pick(LAST, i * 5 + 2);
  const company = pick(COMPANIES, i * 2 + 3);
  const industry = pick(INDUSTRIES, i);
  const country = pick(COUNTRIES, i * 7);
  const status = pick(LEAD_STATUSES, i * 11);
  const source = pick(SOURCES, i * 4);
  const score = Math.floor(20 + seededRandom(i + 1) * 80);
  const volume = Math.floor(50 + seededRandom(i + 2) * 950) * 1000; // monthly €
  const createdDaysAgo = Math.floor(seededRandom(i + 3) * 90);
  return {
    id: `lead-${1000 + i}`,
    name: `${first} ${last}`,
    title: pick(["Owner", "CFO", "Head of E-commerce", "Operations Manager", "CEO", "Finance Director"], i),
    company,
    industry,
    country,
    email: `${first}.${last}@${company.replace(/[^a-z]/gi, "").toLowerCase().slice(0, 10)}.eu`,
    phone: `+${30 + (i % 40)} 69${(100000000 + i * 13).toString().slice(0, 8)}`,
    status,
    source,
    score,
    monthlyVolume: volume,
    createdDaysAgo,
    owner: pick(["You", "Elena Drakos", "Marco Ricci", "Hugo Lambert"], i * 2),
    interestedIn: [pick(PRODUCTS, i).id, pick(PRODUCTS, i + 2).id],
    notes: []
  };
});

// -- Deal factory ---------------------------------------------------------
export const DEALS = LEADS.slice(0, 26).map((lead, i) => {
  const stage = pick(DEAL_STAGES, i).id;
  const product = pick(PRODUCTS, i + 1);
  const value = Math.floor(2000 + seededRandom(i + 10) * 48000);
  return {
    id: `deal-${2000 + i}`,
    title: `${lead.company} — ${product.name}`,
    leadId: lead.id,
    company: lead.company,
    contactName: lead.name,
    country: lead.country,
    productId: product.id,
    stage,
    value,
    probability: Math.min(95, 10 + i * 3 + Math.floor(seededRandom(i + 5) * 30)),
    closeInDays: 5 + Math.floor(seededRandom(i + 7) * 50),
    owner: lead.owner
  };
});

// -- Activities -----------------------------------------------------------
export const ACTIVITIES = [
  { id: "a1", type: "call", title: "Discovery call with Maria Papadopoulos", company: "Aegean Threads", dueIn: "Today, 14:30", status: "upcoming" },
  { id: "a2", type: "email", title: "Send Smart Checkout proposal to Urban Beans", company: "Urban Beans", dueIn: "Today, 17:00", status: "upcoming" },
  { id: "a3", type: "demo", title: "Demo of Card Terminals + Banking", company: "Ionian Resorts", dueIn: "Tomorrow, 11:00", status: "upcoming" },
  { id: "a4", type: "follow", title: "Follow up on MCA offer", company: "Marina Bistro", dueIn: "Fri, 10:00", status: "upcoming" },
  { id: "a5", type: "task", title: "Prepare battle card vs Stripe for Nova Mobility", company: "Nova Mobility", dueIn: "Today", status: "upcoming" },
  { id: "a6", type: "call", title: "Closed: contract signed with Olive & Vine", company: "Olive & Vine", dueIn: "Yesterday", status: "done" }
];

// -- Content library ------------------------------------------------------
export const CONTENT = [
  { id: "c1", title: "Smart Checkout – Pitch Deck 2026", type: "Deck", size: "8.4 MB", updated: "3 days ago", tags: ["E-commerce", "Pitch"] },
  { id: "c2", title: "Card Terminals – Retail One-Pager", type: "PDF", size: "1.1 MB", updated: "1 week ago", tags: ["Retail", "POS"] },
  { id: "c3", title: "Hospitality Case Study: Ionian Resorts", type: "Case Study", size: "2.3 MB", updated: "2 weeks ago", tags: ["Hospitality", "Case"] },
  { id: "c4", title: "BNPL ROI Calculator", type: "Spreadsheet", size: "340 KB", updated: "Today", tags: ["BNPL", "ROI"] },
  { id: "c5", title: "Merchant Advance – Objection Handling", type: "Playbook", size: "720 KB", updated: "5 days ago", tags: ["MCA", "Objections"] },
  { id: "c6", title: "Compliance & PCI DSS Overview", type: "PDF", size: "1.6 MB", updated: "1 month ago", tags: ["Compliance"] },
  { id: "c7", title: "Tap-on-Phone Demo Script", type: "Script", size: "210 KB", updated: "4 days ago", tags: ["SoftPOS", "Demo"] },
  { id: "c8", title: "Business Banking FAQ", type: "FAQ", size: "190 KB", updated: "2 days ago", tags: ["Banking"] }
];

// -- Playbook objections --------------------------------------------------
export const OBJECTIONS = [
  {
    id: "o1",
    objection: "Your fees look higher than Stripe's headline rate.",
    response:
      "Stripe's 1.4% + 25¢ is card-not-present only and excludes chargeback protection. Our blended rate of 1.0% + €0.10 includes fraud tools, BNPL, and same-day settlement — lowering total cost of acceptance by up to 22%.",
    product: "Smart Checkout"
  },
  {
    id: "o2",
    objection: "We're locked into a 3-year terminal contract.",
    response:
      "We buy out existing contracts up to €2,500/location. Given that our Android terminals unlock upsell apps (loyalty, table ordering), merchants typically recoup the buyout within 4 months.",
    product: "Card Terminals"
  },
  {
    id: "o3",
    objection: "BNPL feels risky — who covers defaults?",
    response:
      "Viva assumes 100% of the credit risk. You receive the full basket value upfront, minus our fee. Merchants typically see a 27–35% lift in AOV with no exposure.",
    product: "BNPL"
  },
  {
    id: "o4",
    objection: "We already have a business bank.",
    response:
      "Viva Banking isn't a replacement — it's a settlement account. Same-day merchant funding hits the IBAN so cashflow tightens by 1.5 days on average. Keep your primary bank.",
    product: "Business Banking"
  },
  {
    id: "o5",
    objection: "Cash advance sounds expensive.",
    response:
      "MCA is a fixed fee (not APR), repaid only on sales days. For a seasonal merchant the effective cost is ~40% lower than an unsecured bank loan once idle-month interest is factored in.",
    product: "Merchant Cash Advance"
  }
];

// -- Insights charts ------------------------------------------------------
export const PIPELINE_TREND = [
  { month: "Nov", pipeline: 320, won: 78 },
  { month: "Dec", pipeline: 410, won: 112 },
  { month: "Jan", pipeline: 460, won: 134 },
  { month: "Feb", pipeline: 520, won: 152 },
  { month: "Mar", pipeline: 598, won: 181 },
  { month: "Apr", pipeline: 672, won: 214 }
];

export const LEAD_SOURCE_MIX = [
  { name: "Website", value: 38 },
  { name: "Referral", value: 22 },
  { name: "Outbound", value: 18 },
  { name: "Events", value: 12 },
  { name: "Partner", value: 10 }
];

export const CONVERSION_FUNNEL = [
  { stage: "Leads", value: 412 },
  { stage: "Qualified", value: 268 },
  { stage: "Demo", value: 164 },
  { stage: "Proposal", value: 92 },
  { stage: "Won", value: 47 }
];

export const TEAM_LEADERBOARD = [
  { name: "Elena Drakos", region: "Greece", won: 142000, deals: 11, quota: 180000 },
  { name: "Marco Ricci", region: "Italy", won: 118000, deals: 9, quota: 160000 },
  { name: "Hugo Lambert", region: "France / BE", won: 96000, deals: 7, quota: 150000 },
  { name: "You", region: "Multi-region", won: 74000, deals: 6, quota: 140000 },
  { name: "Sofia Novak", region: "CEE", won: 52000, deals: 5, quota: 120000 }
];

// ICP segments
export const ICP_SEGMENTS = [
  { id: "seg-1", name: "Boutique Retail — Greece", size: 1240, fit: 94, topProduct: "Card Terminals" },
  { id: "seg-2", name: "DTC Brands — Italy & Spain", size: 860, fit: 91, topProduct: "Smart Checkout" },
  { id: "seg-3", name: "Hospitality — Aegean Islands", size: 510, fit: 89, topProduct: "Card Terminals + MCA" },
  { id: "seg-4", name: "Field Couriers — EU", size: 2200, fit: 86, topProduct: "Tap on Phone" },
  { id: "seg-5", name: "Subscription SaaS — EU", size: 740, fit: 82, topProduct: "Smart Checkout" }
];
