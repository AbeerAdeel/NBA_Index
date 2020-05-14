import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getAllPlayers(search: String!, limit: Int!): [Player!]!
    getCertainPlayer(_id: ID!): [Player!]!
    getSimilarPlayers(Position: String, Targets:[String]!, Name: String!, PER: Float): [Player!]!
    getPlayerStats(Name: String!): [Stat!]!
    getSearchResults(search: String!, limit: Int!, skip: Int!): Results!
  }
  type Player {
    _id: ID!
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
    SixthMan: Int
    Position: String
    YearEnd: Int
    imgFile: String
    MostImproved: Int
    Weight: Int
    Height: String
    birthDate: String
    College: String
    Archetype: String
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
    FG3: [Float]
    TRB: [Float]
    AST: [Float]
    STL: [Float]
    BLK: [Float]
    TOV: [Float]
    PTS: [Float]
  }
  type Results {
    players: [Player]
    count: Int
  }
`;