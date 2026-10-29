// Site-wide constants. Personal ID data (CNIC, address) must never be added here.
export const SITE = {
  name: "Ali Tariq",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byalitariq.com",
  title: "Ali Tariq · AI Automation & AI Marketing for Online Businesses",
  description:
    "I build n8n automations, AI agents and lead-generating websites that save small businesses and agencies hours every week. Free audit available.",
  email: "hey@byalitariq.com",
  location: "Lahore, Pakistan · working worldwide",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact",
  responseTime: "Reply within 24 hours, Mon–Sat (PKT).",
} as const;

export const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/free", label: "Free tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

// Fill in real profile URLs before launch; empty entries are hidden.
export const SOCIAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: "LinkedIn", href: "" },
  { label: "X", href: "" },
  { label: "GitHub", href: "" },
].filter((link) => link.href !== "");

export const TOOLS = [
  "n8n",
  "Make",
  "Zapier",
  "OpenAI",
  "Claude",
  "CrewAI",
  "HubSpot",
  "Shopify",
  "WordPress",
  "Next.js",
] as const;
