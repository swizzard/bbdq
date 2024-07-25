import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const pubSelect = {
  id: true,
  grammar: true,
  identifier: true,
  schedule: true,
  createdAt: true,
  updatedAt: true,
}

export const pubBots: QueryResolvers['pubBots'] = () => {
  return db.bot.findMany({
    where: { isPublic: true, enabled: true },
    select: pubSelect,
  })
}

export const pubBot: QueryResolvers['pubBot'] = ({ identifier }) => {
  return db.bot.findFirst({
    where: { identifier },
    orderBy: { updatedAt: 'desc' },
    select: pubSelect,
  })
}

export const bot: QueryResolvers['bot'] = ({ identifier, password }) => {
  return db.bot.findFirst({
    where: { identifier, password },
  })
}

export const createBot: MutationResolvers['createBot'] = ({ input }) => {
  return db.bot.create({
    data: input,
  })
}

export const updateBot: MutationResolvers['updateBot'] = ({ id, input }) => {
  return db.bot.update({
    data: input,
    where: { id },
  })
}

export const deleteBot: MutationResolvers['deleteBot'] = ({ id }) => {
  return db.bot.update({
    where: { id },
    data: { isPublic: false, enabled: false },
  })
}
