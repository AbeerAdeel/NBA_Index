import { mongoConnect } from "./models/connect";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { Controller } from './controller';


mongoConnect();

const app = express();

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req: any, res: any) => {
    Controller.getAllPlayers()
        .then((user) => {
            console.log(user.length);
            res.send(user);
        })
        .catch((err) => {
            res.send(err);
        });
});


app.use(cors());
app.options('*', cors());

app.set("port", 5000)
app.use(bodyParser.json());


app.listen(app.get("port"), () => {
    console.log("App is running on http://localhost:%d", app.get("port"))
});
