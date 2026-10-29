"use client";

import * as React from "react";
import {
  Sparkles,
  Database,
  Mail,
  FormInput,
  Play,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStep {
  id: string;
  name: string;
  system: string;
  latencyMs: number;
  icon: React.ComponentType<{ className?: string }>;
  summaryTitle: string;
  summaryItems: { label: string; value: string }[];
  log: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "trigger",
    name: "01 · Inbound Lead",
    system: "Website Form & Webhook",
    latencyMs: 18,
    icon: FormInput,
    summaryTitle: "New Client Enquiry Received",
    summaryItems: [
      { label: "Prospect", value: "Sarah Jenkins (Retail Growth Co.)" },
      { label: "Requirement", value: "Automate lead qualification and weekly reporting" },
      { label: "Channel", value: "Website Contact Form (Turnstile verified)" },
    ],
    log: "Enquiry captured instantly and handed off to your automated pipeline with zero delay.",
  },
  {
    id: "ai",
    name: "02 · AI Analysis",
    system: "Claude 3.5 Sonnet",
    latencyMs: 412,
    icon: Sparkles,
    summaryTitle: "AI Need Analysis & Drafted Reply",
    summaryItems: [
      { label: "Priority", value: "High (Estimated 15+ hrs/week recoverable)" },
      { label: "Recommended Fit", value: "Lead Triage + CRM Sync + Automated Outreach" },
      { label: "Drafted Email", value: "Personalized breakdown matching your brand voice" },
    ],
    log: "AI assistant analyzed the prospect's needs and prepared a tailored response in under 1 second.",
  },
  {
    id: "crm",
    name: "03 · CRM Database",
    system: "HubSpot & Postgres",
    latencyMs: 84,
    icon: Database,
    summaryTitle: "Contact Saved to Database",
    summaryItems: [
      { label: "Contact Status", value: "New Qualified Lead" },
      { label: "Assigned To", value: "Ali Tariq" },
      { label: "Data Entry Time", value: "0 seconds (100% automated)" },
    ],
    log: "Customer details, deal stage, and AI notes synchronized automatically without manual copy-pasting.",
  },
  {
    id: "reply",
    name: "04 · Instant Outreach",
    system: "Personalized Email & Alert",
    latencyMs: 142,
    icon: Mail,
    summaryTitle: "Response Delivered in Under 60 Seconds",
    summaryItems: [
      { label: "Delivery Speed", value: "42 seconds from form submit" },
      { label: "Calendar Booking", value: "Link included for immediate booking" },
      { label: "Team Notification", value: "Instant alert sent to Slack / WhatsApp" },
    ],
    log: "Customer receives a helpful, personal response while their interest is at its absolute peak.",
  },
];

/**
 * Control Room Automation Console.
 * An interactive, live pipeline simulator where visitors can trigger a test
 * lead and watch the data packet travel through every node in real-time,
 * inspecting payloads, token counts, and latency at each step.
 */
