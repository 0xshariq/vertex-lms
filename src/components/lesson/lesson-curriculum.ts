import type { LESSON_BY_SLUG_QUERY_RESULT } from "@/sanity.types";

/**
 * The curriculum shapes the lesson page derives from the parent course. Module and lesson numbers
 * come from array order (AGENTS.md §7), so nothing here reads a stored number.
 */

type Lesson = NonNullable<LESSON_BY_SLUG_QUERY_RESULT>;
export type LessonCourse = NonNullable<Lesson["course"]>;
export type CourseModule = NonNullable<LessonCourse["modules"]>[number];

export interface CurriculumLesson {
  _id: string;
  title: string | null;
  slug: string | null;
  duration: number | null;
  /** "5.1", derived from order. */
  label: string;
  moduleIndex: number;
  isCurrent: boolean;
}

export interface CurriculumModule {
  _key: string;
  title: string | null;
  durationSeconds: number | null;
  index: number;
  lessons: CurriculumLesson[];
  containsCurrentLesson: boolean;
}

export interface Curriculum {
  modules: CurriculumModule[];
  /** Every lesson, flattened in curriculum order. */
  flat: CurriculumLesson[];
  current: CurriculumLesson | null;
  currentModule: CurriculumModule | null;
  previous: CurriculumLesson | null;
  next: CurriculumLesson | null;
}

export function buildCurriculum(
  modules: CourseModule[] | null | undefined,
  currentLessonId: string,
): Curriculum {
  const built: CurriculumModule[] = (modules ?? []).map((module, moduleIndex) => {
    const lessons: CurriculumLesson[] = (module.lessons ?? []).map((lesson, lessonIndex) => ({
      _id: lesson._id,
      title: lesson.title,
      slug: lesson.slug,
      duration: lesson.duration,
      label: `${moduleIndex + 1}.${lessonIndex + 1}`,
      moduleIndex,
      isCurrent: lesson._id === currentLessonId,
    }));

    return {
      _key: module._key,
      title: module.title,
      durationSeconds: module.durationSeconds,
      index: moduleIndex,
      lessons,
      containsCurrentLesson: lessons.some((lesson) => lesson.isCurrent),
    };
  });

  const flat = built.flatMap((module) => module.lessons);
  const currentIndex = flat.findIndex((lesson) => lesson.isCurrent);

  return {
    modules: built,
    flat,
    current: currentIndex >= 0 ? flat[currentIndex] : null,
    currentModule: built.find((module) => module.containsCurrentLesson) ?? null,
    previous: currentIndex > 0 ? flat[currentIndex - 1] : null,
    next: currentIndex >= 0 && currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null,
  };
}
