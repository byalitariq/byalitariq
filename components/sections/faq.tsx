"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { HOME_FAQ } from "@/content/faq";
import { faqJsonLd, serializeJsonLd } from "@/lib/json-ld";

export interface FaqSectionProps {
  items?: { q: string; a: string }[];
  title?: string;
  description?: string;
}

export function FaqSection({
  items = HOME_FAQ,
  title = "Frequently asked questions",
  description = "Straight answers about tools, costs, data privacy, and how we collaborate.",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const jsonLd = React.useMemo(() => faqJsonLd(items), [items]);

  return (
    <Section bordered id="faq">
      {/* Inject FAQPage structured data for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <SectionHeader
        eyebrow="05 · Clear Answers"
        title={title}
        description={description}
      />

      <div className="mx-auto max-w-3xl divide-y divide-border/60 rounded-xl border border-border/70 bg-surface/60">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="transition-colors hover:bg-surface/90">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left font-medium text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              >
                <span className="text-base sm:text-lg font-semibold pr-2">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-accent" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-muted leading-relaxed border-t border-border/30 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
