import { Player } from './models/player';

export const resolvers = {
    Query: {
        getAllPlayers: () => Player.find({}),
        getCertainPlayer: async (_, { Name }) => {
            return await Player.find({ Name })
        }
    },
};