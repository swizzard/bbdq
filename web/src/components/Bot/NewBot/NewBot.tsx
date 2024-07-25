import type {
  CreateBotMutation,
  CreateBotInput,
  CreateBotMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BotForm from 'src/components/Bot/BotForm'

const CREATE_BOT_MUTATION: TypedDocumentNode<
  CreateBotMutation,
  CreateBotMutationVariables
> = gql`
  mutation CreateBotMutation($input: CreateBotInput!) {
    createBot(input: $input) {
      id
    }
  }
`

const NewBot = () => {
  const [createBot, { loading, error }] = useMutation(CREATE_BOT_MUTATION, {
    onCompleted: () => {
      toast.success('Bot created')
      navigate(routes.bots())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateBotInput) => {
    createBot({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Bot</h2>
      </header>
      <div className="rw-segment-main">
        <BotForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBot
