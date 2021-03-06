import * as mongoose from "mongoose";

export const Player = mongoose.model('Player', {
     Name: { type: String, text: true },
     G: Number,
     PTS: Number,
     TRB: Number,
     AST: Number,
     FG: Number,
     FG3: Number,
     FT: Number,
     eFG: Number,
     PER: Number,
     WS: Number,
     AS: Number,
     ABAChamp: Number,
     BAAChamp: Number,
     ABAAllTime: Number,
     AllABA: Number,
     AllBAA: Number,
     ScoringChamp: Number,
     BLKChamp: Number,
     STLChamp: Number,
     ASTChamp: Number,
     NBAChamp: Number,
     TRBChamp: Number,
     AllNBA: Number,
     AllDefensive: Number,
     AllRookie: Number,
     ASMVP: Number,
     DefPOY: Number,
     FinalsMVP: Number,
     MostImproved: Number,
     SixthMan: Number,
     MVP: Number,
     ROY: Number,
     Target: String,
     isActive: Boolean,
     Position: String,
     YearEnd: Number,
     imgFile: String,
     Weight: Number,
     Height: String,
     College: String,
     birthDate: String,
     Archetype: String,
     marketValue: Number,
     avgSalary: Number
});