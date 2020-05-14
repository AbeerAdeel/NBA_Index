import { Player } from './models/player';
import { Stats } from './models/stats';

export const resolvers = {
    Query: {
        getAllPlayers: async (_, { search, limit }) => {
            return await Player.find({ Name: { $regex: search, $options: "i" } }).limit(limit).sort({ G: -1 })
        },
        getSearchResults: async (_, { search, limit, skip }) => {
            const players = await Player.find({ Name: { $regex: search, $options: "i" } }).limit(limit).skip(skip).sort({ G: -1 });
            const count = await Player.count({ Name: { $regex: search, $options: "i" } });
            return { players, count };
        },
        getCertainPlayer: async (_, { _id }) => {
            return await Player.find({ _id })
        },
        getPlayerStats: async (_, { Name }) => {
            return await Stats.find({ Name })
        },
        getSimilarPlayers: async (_, { Position, Targets, Name, PER }) => {
            return await Player.aggregate([
                {
                    $match: {
                        $and: [
                            { Position: { $eq: Position } },
                            { Target: { $in: Targets } },
                            { Name: { $ne: Name } },
                            { imgFile: { $exists: true } },
                            { PER: { $exists: true } },
                            { G: { $gt: 100 } },
                        ]
                    }
                },
                { $project: { diff: { $abs: { $subtract: [PER, '$PER'] } }, doc: '$$ROOT', Name: 1, _id: 1, imgFile: 1, PER: 1, Position: 1, Target: 1 } },
                { $sort: { diff: 1 } },
                { $limit: 4 }
            ]);
        },

    },
};