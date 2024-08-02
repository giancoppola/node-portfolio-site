import { Model } from "mongoose";
const mongoose = require('mongoose');

export const PLAYER_ID = "WG.player_id";
export const ROOM_NAME = "WG.room_name";

export interface iPlayerInRoom {
    id: string;
    word: string;
    wins: number;
    current_guess: string;
}
export interface iRoom {
    name: string;
    player_1: iPlayerInRoom;
    player_2: iPlayerInRoom;
    current_guess: string;
    current_guesser: string;
    number_of_games_played: number;
}
export const RoomSchema = new mongoose.Schema({
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
        current_guess: { type: String, default: ""}
    },
    current_guess: { type: String, default: "" },
    current_guesser: { type: String, default: "player_1" },
    number_of_games_played: { type: Number, required: true, default: 0 }
})
export const RoomModel: Model<Object> = mongoose.model('Room', RoomSchema);

export interface iPlayer {
    wins: number;
    losses: number;
    last_played: Date;
}
export const PlayerSchema = new mongoose.Schema({
    wins: { type: Number, required: true, default: 0 },
    losses: { type: Number, required: true, default: 0 },
    last_played: { type: Date, required: true, default: Date.now() },
})
export const PlayerModel: Model<Object> = mongoose.model('Player', PlayerSchema);

export interface SuccessResponse {
    success: boolean;
    msg: string;
}

export interface SocketIoUser {
    player_id: string;
    room_name: string;
}
export interface SocketIoUserObj {
    [key: string]: SocketIoUser;
}

////////////////////
// Server Actions //
////////////////////

export const USER_COUNT = 'user_count';

////////////////////////
// Server Actions End //
////////////////////////

////////////////////
// Player Actions //
////////////////////

export const SET_WORD = 'set_word';
export const NEXT_GUESS = 'next_guess';
export const ROOM_JOINED = 'room_joined';
export const ACTIVE = "active";

////////////////////////
// Player Actions End //
////////////////////////