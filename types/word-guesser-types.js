"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LATEST_DATA = exports.NOT_READY = exports.READY = exports.ACTIVE = exports.ROOM_JOINED = exports.PLAYER_2_WORD = exports.PLAYER_1_WORD = exports.PLAYER_2_GUESSED = exports.PLAYER_1_GUESSED = exports.PLAYER_VOTE = exports.GAME_FINISH = exports.LEAVE_ROOM = exports.USER_COUNT = exports.PlayerModel = exports.PlayerSchema = exports.EMPTY_ROOM = exports.EMPTY_PLAYER_IN_ROOM = exports.PLAYER_2 = exports.PLAYER_1 = exports.PLAYER_ID = void 0;
var mongoose = require('mongoose');
exports.PLAYER_ID = "WG.player_id";
exports.PLAYER_1 = 'player_1';
exports.PLAYER_2 = 'player_2';
exports.EMPTY_PLAYER_IN_ROOM = {
    word: "",
    wins: 0,
    current_guess: "",
    guesses: [],
    ready: false,
    rematch: ''
};
exports.EMPTY_ROOM = {
    room_name: '',
    player_1: structuredClone(exports.EMPTY_PLAYER_IN_ROOM),
    player_1_id: "",
    player_2: structuredClone(exports.EMPTY_PLAYER_IN_ROOM),
    player_2_id: "",
    player_count: 0,
    current_guesser: 'player_1',
    winner: '',
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
exports.LEAVE_ROOM = 'LEAVE_ROOM';
exports.GAME_FINISH = 'GAME_FINISH';
exports.PLAYER_VOTE = 'PLAYER_VOTE';
exports.PLAYER_1_GUESSED = 'PLAYER_1_GUESSED';
exports.PLAYER_2_GUESSED = 'PLAYER_2_GUESSED';
exports.PLAYER_1_WORD = 'PLAYER_1_WORD';
exports.PLAYER_2_WORD = 'PLAYER_2_WORD';
exports.ROOM_JOINED = 'room_joined';
exports.ACTIVE = "active";
exports.READY = 'ready';
exports.NOT_READY = 'not_ready';
exports.LATEST_DATA = 'latest_data';
////////////////////////
// Player Actions End //
////////////////////////
