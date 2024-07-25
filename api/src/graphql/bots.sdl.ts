export const schema = gql`
  type Bot {
    id: String!
    grammar: String!
    isPublic: Boolean!
    enabled: Boolean!
    identifier: String!
    password: String!
    schedule: Schedule!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Schedule {
    EVERY_10_MINUTES
    EVERY_30_MINUTES
    EVERY_1_HOURS
    EVERY_2_HOURS
    EVERY_6_HOURS
    EVERY_12_HOURS
    EVERY_1_DAYS
    EVERY_2_DAYS
    EVERY_1_WEEKS
  }

  type Query {
    bots: [Bot!]! @requireAuth
    bot(id: String!): Bot @requireAuth
  }

  input CreateBotInput {
    grammar: String!
    isPublic: Boolean!
    enabled: Boolean!
    identifier: String!
    password: String!
    schedule: Schedule!
  }

  input UpdateBotInput {
    grammar: String
    isPublic: Boolean
    enabled: Boolean
    identifier: String
    password: String
    schedule: Schedule
  }

  type Mutation {
    createBot(input: CreateBotInput!): Bot! @requireAuth
    updateBot(id: String!, input: UpdateBotInput!): Bot! @requireAuth
    deleteBot(id: String!): Bot! @requireAuth
  }
`
