/**
 * Hero section.
 *
 * The official research title is rendered as a SINGLE unbroken text node. It is
 * tempting to split it across styled spans for a designed line break, but a
 * split heading can copy-paste and read aloud as something other than the
 * official wording. `text-balance` handles the wrapping instead, and the
 * gradient is applied to the whole heading rather than to fragments of it.
 *
 * Two calls to action, as specified: "Launch Dashboard" crosses into the
 * console, "View System Architecture" scrolls to the architecture section on
 * this page.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Network, ShieldCheck, Sparkles } from 'lucide-react'
import { RESEARCH_SUBTITLE, RESEARCH_TITLE } from '@/lib/research'
import { NetworkVisual } from './NetworkVisual'
import { Reveal, StatStrip, type Stat } from './primitives'

/** Figures describing the demonstration environment, not measured results. */
const HERO_STATS: Stat[] = [
  { value: '40', label: 'IoT endpoints', detail: 'Ten device classes' },
  { value: '10', label: 'Malware families', detail: 'With IOCs and mitigations' },
  { value: '6', label: 'Formal properties', detail: 'CTL and LTL' },
  { value: '5', label: 'Attack scenarios', detail: 'Scripted end to end' },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      {/* ---- Background ---------------------------------------------------- */}
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ---- Copy -------------------------------------------------------- */}
        <div className="relative z-10 text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">
              <Sparkles className="size-3.5" aria-hidden />
              MSc Research · Formal Methods for IoT Security
            </span>
          </Reveal>

          {/* The official research title, reproduced verbatim. */}
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-balance bg-gradient-to-br from-white via-ink-100 to-brand-200 bg-clip-text text-[30px] font-semibold leading-[1.14] tracking-tight text-transparent sm:text-[42px] lg:text-[50px]">
              {RESEARCH_TITLE}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-300 sm:text-[17px] lg:mx-0">
              {RESEARCH_SUBTITLE}
            </p>
          </Reveal>

          {/* ---- Calls to action ------------------------------------------ */}
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Link
                to="/dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-brand-400/40 bg-gradient-to-b from-brand-500 to-brand-600 px-6 py-3 text-[15px] font-medium text-white shadow-glow transition duration-200 hover:from-brand-400 hover:to-brand-500"
              >
                <ShieldCheck className="size-[18px]" aria-hidden />
                Launch Dashboard
                <ArrowRight
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>

              <a
                href="#architecture"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3 text-[15px] font-medium text-ink-100 transition duration-200 hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-brand-200"
              >
                <Network className="size-[18px]" aria-hidden />
                View System Architecture
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-6 text-[12px] leading-relaxed text-ink-700">
              Demonstration environment — all devices, telemetry and verification
              results are synthetic. No real hardware or live network traffic is
              involved.
            </p>
          </Reveal>
        </div>

        {/* ---- Visualisation --------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <NetworkVisual />
        </motion.div>
      </div>

      {/* ---- Headline figures ---------------------------------------------- */}
      <div className="mx-auto mt-16 w-full max-w-[1200px] sm:mt-20">
        <StatStrip stats={HERO_STATS} />
      </div>
    </section>
  )
}

/* ==========================================================================
   Backdrop
   ========================================================================== */

/**
 * Layered, non-interactive background: a fine grid, two colour washes, and a
 * fade to the page plane so the hero dissolves into the sections below rather
 * than ending on a hard edge.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(59,130,246,0.07) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(59,130,246,0.07) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 78%)',
        }}
      />

      {/* Colour washes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px 420px at 18% 8%, rgba(59,130,246,0.16), transparent 62%),' +
            'radial-gradient(660px 380px at 84% 18%, rgba(34,211,238,0.11), transparent 60%),' +
            'radial-gradient(900px 460px at 50% 96%, rgba(167,139,250,0.09), transparent 66%)',
        }}
      />

      {/* Fade into the page plane */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-900" />
    </div>
  )
}
