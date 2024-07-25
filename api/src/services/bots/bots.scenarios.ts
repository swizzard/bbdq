import type { Prisma, Bot } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.BotCreateArgs>({
  bot: {
    one: {
      data: {
        grammar: 'String',
        identifier: 'String',
        password: 'String',
        schedule: 'EVERY_10_MINUTES',
        updatedAt: '2024-07-25T13:39:08.028Z',
      },
    },
    two: {
      data: {
        grammar: 'String',
        identifier: 'String',
        password: 'String',
        schedule: 'EVERY_10_MINUTES',
        updatedAt: '2024-07-25T13:39:08.028Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Bot, 'bot'>
