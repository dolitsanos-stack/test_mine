// Knowledge base items — centralised Viva.com commercial intelligence.

export const KB_ITEMS = [
  {
    id: "kb-1",
    title: "Onboarding & Account Registration",
    category: "Platform",
    tags: ["onboarding", "registration", "kyc", "kyb", "sandbox", "demo", "activation"],
    body: `## Viva.com Merchant Onboarding

Viva.com offers a fully digital, AI-automated onboarding process designed to minimise friction and get merchants live quickly.

## Onboarding Process
1. **Sign up** at app.vivawallet.com (production) or demo.vivapayments.com (sandbox)
2. **Provide business details**: business type, MCC, tax number, address, bank account
3. **Upload KYC/KYB documents**: ID, proof of address, proof of business ownership
4. **AI verification** runs in parallel — typically under 30 minutes
5. **Go live** — terminals ship same-day; online keys are issued instantly.`
  },
  {
    id: "kb-2",
    title: "In-Person Payments — Tap on Any Device & POS Solutions",
    category: "Core Product",
    tags: ["pos", "tap-on-device", "softpos", "terminals", "in-person", "offline-payments", "dcc", "surcharge"],
    body: `## Overview

Viva.com is the **pioneer and market leader in Tap on Any Device technology**, allowing any corporate device — mobile, desktop, smart interactive kiosk, or self-checkout — to double as a payment terminal accepting contactless payments.

## SoftPOS Apps
- **Android Viva.com Terminal app**: Available on Google Play for any Android device
- **iOS Tap to Pay**: Available for iPhone via native Apple Tap to Pay
- **Windows POS**: Desktop tap-to-pay via USB reader or integrated NFC

## Smart Terminals
Android-native terminal range starting from €6/mo. Accepts card, wallet, tap-to-phone and app-marketplace extensions (loyalty, table ordering, ERP).`
  },
  {
    id: "kb-3",
    title: "ISV Partner Program",
    category: "Core Product",
    tags: ["isv", "partner-program", "software-vendor", "pos-integration", "merchant-onboarding", "api"],
    body: `## What is the ISV Partner Program?

Viva.com's Independent Software Vendor (ISV) Partner Program enables software vendors (POS ISVs, ERP vendors, hospitality software companies, retail management solutions) to integrate Viva's payment capabilities into their products and offer them to merchants across the EEA — without needing a local presence in each country.

## Benefits for ISVs
- **Single integration** across 24 EU countries
- **Revenue share** on merchant volume
- **Co-branded onboarding** via white-label APIs
- **Dedicated tech support** & sandbox environment`
  },
  {
    id: "kb-4",
    title: "Competitive Differentiators vs. Competitors",
    category: "Competitive Intelligence",
    tags: ["competitive", "vs-stripe", "vs-adyen", "vs-sumup", "differentiators", "advantages"],
    body: `## Viva.com vs. the field

### vs. Stripe
- Lower blended fees for EU card-present & mixed portfolios
- Same-day settlement (Stripe is T+2 on standard)
- Native terminals + MCA + banking under one roof

### vs. Adyen
- No minimum volume requirements (Adyen: typically €25M+ processing)
- Self-serve onboarding in < 24h (Adyen: weeks)

### vs. SumUp
- No lock-in contract; contract buyout up to €2,500
- App marketplace on Android terminals
- Integrated business banking with real IBAN`
  },
  {
    id: "kb-5",
    title: "Smart Checkout for E-commerce",
    category: "Core Product",
    tags: ["smart-checkout", "e-commerce", "online-payments", "bnpl", "wallets", "3ds"],
    body: `## Smart Checkout

The unified online payments checkout from Viva.com. A single integration powering:
- 40+ payment methods (cards, wallets, local methods, BNPL)
- 1-click for returning shoppers
- Smart routing & PSD2 3DS2 compliance
- Native Smart Checkout plugins for Shopify, WooCommerce, Magento, PrestaShop

Average +22% checkout conversion uplift after migration.`
  },
  {
    id: "kb-6",
    title: "Fees & Interchange++",
    category: "Commercial",
    tags: ["fees", "pricing", "interchange", "mif", "blended", "rates"],
    body: `## Pricing model

- Blended pricing: from 1.0% + €0.10 per card transaction
- Interchange++ for merchants >€250k/mo
- Terminal rental: €6/mo per device (optional)
- Tap on Phone: 0.9% per transaction, no monthly fee
- BNPL: 2.9% + €0.20 per instalment sale
- Business Banking: free tier; Premium at €9/mo`
  },
  {
    id: "kb-7",
    title: "Merchant Cash Advance (MCA)",
    category: "Financing",
    tags: ["mca", "cash-advance", "working-capital", "financing", "merchant-finance"],
    body: `## MCA overview

Unsecured funding repaid automatically as a fixed % of daily card turnover.
- Approvals in minutes based on processing history
- Up to €400,000 per merchant location
- Fixed fee from 6% (not APR)
- Repayment only on sales days — cash-flow friendly`
  },
  {
    id: "kb-8",
    title: "Business Banking & Real IBAN",
    category: "Banking",
    tags: ["banking", "iban", "settlement", "cards", "fx", "accounting"],
    body: `## Viva Banking

Full business IBAN account with same-day acquiring settlement.
- Virtual + physical debit cards
- Multi-currency IBANs
- Interbank FX rates
- Xero / QuickBooks / Exact integrations
- Regulated as an EU bank (Greece, passported EEA-wide)`
  },
  {
    id: "kb-9",
    title: "BNPL — Instalments at Checkout",
    category: "Core Product",
    tags: ["bnpl", "instalments", "consumer-finance", "checkout", "aov"],
    body: `## Buy Now, Pay Later by Viva

- 3 or 4 interest-free instalments to shoppers
- Merchant paid upfront; Viva assumes 100% of credit risk
- Average +35% basket size
- Available in Smart Checkout + in-store via terminals
- Localised credit scoring per country`
  },
  {
    id: "kb-10",
    title: "Compliance & PCI DSS",
    category: "Compliance",
    tags: ["pci", "pci-dss", "psd2", "security", "regulation"],
    body: `## Compliance posture

- PCI DSS Level 1 certified
- PCI MPoC (Mobile Payments on COTS) for Tap on Phone
- PSD2 SCA / 3DS2 out-of-the-box
- Regulated bank in Greece, passported across EEA
- ISO 27001, SOC 2 Type II audited`
  },
  {
    id: "kb-11",
    title: "APIs & Integrations",
    category: "Developer",
    tags: ["api", "sdk", "webhooks", "plugins", "shopify", "woocommerce", "magento"],
    body: `## Developer surface

- REST APIs (OAuth 2.0)
- Native plugins: Shopify, WooCommerce, Magento, PrestaShop, Wix
- SDKs: JavaScript, iOS, Android, .NET
- Webhooks for payment, settlement, dispute events
- Sandbox via demo.vivapayments.com`
  },
  {
    id: "kb-12",
    title: "Hospitality & F&B Playbook",
    category: "Vertical",
    tags: ["hospitality", "fnb", "restaurants", "hotels", "table-ordering", "pms"],
    body: `## Verticalised offer for Hospitality

- Table ordering app on Android terminals
- PMS integrations: Mews, Protel, Opera
- Split-bill & tip management out-of-the-box
- Same-day settlement for seasonal cash-flow
- MCA pre-approvals for peak-season stocking`
  },
  {
    id: "kb-13",
    title: "Retail Playbook",
    category: "Vertical",
    tags: ["retail", "pos", "inventory", "loyalty", "omnichannel"],
    body: `## Verticalised offer for Retail

- Omnichannel payments: terminal + online share one ledger
- Loyalty & gift-card apps on terminals
- ERP connectors: Entersoft, Softone, SAP Business One
- Queue-busting Tap on Phone
- BNPL for high-AOV categories`
  },
  {
    id: "kb-14",
    title: "E-commerce Playbook",
    category: "Vertical",
    tags: ["e-commerce", "dtc", "checkout", "conversion", "aov"],
    body: `## Verticalised offer for E-commerce

- Smart Checkout with BNPL, wallets, local methods
- 1-click returning shopper flows
- Smart routing to reduce declines (recover 3–5% of revenue)
- Subscription management & SCA-exempt recurring
- Native Shopify / WooCommerce plugins`
  },
  {
    id: "kb-15",
    title: "Support & SLAs",
    category: "Operations",
    tags: ["support", "sla", "help", "ops"],
    body: `## Support

- 24/7 support in 9 languages
- Critical incident SLA: <15 min
- Dedicated KAM for merchants >€1M/mo
- Partner helpdesk for ISVs
- Status page: status.viva.com`
  },
  {
    id: "kb-16",
    title: "Markets & Coverage",
    category: "Coverage",
    tags: ["markets", "europe", "eea", "countries", "coverage"],
    body: `## Where we operate

Viva.com is live in 24 EU/EEA markets including Greece, Italy, Spain, France, Germany, Belgium, Austria, Portugal, Romania, Cyprus, Ireland, UK, Netherlands, Bulgaria, Croatia, Czechia, Finland, Hungary, Poland, Slovakia, Slovenia, Sweden, Denmark, Luxembourg.`
  },
  {
    id: "kb-17",
    title: "Customer Success Stories",
    category: "Case Studies",
    tags: ["case-study", "customers", "references", "roi"],
    body: `## Selected references

- **Ionian Resorts** — 38 properties, unified acquiring + banking, +22% check-out speed
- **Olive & Vine** — DTC food brand, Smart Checkout + BNPL, +31% AOV
- **Nova Mobility** — Tap on Phone across fleet, zero hardware deployment
- **Urban Beans** — Chain of cafés, terminals + MCA for expansion`
  },
  {
    id: "kb-18",
    title: "Pricing Objections & Responses",
    category: "Competitive Intelligence",
    tags: ["objections", "pricing", "fees", "sales", "battle-cards"],
    body: `## Pricing Objection Handling

**"Your fees look higher than Stripe's headline."**
Stripe excludes chargebacks, interchange++ pass-through, and BNPL. Viva's blended rate includes all three — total cost of acceptance is typically 15–22% lower.

**"SumUp is cheaper per tap."**
True for the headline 1.95%, but SumUp has no MCA, no banking, next-day settlement, and charges per-device. Total merchant economics favour Viva within 3 months.`
  }
];

export const KB_CATEGORIES = [
  "Platform",
  "Core Product",
  "Commercial",
  "Competitive Intelligence"
];
