import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1600, height: 1400 } })
await p.goto('http://127.0.0.1:4173/#/', { waitUntil: 'networkidle' })
await p.waitForTimeout(2500)
await p.screenshot({ path: process.env.SHOT })
await b.close()
