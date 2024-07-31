"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerModel = exports.PlayerSchema = exports.RoomModel = exports.RoomSchema = exports.PLAYER_ID = void 0;
var mongoose = require('mongoose');
exports.PLAYER_ID = "WG.player_id";
exports.RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    player_1: {
        id: { type: String },
        word: { type: String, default: "" },
        wins: { type: Number, default: 0 },
        current_guess: { type: String, default: "" }
    },
    player_2: {
        id: { type: String, },
        word: { type: String, default: "" },
        wins: { type: Number, default: 0 },
        current_guess: { type: String, default: "" }
    },
    current_guess: { type: String, default: "" },
    current_guesser: { type: String, default: "player_1" },
    number_of_games_played: { type: Number, required: true, default: 0 }
});
exports.RoomModel = mongoose.model('Room', exports.RoomSchema);
exports.PlayerSchema = new mongoose.Schema({
    wins: { type: Number, required: true, default: 0 },
    losses: { type: Number, required: true, default: 0 },
    last_played: { type: Date, required: true, default: Date.now() },
});
exports.PlayerModel = mongoose.model('Player', exports.PlayerSchema);
