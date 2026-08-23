import { BookIcon } from '@sanity/icons/Book'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: BookIcon,
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'marketing', title: 'Marketing' },
    { name: 'curriculum', title: 'Curriculum' },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      description: 'One or two sentences. Shown on course cards.',
      type: 'text',
      rows: 3,
      group: 'overview',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      type: 'string',
      group: 'marketing',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      description: 'In USD. Use 0 for a free course.',
      type: 'number',
      group: 'marketing',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'popular',
      description: 'Shows a "Popular" badge in the catalog.',
      type: 'boolean',
      group: 'marketing',
      initialValue: false,
    }),
    defineField({
      name: 'studentCount',
      description: 'Display only.',
      type: 'number',
      group: 'marketing',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'learningOutcomes',
      title: "What you'll learn",
      type: 'array',
      of: [defineArrayMember({ type: 'learningOutcome' })],
      group: 'marketing',
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: 'modules',
      description: 'Ordered. Module numbers in the UI come from this order.',
      type: 'array',
      of: [defineArrayMember({ type: 'module' })],
      group: 'curriculum',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', level: 'level', instructor: 'instructor.name' },
    prepare({ title, media, level, instructor }) {
      return { title, media, subtitle: [level, instructor].filter(Boolean).join(' · ') }
    },
  },
})
