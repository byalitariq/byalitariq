// Source: docs/03-services-and-pricing.md. Prices are starting ranges in USD.
export type ServicePackage = {
  name: string;
  scope: string;
  price: string;
  timeline?: string;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  headline: string;
  forWho: string;
  problems: string[];
  deliverables: string[];
  examples: { title: string; tools: string[] }[];
  packages: ServicePackage[];
  faq: { q: string; a: string }[];
  keyword: string;
  note?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "automation",
    title: "Workflow Automation",
    short: "Connect your apps and remove the repetitive work. n8n, Make, Zapier.",
    headline: "Stop doing work your software could do for you.",
    forWho: "Owners and teams who copy data between tools, chase leads by hand or rebuild the same report every week.",
    problems: [
      "Leads sit in a form inbox for hours before anyone replies",
      "Your team copies data between CRM, sheets and email",
      "Reports take a morning to build every week",
      "Invoices and reminders go out late or not at all",
    ],
    deliverables: [
      "Mapped process with the quickest wins first",
      "Production workflows in n8n, Make or Zapier",
      "Error alerts so failures never go unnoticed",
      "Handover docs and a Loom walkthrough",
    ],
    examples: [
      { title: "Lead capture → CRM → instant follow-up", tools: ["Forms", "HubSpot", "Gmail"] },
      { title: "Shopify order ops and customer updates", tools: ["Shopify", "Slack", "Email"] },
      { title: "Weekly KPI report built automatically", tools: ["Sheets", "GA4", "Slack"] },
      { title: "Invoice and payment reminders", tools: ["Stripe", "QuickBooks", "Email"] },
    ],
    packages: [
      { name: "Quick Win", scope: "1 workflow, up to 3 apps", price: "Fixed scope", timeline: "3–5 days" },
      { name: "Ops Pack", scope: "3–5 connected workflows + docs", price: "Custom build", timeline: "2–3 weeks" },
      { name: "Full System", scope: "Process audit + end-to-end automation", price: "End-to-end plan", timeline: "4–6 weeks" },
    ],
    faq: [
      { q: "Which tool will you use?", a: "Whatever fits. n8n is flexible and cheap to run; if you already pay for Make or Zapier, I'll build there." },
      { q: "What does it cost to run monthly?", a: "Minimal tool and API costs. I estimate exact running costs before we start." },
    ],
    keyword: "n8n automation expert",
  },
  {
    slug: "ai-agents",
    title: "Custom AI Agents",
    short: "Assistants that answer customers, qualify leads and handle your inbox.",
    headline: "AI agents that do real work, not just chat.",
    forWho: "Businesses getting the same questions every day, or losing leads because nobody answers fast enough.",
    problems: [
      "Support answers the same ten questions all day",
      "Leads go cold before a human qualifies them",
      "Your inbox decides your schedule",
      "Research tasks eat hours of senior time",
    ],
    deliverables: [
      "Agent trained on your docs, products and tone",
      "Tool connections (CRM, calendar, email, WhatsApp)",
      "Guardrails, human hand-off and logging",
      "Cost estimate and usage dashboard",
    ],
    examples: [
      { title: "Website support bot trained on your docs (RAG)", tools: ["OpenAI", "Claude", "Vector DB"] },
      { title: "Lead-qualifying agent that books calls", tools: ["n8n", "Cal.com", "HubSpot"] },
      { title: "Inbox triage with drafted replies", tools: ["Gmail", "Claude", "Slack"] },
      { title: "Research crew for market and lead research", tools: ["CrewAI", "Python", "Sheets"] },
    ],
    packages: [
      { name: "Starter Bot", scope: "FAQ/support bot on your content, 1 channel", price: "Single agent scope" },
      { name: "Business Agent", scope: "Agent with tools (CRM, calendar, email)", price: "Integrated system" },
      { name: "Multi-Agent System", scope: "CrewAI crews, custom logic, dashboards", price: "Multi-agent pod" },
    ],
    faq: [
      { q: "Will it make things up?", a: "Agents answer from your own content with guardrails, and hand off to a human when they're unsure." },
      { q: "Who pays for the AI usage?", a: "Running costs go on your own API accounts, so you own them and see every cent." },
    ],
    keyword: "AI chatbot developer for small business",
    note: "Running costs (LLM API and hosting) are billed to your own accounts.",
  },
  {
    slug: "ai-marketing",
    title: "AI Marketing",
    short: "Content engines, lead gen and outreach systems that run every day.",
    headline: "Marketing systems that keep running after you log off.",
    forWho: "Founders, creators and agencies who need more content and more leads without hiring a bigger team.",
    problems: [
      "Content takes all week and still ships late",
      "Prospect lists are built by hand",
      "Outreach feels generic and gets ignored",
      "Nobody has time to read the numbers",
    ],
    deliverables: [
      "Content repurposing pipeline with your voice",
      "Lead sourcing, enrichment and scoring",
      "Personalised outreach sequences",
      "Automated KPI and ad reporting",
    ],
    examples: [
      { title: "1 video → posts, blogs and emails", tools: ["YouTube", "Claude", "Buffer"] },
      { title: "Scrape → enrich → score → outreach", tools: ["Apollo", "n8n", "Instantly"] },
      { title: "SEO content briefs from search data", tools: ["Search Console", "OpenAI", "Notion"] },
      { title: "Weekly ad and KPI dashboard", tools: ["Meta Ads", "GA4", "Looker Studio"] },
    ],
    packages: [
      { name: "Content Engine", scope: "Repurposing pipeline + templates", price: "Repurposing engine" },
      { name: "Lead Gen System", scope: "Scrape/enrich → score → outreach sequence", price: "Outreach system" },
      { name: "Growth Retainer", scope: "Run and improve the systems monthly", price: "Monthly growth" },
    ],
    faq: [
      { q: "Will the content sound like AI?", a: "Pipelines are tuned to your voice and examples, and you review before anything publishes." },
      { q: "Is cold outreach compliant?", a: "I set up sending limits, opt-outs and region-appropriate rules. You stay in control of who gets contacted." },
    ],
    keyword: "AI marketing automation",
  },
  {
    slug: "websites",
    title: "Websites & Apps",
    short: "Fast sites and tools, built with AI-assisted development and wired to your CRM.",
    headline: "Websites that bring in leads, with the automation already built in.",
    forWho: "Businesses whose site looks dated, loads slowly or doesn't send leads anywhere useful.",
    problems: [
      "Your site is slow and hard to update",
      "Form submissions land in an inbox nobody checks",
      "You need an internal tool but can't justify a dev team",
      "Landing pages take weeks to launch",
    ],
    deliverables: [
      "Conversion-focused design and copy help",
      "WordPress or Next.js build, mobile-first",
      "Forms wired to your CRM with instant follow-up",
      "SEO basics, analytics and speed tuning",
    ],
    examples: [
      { title: "Landing page with form → CRM automation", tools: ["Next.js", "HubSpot", "n8n"] },
      { title: "5–8 page business site", tools: ["WordPress", "Next.js"] },
      { title: "Client portal or internal dashboard", tools: ["Next.js", "Supabase"] },
    ],
    packages: [
      { name: "Landing Page", scope: "1 page, copy help, form → CRM automation", price: "Single page scope" },
      { name: "Business Website", scope: "5–8 pages, WordPress or Next.js, SEO basics", price: "Multi-page build" },
      { name: "Web App / Internal Tool", scope: "MVP, dashboard, client portal", price: "Custom platform" },
    ],
    faq: [
      { q: "WordPress or Next.js?", a: "WordPress if you want to edit everything yourself; Next.js for speed, custom features and apps." },
      { q: "Can you redesign my current site?", a: "Yes. I audit what works first, then rebuild with your content and SEO kept intact." },
    ],
    keyword: "AI website developer",
    note: "Every website ships with its lead automation included.",
  },
  {
    slug: "care-plan",
    title: "Care Plan",
    short: "Already have automations? I monitor, fix and improve them monthly.",
    headline: "Your automations, watched and improved every month.",
    forWho: "Teams that rely on workflows and can't afford silent failures, and agencies that need a delivery partner.",
    problems: [
      "Workflows break silently when an API changes",
      "Nobody owns the automations after launch",
      "Small improvements never get prioritised",
      "Agencies need extra delivery capacity",
    ],
    deliverables: [
      "Uptime and error monitoring with alerts",
      "Fixes and updates when tools change",
      "Monthly report and improvement ideas",
      "White-label delivery for agencies (Partner)",
    ],
    examples: [
      { title: "Monitoring for existing n8n/Make workflows", tools: ["n8n", "Make", "Slack"] },
      { title: "Monthly new automation", tools: ["Your stack"] },
    ],
    packages: [
      { name: "Monitor", scope: "Uptime and error alerts, fixes, monthly report", price: "Monthly retainer" },
      { name: "Grow", scope: "Monitor + 1 new small automation/month + priority support", price: "Monthly retainer" },
      { name: "Partner", scope: "Dedicated monthly hours, roadmap calls, white-label for agencies", price: "Agency partner" },
    ],
    faq: [
      { q: "Can you take over workflows someone else built?", a: "Yes. I start with a short audit, document what's there and fix the fragile parts first." },
      { q: "Do you white-label for agencies?", a: "Yes, under NDA with your branding, at a wholesale rate." },
    ],
    keyword: "n8n maintenance and support",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
