import Player from "./models/players";
import User from './models/user';

export class ControllerClass {
    async getAllPlayers() {
        try {
            console.log("hello");
            return await Player.find({});
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const Controller = new ControllerClass;