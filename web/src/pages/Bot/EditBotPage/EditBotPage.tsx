import EditBotCell from 'src/components/Bot/EditBotCell'

type BotPageProps = {
  id: string
}

const EditBotPage = ({ id }: BotPageProps) => {
  return <EditBotCell id={id} />
}

export default EditBotPage
