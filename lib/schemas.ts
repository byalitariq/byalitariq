import { z } from "zod";

// Shared by the client forms and POST /api/lead (docs/08-tech-architecture.md).
export const LEAD_SOURCES = [
  "contact",
  "audit",
  "roi-calculator",
  "scorecard",
  "templates",
  "newsletter",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];

export const BUDGETS = ["<1k", "1-3k", "3-10k", "10k+"] as const;

export const BUDGET_LABELS: Record<(typeof BUDGETS)[number], string> = {
  "<1k": "Under $1,000",
  "1-3k": "$1,000 – $3,000",
  "3-10k": "$3,000 – $10,000",
  "10k+": "$10,000+",
};

const MAX_PAYLOAD_CHARS = 4_000;

const optionalText = (max: number) => z.string().trim().max(max).optional();

export const leadFieldsSchema = z.object({
  name: optionalText(100),
  email: z.email("Enter a valid email address.").max(200),
  website: z
    .union([z.url("Enter a full URL, like https://example.com").max(300), z.literal("")])
    .optional(),
  message: optionalText(2000),
  budget: z.union([z.enum(BUDGETS), z.literal("")]).optional(),
});

export type LeadFields = z.infer<typeof leadFieldsSchema>;

// Fields each source must include, enforced on the client and the server.
export const REQUIRED_BY_SOURCE: Partial<Record<LeadSource, ReadonlyArray<keyof LeadFields>>> = {
  contact: ["name", "message"],
  audit: ["name", "website", "message"],
};

const REQUIRED_MESSAGES: Record<keyof LeadFields, string> = {
  name: "Tell me your name.",
  email: "Enter a valid email address.",
  website: "Add your website so I can review it.",
  message: "Tell me a little about what you need.",
  budget: "Pick a budget range.",
};

export function missingRequiredFields(source: LeadSource, fields: LeadFields) {
  return (REQUIRED_BY_SOURCE[source] ?? [])
    .filter((key) => !fields[key])
    .map((key) => ({ path: key, message: REQUIRED_MESSAGES[key] }));
}

export const leadRequestSchema = leadFieldsSchema
  .extend({
    source: z.enum(LEAD_SOURCES),
    payload: z
      .record(z.string(), z.unknown())
      .optional()
      .refine((value) => value === undefined || JSON.stringify(value).length <= MAX_PAYLOAD_CHARS, {
        message: "Payload too large.",
      }),
    turnstileToken: z.string().max(4096).optional(),
    utm: z
      .object({
        source: optionalText(100),
        medium: optionalText(100),
        campaign: optionalText(100),
      })
      .optional(),
    // Honeypot: real visitors never see or fill this field.
    company: z.string().max(200).optional(),
  })
  .superRefine((lead, ctx) => {
    for (const issue of missingRequiredFields(lead.source, lead)) {
      ctx.addIssue({ code: "custom", path: [issue.path], message: issue.message });
    }
  });

export type LeadRequest = z.infer<typeof leadRequestSchema>;
