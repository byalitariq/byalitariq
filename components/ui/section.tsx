import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  containerClassName?: string;
  bordered?: boolean;
}

export function Section({
  as: Component = "section",
  className,
  containerClassName,
  bordered = false,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "py-16 sm:py-20 md:py-24",
        bordered && "border-t border-border/60",
        className,
      )}
      {...props}
    >
      <div className={cn("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </Component>
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 md:mb-16",
        isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
