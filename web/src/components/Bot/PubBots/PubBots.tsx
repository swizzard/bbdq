import type {
  DeleteBotMutation,
  DeleteBotMutationVariables,
  FindBots,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Bot/PubBotsCell/PubBotsCell'
import {
  checkboxInputTag,
  formatEnum,
  timeTag,
  truncate,
} from 'src/lib/formatters'

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

const BotsList = ({ bots }: FindBots) => {
  const [deleteBot] = useMutation(DELETE_BOT_MUTATION, {
    onCompleted: () => {
      toast.success('Bot deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteBotMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete bot ' + id + '?')) {
      deleteBot({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Grammar</th>
            <th>Is public</th>
            <th>Enabled</th>
            <th>Identifier</th>
            <th>Password</th>
            <th>Schedule</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bots.map((bot) => (
            <tr key={bot.id}>
              <td>{truncate(bot.id)}</td>
              <td>{truncate(bot.grammar)}</td>
              <td>{checkboxInputTag(bot.isPublic)}</td>
              <td>{checkboxInputTag(bot.enabled)}</td>
              <td>{truncate(bot.identifier)}</td>
              <td>{truncate(bot.password)}</td>
              <td>{formatEnum(bot.schedule)}</td>
              <td>{timeTag(bot.createdAt)}</td>
              <td>{timeTag(bot.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.bot({ id: bot.id })}
                    title={'Show bot ' + bot.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editBot({ id: bot.id })}
                    title={'Edit bot ' + bot.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bot ' + bot.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bot.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BotsList
