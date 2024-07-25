import type { FindBotById, FindBotByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Bot from 'src/components/Bot/Bot'

export const QUERY: TypedDocumentNode<FindBotById, FindBotByIdVariables> = gql`
  query FindBotByIdentifierAndPassword(
    $identifier: String!
    $password: String!
  ) {
    bot: bot(identifier: $identifier, password: $password) {
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

export const Empty = () => <div>Bot not found</div>

export const Failure = ({ error }: CellFailureProps<FindBotByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  bot,
}: CellSuccessProps<FindBotById, FindBotByIdVariables>) => {
  return <Bot bot={bot} />
}
