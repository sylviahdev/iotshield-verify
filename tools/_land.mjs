import { chromium } from 'playwright-core'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
await p.goto('http://127.0.0.1:4173/#/', { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
// Scroll through so every whileInView reveal fires before capture.
const h = await p.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < h; y += 700) {
  await p.evaluate((v) => window.scrollTo(0, v), y)
  await p.waitForTimeout(280)
}
await p.evaluate(() => window.scrollTo(0, 0))
await p.waitForTimeout(600)
const shots = [
  ['overview', '#overview'], ['modules', '#modules'],
  ['architecture', '#architecture'], ['technology', '#technology'], ['why', '#why'],
]
for (const [name, sel] of shots) {
  await p.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'start' }), sel)
  await p.waitForTimeout(700)
  await p.screenshot({ path: `${process.env.DIR}/${name}.png` })
}
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await p.waitForTimeout(700)
await p.screenshot({ path: `${process.env.DIR}/footer.png` })
await b.close()
console.log('captured')
