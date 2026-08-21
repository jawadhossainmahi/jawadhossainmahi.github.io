import OpenAI from 'openai'
import { buildSystemPrompt } from './systemPrompt'
import { checkRateLimit } from './rateLimit'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export type ChatResult =
  | { ok: true; reply: string; remaining: number }
  | { ok: false; status: number; error: string; resetAt?: number }

const MAX_HISTORY = 6 // last 3 exchanges, keeps token usage predictable
const MAX_MESSAGE_LENGTH = 800

let client: OpenAI | null = null

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error('OPENAI_API_KEY is not configured')
    client = new OpenAI({ apiKey })
  }
  return client
}

export async function handleChat(ip: string, history: ChatMessage[]): Promise<ChatResult> {
  const lastMessage = history[history.length - 1]
  if (!lastMessage || lastMessage.role !== 'user' || !lastMessage.content?.trim()) {
    return { ok: false, status: 400, error: 'A message is required.' }
  }
  if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, status: 400, error: `Keep questions under ${MAX_MESSAGE_LENGTH} characters.` }
  }

  const rate = await checkRateLimit(ip)
  if (!rate.allowed) {
    return {
      ok: false,
      status: 429,
      error: "You've reached the question limit for now. Try again later, or reach out directly via the Contact section.",
      resetAt: rate.resetAt,
    }
  }

  const trimmedHistory = history.slice(-MAX_HISTORY)

  try {
    const openai = getClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      max_tokens: 400,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        ...trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
      ],
    })

    const reply = completion.choices[0]?.message?.content?.trim()
    if (!reply) {
      return { ok: false, status: 502, error: 'No response from the assistant. Please try again.' }
    }

    return { ok: true, reply, remaining: rate.remaining }
  } catch (err) {
    console.error('[chatEngine] OpenAI request failed:', err instanceof Error ? err.message : err)
    return { ok: false, status: 502, error: 'The assistant is temporarily unavailable. Please try again shortly.' }
  }
}
