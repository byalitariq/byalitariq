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
          "bg-accent text-white hover:bg-blue-700 shadow-[0_4px_16px_rgba(37,99,235,0.28)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.38)] active:scale-[0.98] font-semibold transition-all",
        secondary:
          "bg-white text-slate-800 border border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50/50 shadow-sm",
        ghost:
          "text-slate-600 hover:text-slate-900 hover:bg-indigo-50/60",
        outline:
          "border border-indigo-200/90 text-slate-800 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 shadow-sm",
        subtle:
          "bg-white/90 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm",
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
