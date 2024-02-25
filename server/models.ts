import { Model } from "mongoose";

const mongoose = require('mongoose');

export class User{
    static Schema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        pass: { type: String, required: true }
    })
    static Model: Model<Object> = mongoose.model('User', this.Schema);
    static async usernameInUse(username: String){
        return this.Model.exists({ username: username })
        .then((doc) => {
            if (doc) { return false };
            return true;
        })
    }
}

