import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";

/**
 * The lesson's written notes. Serialisers are local and styled to the reference — the project does
 * not use `@tailwindcss/typography`, and the design's prose is a handful of styles.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] leading-[28px] text-neutral-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h3 className="mt-8 font-display text-[20px] leading-7 font-bold text-neutral-900">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="mt-6 text-[16px] leading-6 font-semibold text-neutral-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary-500 pl-4 text-[15px] leading-[28px] text-neutral-700 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 text-[15px] leading-[28px] text-neutral-700 marker:text-primary-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 text-[15px] leading-[28px] text-neutral-700 marker:text-neutral-500">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-neutral-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-xs bg-neutral-100 px-1.5 py-0.5 font-mono text-[13px] text-neutral-900">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : null;
      if (!href?.startsWith("https://")) return <>{children}</>;

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs text-primary-500 underline underline-offset-2 transition-colors hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          {children}
        </a>
      );
    },
  },
};

export function LessonNotes({ notes }: { notes: BlockContent }) {
  return (
    <div className="flex flex-col gap-5">
      <PortableText value={notes} components={components} />
    </div>
  );
}