export function WorkflowGraph() {
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [isRunning, setIsRunning] = React.useState<boolean>(false);
  const [selectedStep, setSelectedStep] = React.useState<number>(1);
  // Every pending timer, so unmount or re-run can never leave one firing.
  const timers = React.useRef<number[]>([]);

  React.useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) window.clearTimeout(id);
      pending.length = 0;
    };
  }, []);

  // Simulation runner: steps through the pipeline with realistic pauses.
  const runSimulation = React.useCallback(() => {
    if (isRunning) return;
    for (const id of timers.current) window.clearTimeout(id);
    timers.current = [];

    setIsRunning(true);
    setActiveStep(0);
    setSelectedStep(0);

    const stepDelays = [400, 1100, 700, 800];
    let current = 0;

    const advance = () => {
      current += 1;
      if (current < PIPELINE_STEPS.length) {
        setActiveStep(current);
        setSelectedStep(current);
        timers.current.push(window.setTimeout(advance, stepDelays[current]));
      } else {
        setIsRunning(false);
      }
    };

    timers.current.push(window.setTimeout(advance, stepDelays[0]));
  }, [isRunning]);

  const currentStepData = PIPELINE_STEPS[selectedStep];

  return (
    <div className="sheen-top rim relative mx-auto w-full max-w-4xl overflow-hidden rounded-[22px] border border-border bg-surface p-4 sm:p-6 shadow-sm backdrop-blur-xl">
      {/* Console top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3 text-xs font-mono text-muted">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-semibold text-text">Live System Walkthrough</span>
          <span className="text-muted-2">/</span>
          <span className="hidden sm:inline-block text-muted">Click any step or run the simulation</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={runSimulation}
            disabled={isRunning}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-semibold text-accent-ink transition-all duration-200",
              isRunning
                ? "bg-accent/60 cursor-wait"
                : "bg-accent hover:bg-[#2b3017] active:scale-95 shadow-sm",
            )}
          >
            {isRunning ? (
              <>
                <RotateCcw className="h-3 w-3 animate-spin text-accent-ink" />
                <span>Simulating…</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-accent-ink text-accent-ink" />
                <span>See it in action</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Connecting bus (desktop) */}
      <div className="relative my-6 hidden lg:block">
        <svg
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-visible"
          height="40"
          width="100%"
          aria-hidden="true"
        >
          <line
            x1="12%"
            y1="20"
            x2="88%"
            y2="20"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {/* Active pulse traveling across */}
          <line
            x1="12%"
            y1="20"
            x2="88%"
            y2="20"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="24 160"
            className="edge-pulse"
          />
        </svg>
      </div>

      {/* 4 Pipeline Nodes */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3.5">
        {PIPELINE_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isSelected = index === selectedStep;
          const isPassed = index < activeStep;

          const stepThemes = [
            { border: "border-emerald-300", bg: "bg-emerald-50/60", activeText: "text-emerald-700", iconBg: "bg-emerald-100 text-emerald-700 border-emerald-200", shadow: "shadow-[0_8px_25px_-5px_rgba(16,185,129,0.2)]" },
            { border: "border-indigo-300", bg: "bg-indigo-50/60", activeText: "text-indigo-700", iconBg: "bg-indigo-100 text-indigo-700 border-indigo-200", shadow: "shadow-[0_8px_25px_-5px_rgba(79,70,229,0.2)]" },
            { border: "border-sky-300", bg: "bg-sky-50/60", activeText: "text-sky-700", iconBg: "bg-sky-100 text-sky-700 border-sky-200", shadow: "shadow-[0_8px_25px_-5px_rgba(2,132,199,0.2)]" },
            { border: "border-purple-300", bg: "bg-purple-50/60", activeText: "text-purple-700", iconBg: "bg-purple-100 text-purple-700 border-purple-200", shadow: "shadow-[0_8px_25px_-5px_rgba(147,51,234,0.2)]" },
          ];
          const currentTheme = stepThemes[index] || stepThemes[0];

          return (
            <button
              type="button"
              key={step.id}
              onClick={() => setSelectedStep(index)}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200",
                isSelected
                  ? `${currentTheme.border} ${currentTheme.bg} ${currentTheme.shadow} ring-2 ring-indigo-500/20`
                  : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50/80 shadow-sm",
                isActive && isRunning && "ring-2 ring-indigo-500",
              )}
            >
              {/* Node top bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-muted">
                  <span className={cn(isSelected ? currentTheme.activeText : "text-slate-500", "font-semibold")}>
                    {step.name}
                  </span>
                  {isActive && isRunning ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      LIVE
                    </span>
                  ) : isPassed || !isRunning ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors",
                      isSelected
                        ? currentTheme.iconBg
                        : "border-slate-200 bg-slate-100 text-slate-500 group-hover:text-slate-800",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-900">{step.system}</p>
                    <p className="font-mono text-[10px] text-indigo-600 font-medium mt-0.5">
                      {index === 0 && "Instant capture"}
                      {index === 1 && "Smart qualification"}
                      {index === 2 && "Zero data entry"}
                      {index === 3 && "Delivered in < 60s"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Node footer */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-2.5 font-mono text-[10px] text-slate-500">
                <span>click to inspect</span>
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform",
                    isSelected ? "translate-x-0.5 text-indigo-600" : "text-slate-400",
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Walkthrough Inspector */}
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-2/60 shadow-sm">
        <div className="flex items-center justify-between border-b border-border bg-surface px-3.5 py-2.5 text-[11px] font-mono text-muted">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text font-semibold">
              Live Walkthrough · {currentStepData.name}
            </span>
          </div>
          <span className="rounded bg-surface-3 px-2 py-0.5 text-[10px] font-mono text-accent font-semibold">
            Active System
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-12 text-xs">
          <div className="sm:col-span-7 flex flex-col justify-between rounded-lg border border-border/60 bg-surface/90 p-3.5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-2">
                {currentStepData.summaryTitle}
              </span>
              <dl className="space-y-1.5 text-xs">
                {currentStepData.summaryItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <dt className="font-medium text-muted shrink-0 w-32">{item.label}:</dt>
                    <dd className="text-text font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="sm:col-span-5 flex flex-col justify-between border-t border-border/40 pt-3 sm:border-t-0 sm:border-l sm:border-border/50 sm:pl-3.5 sm:pt-0">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-2 block mb-1">
                Automation Benefit
              </span>
              <p className="text-xs leading-relaxed text-muted">
                {currentStepData.log}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between rounded border border-border/40 bg-surface-2/60 px-2.5 py-1.5 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="h-3 w-3" />
                Zero manual delay
              </span>
              <span className="flex items-center gap-1 text-text">
                <Zap className="h-3 w-3 text-accent" />
                100% automated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
