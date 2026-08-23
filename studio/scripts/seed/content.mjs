/**
 * The authored seed content for Vertex.
 *
 * This file is the source of truth: everything the dataset gets is written here by hand so the
 * curriculum is coherent top to bottom — a module's lessons genuinely cover that module's topic,
 * and a course's modules genuinely cover that course. Search quality depends on that (AGENTS.md
 * §7), so nothing in here is filler.
 *
 * What is NOT here, because it is derived rather than authored:
 * - lesson `duration` — taken from the real resolved YouTube video (see resolve-videos.mjs)
 * - lesson `videoUrl` and `thumbnail` — the resolved video and its poster frame
 * - module and lesson numbers — derived from array order by the frontend, never stored
 * - course/module duration and lesson counts — derived by GROQ with count() / math::sum()
 */

/** Categories. Slugs double as document ids (`category.<slug>`). */
export const categories = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description:
      'Building for the browser: frameworks, rendering models, and the performance work that makes them feel fast.',
  },
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    description:
      'Putting language models into real products — prompting, retrieval, tool use, evaluation, and cost.',
  },
  {
    slug: 'backend-infrastructure',
    title: 'Backend & Infrastructure',
    description:
      'The systems behind the product: architecture, containers, orchestration, and running things reliably.',
  },
  {
    slug: 'data',
    title: 'Data',
    description:
      'Working with data end to end, from querying and modelling it to cleaning, analysing, and visualising it.',
  },
  {
    slug: 'languages',
    title: 'Languages',
    description:
      'Going deep on the languages you already write, and the type systems and tooling that surround them.',
  },
  {
    slug: 'security',
    title: 'Security',
    description:
      'Finding and closing the holes in web applications, from common vulnerabilities to auth and hardening.',
  },
]

/**
 * Instructors. Each teaches exactly two courses, and their expertise tags match what they teach.
 * These are fictional people; portraits are synthetic placeholder images.
 */
export const instructors = [
  {
    slug: 'mira-kovac',
    name: 'Mira Kovac',
    portrait: {gender: 'women', id: 44},
    expertise: ['React', 'Next.js', 'Web performance', 'Rendering'],
    bio: [
      'Mira has spent the last decade building large React applications and then making them fast again. She works on rendering architecture, and cares more about what ships to the browser than about what looks clever in the editor.',
      'She teaches the way she debugs: measure first, form a hypothesis, change one thing. Her courses lean heavily on the profiler and the network tab.',
    ],
  },
  {
    slug: 'daniel-okafor',
    name: 'Daniel Okafor',
    portrait: {gender: 'men', id: 32},
    expertise: ['TypeScript', 'PostgreSQL', 'API design', 'Data modelling'],
    bio: [
      'Daniel works on the layer where application code meets the database. He has spent years untangling type systems and query plans, usually in the same afternoon.',
      'He believes most runtime bugs are modelling mistakes that were visible earlier, and he teaches both TypeScript and Postgres from that angle.',
    ],
  },
  {
    slug: 'priya-raman',
    name: 'Priya Raman',
    portrait: {gender: 'women', id: 68},
    expertise: ['LLMs', 'RAG', 'Prompt engineering', 'Evaluation'],
    bio: [
      'Priya builds products on top of language models and, more importantly, the evaluation harnesses that tell you whether they actually work. She has shipped retrieval systems over messy, real-world corpora.',
      'Her position is that almost every bad AI feature is a retrieval or evaluation problem wearing a prompt-engineering costume.',
    ],
  },
  {
    slug: 'tomas-berg',
    name: 'Tomas Berg',
    portrait: {gender: 'men', id: 75},
    expertise: ['Python', 'pandas', 'System design', 'Distributed systems'],
    bio: [
      'Tomas moves between data work and backend architecture, which is less of a jump than it sounds: both are mostly about what you do when the volume grows by two orders of magnitude.',
      'He teaches with worked examples and back-of-the-envelope numbers, because a design you cannot estimate is a design you cannot defend.',
    ],
  },
  {
    slug: 'alina-costa',
    name: 'Alina Costa',
    portrait: {gender: 'women', id: 12},
    expertise: ['Docker', 'Kubernetes', 'CI/CD', 'Application security'],
    bio: [
      'Alina runs the path from a developer laptop to production and everything that can go wrong along it — build pipelines, orchestration, secrets, and the attack surface all of it creates.',
      'She teaches operations and security together, on the grounds that a system nobody can deploy safely is not actually secure.',
    ],
  },
]

/**
 * Courses. Four modules each, three lessons per module.
 *
 * Per lesson:
 * - `search` is the phrase the video resolver puts into YouTube to find a real, topical video
 * - `summary` and `points` are what the notes and key points are assembled from
 * - `resource` is an optional lesson-specific link; every lesson also gets the course `docs` link
 */
