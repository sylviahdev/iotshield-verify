/**
 * Section 4 — Technologies Used.
 *
 * Every mark below is inline SVG drawn in this file: no image assets, no icon
 * CDN, nothing that can fail to load during a presentation. Where a brand mark
 * is simple geometry it is drawn faithfully; where it is not, a clean monogram
 * is used rather than a poor imitation of a trademark.
 *
 * Each badge states the role the technology plays, so the section reads as an
 * engineering rationale rather than a logo wall.
 */

import type { ReactNode } from 'react'
import { Reveal, SectionHeading, SectionShell } from './primitives'

/* ==========================================================================
   Marks
   ========================================================================== */

const svg = (children: ReactNode, viewBox = '0 0 24 24') => (
  <svg viewBox={viewBox} className="size-6" aria-hidden focusable="false">
    {children}
  </svg>
)

/** Letter monogram, used where a trademark is not simple geometry. */
const monogram = (text: string, size = 9) => (
  <svg viewBox="0 0 24 24" className="size-6" aria-hidden focusable="false">
    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" opacity="0.16" />
    <text
      x="12"
      y="12"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={size}
      fontWeight="700"
      fill="currentColor"
      fontFamily="Inter Variable, system-ui, sans-serif"
    >
      {text}
    </text>
  </svg>
)

const MARKS: Record<string, ReactNode> = {
  react: svg(
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    </g>,
  ),
  typescript: monogram('TS'),
  vite: svg(
    <g>
      <path
        d="M12 2.6 22 5.1 13.1 21.6a1.1 1.1 0 0 1-1.9 0L2 5.1 12 2.6Z"
        fill="currentColor"
        opacity="0.28"
      />
      <path
        d="M15.4 7.1 9.2 8.3l1 3-2 .4 4.4 5.6-.7-3.9 2.2-.5-1.3-3.1 2.6-2.7Z"
        fill="currentColor"
      />
    </g>,
  ),
  fastapi: svg(
    <g>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
      <path d="M12.9 4.4 6.6 13h4.3l-.6 6.6L17.4 11h-4.4l-.1-6.6Z" fill="currentColor" />
    </g>,
  ),
  python: monogram('Py'),
  sqlite: svg(
    <g fill="none" stroke="currentColor" strokeWidth="1.4">
      <ellipse cx="12" cy="6.2" rx="7.4" ry="3.1" />
      <path d="M4.6 6.2v11.6c0 1.7 3.3 3.1 7.4 3.1s7.4-1.4 7.4-3.1V6.2" />
      <path d="M4.6 12c0 1.7 3.3 3.1 7.4 3.1s7.4-1.4 7.4-3.1" />
    </g>,
  ),
  tailwind: svg(
    <path
      d="M12 6.4c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4-.9-1-2-2.1-4.3-2.1Zm-5 6c-2.7 0-4.3 1.4-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.3 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4-.9-1-2-2.1-4.3-2.1Z"
      fill="currentColor"
    />,
  ),
  framer: svg(
    <path
      d="M5.5 2.5h13v6.5h-6.5l6.5 6.5v6h-6.5L5.5 15V9h6.5L5.5 2.5Z"
      fill="currentColor"
      opacity="0.85"
    />,
  ),
  reactflow: svg(
    <g fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2.5" y="9.5" width="5.5" height="5" rx="1.4" fill="currentColor" opacity="0.9" stroke="none" />
      <rect x="16" y="3.5" width="5.5" height="5" rx="1.4" />
      <rect x="16" y="15.5" width="5.5" height="5" rx="1.4" />
      <path d="M8 12h4.2M12.2 12V6h3.8M12.2 12v6h3.8" strokeLinecap="round" />
    </g>,
  ),
  recharts: svg(
    <g fill="currentColor">
      <rect x="3" y="13" width="3.4" height="8" rx="1" opacity="0.55" />
      <rect x="8.4" y="8.5" width="3.4" height="12.5" rx="1" opacity="0.8" />
      <rect x="13.8" y="11" width="3.4" height="10" rx="1" opacity="0.65" />
      <rect x="19.2" y="4.5" width="3.4" height="16.5" rx="1" />
    </g>,
  ),
}

/* ==========================================================================
   Stack
   ========================================================================== */

interface Tech {
  key: keyof typeof MARKS
  name: string
  role: string
  version: string
  colour: string
}

const STACK: Tech[] = [
  { key: 'react', name: 'React', role: 'Component runtime', version: '19', colour: '#61DAFB' },
  { key: 'typescript', name: 'TypeScript', role: 'Type-safe domain model', version: '6.0', colour: '#3178C6' },
  { key: 'vite', name: 'Vite', role: 'Build tooling and HMR', version: '8', colour: '#A78BFA' },
  { key: 'fastapi', name: 'FastAPI', role: 'REST service layer', version: '0.136', colour: '#05998B' },
  { key: 'python', name: 'Python', role: 'Analysis and reporting', version: '3.10+', colour: '#FFD343' },
  { key: 'sqlite', name: 'SQLite', role: 'Embedded persistence', version: '3', colour: '#3EA7DE' },
  { key: 'tailwind', name: 'Tailwind CSS', role: 'Design system tokens', version: '3.4', colour: '#38BDF8' },
  { key: 'framer', name: 'Framer Motion', role: 'Interface animation', version: '12', colour: '#E255A1' },
  { key: 'reactflow', name: 'React Flow', role: 'Petri net canvas', version: '12', colour: '#FF8C69' },
  { key: 'recharts', name: 'Recharts', role: 'Analytical charts', version: '3', colour: '#22C55E' },
]

export function TechnologyStack() {
  return (
    <SectionShell id="technology" divider>
      <SectionHeading
        eyebrow="Technologies Used"
        title="A production stack, not a prototype stack"
        description="Chosen for the demonstration to be reproducible and inspectable: a typed domain model shared across both halves, a documented API, and a database that ships with the runtime rather than alongside it."
      />

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STACK.map((tech, i) => (
          <Reveal key={tech.name} delay={Math.min(i * 0.04, 0.3)}>
            <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.05]">
              <span
                className="grid size-12 place-items-center rounded-xl border transition duration-300"
                style={{
                  color: tech.colour,
                  borderColor: `${tech.colour}3D`,
                  background: `${tech.colour}12`,
                }}
              >
                {MARKS[tech.key]}
              </span>

              <div>
                <p className="text-[13.5px] font-semibold text-ink-100">
                  {tech.name}
                  <span className="tabular ml-1.5 text-[11px] font-normal text-ink-700">
                    {tech.version}
                  </span>
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-500">
                  {tech.role}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 text-center text-[12.5px] leading-relaxed text-ink-500">
          Reports are rendered server-side with ReportLab. The synthetic dataset
          is generated by a seeded algorithm implemented identically in
          TypeScript and Python, and an automated check asserts the two agree
          field-for-field.
        </p>
      </Reveal>
    </SectionShell>
  )
}
