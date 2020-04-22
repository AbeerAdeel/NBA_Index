import { Player } from './models/player';
import { Stats } from './models/stats';

export const resolvers = {
    Query: {
        getAllPlayers: async (_, { search, limit }) => {
            return await Player.find({ $text: { $search: search } }, { score: { $meta: "textScore" } }).limit(limit).sort({ score: { $meta: "textScore" } })
        },
        getCertainPlayer: async (_, { _id }) => {
            return await Player.find({ _id })
        },
        getPlayerStats: async (_, { Name }) => {
            return await Stats.find({ Name })
        },
        getSimilarPlayers: async (_, { Position, Targets, Name, Archetype }) => {
            return await Player.find({
                $and: [
                    { Position: { $eq: Position } },
                    { Target: { $in: Targets } },
                    { Name: { $ne: Name } },
                    { imgFile: { $exists: true } },
                    { G: { $gt: 100 } },
                    { Archetype: { $eq: Archetype } },
                ]
            }).sort({Target: 0 }).limit(4);
        },
    },
};