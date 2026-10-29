import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-ink hover:bg-[#2b3017] shadow-sm font-semibold active:scale-[0.98] transition-all",
        secondary:
          "bg-surface-2 text-text border border-border hover:bg-surface-3 shadow-sm",
        ghost:
          "text-muted hover:text-text hover:bg-surface-2/60",
        outline:
          "border border-border-strong text-text bg-surface hover:border-accent hover:bg-surface-2 shadow-sm",
        subtle:
          "bg-surface text-muted hover:text-text border border-border shadow-sm",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-md",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, external, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (href) {
      if (external || href.startsWith("http") || href.startsWith("mailto:")) {
        return (
          <a
            href={href}
            className={classes}
            target={external || href.startsWith("http") ? "_blank" : undefined}
            rel={external || href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
