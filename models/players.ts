import * as mongoose from "mongoose";


export const PlayerSchema = new mongoose.Schema({
    G: { type: Number, required: true },
    PTS: { type: Number, required: true },
    TRB: { type: Number, required: true },
    AST: {type: Number, required: true},
    "FG%": {type: Number, required: true},
    "FG3%": {type: Number, required: false},
    "FT%": {type: Number, required: false},
    "eFG%": {type: Number, required: false},
    PER: {type: Number, required: false},
    WS : {type: Number, required: false},
    "All Star": {type: Number, required: false},
    "ABA Champ": {type: Number, required: false},
    "BAA Champ": {type: Number, required: false},
    "ABA All-Time": {type: Number, required: false},
    "All-ABA": {type: Number, required: false},
    "All-BAA": {type: Number, required: false},
    "Scoring Champ": {type: Number, required: false},
    "BLK Champ": {type: Number, required: false},
    "STL Champ": {type: Number, required: false},
    "AST Champ": {type: Number, required: false},
    "NBA Champ": {type: Number, required: false},
    "All-NBA": {type: Number, required: false},
    "All-Defensive": {type: Number, required: false},
    "All-Rookie":{type: Number, required: false},
    "AS MVP": {type: Number, required: false},
    "Def POY": {type: Number, required: false},
    "Finals MVP": {type: Number, required: false},
    "MVP": {type: Number, required: false},
    "ROY": {type: Number, required: false},
    Name: {type: String, required: true},
    Target: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    Position: {type: String, required: false},
    "Year Ended": {type: Number, required: false},
});

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
