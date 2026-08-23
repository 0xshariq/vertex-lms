import {DocumentPdfIcon} from '@sanity/icons/DocumentPdf'
import {defineField, defineType} from 'sanity'

/** A downloadable or linked resource attached to a lesson. */
export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'PDF', value: 'pdf'},
          {title: 'Link', value: 'link'},
          {title: 'Repository', value: 'repo'},
          {title: 'Code sample', value: 'code'},
          {title: 'Slides', value: 'slides'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['http', 'https']})
          .error('Must be a valid URL starting with http:// or https://'),
    }),
  ],
  preview: {
    select: {title: 'title', type: 'type', url: 'url'},
    prepare({title, type, url}) {
      return {title, subtitle: [type?.toUpperCase(), url].filter(Boolean).join(' · ')}
    },
  },
})
