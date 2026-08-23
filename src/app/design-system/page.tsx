import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Accessibility,
  BarChart3,
  Bell,
  Bookmark,
  ChevronRight,
  CirclePlay,
  Clock,
  Eye,
  ExternalLink,
  FileText,
  LayoutGrid,
  Search,
  Target,
  User,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { CourseCard } from "@/components/cards/course-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { LessonVideoCard } from "@/components/cards/lesson-video-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { Navbar } from "@/components/nav/navbar";
import { Pagination } from "@/components/nav/pagination";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Design System · Vertex",
  description:
    "Colors, typography, spacing, components and principles that make up the Vertex design language.",
};

/* ---------------------------------------------------------------- layout */

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn("rounded-lg border border-neutral-200 bg-surface p-6 shadow-sm", className)}
    >
      {children}
    </section>
  );
}

function PanelTitle({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-4">
      <span className="text-body font-semibold text-primary-500">{number}</span>
      <span className="text-body font-semibold tracking-[0.12em] text-neutral-900 uppercase">
        {title}
      </span>
    </h2>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-body-lg font-semibold text-neutral-900">{children}</p>;
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-body text-neutral-500">{children}</p>;
}

/* ------------------------------------------------------------------ data */

const primaryColors = [
  { name: "Primary 500", hex: "#F97316", className: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", className: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", className: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", className: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEEE5", className: "bg-primary-100" },
];

const neutralColors = [
  { name: "Neutral 900", hex: "#0F172A", className: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#334155", className: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", className: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", className: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", className: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", className: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", className: "bg-neutral-50 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", className: "bg-surface border border-neutral-200" },
];

const typeScale = [
  { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles" },
  { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles" },
  { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles" },
  { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section" },
  { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles" },
  { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy" },
  { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text" },
  { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta" },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];

const radii = [
  { label: "4px", name: "(xs)", className: "rounded-xs" },
  { label: "8px", name: "(sm)", className: "rounded-sm" },
  { label: "12px", name: "(md)", className: "rounded-md" },
  { label: "16px", name: "(lg)", className: "rounded-lg" },
  { label: "24px", name: "(xl)", className: "rounded-xl" },
  { label: "Full", name: "(circle)", className: "rounded-full" },
];

const shadows = [
  { name: "Sm", value: "0 1px 2px 0 rgba(15, 23, 42, 0.05)", className: "shadow-sm" },
  { name: "Md", value: "0 4px 12px -2px rgba(15, 23, 42, 0.08)", className: "shadow-md" },
  { name: "Lg", value: "0 12px 24px -4px rgba(15, 23, 42, 0.10)", className: "shadow-lg" },
  { name: "Xl", value: "0 20px 40px -8px rgba(15, 23, 42, 0.12)", className: "shadow-xl" },
];

const icons = [
  { Icon: Bell, fillable: true },
  { Icon: Search, fillable: true },
  { Icon: CirclePlay, fillable: true },
  { Icon: FileText, fillable: true },
  { Icon: Bookmark, fillable: true },
  { Icon: BarChart3, fillable: true },
  { Icon: Clock, fillable: true },
  { Icon: User, fillable: true },
  { Icon: ChevronRight, fillable: false },
];

const principles = [
  { Icon: Eye, title: "Clarity First", copy: "Every element should communicate clearly." },
  {
    Icon: LayoutGrid,
    title: "Consistency",
    copy: "Use components and patterns consistently across the platform.",
  },
  { Icon: Target, title: "Focus & Calm", copy: "Remove noise and help learners focus on what matters." },
  {
    Icon: Accessibility,
    title: "Accessible",
    copy: "Design with accessibility and inclusivity in mind.",
  },
];

const buttonRows = [
  { state: "Default", hovered: false, disabled: false },
  { state: "Hover", hovered: true, disabled: false },
  { state: "Disabled", hovered: false, disabled: true },
];

/* ------------------------------------------------------------------ page */

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Intro */}
        <Panel className="lg:col-span-4">
          <Logo size={32} />
          <h1 className="mt-8 text-display-1 text-neutral-900 lg:whitespace-nowrap">Design System</h1>
          <p className="mt-4 max-w-sm text-body-lg text-neutral-500">
            A unified design language for Vertex learning platform. Clean, modern and focused on
            clarity, consistency and intuitive learning experiences.
          </p>
          <p className="mt-8 text-small tracking-[0.12em] text-neutral-500 uppercase">
            Version 1.0 &nbsp;•&nbsp; May 2025
          </p>
        </Panel>

        {/* 01 Colors */}
        <Panel className="lg:col-span-8">
          <PanelTitle number="01" title="Colors" />
          <GroupLabel>Primary</GroupLabel>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {primaryColors.map((color) => (
              <li key={color.name}>
                <div className={cn("h-16 rounded-sm", color.className)} />
                <p className="mt-2 text-body text-neutral-900">{color.name}</p>
                <p className="text-body text-neutral-500">{color.hex}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <GroupLabel>Neutral</GroupLabel>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
              {neutralColors.map((color) => (
                <li key={color.name}>
                  <div className={cn("h-16 rounded-sm", color.className)} />
                  <p className="mt-2 text-body text-neutral-900">{color.name}</p>
                  <p className="text-body text-neutral-500">{color.hex}</p>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* 02 Typography */}
        <Panel className="lg:col-span-5">
          <PanelTitle number="02" title="Typography" />
          <div className="flex items-center gap-8">
            <span className="font-display text-[64px] leading-none font-bold text-neutral-900">
              Ag
            </span>
            <div>
              <p className="text-heading-2 text-neutral-900">Playfair Display</p>
              <p className="mt-1 text-body text-neutral-500">Elegant • Readable • Timeless</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-8">
            <span className="font-sans text-[64px] leading-none font-semibold text-neutral-900">
              Ag
            </span>
            <div>
              <p className="text-heading-2 text-neutral-900">Inter</p>
              <p className="mt-1 text-body text-neutral-500">Clean • Modern • Highly legible</p>
            </div>
          </div>
        </Panel>

        {/* 03 Type scale */}
        <Panel className="lg:col-span-7">
          <PanelTitle number="03" title="Type Scale" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-200">
                  {["Style", "Font", "Size / Line Height", "Weight", "Use"].map((heading) => (
                    <th key={heading} className="pb-3 text-body font-normal text-neutral-500">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {typeScale.map((row) => (
                  <tr key={row.style}>
                    <td className="py-2 text-body font-semibold text-neutral-900">{row.style}</td>
                    <td className="py-2 text-body text-neutral-500">{row.font}</td>
                    <td className="py-2 text-body text-neutral-500">{row.size}</td>
                    <td className="py-2 text-body text-neutral-500">{row.weight}</td>
                    <td className="py-2 text-body text-neutral-500">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* 04 Spacing */}
        <Panel className="lg:col-span-7">
          <PanelTitle number="04" title="Spacing System" />
          <GroupLabel>Base unit: 4px</GroupLabel>
          <ul className="mt-6 flex items-end gap-6 overflow-x-auto pb-1">
            {spacingScale.map((step) => (
              <li key={step} className="flex shrink-0 flex-col items-center gap-3">
                <span
                  className="block rounded-xs bg-primary-200"
                  style={{ width: step, height: step }}
                />
                <span className="text-body text-neutral-900">{step}</span>
                <span className="text-small text-neutral-500">({step / 16}rem)</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* 05 Radius and shadows */}
        <Panel className="lg:col-span-5">
          <PanelTitle number="05" title="Radius & Shadows" />
          <GroupLabel>Radius</GroupLabel>
          <ul className="flex flex-wrap gap-4">
            {radii.map((radius) => (
              <li key={radius.label} className="flex flex-col items-center gap-2">
                <span
                  className={cn("block size-12 border border-neutral-200 bg-surface", radius.className)}
                />
                <span className="text-body text-neutral-900">{radius.label}</span>
                <span className="text-small text-neutral-500">{radius.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <GroupLabel>Shadows</GroupLabel>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {shadows.map((shadow) => (
                <li
                  key={shadow.name}
                  className={cn("rounded-md bg-surface p-4", shadow.className)}
                >
                  <p className="text-heading-3 text-neutral-900">{shadow.name}</p>
                  <p className="mt-2 text-[11px] leading-4 text-neutral-500">{shadow.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* 06 Icons */}
        <Panel className="lg:col-span-3">
          <PanelTitle number="06" title="Icons" />
          <Caption>Outline Style</Caption>
          <ul className="flex items-center justify-between">
            {icons.map(({ Icon }, index) => (
              <li key={`outline-${index}`}>
                <Icon className="size-6 text-neutral-900" strokeWidth={2} aria-hidden />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Caption>Filled Style</Caption>
            <ul className="flex items-center justify-between">
              {icons.map(({ Icon, fillable }, index) => (
                <li key={`filled-${index}`}>
                  <Icon
                    className="size-6 text-neutral-900"
                    strokeWidth={fillable ? 2 : 3}
                    fill={fillable ? "currentColor" : "none"}
                    stroke={fillable ? "var(--color-surface)" : "currentColor"}
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <GroupLabel>Icon Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500">
              <li>24x24px grid</li>
              <li>2px stroke width (outline)</li>
              <li>Rounded line caps</li>
              <li>Consistent optical balance</li>
            </ul>
          </div>
        </Panel>

        {/* 07 Buttons */}
        <Panel className="lg:col-span-6">
          <PanelTitle number="07" title="Buttons" />
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[72px_repeat(4,auto)] items-center gap-3">
                <span />
                {["Primary", "Secondary", "Tertiary", "Text"].map((label) => (
                  <span key={label} className="text-body text-neutral-500">
                    {label}
                  </span>
                ))}
              </div>
              {buttonRows.map((row) => (
                <div
                  key={row.state}
                  className="mt-4 grid grid-cols-[72px_repeat(4,auto)] items-center gap-3"
                >
                  <span className="text-body text-neutral-900">{row.state}</span>
                  <Button variant="primary" size="md" hovered={row.hovered} disabled={row.disabled}>
                    Get Started
                  </Button>
                  <Button variant="secondary" size="md" hovered={row.hovered} disabled={row.disabled}>
                    Explore Courses
                  </Button>
                  <Button
                    variant="tertiary"
                    size="md"
                    hovered={row.hovered}
                    disabled={row.disabled}
                    icon={<ExternalLink className="size-4" strokeWidth={2} aria-hidden />}
                  >
                    View Lesson
                  </Button>
                  <Button
                    variant="text"
                    size="md"
                    hovered={row.hovered}
                    disabled={row.disabled}
                    icon={<CirclePlay className="size-5" strokeWidth={2} aria-hidden />}
                  >
                    Watch Video
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <GroupLabel>Button Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500">
              <li>Height: 44px (default)</li>
              <li>Padding: 0 16px (lg), 0 12px (md)</li>
              <li>Radius: 12px</li>
              <li>Font: Inter Medium (14–16px)</li>
            </ul>
          </div>
        </Panel>

        {/* 08 Inputs */}
        <Panel className="lg:col-span-3">
          <PanelTitle number="08" title="Inputs" />
          <Caption>Search / Text Input</Caption>
          <SearchInput id="design-system-search" />
          <div className="mt-6">
            <Caption>Select</Caption>
            <Select
              id="design-system-sort"
              label="Sort results"
              defaultValue="relevant"
              options={[
                { value: "relevant", label: "Most Relevant" },
                { value: "recent", label: "Most Recent" },
                { value: "duration", label: "Shortest First" },
              ]}
            />
          </div>
          <div className="mt-8">
            <GroupLabel>Field Specs</GroupLabel>
            <ul className="list-disc space-y-1 pl-5 text-body text-neutral-500">
              <li>Height: 44px</li>
              <li>Radius: 12px</li>
              <li>Border: 1px solid #E2E8F0</li>
              <li>Padding: 0 16px</li>
              <li>Focus: Border color #FB923C</li>
            </ul>
          </div>
        </Panel>

        {/* 09 Badges */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="09" title="Badges / Tags" />
          <div className="flex flex-wrap gap-10">
            <div>
              <Caption>Video</Caption>
              <Badge variant="video">Video</Badge>
            </div>
            <div>
              <Caption>Lesson</Caption>
              <Badge variant="lesson">Lesson</Badge>
            </div>
            <div>
              <Caption>Popular</Caption>
              <Badge variant="popular">Popular</Badge>
            </div>
          </div>
        </Panel>

        {/* 10 Status */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="10" title="Status / Indicators" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <StatusIndicator status="in-progress" />
            <StatusIndicator status="completed" />
            <StatusIndicator status="now-playing" />
            <StatusIndicator status="locked" />
          </div>
        </Panel>

        {/* 11 Progress */}
        <Panel className="lg:col-span-4">
          <PanelTitle number="11" title="Progress Bar" />
          <ProgressBar value={35} />
        </Panel>

        {/* 12 Cards */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="12" title="Cards" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <Caption>Course Card</Caption>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modules="12 modules"
                logo={
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-neutral-900 font-display text-[22px] leading-none font-bold text-white">
                    N
                  </span>
                }
              />
            </div>
            <div>
              <Caption>Lesson Card (Video)</Caption>
              <LessonVideoCard
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                lessonLabel="Lesson 5.1"
                timestamp="12:45"
                href="#"
              />
            </div>
            <div>
              <Caption>Lesson Card (Lesson)</Caption>
              <LessonCard
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                moduleLabel="Module 5"
                href="#"
              />
            </div>
            <div>
              <Caption>Resource Card</Caption>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                type="PDF"
                size="1.2 MB"
                href="#"
              />
            </div>
          </div>
        </Panel>

        {/* 13 Navigation */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="13" title="Navigation" />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[auto_1fr_auto]">
            <Navbar activeHref="/courses" />
            <div>
              <Caption>Breadcrumbs</Caption>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "#" },
                  { label: "Next.js for Production", href: "#" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div>
              <Caption>Pagination</Caption>
              <Pagination currentPage={1} totalPages={8} buildHref={(page) => `?page=${page}`} />
            </div>
          </div>
        </Panel>

        {/* 14 Principles */}
        <Panel className="lg:col-span-12">
          <PanelTitle number="14" title="Principles" />
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {principles.map(({ Icon, title, copy }) => (
              <li key={title} className="flex items-start gap-4">
                <Icon className="size-8 shrink-0 text-neutral-700" strokeWidth={2} aria-hidden />
                <div>
                  <p className="text-heading-3 text-neutral-900">{title}</p>
                  <p className="mt-1 text-body text-neutral-500">{copy}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </main>
  );
}
