import { Model } from "mongoose";
const mongoose = require('mongoose');

export const PLAYER_ID = "WG.player_id";
export const PLAYER_1 = 'player_1';
export const PLAYER_2 = 'player_2';

export type CURRENT_STATUS = 'ROOM_CREATED' | 'GAME_READY' |
'PLAYER_1_READY' | 'PLAYER_2_READY' | 'PLAYER_1_GUESSED' | 'PLAYER_2_GUESSED' |
'PLAYER_1_RESTART' | 'PLAYER_2_RESTART' | 'GAME_FINISH' | 'ROOM_CLOSED';
export type PLAYERS = 'player_1' | 'player_2';
export interface iPlayerInRoom {
    word: string;
    wins: number;
    current_guess: string;
    ready: boolean;
}
export interface iRoom {
    player_1: iPlayerInRoom;
    player_1_id: string;
    player_2: iPlayerInRoom;
    player_2_id: string;
    current_guess: string;
    current_guesser: PLAYERS;
    number_of_games_played: number;
    current_status: CURRENT_STATUS;
}
export interface RoomCollection {
    [key: string]: iRoom;
}
export const EMPTY_PLAYER_IN_ROOM: iPlayerInRoom = {
    word: "",
    wins: 0,
    current_guess: "",
    ready: false,
}
export const EMPTY_ROOM: iRoom = {
    player_1: EMPTY_PLAYER_IN_ROOM,
    player_1_id: "",
    player_2: EMPTY_PLAYER_IN_ROOM,
    player_2_id: "",
    current_guess: "",
    current_guesser: 'player_1',
    number_of_games_played: 0,
    current_status: 'ROOM_CREATED'
}

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