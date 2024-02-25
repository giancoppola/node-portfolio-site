"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require('mongoose');
class User {
    static Schema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true },
        email: { type: String, required: true },
        pass: { type: String, required: true }
    });
    static Model = mongoose.model('User', this.Schema);
    static async usernameInUse(username) {
        return this.Model.exists({ username: username })
            .then((doc) => {
            if (doc) {
                return false;
            }
            ;
            return true;
        });
    }
}
exports.User = User;
