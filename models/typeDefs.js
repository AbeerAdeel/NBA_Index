import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAllPlayers(search: String!, limit: Int!): [Player!]!
    getCertainPlayer(_id: ID!): [Player!]!
  }
  type Player {
    id: ID!
    Name: String!
    G: Int
    PTS: Float
    TRB: Float
    AST: Float
    FG: Float
    FG3: Float
    FT: Float
    eFG: Float
    PER: Float
    WS: Float
    AS: Float
    ABAChamp:Int
    BAAChamp: Int
    ABAAllTime: Int
    AllABA: Int
    AllBAA: Int
    ScoringChamp: Int
    BLKChamp: Int
    STLChamp: Int
    ASTChamp: Int
    NBAChamp: Int
    AllNBA: Int
    AllDefensive: Int
    AllRookie: Int
    ASMVP: Int
    DefPoy: Int
    FinalsMVP: Int
    MVP: Int
    ROY: Int
    Target: String
    isActive: Boolean
    Position: String
    YearEnd: Int
  }
`;