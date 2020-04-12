import * as mongoose from "mongoose";

export const Stats = mongoose.model('Stats', {
     Name: { type: String, text: true },
     Year: Array,
     Team: Array,
     G: Array,
     GS: Array,
     FGP: Array,
     eFG: Array,
     FTP: Array,
     MP: Array,
     PER: Array,
     WS: Array,
     TRB: Array,
     AST: Array,
     STL: Array,
     BLK: Array,
     TOV: Array,
     PTS: Array,
});