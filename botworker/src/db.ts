import { Bot, Schedule, PrismaClient } from '@prisma/client'
export { type Schedule } from '@prisma/client'

export type BotToRun = Pick<Bot, 'grammar' | 'identifier' | 'password'>
export default async function getBotsToRun(
  schedule: Schedule
): Promise<Array<BotToRun>> {
  const client = new PrismaClient()
  return client.bot.findMany({
    where: {
      enabled: true,
      schedule,
    },
    select: {
      grammar: true,
      identifier: true,
      password: true,
    },
  })
}
