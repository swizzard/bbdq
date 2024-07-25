import type { FindBots, FindBotsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Bots from 'src/components/Bot/Bots'

export const QUERY: TypedDocumentNode<FindBots, FindBotsVariables> = gql`
  query FindBots {
    bots {
      id
      grammar
      isPublic
      enabled
      identifier
      password
      schedule
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bots yet. '}
      <Link to={routes.newBot()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindBots>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  bots,
}: CellSuccessProps<FindBots, FindBotsVariables>) => {
  return <Bots bots={bots} />
}
