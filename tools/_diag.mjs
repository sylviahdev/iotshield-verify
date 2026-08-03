import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 390, height: 844 } })
await p.goto('http://127.0.0.1:4173/#/', { waitUntil: 'networkidle' })
await p.waitForTimeout(1500)
const out = await p.evaluate(() => {
  const vw = document.documentElement.clientWidth
  const bad = []
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
      bad.push({
        tag: el.tagName,
        cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 110),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
      })
    }
  })
  return { vw, count: bad.length, bad: bad.slice(0, 14) }
})
console.log(JSON.stringify(out, null, 1))
await b.close()
