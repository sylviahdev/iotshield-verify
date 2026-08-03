import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1500, height: 950 } })
await p.goto('http://127.0.0.1:4173/#/devices', { waitUntil: 'networkidle' })
await p.waitForTimeout(2500)
const info = await p.evaluate(() => {
  const walk = (el, depth, out) => {
    if (depth > 3) return
    for (const c of el.children) {
      const r = c.getBoundingClientRect()
      const cs = getComputedStyle(c)
      out.push({
        d: depth,
        tag: c.tagName,
        cls: (c.className?.toString?.() ?? '').slice(0, 60),
        y: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width),
        op: cs.opacity, vis: cs.visibility, disp: cs.display,
      })
      walk(c, depth + 1, out)
    }
  }
  const out = []
  const main = document.querySelector('main')
  walk(main, 0, out)
  return out.slice(0, 22)
})
console.table(info)
await b.close()
