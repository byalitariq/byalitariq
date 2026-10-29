"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/forms/turnstile";
import { track } from "@/lib/analytics";
import {
  BUDGETS,
  BUDGET_LABELS,
  leadFieldsSchema,
  missingRequiredFields,
  type LeadSource,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

const formSchema = leadFieldsSchema.extend({ company: z.string().optional() });
type FormValues = z.infer<typeof formSchema>;

export interface LeadFormProps {
  source: LeadSource;
  submitLabel?: string;
  showBudget?: boolean;
  showWebsite?: boolean;
  messagePlaceholder?: string;
  className?: string;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted/60 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40 disabled:opacity-60";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-accent-2">
      <AlertCircle className="h-3 w-3" />
      {message}
    </p>
  );
}

export function LeadForm({
  source,
  submitLabel = "Send message",
  showBudget = true,
  showWebsite = false,
  messagePlaceholder = "What are you trying to automate or improve?",
  className,
}: LeadFormProps) {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", website: "", message: "", budget: "", company: "" },
  });

  const onVerify = React.useCallback((token: string) => setTurnstileToken(token), []);
  const onExpire = React.useCallback(() => setTurnstileToken(""), []);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);

    const missing = missingRequiredFields(source, values);
    if (missing.length > 0) {
      setServerError(missing[0].message);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source, turnstileToken }),
      });
      const data = (await response.json()) as { success: boolean; error: string | null };

      if (!response.ok || !data.success) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      track("lead_submit", { source });
      reset();
      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-xl border border-accent/40 bg-surface p-8 text-center",
          className,
        )}
        role="status"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-4 text-lg font-semibold text-text">Message received.</h3>
        <p className="mt-2 text-sm text-muted">
          I read every enquiry myself and reply within 24 hours, Mon–Sat (PKT).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${source}-name`} className="mb-1.5 block text-xs font-medium text-muted">
            Name
          </label>
          <input
            id={`${source}-name`}
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className="mb-1.5 block text-xs font-medium text-muted">
            Email
          </label>
          <input
            id={`${source}-email`}
            type="email"
            autoComplete="email"
            required
            className={inputClass}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {(showWebsite || source === "audit") && (
        <div>
          <label htmlFor={`${source}-website`} className="mb-1.5 block text-xs font-medium text-muted">
            Website
          </label>
          <input
            id={`${source}-website`}
            type="url"
            placeholder="https://example.com"
            className={inputClass}
            aria-invalid={Boolean(errors.website)}
            {...register("website")}
          />
          <FieldError message={errors.website?.message} />
        </div>
      )}

      <div>
        <label htmlFor={`${source}-message`} className="mb-1.5 block text-xs font-medium text-muted">
          {source === "audit" ? "What feels slow or manual?" : "Message"}
        </label>
        <textarea
          id={`${source}-message`}
          rows={4}
          placeholder={messagePlaceholder}
          className={cn(inputClass, "resize-y")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {showBudget && (
        <div>
          <label htmlFor={`${source}-budget`} className="mb-1.5 block text-xs font-medium text-muted">
            Budget <span className="text-muted/60">(optional)</span>
          </label>
          <select id={`${source}-budget`} className={inputClass} {...register("budget")}>
            <option value="">Not sure yet</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {BUDGET_LABELS[budget]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${source}-company`}>Company</label>
        <input id={`${source}-company`} type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Turnstile onVerify={onVerify} onExpire={onExpire} />

      {serverError && (
        <p className="flex items-start gap-2 rounded-md border border-accent-2/40 bg-accent-2/10 p-3 text-xs text-accent-2" role="alert">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full justify-center font-semibold"
        data-analytics-cta={`lead-form-${source}`}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-[11px] text-muted/70">
        No newsletters, no spam. Your details stay private.
      </p>
    </form>
  );
}