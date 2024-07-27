import { Bot, Schedule, PrismaClient } from '@prisma/client'
export { type Schedule } from '@prisma/client'

export type BotToRun = Pick<Bot, 'id' | 'grammar' | 'identifier' | 'password'>
export async function getBotsToRun(
  client: PrismaClient,
  schedule: Schedule
): Promise<Array<BotToRun>> {
  return client.bot.findMany({
    where: {
      enabled: true,
      schedule,
      lastError: { not: null },
    },
    select: {
      id: true,
      grammar: true,
      identifier: true,
      password: true,
    },
  })
}

export async function updateBot(
  client: PrismaClient,
  id: string,
  error?: string
): Promise<void> {
  const where = { id }
  const data = error ? { lastError: error } : { lastPostAt: new Date() }
  await client.bot.update({ where, data })
}
