import { mongoConnect } from "./models/connect";
import { Controller } from "./controller";
mongoConnect();
console.log(Controller.getAllPlayers());