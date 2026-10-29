"use client";

import * as React from "react";
import { ArrowUpRight, ArrowRight, ShieldCheck, Clock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { WorkflowGraph } from "@/components/sections/workflow-graph";

const STATUS_ITEMS = [
  { icon: ShieldCheck, label: "Fixed scope · fixed price" },
  { icon: Clock, label: "Audit back in 48h" },
  { icon: Layers, label: "No vendor lock-in" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
      {/* Colorful Aurora Mesh & Subtle Engineering Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-mesh absolute inset-0" />
        <div className="grid-field absolute inset-0 opacity-40" />
        <div className="beam absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full" />
        <div className="beam-cool absolute -top-12 right-[-10%] h-[420px] w-[520px] rounded-full" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Ali Tariq Portrait with Executive Bezel */}
          <div className="mb-8 mt-2 flex flex-col items-center">
            <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full p-1 border-2 border-accent/40 bg-white shadow-[0_12px_36px_-6px_rgba(37,99,235,0.22)] transition-transform duration-300 hover:scale-105">
              <img
                src="/img/ali-tariq-portrait.png"
                alt="Ali Tariq"
                className="h-full w-full rounded-full object-cover bg-white"
              />
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
              </span>
            </div>
            <div className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/90 px-3.5 py-1 font-mono text-[11px] text-slate-600 shadow-sm backdrop-blur-md">
              <span className="font-semibold text-slate-900">Ali Tariq</span>
              <span className="text-slate-400">/</span>
              <span>AI Automation &amp; Systems Engineer · Lahore, PK</span>
            </div>
          </div>

          {/* Headline B with Solid Authoritative Accent */}
          <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-6xl md:text-[4.25rem]">
            I build the AI systems that run your{" "}
            <span className="text-accent">online business.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
            I connect your tools, build autonomous agents and ship the
            lead-generating websites that scale revenue — so you stop spending
            hours on work a machine should do.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full justify-center px-6 font-semibold sm:w-auto"
                data-analytics-cta="hero-book-call"
              >
                <span>Book a free call</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto" strength={0.18}>
              <Button
                href="/audit"
                variant="outline"
                size="lg"
                className="w-full justify-center px-6 sm:w-auto"
                data-analytics-cta="hero-free-audit"
              >
                <span>Get a free automation audit</span>
                <ArrowRight className="h-4 w-4 text-muted" />
              </Button>
            </Magnetic>
          </div>

          {/* Reassurance strip */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-2">
            {STATUS_ITEMS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-accent/80" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive pipeline console */}
        <div className="mt-14 sm:mt-16">
          <WorkflowGraph />
        </div>
      </div>
    </section>
  );
}
