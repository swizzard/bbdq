import { JobConfig } from 'cron-async'
import { Schedule } from '@prisma/client'
import getBots from './db'
import runBots from './bsky'
import logger from './logger'

const log = {
  debug: (msg: string) => logger.debug(msg),
  error: (msg: string) => logger.error(msg),
  trace: (msg: string) => logger.trace(msg),
}

const crons: Array<JobConfig> = [
  {
    cron: '9-59/10 * * * *',
    onTick: async () => run(Schedule.EVERY_10_MINUTES),
    log,
  },
  {
    cron: '11-59/30 * * * *',
    onTick: async () => run(Schedule.EVERY_30_MINUTES),
    log,
  },
  { cron: '25 * * * *', onTick: async () => run(Schedule.EVERY_1_HOURS), log },
  {
    cron: '33 */2 * * *',
    onTick: async () => run(Schedule.EVERY_2_HOURS),
    log,
  },
  {
    cron: '37 */6 * * *',
    onTick: async () => run(Schedule.EVERY_6_HOURS),
    log,
  },
  {
    cron: '41 */12 * * *',
    onTick: async () => run(Schedule.EVERY_12_HOURS),
    log,
  },
  { cron: '47 11 * * *', onTick: async () => run(Schedule.EVERY_1_DAYS), log },
  {
    cron: '51 13 * * */2',
    onTick: async () => run(Schedule.EVERY_2_DAYS),
    log,
  },
  { cron: '55 15 * * 1', onTick: async () => run(Schedule.EVERY_1_WEEKS), log },
]
export default crons

async function run(schedule: Schedule) {
  logger.info(`Running ${schedule}`)
  const bots = await getBots(schedule)
  await runBots(bots)
}
