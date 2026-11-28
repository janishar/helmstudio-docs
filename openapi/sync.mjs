// Copies helmstudio's contracts/openapi.yaml into openapi/openapi.yaml for the API reference, with the
// development notes (version history, internal file and plan references) taken out of its prose, and the
// operations grouped by area. Usage: node openapi/sync.mjs <path to contracts/openapi.yaml>
import fs from 'node:fs'
import YAML from 'yaml'

const src = process.argv[2]
if (!src) throw new Error('usage: node openapi/sync.mjs <contracts/openapi.yaml>')
const doc = YAML.parse(fs.readFileSync(src, 'utf8'))

const internal =
  /\bfrom 1\.\d+|\b1\.\d\d\b|contracts\/|README|\bplan\b|owner's|decision|\bM\d+\b|docs\/|\.py\b|\.go\b|\.json\b|golden|ponytail|helmgo|test_|_service|\bBFF\b|NATS|outbox|projector|GOTCHAS|packs\/|\bAPI 1\.|twin of|\.env\b|ADMIN_EMAIL|GenAI|deploy\/|\bKV\b|\b(Hosts|Timeline|Create|Gallery|Models) board\b|\bboard \d|evt\.|cmd\.|\b\d+\.\d+\)/i

function clean(text) {
  let t = text.replace(/^\s*from 1\.\d+[,:.]?\s*/i, '')
  // drop parentheticals and sentences that carry internal notes
  t = t.replace(/\s*\([^()]*\)/g, (m) => (internal.test(m) ? '' : m))
  t = t
    .split(/(?<=[.;])\s+|\n+/)
    .filter((s) => s.trim() && !internal.test(s))
    .join(' ')
    .trim()
  t = t.replace(/[;,:—-]\s*$/, '').replace(/^[:;,]\s*/, '').trim()
  return t ? t[0].toUpperCase() + t.slice(1) : ''
}

const reason = { 200: 'OK', 201: 'Created', 202: 'Accepted', 204: 'No content', 206: 'Partial content',
  304: 'Not modified', 400: 'Bad request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not found',
  409: 'Conflict', 413: 'Too large', 416: 'Range not satisfiable', 422: 'Invalid input', 429: 'Too many requests',
  503: 'Unavailable' }

function walk(node, key) {
  if (Array.isArray(node)) return node.forEach((v) => walk(v))
  if (!node || typeof node !== 'object') return
  for (const k of Object.keys(node)) {
    if (k.startsWith('x-')) { delete node[k]; continue }
    const v = node[k]
    if ((k === 'description' || k === 'summary') && typeof v === 'string') {
      const c = clean(v)
      if (c) node[k] = c
      else if (k === 'description' && /^\d{3}$/.test(String(key))) node[k] = reason[key] ?? 'Response'
      else delete node[k]
    } else walk(v, k)
  }
}

// group operations by the area of their path, in document order
const areas = [
  [/^\/v1\/studio\/assistant/, 'Assistant'],
  [/^\/v1\/studio\/admin\/(providers|provider-|session-names|assistant)/, 'Admin: AI providers'],
  [/^\/v1\/studio\/admin/, 'Admin: models and hosts'],
  [/^\/v1\/studio\/sessions\/[^/]+\/(runs|events)|^\/v1\/studio\/(runs|queue)/, 'Runs and events'],
  [/^\/v1\/studio\/sessions/, 'Sessions'],
  [/^\/v1\/studio\/(workflows|nodes|custom-nodes|model-sources)/, 'Workflows'],
  [/^\/v1\/studio\/(pipelines|judge-tests|batches|memory)/, 'Pipelines and batches'],
  [/^\/v1\/studio\/(library|loras)/, 'Library and LoRAs'],
  [/^\/v1\/studio\/(takes|uploads)/, 'Takes and uploads'],
  [/^\/v1\/studio\/(timelines|media-jobs)/, 'Timelines'],
  [/^\/v1\/studio\/(models|hosts)/, 'Models and hosts'],
  [/^\/files/, 'Files'],
  [/^\/auth\/admin/, 'Admin: users and API keys'],
  [/^\/auth/, 'Auth'],
]
const used = []
for (const [path, item] of Object.entries(doc.paths)) {
  const area = areas.find(([re]) => re.test(path))?.[1] ?? 'Other'
  if (!used.includes(area)) used.push(area)
  for (const op of Object.values(item)) if (op && typeof op === 'object' && op.responses) op.tags = [area]
}

walk(doc)
doc.info = {
  title: 'helmstudio API',
  version: doc.info.version,
  description: 'The HTTP API of helmstudio, served through its gateway. See the API overview for authentication, errors and live updates.',
}
doc.servers = [{ url: 'http://localhost:8300', description: 'A local install (the gateway)' }]
const order = ['Auth', 'Sessions', 'Workflows', 'Runs and events', 'Takes and uploads', 'Files', 'Library and LoRAs',
  'Pipelines and batches', 'Timelines', 'Assistant', 'Models and hosts', 'Admin: users and API keys',
  'Admin: models and hosts', 'Admin: AI providers', 'Other']
doc.tags = order.filter((n) => used.includes(n)).map((name) => ({ name }))

fs.writeFileSync(new URL('./openapi.yaml', import.meta.url), YAML.stringify(doc, { lineWidth: 0 }))
