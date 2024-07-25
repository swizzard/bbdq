import type {
  DeleteBotMutation,
  DeleteBotMutationVariables,
  FindBotById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, formatEnum, timeTag } from 'src/lib/formatters'

const DELETE_BOT_MUTATION: TypedDocumentNode<
  DeleteBotMutation,
  DeleteBotMutationVariables
> = gql`
  mutation DeleteBotMutation($id: String!) {
    deleteBot(id: $id) {
      id
    }
  }
`

interface Props {
  bot: NonNullable<FindBotById['bot']>
}

const Bot = ({ bot }: Props) => {
  const [deleteBot] = useMutation(DELETE_BOT_MUTATION, {
    onCompleted: () => {
      toast.success('Bot deleted')
      navigate(routes.bots())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteBotMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete bot ' + id + '?')) {
      deleteBot({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Bot {bot.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bot.id}</td>
            </tr>
            <tr>
              <th>Grammar</th>
              <td>{bot.grammar}</td>
            </tr>
            <tr>
              <th>Is public</th>
              <td>{checkboxInputTag(bot.isPublic)}</td>
            </tr>
            <tr>
              <th>Enabled</th>
              <td>{checkboxInputTag(bot.enabled)}</td>
            </tr>
            <tr>
              <th>Identifier</th>
              <td>{bot.identifier}</td>
            </tr>
            <tr>
              <th>Password</th>
              <td>{bot.password}</td>
            </tr>
            <tr>
              <th>Schedule</th>
              <td>{formatEnum(bot.schedule)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bot.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bot.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editBot({ id: bot.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bot.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Bot
