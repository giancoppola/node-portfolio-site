import { Model } from "mongoose";
const mongoose = require('mongoose');

export interface iUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    pass: string;
}
export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true }
})
export const UserModel: Model<Object> = mongoose.model('User', UserSchema);
export async function usernameInUse(username: String){
    return UserModel.exists({ username: username })
    .then((doc) => {
        if (doc) { return false };
        return true;
    })
}

