import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1500, height: 950 } })
const errs = []
p.on('pageerror', (e) => errs.push(e.message))
const routes = ['/', '/analytics', '/devices', '/network', '/malware', '/detection',
                '/alerts', '/petri-net', '/verification', '/resilience', '/reports', '/settings']
let bad = 0
for (const r of routes) {
  await p.goto(`http://127.0.0.1:4173/#${r}`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)
  const t = await p.innerText('body')
  const broke = t.includes('This module failed to render')
  if (broke) { console.log(`  FAIL ${r} — error boundary`); bad++ }
  else console.log(`  ok   ${r}`)
}
await p.goto('http://127.0.0.1:4173/#/devices', { waitUntil: 'networkidle' })
await p.waitForTimeout(1500)
const body = await p.innerText('body')
console.log(`\n  Demo-data badge present: ${body.includes('Demo data')}`)
console.log(`  Device count line present: ${/40 managed endpoints/.test(body)}`)
console.log(`  Runtime errors: ${errs.length}`)
if (process.env.SHOT) await p.screenshot({ path: process.env.SHOT })
await b.close()
process.exit(bad === 0 && body.includes('Demo data') && errs.length === 0 ? 0 : 1)
