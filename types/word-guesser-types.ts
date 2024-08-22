import { Model } from "mongoose";
const mongoose = require('mongoose');

export interface WORD_SET {
    [key: string]: number;
}

export const PLAYER_ID = "WG.player_id";
export const PLAYER_1 = 'player_1';
export const PLAYER_2 = 'player_2';

export type CURRENT_STATUS = 'ROOM_CREATED' | 'GAME_READY' | 'PLAYER_1_GUESSED' | 'PLAYER_2_GUESSED' | 'GAME_FINISH' | 'ROOM_CLOSING';
export type PLAYERS = 'player_1' | 'player_2' | '';
export type REMATCH_VOTE = 'yes' | 'no' | '';
export interface iPlayerInRoom {
    word: string;
    wins: number;
    current_guess: string;
    guesses: Array<string>;
    ready: boolean;
    rematch: REMATCH_VOTE;
}
export interface iRoom {
    [key: string]: any;
    room_name: string;
    player_1: iPlayerInRoom;
    player_1_id: string;
    player_2: iPlayerInRoom;
    player_2_id: string;
    player_count: number;
    current_guesser: PLAYERS;
    winner: string;
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
    guesses: [],
    ready: false,
    rematch: ''
}
export const EMPTY_ROOM: iRoom = {
    room_name: '',
    player_1: structuredClone(EMPTY_PLAYER_IN_ROOM),
    player_1_id: "",
    player_2: structuredClone(EMPTY_PLAYER_IN_ROOM),
    player_2_id: "",
    player_count: 0,
    current_guesser: 'player_1',
    winner: '',
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

export const LEAVE_ROOM = 'LEAVE_ROOM';
export const GAME_FINISH = 'GAME_FINISH';
export const PLAYER_VOTE = 'PLAYER_VOTE';
export const PLAYER_1_GUESSED = 'PLAYER_1_GUESSED';
export const PLAYER_2_GUESSED = 'PLAYER_2_GUESSED';
export const PLAYER_1_WORD = 'PLAYER_1_WORD';
export const PLAYER_2_WORD = 'PLAYER_2_WORD';
export const ROOM_JOINED = 'room_joined';
export const ACTIVE = "active";
export const READY = 'ready';
export const NOT_READY = 'not_ready';
export const LATEST_DATA = 'latest_data';

////////////////////////
// Player Actions End //
////////////////////////