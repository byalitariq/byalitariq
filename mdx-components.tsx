import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-14 mb-4 text-2xl font-semibold text-text sm:text-3xl">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold text-text">{children}</h3>,
  p: ({ children }) => <p className="mb-5 leading-relaxed text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mb-6 list-disc space-y-2 pl-5 text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="mb-6 list-decimal space-y-2 pl-5 text-muted">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-text">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} className="text-accent underline underline-offset-4 hover:no-underline">
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-text">{children}</code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-accent pl-5 text-lg text-text">{children}</blockquote>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
