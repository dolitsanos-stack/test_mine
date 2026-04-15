# Viva InsightFlow

**Sales Enablement & Lead Generation Platform for Viva.com**

A dark-themed, AI-powered "Service Content Intelligence" workspace inspired by
[viva-insight-flow.base44.app](https://viva-insight-flow.base44.app).

## Features

18 modules covering the full merchant sales lifecycle:

| Module                | Purpose |
| --------------------- | ------- |
| Knowledge Base        | Central repository of Viva.com product intelligence with indexed tags |
| Enhance & Research    | AI-powered live signals (growth, hiring, funding, tech stack) |
| Generate Content      | Emails, pitch outlines, landing copy, proposals with brand guardrails |
| Landing Page          | Build merchant-specific landing pages in minutes |
| Prompt Studio         | Author, test and version the prompts that power content generation |
| Commercial Offers     | Send and track merchant-specific commercial offers |
| Sales Pipeline        | Drag-and-drop Kanban board for every deal, by stage |
| Activity Planner      | Calls, emails, demos and follow-ups for the sales week |
| Fee Benchmark         | Viva.com vs. Stripe, Adyen, SumUp, Mollie, Nexi, Worldline |
| Workflow Automation   | Lead enrichment, demo prep, proposal nudges, MCA checks |
| Mobile Quick Actions  | Field-sales quick-actions (call logging, card scan, terminal QR) |
| Template Designer     | Reusable content blocks for emails, landings, proposals, decks |
| CRM Contacts          | Enriched, scored, owner-assigned merchant contacts |
| Proposal Builder      | Build a merchant-specific commercial proposal in minutes |
| Fee Calculator        | TCO calculator — Viva vs. current PSP |
| Email Campaigns       | Targeted merchant email sequences with KB personalisation |
| Client Portal         | Shared, branded merchant workspace (proposals, KYB, onboarding) |
| Integrations          | CRM, email, data, and Viva.com's own APIs |

## Stack

- **React 18** + **Vite 5** (fast dev server, instant HMR)
- **React Router 6** for navigation
- **Tailwind CSS 3** with a custom teal palette matching the Viva brand
- **Recharts** for dashboards & benchmarks
- **Lucide React** for icons

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

## Reference

Visual inspiration: [viva-insight-flow.base44.app](https://viva-insight-flow.base44.app)
— open it in your browser to compare. (The reference rejects automated
fetches, so this project was built from screenshots shared in-session.)
