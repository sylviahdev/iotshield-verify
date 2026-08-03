/**
 * Route table and provider stack.
 *
 * HashRouter rather than BrowserRouter: the built bundle is meant to run from
 * any static host or a bare file path during a defence, with no server-side
 * rewrite rules available to it.
 *
 * Provider order matters — DataProvider probes the API, and AppStateProvider
 * consumes that decision when it loads the shared datasets.
 */

import { Suspense, lazy } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DataProvider } from '@/api/DataContext'
import { AppStateProvider } from '@/context/AppState'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Shell } from '@/components/Shell'
import { GlassCard, Skeleton } from '@/components/ui'

/* The two visualisation-heavy modules load on demand so the dashboard paints
   without waiting for React Flow or the full Recharts surface. */
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Devices = lazy(() => import('@/pages/Devices'))
const NetworkActivity = lazy(() => import('@/pages/NetworkActivity'))
const MalwareAnalysis = lazy(() => import('@/pages/MalwareAnalysis'))
const ThreatDetection = lazy(() => import('@/pages/ThreatDetection'))
const PetriNet = lazy(() => import('@/pages/PetriNet'))
const Verification = lazy(() => import('@/pages/Verification'))
const Resilience = lazy(() => import('@/pages/Resilience'))
const Reports = lazy(() => import('@/pages/Reports'))
const Alerts = lazy(() => import('@/pages/Alerts'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const Settings = lazy(() => import('@/pages/Settings'))

/** Shown while a route chunk is in flight. Mirrors a typical page skeleton. */
function RouteFallback() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-64" />
        <Skeleton className="h-3.5 w-96" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <GlassCard key={i} className="p-5">
            <Skeleton className="h-2.5 w-20" />
            <Skeleton className="mt-4 h-7 w-16" />
            <Skeleton className="mt-3 h-2.5 w-28" />
          </GlassCard>
        ))}
      </div>
      <GlassCard className="p-5">
        <Skeleton className="h-3.5 w-40" />
        <Skeleton className="mt-5 h-64 w-full" />
      </GlassCard>
    </div>
  )
}

/** Wraps the routed outlet so a fault resets when the user navigates away. */
function RoutedContent() {
  const location = useLocation()

  return (
    <ErrorBoundary resetKey={location.pathname}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/network" element={<NetworkActivity />} />
          <Route path="/malware" element={<MalwareAnalysis />} />
          <Route path="/detection" element={<ThreatDetection />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/petri-net" element={<PetriNet />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/resilience" element={<Resilience />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export function App() {
  return (
    <HashRouter>
      <DataProvider>
        <AppStateProvider>
          <Shell>
            <RoutedContent />
          </Shell>
        </AppStateProvider>
      </DataProvider>
    </HashRouter>
  )
}

export default App
