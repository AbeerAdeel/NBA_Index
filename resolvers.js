import { Player } from './models/player';

export const resolvers = {
    Query: {
        getAllPlayers: async (_, { search, limit }) => {
            return await Player.find({ $text: { $search: search } }, { score: { $meta: "textScore" } }).limit(limit).sort({ score: { $meta: "textScore" } })
        },
        getCertainPlayer: async (_, { _id }) => {
            return await Player.find({ _id })
        }
    },
};