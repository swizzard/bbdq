import type {
  EditBotById,
  UpdateBotInput,
  UpdateBotMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BotForm from 'src/components/Bot/BotForm'

export const QUERY: TypedDocumentNode<EditBotById> = gql`
  query EditBotById($id: String!) {
    bot: bot(id: $id) {
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

const UPDATE_BOT_MUTATION: TypedDocumentNode<
  EditBotById,
  UpdateBotMutationVariables
> = gql`
  mutation UpdateBotMutation($id: String!, $input: UpdateBotInput!) {
    updateBot(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ bot }: CellSuccessProps<EditBotById>) => {
  const [updateBot, { loading, error }] = useMutation(UPDATE_BOT_MUTATION, {
    onCompleted: () => {
      toast.success('Bot updated')
      navigate(routes.bots())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateBotInput, id: EditBotById['bot']['id']) => {
    updateBot({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Bot {bot?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BotForm bot={bot} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
