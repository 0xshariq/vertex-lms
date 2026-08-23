import {
  Code,
  Gauge,
  Layers,
  type LucideIcon,
  Puzzle,
  Rocket,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { COURSE_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

type Course = NonNullable<COURSE_BY_SLUG_QUERY_RESULT>;
type Outcome = NonNullable<Course["learningOutcomes"]>[number];

/** Mirrors the icon list in `studio/schemaTypes/objects/learningOutcome.ts`. */
const icons: Record<NonNullable<Outcome["icon"]>, LucideIcon> = {
  sparkles: Sparkles,
  layers: Layers,
  code: Code,
  rocket: Rocket,
  shield: Shield,
  gauge: Gauge,
  puzzle: Puzzle,
  workflow: Workflow,
};

interface LearningOutcomesProps {
  outcomes: Outcome[];
}

/** The "What you'll learn" panel: a bordered canvas panel holding a two-column card grid. */
export function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  return (
    <section
      aria-labelledby="what-youll-learn"
      className="rounded-lg border border-canvas-line p-6 sm:p-7"
    >
      <h2
        id="what-youll-learn"
        className="font-display text-[24px] leading-8 font-bold text-neutral-900"
      >
        What you&rsquo;ll learn
      </h2>

      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {outcomes.map((outcome) => {
          const Icon = icons[outcome.icon ?? "sparkles"] ?? Sparkles;

          return (
            <li
              key={outcome._key}
              className="flex items-start gap-6 rounded-lg border border-canvas-line p-6 sm:p-7"
            >
              <Icon className="size-12 shrink-0 text-primary-400" strokeWidth={1.5} aria-hidden />
              <div className="min-w-0">
                <h3 className="font-display text-[19px] leading-6 font-medium text-neutral-900">
                  {outcome.title}
                </h3>
                {outcome.description && (
                  <p className="mt-3 text-[15px] leading-[28px] text-neutral-500">
                    {outcome.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
