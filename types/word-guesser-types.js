"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LATEST_DATA = exports.NOT_READY = exports.READY = exports.ACTIVE = exports.ROOM_JOINED = exports.NEXT_GUESS = exports.SET_WORD = exports.USER_COUNT = exports.PlayerModel = exports.PlayerSchema = exports.EMPTY_ROOM = exports.EMPTY_PLAYER_IN_ROOM = exports.PLAYER_2 = exports.PLAYER_1 = exports.PLAYER_ID = void 0;
var mongoose = require('mongoose');
exports.PLAYER_ID = "WG.player_id";
exports.PLAYER_1 = 'player_1';
exports.PLAYER_2 = 'player_2';
exports.EMPTY_PLAYER_IN_ROOM = {
    word: "",
    wins: 0,
    current_guess: "",
    ready: false,
};
exports.EMPTY_ROOM = {
    player_1: exports.EMPTY_PLAYER_IN_ROOM,
    player_1_id: "",
    player_2: exports.EMPTY_PLAYER_IN_ROOM,
    player_2_id: "",
    player_count: 0,
    current_guess: "",
    current_guesser: 'player_1',
    number_of_games_played: 0,
    current_status: 'ROOM_CREATED'
};
exports.PlayerSchema = new mongoose.Schema({
    wins: { type: Number, required: true, default: 0 },
    losses: { type: Number, required: true, default: 0 },
    last_played: { type: Date, required: true, default: Date.now() },
});
exports.PlayerModel = mongoose.model('Player', exports.PlayerSchema);
////////////////////
// Server Actions //
////////////////////
exports.USER_COUNT = 'user_count';
////////////////////////
// Server Actions End //
////////////////////////
////////////////////
// Player Actions //
////////////////////
exports.SET_WORD = 'set_word';
exports.NEXT_GUESS = 'next_guess';
exports.ROOM_JOINED = 'room_joined';
exports.ACTIVE = "active";
exports.READY = 'ready';
exports.NOT_READY = 'not_ready';
exports.LATEST_DATA = 'latest_data';
////////////////////////
// Player Actions End //
////////////////////////
