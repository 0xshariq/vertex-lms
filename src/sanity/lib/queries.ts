import { defineQuery } from "next-sanity";

const COURSE_CARD_FIELDS = /* groq */ `
  _id, title, "slug": slug.current, summary, level, price, popular, studentCount, coverImage,
  "instructor": instructor->{name, "slug": slug.current, photo},
  "category": category->{title, "slug": slug.current},
  "moduleCount": count(modules), "lessonCount": count(modules[].lessons[]),
  "durationSeconds": math::sum(modules[].lessons[]->duration)
`;

export const COURSES_LIST_QUERY = defineQuery(`*[_type == "course" && defined(slug.current)] | order(popular desc, title asc) { ${COURSE_CARD_FIELDS} }`);
export const COURSE_SLUGS_QUERY = defineQuery(`*[_type == "course" && defined(slug.current)]{"slug": slug.current}`);

export const COURSE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "course" && slug.current == $slug][0]{
    ${COURSE_CARD_FIELDS}, learningOutcomes[]{_key, icon, title, description},
    "instructorDetail": instructor->{_id, name, "slug": slug.current, photo, expertise, bio},
    modules[]{_key, title, summary, "durationSeconds": math::sum(lessons[]->duration), lessons[]->{_id, title, "slug": slug.current, duration, freePreview}}
  }
`);

export const LESSON_SLUGS_QUERY = defineQuery(`*[_type == "lesson" && defined(slug.current)]{"slug": slug.current}`);

export const LESSON_BY_SLUG_QUERY = defineQuery(`
  *[_type == "lesson" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, videoUrl, thumbnail, duration, freePreview, studentCount,
    notes, keyPoints, proTip, resources[]{_key, type, title, description, url},
    "course": *[_type == "course" && references(^._id)][0]{
      _id, title, "slug": slug.current, level, coverImage,
      "instructor": instructor->{name, "slug": slug.current, photo},
      modules[]{_key, title, "durationSeconds": math::sum(lessons[]->duration), lessons[]->{_id, title, "slug": slug.current, duration, freePreview}}
    }
  }
`);

export const LESSONS_BY_IDS_QUERY = defineQuery(`
  *[_type == "lesson" && _id in $ids]{
    _id, _createdAt, title, "slug": slug.current, duration, videoUrl, freePreview, keyPoints,
    "thumbnailRef": thumbnail.asset._ref,
    "video": *[_type == "video" && url == ^.videoUrl][0]{
      url, chapters[]{startSeconds, label}, chunks[]{startSeconds}
    },
    "course": *[_type == "course" && references(^._id)][0]{
      title, "slug": slug.current, "iconRef": coverImage.asset._ref,
      modules[]{_key, title, "lessonIds": lessons[]._ref}
    }
  }
`);

export const INSTRUCTORS_LIST_QUERY = defineQuery(`*[_type == "instructor" && defined(slug.current)] | order(name asc) {_id, name, "slug": slug.current, photo, expertise, "courseCount": count(*[_type == "course" && instructor._ref == ^._id])}`);
export const INSTRUCTOR_BY_SLUG_QUERY = defineQuery(`*[_type == "instructor" && slug.current == $slug][0]{_id, name, "slug": slug.current, photo, expertise, bio, "courses": *[_type == "course" && instructor._ref == ^._id] | order(title asc) {${COURSE_CARD_FIELDS}}}`);
export const CATEGORIES_LIST_QUERY = defineQuery(`*[_type == "category" && defined(slug.current)] | order(title asc) {_id, title, "slug": slug.current, description, "courseCount": count(*[_type == "course" && category._ref == ^._id])}`);
