import {SparklesIcon} from '@sanity/icons/Sparkles'
import {defineField, defineType} from 'sanity'

/**
 * One entry in a course's "What you'll learn" list.
 *
 * `icon` is constrained to names the web app already ships from lucide-react, so an author
 * cannot pick an icon the frontend has no way to render.
 */
export const learningOutcome = defineType({
  name: 'learningOutcome',
  title: 'Learning outcome',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      options: {
        list: [
          {title: 'Sparkles', value: 'sparkles'},
          {title: 'Layers', value: 'layers'},
          {title: 'Code', value: 'code'},
          {title: 'Rocket', value: 'rocket'},
          {title: 'Shield', value: 'shield'},
          {title: 'Gauge', value: 'gauge'},
          {title: 'Puzzle', value: 'puzzle'},
          {title: 'Workflow', value: 'workflow'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
})
