import dotenv from 'dotenv';
dotenv.config()
import { Cron, JobConfig } from 'cron-async'
import crons from './cron'
import logger from './logger'

async function main() {
  const cron = new Cron();
  logger.info('Starting botworker');
  crons.forEach(c => cron.createJob(cronName(c), c));
}

function cronName({ cron }: JobConfig): string {
  return `bots-${cron}`
}

main();
