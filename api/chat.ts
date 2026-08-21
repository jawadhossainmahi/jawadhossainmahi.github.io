import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleChat, type ChatMessage } from './_lib/chatEngine'

interface RequestWithBody extends IncomingMessage {
  body?: unknown
}

function getClientIp(req: IncomingMessage): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress ?? 'unknown'
}

async function readJsonBody(req: RequestWithBody): Promise<unknown> {
  // Vercel's Node runtime pre-parses the body onto req.body; a raw dev-server
  // middleware (Vite) leaves the stream untouched, so read it ourselves in that case.
  if (req.body !== undefined) return req.body

  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(chunk as Buffer)
  }
  const raw = Buffer.concat(chunks).toString('utf-8')
  return raw ? JSON.parse(raw) : {}
}

export default async function handler(req: RequestWithBody, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  let body: unknown
  try {
    body = await readJsonBody(req)
  } catch {
    res.statusCode = 400
    res.end(JSON.stringify({ error: 'Invalid JSON body' }))
    return
  }

  const history = (body as { messages?: ChatMessage[] })?.messages
  if (!Array.isArray(history) || history.length === 0) {
    res.statusCode = 400
    res.end(JSON.stringify({ error: 'messages array is required' }))
    return
  }

  const ip = getClientIp(req)
  const result = await handleChat(ip, history)

  if (!result.ok) {
    res.statusCode = result.status
    res.end(JSON.stringify({ error: result.error, resetAt: result.resetAt }))
    return
  }

  res.statusCode = 200
  res.end(JSON.stringify({ reply: result.reply, remaining: result.remaining }))
}