export const courses = [
  {
    slug: 'nextjs-app-router-in-depth',
    title: 'Next.js App Router in Depth',
    category: 'web-development',
    instructor: 'mira-kovac',
    level: 'intermediate',
    price: 89,
    popular: true,
    studentCount: 18240,
    summary:
      'Learn the App Router the way it actually works: routing and layouts, the server/client boundary, caching, and server actions.',
    docs: {title: 'Next.js documentation', url: 'https://nextjs.org/docs'},
    outcomes: [
      {
        icon: 'layers',
        title: 'Model routes with layouts',
        description:
          'Compose nested layouts, templates, and route groups so shared UI never re-renders needlessly.',
      },
      {
        icon: 'workflow',
        title: 'Draw the server/client line',
        description:
          'Decide what runs on the server and what ships to the browser, and pass data across the boundary safely.',
      },
      {
        icon: 'gauge',
        title: 'Control caching',
        description:
          'Understand what is cached, for how long, and how to revalidate it on demand instead of guessing.',
      },
      {
        icon: 'rocket',
        title: 'Mutate with server actions',
        description:
          'Handle forms, validation, and optimistic updates without hand-writing an API layer.',
      },
    ],
    modules: [
      {
        title: 'Routing and Layouts',
        summary:
          'How the App Router turns folders into URLs, and how layouts let you share UI without re-rendering it.',
        lessons: [
          {
            slug: 'file-system-routing',
            title: 'File-system routing and the app directory',
            search: 'next.js app router file system routing tutorial',
            summary:
              'The App Router maps folders to URL segments and reserved filenames to behaviour. Once you can read a folder tree as a set of routes, most of the framework stops being magic.',
            points: [
              'Map folders and page files to URL segments',
              'Use route groups to organise without affecting the URL',
              'Recognise the reserved files: page, layout, loading, error, not-found',
            ],
            proTip:
              'A folder in parentheses is a route group: it organises your files without adding a segment to the URL.',
          },
          {
            slug: 'layouts-and-templates',
            title: 'Layouts, templates, and shared UI',
            search: 'next.js layout vs template app router',
            summary:
              'Layouts persist across navigations and keep their state; templates remount on every navigation. Choosing the wrong one is why your sidebar scroll position keeps resetting.',
            points: [
              'Nest layouts to share chrome across a section',
              'Know when state persistence makes a template the wrong choice',
              'Colocate loading and error UI with the layout it belongs to',
            ],
          },
          {
            slug: 'dynamic-routes-and-params',
            title: 'Dynamic routes and route params',
            search: 'next.js dynamic routes generateStaticParams tutorial',
            summary:
              'Dynamic segments capture values out of the URL and hand them to your page. Pre-generating the known ones turns a database read into a static file.',
            points: [
              'Capture single, catch-all, and optional catch-all segments',
              'Read params and search params inside a page',
              'Pre-render known routes with generateStaticParams',
            ],
            proTip:
              'Pre-generate the routes you already know about; leave the long tail to render on demand.',
          },
        ],
      },
      {
        title: 'Server and Client Components',
        summary:
          'The boundary that defines the App Router: what runs on the server, what ships to the browser, and how data crosses between them.',
        lessons: [
          {
            slug: 'server-components',
            title: 'What server components actually do',
            search: 'react server components explained tutorial',
            summary:
              'Server components run on the server and send rendered output rather than code. That is why they can read a database directly and why they add nothing to your bundle.',
            points: [
              'Render on the server and ship no component code to the client',
              'Read data and secrets directly, without an API round trip',
              'Understand why server components cannot hold state or effects',
            ],
            resource: {
              type: 'link',
              title: 'React docs: Server Components',
              description: 'The upstream React explanation the Next.js implementation follows.',
              url: 'https://react.dev/reference/rsc/server-components',
            },
          },
          {
            slug: 'use-client-boundary',
            title: 'The "use client" boundary',
            search: 'use client directive next.js when to use',
            summary:
              'The directive does not mark one component as interactive — it marks the entry point to a client subtree. Everything imported below it goes to the browser too.',
            points: [
              'Place the directive at the boundary, not on every file',
              'Push interactivity to the leaves to keep the bundle small',
              'Spot the accidental import that drags the server tree client-side',
            ],
            proTip:
              'If a whole page turned into a client component, look for one interactive import near the top of the tree.',
          },
          {
            slug: 'passing-data-across-the-boundary',
            title: 'Passing data across the boundary',
            search: 'next.js passing props server component to client component',
            summary:
              'Props crossing into a client component get serialised, which is why functions and class instances fail. Composition through children keeps server-rendered content out of the bundle.',
            points: [
              'Pass only serialisable props into client components',
              'Use children to slot server content inside a client shell',
              'Avoid leaking server-only data through props',
            ],
          },
        ],
      },
      {
        title: 'Data Fetching and Caching',
        summary:
          'Fetching data where it belongs, understanding what gets cached, and streaming the slow parts so the page appears immediately.',
        lessons: [
          {
            slug: 'fetching-in-server-components',
            title: 'Fetching data in server components',
            search: 'next.js data fetching server components tutorial',
            summary:
              'A server component can simply await its data. No client-side loading state, no waterfall of effects, and no exposed credentials.',
            points: [
              'Await data directly inside an async server component',
              'Fetch in parallel instead of sequential waterfalls',
              'Keep tokens and database access on the server',
            ],
          },
          {
            slug: 'caching-and-revalidation',
            title: 'Caching and revalidation',
            search: 'next.js caching revalidation tutorial',
            summary:
              'Caching is the part people get burned by. Know what layer holds your data, how long it holds it, and which lever invalidates it.',
            points: [
              'Distinguish request-level caching from the full route cache',
              'Revalidate on a timer or on demand by tag',
              'Opt out deliberately when data must always be fresh',
            ],
            proTip:
              'Tag your reads by content type; then one webhook can invalidate exactly the pages that changed.',
          },
          {
            slug: 'streaming-and-suspense',
            title: 'Streaming with Suspense',
            search: 'next.js streaming suspense loading ui tutorial',
            summary:
              'Streaming lets the fast parts of a page render while the slow parts are still loading, so time to first paint stops being hostage to your slowest query.',
            points: [
              'Wrap slow subtrees in Suspense with a real fallback',
              'Use loading files for route-level streaming',
              'Avoid blocking the shell on a single slow request',
            ],
          },
        ],
      },
      {
        title: 'Server Actions and Mutations',
        summary:
          'Writing data from the client without hand-building an API: actions, form validation, and optimistic UI.',
        lessons: [
          {
            slug: 'server-actions-basics',
            title: 'Writing your first server action',
            search: 'next.js server actions tutorial',
            summary:
              'A server action is a function that only ever runs on the server but can be called from the client. It replaces the route handler you would otherwise write by hand.',
            points: [
              'Define an action and call it from a form or an event',
              'Revalidate the affected data after a write',
              'Keep write credentials on the server side of the call',
            ],
          },
          {
            slug: 'forms-and-validation',
            title: 'Forms, validation, and error states',
            search: 'next.js server actions form validation zod',
            summary:
              'Client-side validation is a convenience; the server check is the real one. Parse the payload on arrival and return errors the form can render.',
            points: [
              'Validate submitted data on the server before writing',
              'Return structured field errors back to the form',
              'Keep the form usable when JavaScript has not loaded',
            ],
            proTip:
              'Never trust the shape of an incoming payload. Parse it, then use the parsed value.',
          },
          {
            slug: 'optimistic-updates',
            title: 'Optimistic updates',
            search: 'react useOptimistic hook tutorial',
            summary:
              'Optimistic UI shows the expected result immediately and reconciles when the server answers. The interesting part is what happens when the server disagrees.',
            points: [
              'Render the expected state before the server confirms',
              'Roll back cleanly when the action fails',
              'Keep optimistic state scoped to the component that owns it',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'react-performance-engineering',
    title: 'React Performance Engineering',
    category: 'web-development',
    instructor: 'mira-kovac',
    level: 'advanced',
    price: 119,
    popular: false,
    studentCount: 7420,
    summary:
      'Measure before you optimise. Profiling, render behaviour, concurrent features, and shipping less JavaScript.',
    docs: {title: 'React documentation', url: 'https://react.dev/learn'},
    outcomes: [
      {
        icon: 'gauge',
        title: 'Measure honestly',
        description:
          'Use the profiler and field metrics to find the real bottleneck instead of the one you assumed.',
      },
      {
        icon: 'workflow',
        title: 'Control re-renders',
        description:
          'Understand why a component re-rendered and fix the cause rather than papering over it with memo.',
      },
      {
        icon: 'sparkles',
        title: 'Use concurrent features',
        description:
          'Keep the interface responsive during expensive updates with transitions and deferred values.',
      },
      {
        icon: 'rocket',
        title: 'Ship less JavaScript',
        description:
          'Split, lazy load, and prefetch so the bundle stops being the first thing that hurts.',
      },
    ],
    modules: [
      {
        title: 'Measuring Performance',
        summary:
          'Getting numbers before you change anything: profiling tools, field metrics, and finding wasted work.',
        lessons: [
          {
            slug: 'react-devtools-profiler',
            title: 'Profiling with React DevTools',
            search: 'react devtools profiler tutorial performance',
            summary:
              'The profiler records what rendered, how long it took, and why it happened. Reading a flame graph correctly is most of the diagnostic work.',
            points: [
              'Record a realistic interaction, not an idle page',
              'Read the flame graph and the ranked chart',
              'Turn on "why did this render" to get the cause',
            ],
          },
          {
            slug: 'core-web-vitals',
            title: 'Core Web Vitals in a React app',
            search: 'core web vitals LCP INP CLS explained',
            summary:
              'Lab numbers on your laptop are not what users experience. Vitals give you a field measure of loading, responsiveness, and visual stability.',
            points: [
              'Interpret LCP, INP, and CLS in practical terms',
              'Separate lab data from field data',
              'Attribute a poor score to a specific element or interaction',
            ],
            proTip:
              'A good score on your machine means very little. Look at the field data from real devices.',
          },
          {
            slug: 'finding-wasted-renders',
            title: 'Finding wasted renders',
            search: 'react unnecessary re-renders find and fix',
            summary:
              'Most React slowness is a subtree re-rendering for no reason. Track it back to the prop or context value that changes identity on every render.',
            points: [
              'Trace a re-render back to the prop that changed',
              'Spot object and function props recreated each render',
              'Recognise context as a re-render broadcast',
            ],
          },
        ],
      },
      {
        title: 'Rendering Optimization',
        summary:
          'The tools for cutting render work — memoisation and stable identity — and when reaching for them is the wrong move.',
        lessons: [
          {
            slug: 'react-memo',
            title: 'When memo actually helps',
            search: 'react memo when to use performance',
            summary:
              'memo skips a re-render when props are shallow-equal. It costs a comparison on every render, so applying it everywhere makes things slower, not faster.',
            points: [
              'Apply memo to expensive subtrees with stable props',
              'Understand shallow comparison and why objects defeat it',
              'Recognise when restructuring beats memoising',
            ],
          },
          {
            slug: 'usememo-and-usecallback',
            title: 'useMemo and useCallback in practice',
            search: 'useMemo useCallback when to use react',
            summary:
              'These hooks preserve identity between renders. Their value is in what depends on that identity, not in the caching itself.',
            points: [
              'Memoise values that feed memoised children or effects',
              'Get the dependency array right, every time',
              'Skip memoisation when the computation is trivial',
            ],
            proTip:
              'If nothing downstream depends on the identity of a value, memoising it buys you nothing.',
          },
          {
            slug: 'keys-and-reconciliation',
            title: 'Keys and list reconciliation',
            search: 'react keys reconciliation lists explained',
            summary:
              'Keys tell React which item is which. Using an array index means insertions silently reassign state to the wrong row.',
            points: [
              'Use stable identity for keys, never the array index',
              'Understand how reconciliation matches elements between renders',
              'Diagnose lost input state in a reordered list',
            ],
          },
        ],
      },
      {
        title: 'Concurrent React',
        summary:
          'Keeping the interface responsive while expensive work happens: transitions, deferred values, and Suspense.',
        lessons: [
          {
            slug: 'usetransition',
            title: 'Marking updates with useTransition',
            search: 'react useTransition hook tutorial',
            summary:
              'A transition marks an update as interruptible, so typing stays smooth while an expensive list re-filters behind it.',
            points: [
              'Separate an urgent update from a non-urgent one',
              'Show pending state without blocking input',
              'Recognise the interactions worth marking',
            ],
          },
          {
            slug: 'usedeferredvalue',
            title: 'Deferring expensive values',
            search: 'react useDeferredValue tutorial',
            summary:
              'A deferred value lags behind the real one on purpose, letting the urgent render finish first with the previous result.',
            points: [
              'Defer a value that drives expensive rendering',
              'Choose between deferring a value and wrapping an update',
              'Communicate staleness to the user while it catches up',
            ],
          },
          {
            slug: 'suspense-for-data',
            title: 'Suspense for data loading',
            search: 'react suspense data fetching tutorial',
            summary:
              'Suspense moves loading state out of the component and into its boundary, so you stop threading isLoading through the tree.',
            points: [
              'Place boundaries where a meaningful fallback exists',
              'Avoid a single boundary that blocks the whole page',
              'Combine Suspense with error boundaries for failures',
            ],
            proTip:
              'Put the boundary where a skeleton would make sense to a user, not wherever the fetch happens to live.',
          },
        ],
      },
      {
        title: 'Bundle and Load Performance',
        summary:
          'The work that happens before React even runs: splitting code, loading it at the right moment, and handling heavy assets.',
        lessons: [
          {
            slug: 'code-splitting',
            title: 'Code splitting that pays off',
            search: 'javascript code splitting bundle size tutorial',
            summary:
              'Splitting only helps if the split-off code was genuinely not needed for the first screen. Analyse the bundle before you cut it.',
            points: [
              'Read a bundle analysis and find the heavy dependency',
              'Split along route and interaction boundaries',
              'Avoid splitting code that is needed immediately anyway',
            ],
          },
          {
            slug: 'lazy-loading-and-prefetch',
            title: 'Lazy loading and prefetching',
            search: 'react lazy suspense prefetch components',
            summary:
              'Lazy loading defers the download; prefetching starts it early on a hint like hover. Together they hide the network cost from the user.',
            points: [
              'Load a component only when it is about to be needed',
              'Prefetch on intent signals such as hover or viewport',
              'Keep a fallback that does not shift the layout',
            ],
          },
          {
            slug: 'images-and-fonts',
            title: 'Images and fonts',
            search: 'web performance optimize images fonts loading',
            summary:
              'Images and fonts usually dominate loading performance and layout shift. Sizing, formats, and font display strategy fix most of it.',
            points: [
              'Serve correctly sized, modern image formats',
              'Reserve space so images do not shift the layout',
              'Choose a font loading strategy that avoids invisible text',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'typescript-for-application-developers',
    title: 'TypeScript for Application Developers',
    category: 'languages',
    instructor: 'daniel-okafor',
    level: 'intermediate',
    price: 79,
    popular: true,
    studentCount: 22110,
    summary:
      'Go past annotations. Structural typing, narrowing, generics, and the type-level tools that make invalid states impossible.',
    docs: {title: 'TypeScript handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html'},
    outcomes: [
      {
        icon: 'shield',
        title: 'Make invalid states unrepresentable',
        description:
          'Model your domain so the compiler rejects the combinations that should never happen.',
      },
      {
        icon: 'puzzle',
        title: 'Write real generics',
        description:
          'Build reusable functions and components that keep type information instead of erasing it.',
      },
      {
        icon: 'code',
        title: 'Use the type-level toolkit',
        description:
          'Apply conditional, mapped, and template literal types where they earn their complexity.',
      },
      {
        icon: 'workflow',
        title: 'Type the boundaries',
        description:
          'Validate and type the data crossing into your app, so external data stops being an any.',
      },
    ],
    modules: [
      {
        title: 'How the Type System Thinks',
        summary:
          'The mental model underneath everything else: structural compatibility, unions, and narrowing.',
        lessons: [
          {
            slug: 'structural-typing',
            title: 'Structural typing and assignability',
            search: 'typescript structural typing explained',
            summary:
              'TypeScript compares shapes, not names. Two unrelated types are interchangeable if their members line up, which explains most surprising assignability errors.',
            points: [
              'Compare types by structure rather than declaration',
              'Read an assignability error from the mismatched member up',
              'Use branded types when structural compatibility is too loose',
            ],
          },
          {
            slug: 'unions-and-narrowing',
            title: 'Unions and narrowing',
            search: 'typescript narrowing discriminated unions tutorial',
            summary:
              'A discriminated union plus a check on the discriminant is the workhorse pattern of typed application code. Narrowing is how the compiler follows your control flow.',
            points: [
              'Model alternatives as a discriminated union',
              'Narrow with typeof, in, and discriminant checks',
              'Make a switch exhaustive with a never assertion',
            ],
            proTip:
              'An exhaustive switch that assigns the leftover case to never turns a future missing branch into a compile error.',
          },
          {
            slug: 'literal-types-and-const',
            title: 'Literal types and const assertions',
            search: 'typescript const assertion literal types',
            summary:
              'Widening is why your string turned into string. A const assertion keeps the literal, which is what makes union-of-literals modelling work.',
            points: [
              'Understand literal widening and when it happens',
              'Freeze a literal shape with as const',
              'Derive a union of allowed values from a constant array',
            ],
          },
        ],
      },
      {
        title: 'Generics',
        summary:
          'Writing code that keeps type information flowing through it instead of collapsing to any.',
        lessons: [
          {
            slug: 'generic-functions',
            title: 'Generic functions and inference',
            search: 'typescript generics tutorial functions',
            summary:
              'A type parameter links an input type to an output type. Most of the skill is letting inference do the work rather than annotating call sites.',
            points: [
              'Relate argument and return types with a type parameter',
              'Let inference fill in type arguments at the call site',
              'Recognise when a generic adds nothing over a union',
            ],
          },
          {
            slug: 'generic-constraints',
            title: 'Constraints and default type parameters',
            search: 'typescript generic constraints extends keyof',
            summary:
              'Constraints say what a type parameter must at least be. Combined with keyof, they give you property access that stays typed.',
            points: [
              'Constrain a parameter with extends',
              'Use keyof to type property access generically',
              'Give a type parameter a sensible default',
            ],
          },
          {
            slug: 'generic-react-components',
            title: 'Generic components in React',
            search: 'typescript generic react components props',
            summary:
              'A typed list component should tell you what its render callback receives. Generic props are how a reusable component stays specific at each use.',
            points: [
              'Type a component over the shape of its items',
              'Keep render props and callbacks correctly typed',
              'Forward refs without losing the generic parameter',
            ],
            proTip:
              'If a reusable component takes items and hands them back to a callback, it wants a type parameter.',
          },
        ],
      },
      {
        title: 'Advanced Types',
        summary:
          'The type-level features that let a type be computed from another type, and the judgement to use them sparingly.',
        lessons: [
          {
            slug: 'conditional-types',
            title: 'Conditional types and infer',
            search: 'typescript conditional types infer tutorial',
            summary:
              'A conditional type branches on assignability, and infer pulls a type out of the branch it matched. This is how utility types are built.',
            points: [
              'Branch a type on an extends check',
              'Extract inner types with infer',
              'Understand distribution over union members',
            ],
          },
          {
            slug: 'mapped-types',
            title: 'Mapped types and key remapping',
            search: 'typescript mapped types tutorial',
            summary:
              'Mapped types transform every property of a type at once, which is where Partial, Readonly, and their friends come from.',
            points: [
              'Transform every property of an existing type',
              'Add or strip optional and readonly modifiers',
              'Remap keys with an as clause',
            ],
          },
          {
            slug: 'template-literal-types',
            title: 'Template literal types',
            search: 'typescript template literal types tutorial',
            summary:
              'String types can be composed and pattern-matched, which lets you type things like event names and route paths precisely.',
            points: [
              'Compose string types from other types',
              'Constrain string shapes such as event or route names',
              'Combine template literals with key remapping',
            ],
            proTip:
              'Template literal types are excellent for typed event names, and a trap when used to parse arbitrary strings.',
          },
        ],
      },
      {
        title: 'TypeScript in Practice',
        summary:
          'Configuration, external data, and the places typed code meets the untyped world.',
        lessons: [
          {
            slug: 'tsconfig-strictness',
            title: 'tsconfig and strictness settings',
            search: 'typescript tsconfig strict mode explained',
            summary:
              'Strict mode is a set of independent flags. Knowing what each one catches lets you adopt them incrementally on an existing codebase.',
            points: [
              'Understand what each strict flag actually checks',
              'Turn on strictness incrementally in a legacy project',
              'Configure module resolution to match your runtime',
            ],
          },
          {
            slug: 'typing-apis-with-zod',
            title: 'Typing external data at the boundary',
            search: 'zod typescript schema validation tutorial',
            summary:
              'Data from the network is unknown until you prove otherwise. A runtime schema validates it once and gives you a static type for free.',
            points: [
              'Parse unknown input instead of casting it',
              'Derive a static type from a runtime schema',
              'Fail loudly at the boundary rather than deep inside',
            ],
            resource: {
              type: 'link',
              title: 'Zod documentation',
              description: 'Schema definition, parsing, and type inference.',
              url: 'https://zod.dev',
            },
          },
          {
            slug: 'declaration-files',
            title: 'Declaration files and untyped packages',
            search: 'typescript declaration files d.ts tutorial',
            summary:
              'Sooner or later a dependency ships no types. Writing a small declaration file is faster and safer than sprinkling any across your codebase.',
            points: [
              'Write a minimal declaration for an untyped module',
              'Augment the types of an existing package',
              'Declare global types without polluting every file',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'building-ai-apps-with-llms',
    title: 'Building AI Apps with LLMs',
    category: 'ai-engineering',
    instructor: 'priya-raman',
    level: 'intermediate',
    price: 99,
    popular: true,
    studentCount: 26380,
    summary:
      'From first API call to a feature you can ship: prompting, structured output, tool calling, streaming, and cost control.',
    docs: {title: 'Claude API documentation', url: 'https://docs.anthropic.com/en/api/overview'},
    outcomes: [
      {
        icon: 'sparkles',
        title: 'Understand the model',
        description:
          'Reason about tokens, context windows, and sampling instead of treating the model as a black box.',
      },
      {
        icon: 'code',
        title: 'Get structured output',
        description:
          'Make a model return data your program can rely on, and validate it before you use it.',
      },
      {
        icon: 'workflow',
        title: 'Wire up tool calling',
        description:
          'Let the model call your functions, and keep the loop bounded and observable.',
      },
      {
        icon: 'gauge',
        title: 'Ship it affordably',
        description:
          'Stream responses, cache what repeats, and keep latency and spend under control.',
      },
    ],
    modules: [
      {
        title: 'LLM Fundamentals',
        summary:
          'What the model is doing, what it costs, and which knobs actually change the output.',
        lessons: [
          {
            slug: 'tokens-and-context-windows',
            title: 'Tokens and context windows',
            search: 'llm tokens context window explained',
            summary:
              'Models read tokens, not characters, and they can only see a fixed window of them. Both your bill and your failures come back to this.',
            points: [
              'Understand tokenisation and why cost is per token',
              'Budget a prompt against the context window',
              'Recognise the failure modes of an overflowing context',
            ],
            proTip:
              'Count tokens before you ship a prompt template. Long system prompts are billed on every single call.',
          },
          {
            slug: 'temperature-and-sampling',
            title: 'Temperature and sampling',
            search: 'llm temperature top_p sampling explained',
            summary:
              'Sampling parameters decide how the next token is picked. Low temperature for extraction and classification, higher for anything that should feel varied.',
            points: [
              'Trade determinism against variety with temperature',
              'Know what top-p changes and when to touch it',
              'Pick settings per task rather than globally',
            ],
          },
          {
            slug: 'choosing-a-model',
            title: 'Choosing a model for the job',
            search: 'choosing the right llm model comparison',
            summary:
              'The largest model is rarely the right default. Match capability, latency, and price to what the specific step of your product needs.',
            points: [
              'Weigh capability against latency and cost',
              'Route easy steps to a smaller, faster model',
              'Build an evaluation before committing to a choice',
            ],
          },
        ],
      },
      {
        title: 'Prompting That Holds Up',
        summary:
          'Writing prompts that behave the same way on the thousandth call as they did on the first.',
        lessons: [
          {
            slug: 'system-prompts',
            title: 'Designing the system prompt',
            search: 'system prompt design best practices llm',
            summary:
              'The system prompt sets role, constraints, and refusals. It is followed more reliably than instructions buried in user content, so the load-bearing rules belong here.',
            points: [
              'Separate durable rules from per-request input',
              'State constraints and refusals explicitly',
              'Keep it short enough to stay affordable per call',
            ],
          },
          {
            slug: 'few-shot-prompting',
            title: 'Few-shot examples',
            search: 'few shot prompting examples tutorial',
            summary:
              'Examples communicate format and edge-case handling far better than description. Two well-chosen ones usually beat a paragraph of instructions.',
            points: [
              'Show the format instead of describing it',
              'Choose examples that cover the tricky cases',
              'Watch for examples that bias the output',
            ],
          },
          {
            slug: 'structured-output',
            title: 'Structured output and JSON',
            search: 'llm structured output json schema tutorial',
            summary:
              'If your code consumes the output, it needs a schema. Constrain the shape, then validate the response before anything downstream touches it.',
            points: [
              'Constrain responses to a declared schema',
              'Validate the parsed output at runtime',
              'Handle the case where the model returns nothing usable',
            ],
            proTip:
              'Validate structured output even when the API guarantees a schema. A retry is cheaper than corrupt data.',
          },
        ],
      },
      {
        title: 'Tool Calling and Agents',
        summary:
          'Letting the model act: exposing functions, running the loop, and keeping the whole thing bounded.',
        lessons: [
          {
            slug: 'tool-calling',
            title: 'Tool calling fundamentals',
            search: 'llm function calling tools tutorial',
            summary:
              'You describe the functions, the model chooses one and supplies arguments, your code executes it. The description of each tool matters as much as the prompt.',
            points: [
              'Describe a tool so the model uses it correctly',
              'Execute the call and feed the result back',
              'Validate arguments before executing anything',
            ],
          },
          {
            slug: 'agent-loops',
            title: 'Building an agent loop',
            search: 'building llm agent loop tutorial',
            summary:
              'An agent is a loop: call the model, run the tool it asked for, feed the result back, repeat. Every loop needs a stopping condition it cannot argue with.',
            points: [
              'Structure the call, execute, feed back cycle',
              'Bound the loop with iteration and token limits',
              'Log each step so failures can be replayed',
            ],
          },
          {
            slug: 'guardrails-and-evals',
            title: 'Guardrails and evaluation',
            search: 'llm evaluation guardrails testing tutorial',
            summary:
              'Without an evaluation set you cannot tell an improvement from a regression. Guardrails then enforce the limits your evaluation exposed.',
            points: [
              'Build a small, honest evaluation set early',
              'Score changes against it before shipping',
              'Enforce boundaries the model must not cross',
            ],
            proTip:
              'Thirty real examples you curated beat a thousand you generated with the same model you are testing.',
          },
        ],
      },
      {
        title: 'Shipping to Production',
        summary:
          'The engineering around the model: streaming, cost, caching, and behaving well under load.',
        lessons: [
          {
            slug: 'streaming-responses',
            title: 'Streaming responses to the browser',
            search: 'streaming llm response server sent events tutorial',
            summary:
              'A streamed answer feels immediate even when total latency is unchanged. Streaming through your own server also keeps your API key off the client.',
            points: [
              'Stream tokens from the server to the browser',
              'Render partial output without layout thrash',
              'Handle cancellation and mid-stream errors',
            ],
          },
          {
            slug: 'cost-and-latency',
            title: 'Managing cost and latency',
            search: 'reduce llm api cost latency optimization',
            summary:
              'Cost is prompt design, model choice, and how often you call. Measure per-request tokens before you try to optimise anything.',
            points: [
              'Attribute spend to specific calls and prompts',
              'Trim prompts and route by difficulty',
              'Set timeouts and fall back gracefully',
            ],
          },
          {
            slug: 'caching-and-rate-limits',
            title: 'Caching and rate limits',
            search: 'llm prompt caching rate limiting tutorial',
            summary:
              'Repeated prefixes can be cached, repeated questions can be answered from your own cache, and rate limits will find you eventually — so retry with backoff.',
            points: [
              'Cache stable prompt prefixes to cut cost',
              'Retry with exponential backoff on rate limits',
              'Queue or shed load instead of failing hard',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'retrieval-augmented-generation-from-scratch',
    title: 'Retrieval-Augmented Generation from Scratch',
    category: 'ai-engineering',
    instructor: 'priya-raman',
    level: 'advanced',
    price: 129,
    popular: false,
    studentCount: 9130,
    summary:
      'Build a RAG system that actually retrieves the right thing: embeddings, chunking, hybrid search, reranking, and grounded answers.',
    docs: {title: 'Sanity Context and content APIs', url: 'https://www.sanity.io/docs'},
    outcomes: [
      {
        icon: 'puzzle',
        title: 'Understand embeddings',
        description:
          'Know what a vector encodes, what it does not, and which similarity measure to use.',
      },
      {
        icon: 'layers',
        title: 'Chunk content well',
        description:
          'Split documents so retrieved passages are self-contained and carry useful metadata.',
      },
      {
        icon: 'gauge',
        title: 'Improve retrieval quality',
        description:
          'Combine keyword and vector search, then rerank, and measure whether it helped.',
      },
      {
        icon: 'shield',
        title: 'Ground every answer',
        description:
          'Cite sources, and make the system say it does not know instead of inventing one.',
      },
    ],
    modules: [
      {
        title: 'Embeddings and Vector Search',
        summary:
          'The retrieval primitive: turning text into vectors and finding the near ones quickly.',
        lessons: [
          {
            slug: 'what-embeddings-are',
            title: 'What an embedding actually encodes',
            search: 'text embeddings explained vector representation',
            summary:
              'An embedding maps text to a point in space where nearby means related. It captures topic and usage, not truth, and definitely not recency.',
            points: [
              'Read an embedding as a position in semantic space',
              'Know what embeddings fail to capture',
              'Choose an embedding model for your content',
            ],
          },
          {
            slug: 'vector-databases',
            title: 'Vector databases and indexes',
            search: 'vector database tutorial explained',
            summary:
              'Exact nearest-neighbour search does not scale, so vector indexes trade a little recall for a lot of speed. Knowing the trade-off keeps you out of trouble.',
            points: [
              'Understand approximate nearest neighbour search',
              'Trade recall against latency deliberately',
              'Store metadata alongside vectors for filtering',
            ],
          },
          {
            slug: 'similarity-metrics',
            title: 'Similarity metrics and thresholds',
            search: 'cosine similarity vs euclidean distance embeddings',
            summary:
              'Cosine similarity is the usual default, but the number it gives you is only meaningful relative to your own corpus. Calibrate the threshold, do not guess it.',
            points: [
              'Compare cosine, dot product, and euclidean distance',
              'Calibrate a relevance threshold on real queries',
              'Detect the case where nothing is actually relevant',
            ],
            proTip:
              'A similarity score has no absolute meaning. Calibrate the cutoff against queries you know the answers to.',
          },
        ],
      },
      {
        title: 'Ingestion and Indexing',
        summary:
          'Getting your content into the index in a shape that retrieves well and stays current.',
        lessons: [
          {
            slug: 'chunking-strategies',
            title: 'Chunking strategies',
            search: 'rag chunking strategies tutorial',
            summary:
              'Chunk size decides what a match can even mean. Too small and passages lose context; too large and the relevant sentence gets drowned.',
            points: [
              'Split on structure rather than a fixed character count',
              'Use overlap to avoid cutting an idea in half',
              'Keep each chunk understandable on its own',
            ],
          },
          {
            slug: 'metadata-and-filtering',
            title: 'Metadata and filtered retrieval',
            search: 'rag metadata filtering vector search',
            summary:
              'Metadata turns semantic search into scoped semantic search. Filtering by source, type, or date removes whole classes of wrong answer.',
            points: [
              'Attach source, type, and timestamp to every chunk',
              'Filter before ranking to cut the candidate set',
              'Use metadata to attribute answers back to a source',
            ],
          },
          {
            slug: 'keeping-the-index-fresh',
            title: 'Keeping the index fresh',
            search: 'incremental reindexing vector database updates',
            summary:
              'Content changes and stale chunks keep getting retrieved. Incremental reindexing driven by content events beats rebuilding everything nightly.',
            points: [
              'Reindex incrementally on content change events',
              'Delete chunks whose source no longer exists',
              'Version the index so a bad run can be rolled back',
            ],
          },
        ],
      },
      {
        title: 'Retrieval Quality',
        summary:
          'Where most RAG systems are won or lost: combining retrieval methods, reranking, and measuring the result.',
        lessons: [
          {
            slug: 'hybrid-search',
            title: 'Hybrid keyword and vector search',
            search: 'hybrid search bm25 vector rag tutorial',
            summary:
              'Vector search misses exact identifiers; keyword search misses paraphrase. Running both and fusing the rankings covers each one’s blind spot.',
            points: [
              'Combine lexical and semantic result sets',
              'Fuse rankings rather than concatenating them',
              'Fall back to keyword search when embeddings are unavailable',
            ],
            proTip:
              'If embeddings are switched off in your environment, wildcarded keyword matching is the fallback that still works.',
          },
          {
            slug: 'reranking',
            title: 'Reranking retrieved candidates',
            search: 'reranker cross encoder rag tutorial',
            summary:
              'Retrieve broadly, then rerank precisely. A reranker reads query and passage together, which is why it beats vector distance on ordering.',
            points: [
              'Retrieve a wide candidate set, then narrow it',
              'Score query and passage jointly with a reranker',
              'Balance the latency cost against the accuracy gain',
            ],
          },
          {
            slug: 'evaluating-retrieval',
            title: 'Evaluating retrieval',
            search: 'evaluating rag retrieval metrics recall precision',
            summary:
              'Before blaming the model for a bad answer, check whether the right passage was ever retrieved. Recall at k tells you which half of the system to fix.',
            points: [
              'Build a query set with known correct passages',
              'Measure recall and precision at k',
              'Separate retrieval failures from generation failures',
            ],
          },
        ],
      },
      {
        title: 'Grounded Generation',
        summary:
          'Turning retrieved passages into an answer that is traceable, honest, and measurable.',
        lessons: [
          {
            slug: 'grounding-and-citations',
            title: 'Grounding answers with citations',
            search: 'rag citations grounding llm answers',
            summary:
              'An answer the user can verify is worth far more than a confident one. Carry identifiers through retrieval so every claim can point back to a source.',
            points: [
              'Instruct the model to answer only from context',
              'Thread source ids through to the rendered answer',
              'Make citations clickable back to the original',
            ],
          },
          {
            slug: 'handling-no-answer',
            title: 'Handling the no-answer case',
            search: 'llm hallucination prevention no answer rag',
            summary:
              'The hardest behaviour to get is a clean "I don’t know". Make it an explicit, allowed output instead of the model’s last resort.',
            points: [
              'Detect when retrieval returned nothing relevant',
              'Make abstaining an explicit, acceptable outcome',
              'Offer a next step instead of a dead end',
            ],
            proTip:
              'An empty state that points somewhere useful beats a fabricated answer every single time.',
          },
          {
            slug: 'end-to-end-rag-evaluation',
            title: 'End-to-end RAG evaluation',
            search: 'rag evaluation framework end to end tutorial',
            summary:
              'Evaluate the pipeline the user experiences: was the answer faithful to the retrieved context, and did it address the question.',
            points: [
              'Score faithfulness to the retrieved context',
              'Score relevance to the original question',
              'Track both across releases to catch regressions',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'python-for-data-work',
    title: 'Python for Data Work',
    category: 'data',
    instructor: 'tomas-berg',
    level: 'beginner',
    price: 0,
    popular: true,
    studentCount: 31450,
    summary:
      'A practical on-ramp to data work in Python: the language basics you need, pandas, plotting, and reproducible workflows.',
    docs: {title: 'pandas documentation', url: 'https://pandas.pydata.org/docs/'},
    outcomes: [
      {
        icon: 'code',
        title: 'Write practical Python',
        description:
          'Use the data types, comprehensions, and file handling that data work leans on daily.',
      },
      {
        icon: 'layers',
        title: 'Work with dataframes',
        description:
          'Load, clean, filter, and aggregate tabular data with pandas without fighting the API.',
      },
      {
        icon: 'sparkles',
        title: 'Visualise findings',
        description:
          'Produce charts that communicate a result rather than merely displaying numbers.',
      },
      {
        icon: 'workflow',
        title: 'Make it reproducible',
        description:
          'Manage environments and turn a notebook into something that runs the same way twice.',
      },
    ],
    modules: [
      {
        title: 'Python Foundations for Data',
        summary:
          'The subset of Python that data work actually uses, taught in the order you will need it.',
        lessons: [
          {
            slug: 'python-data-types',
            title: 'Lists, dicts, and the types you will use',
            search: 'python lists dictionaries tutorial beginners',
            summary:
              'Lists, dictionaries, sets, and tuples cover almost everything before a dataframe shows up. Picking the right one is a performance decision as much as a style one.',
            points: [
              'Choose between list, dict, set, and tuple',
              'Index, slice, and iterate without off-by-one errors',
              'Understand mutability and why it bites',
            ],
          },
          {
            slug: 'comprehensions',
            title: 'Comprehensions and iteration',
            search: 'python list comprehension tutorial',
            summary:
              'A comprehension is a filter and a transform in one line. Readable when the logic is small, unreadable the moment you nest three of them.',
            points: [
              'Transform and filter a sequence in one expression',
              'Build dict and set comprehensions',
              'Know when a plain loop is clearer',
            ],
          },
          {
            slug: 'files-and-csv',
            title: 'Reading files and CSVs',
            search: 'python read csv files tutorial',
            summary:
              'Real data arrives as a slightly wrong file. Encodings, delimiters, and missing values are the first three problems you will meet.',
            points: [
              'Read and write files safely with context managers',
              'Parse CSV data and handle encoding issues',
              'Deal with missing and malformed rows on load',
            ],
            proTip:
              'Open a file with a context manager. It closes even when the code inside raises.',
          },
        ],
      },
      {
        title: 'pandas Essentials',
        summary:
          'The dataframe workflow: loading, cleaning, reshaping, and summarising tabular data.',
        lessons: [
          {
            slug: 'dataframes-basics',
            title: 'Series, dataframes, and indexing',
            search: 'pandas dataframe tutorial beginners',
            summary:
              'A dataframe is columns of typed series sharing an index. Once the index clicks, selection with loc and iloc stops being guesswork.',
            points: [
              'Create dataframes and inspect their dtypes',
              'Select rows and columns with loc and iloc',
              'Understand why the index matters',
            ],
          },
          {
            slug: 'cleaning-data',
            title: 'Cleaning messy data',
            search: 'pandas data cleaning missing values tutorial',
            summary:
              'Cleaning is most of the job: missing values, duplicate rows, inconsistent categories, and columns that arrived as strings.',
            points: [
              'Handle missing values without silently distorting results',
              'Remove duplicates and normalise categories',
              'Convert columns to the correct dtype',
            ],
          },
          {
            slug: 'groupby-and-aggregation',
            title: 'groupby and aggregation',
            search: 'pandas groupby aggregation tutorial',
            summary:
              'Split, apply, combine is the pattern behind nearly every summary table you will ever produce.',
            points: [
              'Group rows and aggregate each group',
              'Apply several aggregations at once',
              'Pivot and reshape a summary for presentation',
            ],
            proTip:
              'Think split-apply-combine. Almost every reporting question is a groupby wearing a disguise.',
          },
        ],
      },
      {
        title: 'Visualising Data',
        summary:
          'Turning a result into a chart someone can read, and knowing which chart to reach for.',
        lessons: [
          {
            slug: 'matplotlib-basics',
            title: 'Plotting with matplotlib',
            search: 'matplotlib tutorial beginners plotting',
            summary:
              'Matplotlib is verbose but total. Learn the figure and axes model once and every other plotting library makes more sense.',
            points: [
              'Work with the figure and axes objects',
              'Plot lines, bars, and scatter charts',
              'Label axes and export at the right resolution',
            ],
          },
          {
            slug: 'seaborn-statistical-plots',
            title: 'Statistical plots with seaborn',
            search: 'seaborn tutorial statistical data visualization',
            summary:
              'Seaborn sits on matplotlib and handles distributions, categories, and relationships with far less code.',
            points: [
              'Plot distributions and relationships quickly',
              'Facet a chart by a categorical column',
              'Drop down to matplotlib when you need control',
            ],
          },
          {
            slug: 'telling-a-story-with-charts',
            title: 'Choosing the right chart',
            search: 'data visualization best practices choosing charts',
            summary:
              'The chart type encodes your claim. Comparison, distribution, composition, and relationship each have a form that reads instantly and several that mislead.',
            points: [
              'Match the chart form to the question being asked',
              'Remove decoration that competes with the data',
              'Avoid axis choices that overstate a difference',
            ],
            proTip:
              'If the chart needs a paragraph to explain what it shows, the chart is the wrong one.',
          },
        ],
      },
      {
        title: 'Reproducible Workflows',
        summary:
          'Making the analysis run again next month, on someone else’s machine, with the same result.',
        lessons: [
          {
            slug: 'jupyter-notebooks',
            title: 'Working effectively in notebooks',
            search: 'jupyter notebook tutorial best practices',
            summary:
              'Notebooks are excellent for exploring and terrible at hidden state. Restart and run all is the only honest test of a notebook.',
            points: [
              'Structure a notebook so it reads top to bottom',
              'Avoid out-of-order execution and stale state',
              'Move stable code out into importable modules',
            ],
          },
          {
            slug: 'virtual-environments',
            title: 'Virtual environments and dependencies',
            search: 'python virtual environment venv pip tutorial',
            summary:
              'An environment per project, with pinned versions, is what stops "it worked yesterday" from being a real sentence.',
            points: [
              'Create and activate a per-project environment',
              'Pin dependencies so installs are repeatable',
              'Keep environment files under version control',
            ],
          },
          {
            slug: 'automating-a-data-job',
            title: 'Automating a recurring data job',
            search: 'python automate data pipeline script tutorial',
            summary:
              'The last step is turning the analysis into a script that runs on a schedule, logs what it did, and fails loudly.',
            points: [
              'Turn a notebook into a parameterised script',
              'Log progress and failures usefully',
              'Schedule the job and alert when it breaks',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'system-design-foundations',
    title: 'System Design Foundations',
    category: 'backend-infrastructure',
    instructor: 'tomas-berg',
    level: 'intermediate',
    price: 109,
    popular: false,
    studentCount: 14760,
    summary:
      'The building blocks of scalable systems — load balancing, caching, queues, partitioning, and the reliability work around them.',
    docs: {title: 'AWS Architecture Center', url: 'https://aws.amazon.com/architecture/'},
    outcomes: [
      {
        icon: 'layers',
        title: 'Assemble the building blocks',
        description:
          'Know what load balancers, caches, and queues each solve, and what they cost you.',
      },
      {
        icon: 'workflow',
        title: 'Scale the data layer',
        description:
          'Partition and replicate data, and reason clearly about the consistency you gave up.',
      },
      {
        icon: 'shield',
        title: 'Design resilient APIs',
        description:
          'Handle retries, idempotency, and rate limiting so failures do not compound.',
      },
      {
        icon: 'gauge',
        title: 'Estimate capacity',
        description:
          'Do the arithmetic that turns a hand-wavy design into a defensible one.',
      },
    ],
    modules: [
      {
        title: 'Core Building Blocks',
        summary:
          'The three components that appear in nearly every architecture diagram, and what each one is actually for.',
        lessons: [
          {
            slug: 'load-balancing',
            title: 'Load balancing',
            search: 'load balancing system design explained',
            summary:
              'A load balancer spreads traffic and hides failed instances. The interesting choices are the algorithm and what happens to sessions.',
            points: [
              'Compare round robin, least connections, and hashing',
              'Health check instances and drain them safely',
              'Handle session affinity without pinning users forever',
            ],
          },
          {
            slug: 'caching-layers',
            title: 'Caching layers and invalidation',
            search: 'caching strategies system design explained',
            summary:
              'Caching is the cheapest performance win and the most common source of confusing bugs. Decide where it lives and what invalidates it before you add it.',
            points: [
              'Place caches at the edge, application, or data layer',
              'Choose a write strategy and an eviction policy',
              'Plan invalidation before you plan the cache',
            ],
            proTip:
              'Design the invalidation path first. A cache you cannot invalidate is a bug with a latency benefit.',
          },
          {
            slug: 'message-queues',
            title: 'Queues and asynchronous work',
            search: 'message queue system design tutorial',
            summary:
              'A queue decouples producers from consumers and absorbs bursts. The cost is that you now have to think about ordering, retries, and duplicates.',
            points: [
              'Move slow work out of the request path',
              'Handle retries, dead letters, and duplicate delivery',
              'Reason about ordering guarantees you actually have',
            ],
          },
        ],
      },
      {
        title: 'Data at Scale',
        summary:
          'What happens to your database when one machine is no longer enough.',
        lessons: [
          {
            slug: 'sharding-and-partitioning',
            title: 'Sharding and partitioning',
            search: 'database sharding partitioning system design',
            summary:
              'Partitioning splits data across machines. The shard key decides whether that scales smoothly or creates one very hot node.',
            points: [
              'Choose a shard key that spreads load evenly',
              'Compare range, hash, and directory partitioning',
              'Plan for resharding before you need it',
            ],
          },
          {
            slug: 'replication',
            title: 'Replication and read scaling',
            search: 'database replication leader follower explained',
            summary:
              'Replicas give you read capacity and failover. They also give you a window where a follower answers with data that is slightly out of date.',
            points: [
              'Distinguish synchronous from asynchronous replication',
              'Route reads to replicas without breaking read-your-writes',
              'Plan and rehearse failover',
            ],
          },
          {
            slug: 'consistency-and-cap',
            title: 'Consistency models and CAP',
            search: 'CAP theorem consistency models explained',
            summary:
              'When the network partitions you choose consistency or availability. Most real systems pick a different answer per operation.',
            points: [
              'Place a system on the consistency spectrum',
              'Choose guarantees per operation, not per database',
              'Explain the user-visible effect of eventual consistency',
            ],
            proTip:
              'Ask what the user sees when a read is stale. That answer picks your consistency model faster than any theorem.',
          },
        ],
      },
      {
        title: 'API Design at Scale',
        summary:
          'The contract other systems depend on, and how it behaves when they misbehave.',
        lessons: [
          {
            slug: 'rest-vs-graphql',
            title: 'REST and GraphQL trade-offs',
            search: 'rest vs graphql api design comparison',
            summary:
              'REST gives you cacheable, predictable endpoints; GraphQL gives clients exactly the data they asked for. The trade is caching and complexity.',
            points: [
              'Compare fixed endpoints against flexible queries',
              'Weigh caching behaviour on each side',
              'Version an API without breaking existing clients',
            ],
          },
          {
            slug: 'rate-limiting',
            title: 'Rate limiting',
            search: 'rate limiting algorithms token bucket explained',
            summary:
              'Rate limiting protects you from clients and clients from themselves. Token bucket is the usual answer; the hard part is the key you limit on.',
            points: [
              'Implement token bucket and sliding window limits',
              'Choose the right key: user, tenant, or IP',
              'Return limits and retry hints in the response',
            ],
          },
          {
            slug: 'idempotency-and-retries',
            title: 'Idempotency and safe retries',
            search: 'idempotency key api retries explained',
            summary:
              'Any request can be delivered twice. An idempotency key lets the second delivery return the first result instead of charging the card again.',
            points: [
              'Make write endpoints safe to retry',
              'Accept and store idempotency keys',
              'Retry with backoff and jitter, not in lockstep',
            ],
            proTip:
              'Retries without jitter turn one blip into a synchronised stampede.',
          },
        ],
      },
      {
        title: 'Reliability and Operations',
        summary:
          'Knowing what your system is doing, and what it does when a dependency stops answering.',
        lessons: [
          {
            slug: 'observability',
            title: 'Observability: logs, metrics, traces',
            search: 'observability logs metrics traces explained',
            summary:
              'Metrics tell you something is wrong, traces tell you where, logs tell you why. You need all three, and they need to share request ids.',
            points: [
              'Instrument the three signals and correlate them',
              'Alert on symptoms users feel, not on causes',
              'Trace a request across service boundaries',
            ],
          },
          {
            slug: 'failure-modes-and-timeouts',
            title: 'Timeouts, retries, and circuit breakers',
            search: 'circuit breaker timeout retry pattern microservices',
            summary:
              'A dependency that hangs is worse than one that fails. Timeouts convert hanging into failing, and circuit breakers stop failure spreading.',
            points: [
              'Set timeouts on every outbound call',
              'Break the circuit when a dependency is clearly down',
              'Degrade gracefully instead of cascading',
            ],
          },
          {
            slug: 'capacity-estimation',
            title: 'Capacity estimation',
            search: 'back of the envelope capacity estimation system design',
            summary:
              'Rough arithmetic on requests, payload sizes, and growth turns opinions into a design you can defend in a review.',
            points: [
              'Estimate throughput, storage, and bandwidth',
              'Size for peak, not for average',
              'Sanity check a design against the numbers',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'postgresql-for-developers',
    title: 'PostgreSQL for Developers',
    category: 'data',
    instructor: 'daniel-okafor',
    level: 'intermediate',
    price: 89,
    popular: false,
    studentCount: 11890,
    summary:
      'SQL you will actually write, schemas that hold up, indexes that get used, and the operational basics behind them.',
    docs: {title: 'PostgreSQL documentation', url: 'https://www.postgresql.org/docs/current/'},
    outcomes: [
      {
        icon: 'code',
        title: 'Write serious SQL',
        description:
          'Joins, aggregates, CTEs, and window functions, without reaching for the ORM every time.',
      },
      {
        icon: 'layers',
        title: 'Design a schema that lasts',
        description:
          'Normalise sensibly, use constraints as guarantees, and pick the right data types.',
      },
      {
        icon: 'gauge',
        title: 'Make queries fast',
        description:
          'Read a query plan and add the index that plan is asking for.',
      },
      {
        icon: 'shield',
        title: 'Operate it safely',
        description:
          'Transactions, migrations, backups, and pooling — the parts that matter at 3am.',
      },
    ],
    modules: [
      {
        title: 'SQL Essentials',
        summary:
          'The query constructs that cover the overwhelming majority of real application SQL.',
        lessons: [
          {
            slug: 'select-and-joins',
            title: 'SELECT and joins',
            search: 'sql joins tutorial inner left outer',
            summary:
              'Joins combine rows across tables, and the join type decides what happens to the rows with no match. Most wrong result sets are a join type mistake.',
            points: [
              'Choose between inner, left, right, and full joins',
              'Join on the right keys and avoid accidental fan-out',
              'Filter in WHERE versus in the join condition',
            ],
          },
          {
            slug: 'aggregates-and-grouping',
            title: 'Aggregates and GROUP BY',
            search: 'sql group by having aggregate functions tutorial',
            summary:
              'Aggregation collapses rows into summaries. WHERE filters before grouping and HAVING after — mixing them up is the classic bug.',
            points: [
              'Aggregate with count, sum, avg, min, and max',
              'Group correctly and know what must be in GROUP BY',
              'Filter groups with HAVING, rows with WHERE',
            ],
          },
          {
            slug: 'ctes-and-window-functions',
            title: 'CTEs and window functions',
            search: 'sql window functions cte tutorial',
            summary:
              'CTEs make a long query readable; window functions compute across related rows without collapsing them. Running totals and rankings stop being hard.',
            points: [
              'Break a complex query into named CTEs',
              'Rank and number rows within partitions',
              'Compute running totals and row-to-row differences',
            ],
            proTip:
              'When you catch yourself writing a subquery inside a subquery, a CTE will make it readable.',
          },
        ],
      },
      {
        title: 'Schema Design',
        summary:
          'Modelling data so the database enforces your rules instead of hoping the application does.',
        lessons: [
          {
            slug: 'normalization',
            title: 'Normalisation and when to break it',
            search: 'database normalization explained tutorial',
            summary:
              'Normalising removes duplicated truth. Denormalising trades that safety for read speed, and should be a decision rather than an accident.',
            points: [
              'Remove duplicated data and update anomalies',
              'Recognise when denormalisation is justified',
              'Model many-to-many relationships properly',
            ],
          },
          {
            slug: 'constraints-and-keys',
            title: 'Constraints, keys, and integrity',
            search: 'postgresql constraints foreign keys tutorial',
            summary:
              'Constraints are guarantees the database keeps even when a buggy deploy does not. Foreign keys, uniqueness, and checks belong in the schema.',
            points: [
              'Enforce relationships with foreign keys',
              'Use unique and check constraints as invariants',
              'Choose delete behaviour deliberately',
            ],
          },
          {
            slug: 'data-types-and-jsonb',
            title: 'Data types and JSONB',
            search: 'postgresql jsonb data types tutorial',
            summary:
              'Postgres has rich types, and JSONB for the genuinely unstructured remainder. Reaching for JSONB too early throws away every guarantee above.',
            points: [
              'Pick precise types for time, money, and identifiers',
              'Use JSONB for genuinely variable data only',
              'Index inside a JSONB column when you must query it',
            ],
            proTip:
              'JSONB is for data whose shape you genuinely cannot know. It is not a shortcut past schema design.',
          },
        ],
      },
      {
        title: 'Query Performance',
        summary:
          'Finding the slow query, understanding why it is slow, and fixing the actual cause.',
        lessons: [
          {
            slug: 'indexes',
            title: 'How indexes work',
            search: 'postgresql indexes btree explained tutorial',
            summary:
              'An index is a sorted structure the planner may choose to use. Column order in a composite index decides which queries it can serve.',
            points: [
              'Understand B-tree indexes and column order',
              'Add partial and expression indexes where they fit',
              'Weigh the write cost of every index you add',
            ],
          },
          {
            slug: 'explain-analyze',
            title: 'Reading EXPLAIN ANALYZE',
            search: 'postgresql explain analyze query plan tutorial',
            summary:
              'The plan tells you what the database did and what it expected. A large gap between estimated and actual rows is usually the real problem.',
            points: [
              'Read a plan from the innermost node outwards',
              'Spot sequential scans that should be index scans',
              'Compare estimated against actual row counts',
            ],
          },
          {
            slug: 'query-tuning',
            title: 'Tuning a slow query',
            search: 'postgresql slow query optimization tutorial',
            summary:
              'Rewriting is often better than indexing. Remove the function on the indexed column, cut the rows early, and check the plan again.',
            points: [
              'Rewrite predicates so an index can be used',
              'Reduce the row count as early as possible',
              'Verify the improvement with a fresh plan',
            ],
            proTip:
              'Wrapping an indexed column in a function usually disables the index. Transform the parameter instead.',
          },
        ],
      },
      {
        title: 'Operating Postgres',
        summary:
          'Transactions, schema change, and the operational habits that keep production boring.',
        lessons: [
          {
            slug: 'transactions-and-isolation',
            title: 'Transactions and isolation levels',
            search: 'postgresql transaction isolation levels explained',
            summary:
              'Isolation decides which concurrency anomalies you can still see. Read committed is the default, and it permits more than most people assume.',
            points: [
              'Keep transactions short and correctly scoped',
              'Compare read committed, repeatable read, and serializable',
              'Avoid deadlocks by ordering access consistently',
            ],
          },
          {
            slug: 'migrations',
            title: 'Schema migrations without downtime',
            search: 'zero downtime database migration postgres',
            summary:
              'A migration runs against a live application. Expand, migrate, contract lets you change a schema while both old and new code are running.',
            points: [
              'Apply the expand, migrate, contract pattern',
              'Avoid locks that block writes on large tables',
              'Make every migration reversible or forward-only on purpose',
            ],
          },
          {
            slug: 'backups-and-pooling',
            title: 'Backups and connection pooling',
            search: 'postgresql backup restore connection pooling',
            summary:
              'A backup you have never restored is a hypothesis. A pooler is what stops a few hundred idle app connections from exhausting the server.',
            points: [
              'Take backups and rehearse a restore',
              'Understand point-in-time recovery',
              'Pool connections in front of the database',
            ],
            proTip:
              'An untested backup is not a backup. Restore one on a schedule.',
          },
        ],
      },
    ],
  },

  {
    slug: 'devops-with-docker-and-kubernetes',
    title: 'DevOps with Docker and Kubernetes',
    category: 'backend-infrastructure',
    instructor: 'alina-costa',
    level: 'advanced',
    price: 139,
    popular: false,
    studentCount: 8640,
    summary:
      'Containerise an application, run it on Kubernetes, ship it through a pipeline, and operate it once it is live.',
    docs: {title: 'Kubernetes documentation', url: 'https://kubernetes.io/docs/home/'},
    outcomes: [
      {
        icon: 'layers',
        title: 'Build lean images',
        description:
          'Write Dockerfiles that cache well and produce small, reproducible images.',
      },
      {
        icon: 'workflow',
        title: 'Run workloads on Kubernetes',
        description:
          'Deployments, services, ingress, and configuration, without cargo-culting YAML.',
      },
      {
        icon: 'rocket',
        title: 'Automate delivery',
        description:
          'Build a pipeline that tests, builds, and rolls out — and rolls back when it should.',
      },
      {
        icon: 'gauge',
        title: 'Operate what you deployed',
        description:
          'Monitor, scale, and debug a running cluster with limits that make sense.',
      },
    ],
    modules: [
      {
        title: 'Containers and Images',
        summary:
          'What a container actually is, and how to build images that are small, fast, and reproducible.',
        lessons: [
          {
            slug: 'docker-images-and-dockerfiles',
            title: 'Images, containers, and Dockerfiles',
            search: 'docker tutorial images containers dockerfile',
            summary:
              'An image is a stacked filesystem plus metadata; a container is a running instance of one. Every Dockerfile instruction is a layer.',
            points: [
              'Distinguish an image from a running container',
              'Write a Dockerfile that builds reproducibly',
              'Choose a base image deliberately',
            ],
          },
          {
            slug: 'layers-and-build-cache',
            title: 'Layers, caching, and multi-stage builds',
            search: 'docker multi stage build layer caching tutorial',
            summary:
              'Instruction order decides your build time. Copy dependency manifests before source, and use a multi-stage build to leave the toolchain behind.',
            points: [
              'Order instructions so the cache survives code changes',
              'Separate build and runtime with multi-stage builds',
              'Cut image size and shrink the attack surface',
            ],
            proTip:
              'Copy your lockfile and install dependencies before copying source. Otherwise every edit invalidates the install layer.',
          },
          {
            slug: 'docker-compose',
            title: 'Local stacks with Compose',
            search: 'docker compose tutorial multi container',
            summary:
              'Compose runs your app together with its database and cache, with one file describing the whole local environment.',
            points: [
              'Define multi-service stacks in one file',
              'Wire up networks, volumes, and environment variables',
              'Keep local configuration close to production',
            ],
          },
        ],
      },
      {
        title: 'Kubernetes Core Objects',
        summary:
          'The handful of objects you need before any of the rest of Kubernetes makes sense.',
        lessons: [
          {
            slug: 'pods-and-deployments',
            title: 'Pods, ReplicaSets, and Deployments',
            search: 'kubernetes pods deployments tutorial explained',
            summary:
              'You declare a desired state and the controller works towards it. A Deployment is how you express "n copies of this, updated this way".',
            points: [
              'Read the pod, ReplicaSet, and Deployment relationship',
              'Declare desired state and let controllers converge',
              'Configure readiness and liveness probes',
            ],
          },
          {
            slug: 'services-and-ingress',
            title: 'Services and ingress',
            search: 'kubernetes services ingress networking tutorial',
            summary:
              'Pods come and go, so Services give them a stable address. Ingress is what puts an HTTP route in front of that.',
            points: [
              'Expose pods with a stable service address',
              'Compare ClusterIP, NodePort, and LoadBalancer',
              'Route external HTTP traffic with ingress rules',
            ],
          },
          {
            slug: 'configmaps-and-secrets',
            title: 'ConfigMaps and Secrets',
            search: 'kubernetes configmap secrets tutorial',
            summary:
              'Configuration belongs outside the image. Secrets look like ConfigMaps but need encryption at rest and tighter access control.',
            points: [
              'Inject configuration as environment variables or files',
              'Keep secrets out of images and manifests',
              'Roll configuration changes without rebuilding',
            ],
            proTip:
              'A Kubernetes Secret is only base64 encoded by default. Encryption at rest and RBAC are what make it a secret.',
          },
        ],
      },
      {
        title: 'Continuous Delivery',
        summary:
          'The automated path from a merged commit to running code, including the way back.',
        lessons: [
          {
            slug: 'ci-cd-pipelines',
            title: 'Building a CI/CD pipeline',
            search: 'ci cd pipeline github actions tutorial',
            summary:
              'A pipeline runs the same steps every time: test, build, push, deploy. Its value is the consistency, not the automation.',
            points: [
              'Structure test, build, and deploy stages',
              'Cache dependencies to keep pipelines quick',
              'Gate deploys on checks that genuinely matter',
            ],
          },
          {
            slug: 'rolling-deploys-and-rollbacks',
            title: 'Rolling deploys and rollbacks',
            search: 'kubernetes rolling update rollback deployment strategy',
            summary:
              'A rolling update replaces pods gradually so there is no downtime. The important half is being able to reverse it in seconds.',
            points: [
              'Configure a rolling update and its surge settings',
              'Compare rolling, blue-green, and canary strategies',
              'Roll back quickly and predictably',
            ],
          },
          {
            slug: 'helm',
            title: 'Packaging with Helm',
            search: 'helm charts kubernetes tutorial',
            summary:
              'Helm templates your manifests so one chart serves staging and production with different values, instead of four near-identical YAML directories.',
            points: [
              'Template manifests and separate values per environment',
              'Install, upgrade, and roll back a release',
              'Manage chart dependencies',
            ],
          },
        ],
      },
      {
        title: 'Operating a Cluster',
        summary:
          'Life after the first deploy: visibility, scaling, and debugging what is actually running.',
        lessons: [
          {
            slug: 'monitoring-and-logs',
            title: 'Monitoring and logs',
            search: 'kubernetes monitoring prometheus grafana logs tutorial',
            summary:
              'Container logs vanish with the container. Ship them somewhere, scrape metrics, and alert on what users would notice.',
            points: [
              'Aggregate logs off ephemeral pods',
              'Scrape and dashboard cluster and app metrics',
              'Alert on user-visible symptoms',
            ],
          },
          {
            slug: 'autoscaling',
            title: 'Autoscaling workloads',
            search: 'kubernetes horizontal pod autoscaler tutorial',
            summary:
              'Horizontal autoscaling adds pods when a metric crosses a threshold. It only works if requests are set and your app starts quickly.',
            points: [
              'Scale pods on CPU or custom metrics',
              'Tune thresholds to avoid flapping',
              'Combine pod autoscaling with cluster autoscaling',
            ],
          },
          {
            slug: 'resource-limits-and-troubleshooting',
            title: 'Resource limits and troubleshooting',
            search: 'kubernetes resource requests limits troubleshooting oomkilled',
            summary:
              'Requests drive scheduling, limits drive eviction. CrashLoopBackOff and OOMKilled are usually a limits conversation, not a code one.',
            points: [
              'Set requests and limits that reflect real usage',
              'Diagnose CrashLoopBackOff and OOMKilled pods',
              'Debug a pod with logs, describe, and exec',
            ],
            proTip:
              'Requests decide where a pod is scheduled; limits decide when it gets killed. They are not the same number.',
          },
        ],
      },
    ],
  },

  {
    slug: 'practical-web-security',
    title: 'Practical Web Security',
    category: 'security',
    instructor: 'alina-costa',
    level: 'intermediate',
    price: 99,
    popular: false,
    studentCount: 13270,
    summary:
      'The vulnerabilities that actually show up in web applications, how they are exploited, and how to close them for good.',
    docs: {title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/'},
    outcomes: [
      {
        icon: 'shield',
        title: 'Think in threat models',
        description:
          'Reason about who your attacker is and what they can reach before writing defences.',
      },
      {
        icon: 'code',
        title: 'Close the common holes',
        description:
          'Understand and prevent injection, cross-site scripting, and request forgery.',
      },
      {
        icon: 'workflow',
        title: 'Get authentication right',
        description:
          'Sessions, password storage, and multi-factor done the way that survives review.',
      },
      {
        icon: 'gauge',
        title: 'Harden the deployment',
        description:
          'Headers, transport, secrets, and dependencies — the perimeter around your code.',
      },
    ],
    modules: [
      {
        title: 'Thinking About Threats',
        summary:
          'Before any specific vulnerability: who is attacking, what they want, and what secure defaults look like.',
        lessons: [
          {
            slug: 'owasp-top-ten',
            title: 'The OWASP Top 10, practically',
            search: 'owasp top 10 explained web application security',
            summary:
              'The Top 10 is a map of where things actually go wrong. Reading it as categories rather than a checklist is what makes it useful.',
            points: [
              'Recognise each category in real application code',
              'Prioritise by exploitability and impact',
              'Use it as a review lens rather than a checklist',
            ],
          },
          {
            slug: 'authentication-vs-authorization',
            title: 'Authentication versus authorization',
            search: 'authentication vs authorization explained',
            summary:
              'Authentication is who you are; authorization is what you may do. Broken access control is consistently the most common serious finding.',
            points: [
              'Separate identity from permission checks',
              'Enforce authorization on the server, every time',
              'Catch insecure direct object references',
            ],
            proTip:
              'Every authorization check must happen on the server. A hidden button is not a permission.',
          },
          {
            slug: 'secure-defaults',
            title: 'Secure defaults and least privilege',
            search: 'principle of least privilege secure defaults explained',
            summary:
              'Most breaches exploit something that was left open rather than something clever. Default deny, then grant the narrow thing that is needed.',
            points: [
              'Default to deny and grant explicitly',
              'Scope credentials to the minimum they need',
              'Reduce attack surface by removing unused paths',
            ],
          },
        ],
      },
      {
        title: 'Common Web Vulnerabilities',
        summary:
          'The three classic classes, how each is exploited, and the defence that genuinely works.',
        lessons: [
          {
            slug: 'cross-site-scripting',
            title: 'Cross-site scripting (XSS)',
            search: 'cross site scripting xss explained prevention',
            summary:
              'XSS is attacker-controlled content executing as script in your page. Contextual output encoding is the fix; blocklists are not.',
            points: [
              'Tell stored, reflected, and DOM-based XSS apart',
              'Encode output for the context it lands in',
              'Constrain script sources with a content security policy',
            ],
          },
          {
            slug: 'sql-injection',
            title: 'SQL injection',
            search: 'sql injection explained prevention parameterized queries',
            summary:
              'Injection happens when data becomes part of the query. Parameterised queries keep the two separate, and they are not optional.',
            points: [
              'See how concatenated input changes a query',
              'Use parameterised queries everywhere',
              'Limit database privileges to contain the damage',
            ],
            proTip:
              'Never build a query with string concatenation. Parameters are the whole defence, not a style preference.',
          },
          {
            slug: 'csrf',
            title: 'Cross-site request forgery',
            search: 'csrf attack explained prevention tokens',
            summary:
              'CSRF makes a logged-in user’s browser send a request they never intended. SameSite cookies and anti-forgery tokens close it.',
            points: [
              'Understand how an ambient credential is abused',
              'Set SameSite cookie attributes correctly',
              'Validate anti-forgery tokens on state-changing requests',
            ],
          },
        ],
      },
      {
        title: 'Authentication Done Right',
        summary:
          'Identity handled properly: session strategy, credential storage, and additional factors.',
        lessons: [
          {
            slug: 'sessions-vs-jwt',
            title: 'Sessions versus JWTs',
            search: 'session cookies vs jwt authentication explained',
            summary:
              'Server sessions are revocable; JWTs are stateless and awkward to revoke. Pick based on whether you need to log someone out immediately.',
            points: [
              'Compare revocability and statelessness honestly',
              'Store tokens in cookies with the right flags',
              'Design refresh and logout before you ship',
            ],
          },
          {
            slug: 'password-storage',
            title: 'Password storage and hashing',
            search: 'password hashing bcrypt argon2 explained',
            summary:
              'Passwords are hashed with a slow, salted algorithm designed for the job. Anything faster is a favour to whoever steals the table.',
            points: [
              'Use a slow, salted hash such as argon2 or bcrypt',
              'Tune work factors as hardware improves',
              'Handle reset flows without leaking account existence',
            ],
            proTip:
              'Never write your own password hashing. Use a vetted algorithm with sane parameters and move on.',
          },
          {
            slug: 'mfa-and-oauth',
            title: 'MFA and delegated authentication',
            search: 'multi factor authentication oauth oidc explained',
            summary:
              'A second factor defeats stolen passwords. OAuth and OIDC hand identity to a provider — useful, and only if you validate what comes back.',
            points: [
              'Add a second factor without wrecking usability',
              'Distinguish OAuth authorization from OIDC identity',
              'Validate tokens and claims on every request',
            ],
          },
        ],
      },
      {
        title: 'Hardening and Supply Chain',
        summary:
          'The layer around your application: transport, headers, secrets, and the code you did not write.',
        lessons: [
          {
            slug: 'https-headers-and-csp',
            title: 'HTTPS, security headers, and CSP',
            search: 'security headers content security policy https tutorial',
            summary:
              'A handful of response headers remove entire attack classes. CSP is the strongest and the fiddliest, so roll it out in report-only first.',
            points: [
              'Enforce HTTPS and enable HSTS',
              'Set the headers that block framing and sniffing',
              'Introduce a content security policy incrementally',
            ],
          },
          {
            slug: 'secrets-management',
            title: 'Secrets management',
            search: 'secrets management environment variables vault tutorial',
            summary:
              'Secrets belong in a manager, injected at runtime, never in the repository. Assume anything committed once is compromised forever.',
            points: [
              'Keep credentials out of source control',
              'Inject secrets at runtime and scope them tightly',
              'Rotate credentials and revoke exposed ones immediately',
            ],
            proTip:
              'A secret committed once is compromised even after you delete the commit. Rotate it, do not just remove it.',
          },
          {
            slug: 'dependency-and-supply-chain',
            title: 'Dependency and supply chain risk',
            search: 'software supply chain security dependencies explained',
            summary:
              'Most of your production code came from someone else. Lockfiles, audits, and update discipline are what keep that manageable.',
            points: [
              'Pin dependencies with a committed lockfile',
              'Audit for known vulnerabilities continuously',
              'Review what a new dependency actually pulls in',
            ],
          },
        ],
      },
    ],
  },
]
