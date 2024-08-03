import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
const rateLimit = require("express-rate-limit");
export const router: Router = express.Router();

import { RemoveQuotes } from "../src/word-guesser/word-guesser-tools";

import { Mongoose, Query } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import { iPlayer, PlayerSchema, PlayerModel, iRoom, SuccessResponse, iPlayerInRoom } from "../types/word-guesser-types";
import { rooms } from "../server";

const limit = rateLimit({
    // Every 5 minutes
    windowMs: 5 * 60 * 1000,
    // A max of this many requests
    max: 50,
})
router.use(limit);
router.use("/*", express.json());

///////////////////////////
// Players API Endpoints //
///////////////////////////

// Get all players in DB
router.route('/players/')
.get( async (req: Request, res: Response, next: NextFunction) => {
    let players = await Player_GetAll();
    res.json({
        players: players
    })
})

router.route('/players/new')
.post( async (req: Request, res: Response, next: NextFunction) => {
    let player = await Player_CreateNew();
    res.send(player._id);
})

router.route('/players/find')
.get( async ( req: Request, res: Response, next: NextFunction) => {
    let exists = await Player_CheckExists((req.query.id as string));
    if (exists) {
        res.status(200).send(true);
    }
    else {
        res.status(400).send(false);
    }
})

///////////////////////////////
// Players API Endpoints End //
///////////////////////////////

/////////////////////////
// Rooms API Endpoints //
/////////////////////////

router.route('/rooms/find')
.get( async ( req: Request, res: Response, next: NextFunction) => {
    let exists = Room_DoesRoomExist(req.query.name as string);
    if (exists) {
        res.status(200).send(true);
    }
    else {
        res.status(400).send(false);
    }
})

router.route('/rooms/joinable')
.get( async ( req: Request, res: Response, next: NextFunction) => {
    let joinable = Room_IsRoomJoinable(req.query.name as string);
    if (joinable) {
        res.status(200).send(true);
    }
    else {
        res.status(400).send(false);
    }
})

/////////////////////////////
// Rooms API Endpoints End //
/////////////////////////////

////////////////////////
// Database Functions //
////////////////////////

export const Player_CreateNew = async () => {
    let player = new PlayerModel({
        wins: 0,
        losses: 0,
        last_played: Date.now(),
    })
    await player.save();
    return player;
}

export const Player_GetAll = async (): Promise<Array<Object>> => {
    let players: Array<Object> = await PlayerModel.find().exec();
    console.log(players.length);
    return players;
}

export const Player_CheckExists = async (player_id: string): Promise<boolean> => {
    try {
        let player = await PlayerModel.find( { _id: player_id } ).exec();
        if (player.length === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export const Player_ResetLastPlayedDate = async (player_id: string)=> {
    try {
        const player = await PlayerModel.findOneAndUpdate(
            { _id: player_id },
            { last_played: Date.now() },
        );
    }
    catch (e) {
        console.log(e);
    }
}

export const Room_DoesRoomExist = (room_name: string) => {
    let name = room_name;
    let exists: boolean = rooms[name] != null;
    if (exists) {
        return true;
    }
    return false;
}

export const Room_IsRoomJoinable = (room_name: string) => {
    let exists = Room_DoesRoomExist(room_name);
    if (exists) {
        if (rooms[room_name].player_count < 2) {
            return true
        }
        return false;
    }
    return false;
}

////////////////////////////
// Database Functions End //
////////////////////////////