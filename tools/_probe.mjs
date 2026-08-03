import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1500, height: 950 } })
await p.goto('http://127.0.0.1:4173/#/devices', { waitUntil: 'networkidle' })
for (const ms of [500, 1500, 3000]) {
  await p.waitForTimeout(ms === 500 ? 500 : 1000)
  const info = await p.evaluate(() => {
    const main = document.querySelector('main')
    const inner = main?.firstElementChild
    const r = main?.getBoundingClientRect()
    const ir = inner?.getBoundingClientRect()
    const cs = inner ? getComputedStyle(inner) : null
    return {
      mainH: r ? Math.round(r.height) : null,
      innerH: ir ? Math.round(ir.height) : null,
      innerTop: ir ? Math.round(ir.top) : null,
      opacity: cs?.opacity, transform: cs?.transform,
      scrollY: window.scrollY,
      docH: document.documentElement.scrollHeight,
    }
  })
  console.log(`t+${ms}`, JSON.stringify(info))
}
await p.screenshot({ path: process.env.SHOT })
await b.close()
