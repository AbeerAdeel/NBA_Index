import * as mongoose from "mongoose";

const uri = 'mongodb+srv://aadeel:Andrew12@cluster0-frt96.mongodb.net/NBA_Dataset?retryWrites=true&w=majority';

export function mongoConnect() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log("Successfully connected to mongo");
        }
    });
}