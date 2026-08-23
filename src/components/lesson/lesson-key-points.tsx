import { CircleCheck, Lightbulb } from "lucide-react";

interface LessonKeyPointsProps {
  points: string[];
}

/** The "In this lesson you will:" checklist. */
export function LessonKeyPoints({ points }: LessonKeyPointsProps) {
  return (
    <section aria-labelledby="lesson-key-points">
      <h2 id="lesson-key-points" className="text-[15px] leading-6 font-semibold text-neutral-900">
        In this lesson you will:
      </h2>
      <ul className="mt-5 flex flex-col gap-4">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-4 text-[15px] leading-6 text-neutral-700">
            <CircleCheck className="mt-0.5 size-4.5 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The tinted pro tip panel. */
export function LessonProTip({ tip }: { tip: string }) {
  return (
    <aside className="flex gap-4 rounded-md bg-primary-100 p-6">
      <Lightbulb className="mt-0.5 size-5 shrink-0 text-primary-500" strokeWidth={2} aria-hidden />
      <div className="min-w-0">
        <h2 className="font-display text-[16px] leading-6 font-bold text-neutral-900">Pro Tip</h2>
        <p className="mt-1.5 text-[15px] leading-[26px] text-neutral-700">{tip}</p>
      </div>
    </aside>
  );
}
