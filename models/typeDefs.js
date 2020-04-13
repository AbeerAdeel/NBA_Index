import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAllPlayers(search: String!, limit: Int!): [Player!]!
    getCertainPlayer(_id: ID!): [Player!]!
    getSimilarPlayers(Positions: [String]!, Target: String!, Name: String!): [Player!]!
    getPlayerStats(Name: String!): [Stat!]!
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
    TRBChamp: Int
    AllDefensive: Int
    AllRookie: Int
    ASMVP: Int
    DefPOY: Int
    FinalsMVP: Int
    MVP: Int
    ROY: Int
    Target: String
    isActive: Boolean
    Position: String
    YearEnd: Int
    imgFile: String
    MostImproved: Int
    Weight: Int
    Height: String
    birthDate: String
    College: String
  },
  type Stat {
    id: ID
    Name: String
    Year: [Int]
    Team: [String]
    G: [Int]
    GS: [Int]
    FGP: [Float]
    eFG: [Float]
    FTP: [Float]
    MP: [Float]
    PER: [Float]
    WS: [Float]
    TRB: [Float]
    AST: [Float]
    STL: [Float]
    BLK: [Float]
    TOV: [Float]
    PTS: [Float]
  }
`;