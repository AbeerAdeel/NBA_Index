import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    events: { type: Array, required: true },
    ads: { type: Array, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);
export default User;

export type UserDoc = {
    username: string,
    password:string,
    events: Array<string>,
    ads: Array<mongoose.Types.ObjectId>,
    name: string,
    email: string,
    role: string,
};

export interface IUser extends Document {
    username: string,
    password:string,
    events: Array<string>,
    ads: Array<mongoose.Types.ObjectId>,
    name: string,
    email: string,
    role: string,
};

