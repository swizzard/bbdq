import pino from 'pino'

const logDest = process.env.LOG_DEST || `${__dirname}/botworker.log`
const logLevel = process.env.LOG_LEVEL || 'info'
// pino.TransportMultiOptions['targets'] is readonly :(
const targets: Array<any> = [
  { target: 'pino/file', options: { destination: logDest } },
]
if (process.env.NODE_ENV !== 'production') {
  targets.push({ target: 'pino/pretty' })
}
const transport = pino.transport({
  targets,
})

export default pino(
  {
    level: logLevel,
  },
  transport
)
