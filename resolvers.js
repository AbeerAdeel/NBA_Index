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
        getSimilarPlayers: async (_, { Positions, Target, Name }) => {
            const options = [];
            if (Positions.length === 2) {
                options.push(`${Positions[1]}-${Positions[0]}`);
                options.push(`${Positions[0]}-${Positions[1]}`);
                options.push(Positions[1]);
                options.push(Positions[0]);

                return await Player.find({
                    $and: [
                        { Position: { $in: options } },
                        { Target: { $eq: Target } },
                        { Name: { $ne: Name } },
                        { imgFile: { $exists: true } },
                        { G: { $gt: 100 } },
                    ]
                }).sort({ PER: -1, WS: -1 }).limit(4);
            }
            const re = new RegExp(Positions[0]);
            console.log(re);
            return await Player.find({
                $and: [
                    { Position: re },
                    { Target: { $eq: Target } },
                    { Name: { $ne: Name } },
                    { imgFile: { $exists: true } },
                    { G: { $gt: 100 } },
                ]
            }).sort({ PER: -1, WS: -1 }).limit(4);

        },
    },
};