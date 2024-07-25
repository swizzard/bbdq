import { BskyAgent } from '@atproto/api'
import tracery from 'tracery-grammar'
import { BotToRun } from './db'
import logger from './logger'

const service = process.env.BSKY_SERVICE || 'https://bsky.social'
const origin = process.env.TRACERY_ORIGIN || '#origin#'
const lengthLimit = parseInt(process.env.TRACERY_LENGTH_LIMIT ?? '299')
const retryLimit = parseInt(process.env.TRACERY_RETRY_LIMIT ?? '10')

// tracery and its types are packaged a little oddly
type TG = ReturnType<typeof tracery.createGrammar>

type PostData = Pick<BotToRun, 'identifier' | 'password'> & {
  text: string
}
export default async function runBots(bots: Array<BotToRun>): Promise<void> {
  const agent = new BskyAgent({ service })
  for (const bot of bots) {
    try {
      const text = generateText(bot.grammar)
      await postText(agent, { ...bot, text })
    } catch (e: any) {
      logger.error(
        `Bot ${bot.identifier} failed to post: ${e.message ?? JSON.stringify(e)
        }`
      )
    }
  }
}

async function postText(
  agent: BskyAgent,
  { identifier, password, text }: PostData
) {
  logger.info(`Posting to ${identifier}`)
  await agent.login({ identifier, password })
  await agent.post({ text })
}

function generateText(grammar: string): string {
  const g = buildGrammar(grammar)
  return runGrammar(g)
}

function buildGrammar(grammar: string): TG {
  const g = tracery.createGrammar(JSON.parse(grammar))
  g.addModifiers(tracery.baseEngModifiers)
  return g
}

function runGrammar(grammar: TG): string {
  let result = grammar.flatten(origin)
  let tries = 0
  while (result.length > lengthLimit && tries < retryLimit) {
    result = grammar.flatten('#origin#')
  }
  if (result.length > lengthLimit) {
    throw new Error('Failed to generate text within length limit')
  }
  return result
}
