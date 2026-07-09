import { createServer } from 'http'
import { readFileSync, writeFileSync, statSync } from 'fs'
import { extname, join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const indexPath = resolve(distDir, 'index.html')

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
}

function startStaticServer() {
  return new Promise((resolvePromise) => {
    const server = createServer((req, res) => {
      let path = decodeURIComponent(req.url.split('?')[0])
      let filePath = join(distDir, path)
      try {
        if (statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html')
      } catch {
        filePath = indexPath // SPA fallback
      }
      try {
        const body = readFileSync(filePath)
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
        res.end(body)
      } catch {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(0, '127.0.0.1', () => resolvePromise(server))
  })
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolvePromise) => {
      let total = 0
      const step = 400
      const timer = setInterval(() => {
        window.scrollBy(0, step)
        total += step
        if (total >= document.body.scrollHeight) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolvePromise()
        }
      }, 60)
    })
  })
}

async function prerender() {
  const server = await startStaticServer()
  const { port } = server.address()
  const url = `http://127.0.0.1:${port}/`

  // Na Vercelu (build w kontenerze Linux) pelny puppeteer nie dziala - brakuje
  // bibliotek systemowych (np. libnspr4.so). @sparticuz/chromium to statycznie
  // zlinkowany Chromium zbudowany pod takie srodowiska. Lokalnie (Windows/Mac dev)
  // ten binarny plik jest niekompatybilny, wiec uzywamy zainstalowanego Chrome.
  const isVercel = !!process.env.VERCEL
  const launchOptions = isVercel
    ? {
        args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
        executablePath: await chromium.executablePath(),
        headless: 'shell',
      }
    : {
        channel: 'chrome',
        headless: true,
      }

  const browser = await puppeteer.launch(launchOptions)

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 2000 })
    await page.goto(url, { waitUntil: 'load', timeout: 30000 })
    await page.waitForSelector('footer', { timeout: 15000 })
    await autoScroll(page)
    await page.waitForSelector('footer', { timeout: 5000 })

    const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML)

    const original = readFileSync(indexPath, 'utf-8')
    const injected = original.replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`)
    if (injected === original) {
      throw new Error('Nie znaleziono <div id="root"></div> w dist/index.html - nic nie wstrzykniete')
    }
    writeFileSync(indexPath, injected)
    console.log('Prerender OK: dist/index.html zawiera teraz statyczna tresc.')
  } finally {
    await browser.close()
    server.close()
  }
}

prerender().catch((err) => {
  console.warn('Prerender pominiety (build i tak dokonczony normalnie):', err.message)
  process.exit(0)
})
