import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
const rateLimit = require("express-rate-limit");
export const router: Router = express.Router();

import { RemoveQuotes } from "../src/word-guesser/word-guesser-tools";

import { Mongoose, Query } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import { iPlayer, PlayerSchema, PlayerModel, RoomModel, iRoom, SuccessResponse, iPlayerInRoom, UPDATE_TYPE } from "../types/word-guesser-types";

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
    let players: Array<Object> = await PlayerModel.find().exec();
        console.log(players.length);
        res.json({
            players: players
        })
})

router.route('/players/new')
.post( async (req: Request, res: Response, next: NextFunction) => {
    let player = new PlayerModel({
        wins: 0,
        losses: 0,
        last_played: Date.now(),
    })
    console.log(player);
    await player.save();
    res.send(player._id);
})

router.route('/players/find')
.get( async ( req: Request, res: Response, next: NextFunction) => {
    try {
        let player = await PlayerModel.find( { _id: req.query.id } ).exec();
        if (player.length === 1) {
            res.send(true);
        }
        else {
            res.status(400).send(false);
        }
    }
    catch (err) {
        res.status(400).send(false);
    }
})

///////////////////////////////
// Players API Endpoints End //
///////////////////////////////

/////////////////////////
// Rooms API Endpoints //
/////////////////////////

// Get all rooms in DB
router.route('/rooms/')
.get( async (req: Request, res: Response, next: NextFunction) => {
    let rooms: Array<Object> = await RoomModel.find().exec();
        console.log(rooms.length);
        res.json({
            rooms: rooms
        })
})

router.route('/rooms/find')
.get( async ( req: Request, res: Response, next: NextFunction) => {
    try {
        let room = await RoomModel.find( { name: req.query.name } ).exec();
        if (room.length === 1) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
    catch (err) {
        res.send(false);
    }
})

router.route('/rooms/new')
.post( async (req: Request, res: Response, next: NextFunction) => {
    let newRoom: iRoom = {
        name: req.query.name as string,
        player_1: {
            id: req.query.id as string,
            word: '',
            wins: 0,
            current_guess: '',
            ready: false,
        },
        player_2: {
            id: '',
            word: '',
            wins: 0,
            current_guess: '',
            ready: false,
        },
        current_guess: '',
        current_guesser: 'player_1',
        number_of_games_played: 0,
        update_type: 'ROOM_CREATED'
    }
    let room = new RoomModel(newRoom);
    console.log(room);
    await room.save();
    res.status(200).json(room);
})

router.route('/rooms/join')
.patch( async (req: Request, res: Response, next: NextFunction) => {
    try {
        let room = await RoomModel.findOne({ name: req.query.name })
        if ((room as unknown as iRoom)!.player_2.id != "") {
            res.status(400).json(
                {
                    success: false,
                    msg: 'Room is full!'
                }
            );
        }
        else {
            try {
                let updateData: iPlayerInRoom = { id: (req.query.id as string), word: '', wins: 0, current_guess: '', ready: false }
                let updateType: UPDATE_TYPE = 'PLAYER_2_JOINED'
                await room!.updateOne({ player_2: updateData, update_type: updateType })
                res.status(200).json(
                    {
                        success: true,
                        msg: 'Room joined!'
                    }
                );
            }
            catch (err) {
                let error = err as Error;
                res.status(400).json(
                    {
                        success: false,
                        msg: 'Could not update room! ' + error.message
                    }
                );
            }
        }
    }
    catch (err) {
        let error = err as Error;
        console.log(error.message);
        res.status(400).json(
            {
                success: false,
                msg: 'Cant find room! ' + error.message
            }
        );
    }
})

router.route('/rooms/leave')
.patch( async (req: Request, res: Response, next: NextFunction) => {
    let response: SuccessResponse = await Player_RemoveFromRoom((req.query.id as string), (req.query.name as string))
    if (response.success) {
        res.status(200).json(response);
    }
    else {
        res.status(400).json(response);
    }
})

// TODO - create rejoin api
router.route('/rooms/rejoin')
.patch( async (req: Request, res: Response, next: NextFunction) => {
    try {
        let room = await RoomModel.findOne({ name: req.query.name })
        if ((room as unknown as iRoom)!.player_2.id != "") {
            res.status(400).json(
                {
                    success: false,
                    msg: 'Room is full!'
                }
            );
        }
        else if ((room as unknown as iRoom)!.player_2.id != "") {
            res.status(400).json(
                {
                    success: false,
                    msg: 'Room is full!'
                }
            );
        }
        else {
            try {
                room!.updateOne({ player_2: { id: req.query.id } })
                res.status(200).json(
                    {
                        success: true,
                        msg: 'Room joined!'
                    }
                );
            }
            catch (err) {
                let error = err as Error;
                res.status(400).json(
                    {
                        success: false,
                        msg: 'Could not update room! ' + error.message
                    }
                );
            }
        }
    }
    catch (err) {
        let error = err as Error;
        console.log(error.message);
        res.status(400).json(
            {
                success: false,
                msg: 'Cant find room! ' + error.message
            }
        );
    }
})

/////////////////////////////
// Rooms API Endpoints End //
/////////////////////////////

////////////////////////
// Database Functions //
////////////////////////

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

export const Player_RemoveFromRoom = async (player_id: string, room_name: string): Promise<SuccessResponse> => {
    try {
        let room = await RoomModel.findOne({ name: room_name })
        if ((room as unknown as iRoom)!.player_2.id === player_id) {
            try{
                let updateData = { id: '', word: '', wins: 0 }
                await room!.updateOne({ player_2: updateData })
                return(
                    {
                        success: true,
                        msg: `Removed ${player_id} from ${room_name}`
                    }
                );
            }
            catch (err) {
                return(
                    {
                        success: false,
                        msg: (err as Error).message
                    }
                );
            }
        }
        else if ((room as unknown as iRoom)!.player_1.id === player_id) {
            try{
                let updateData = { id: '', word: '', wins: 0 }
                await room!.updateOne({ player_1: updateData})
                return(
                    {
                        success: true,
                        msg: `Removed ${player_id} from ${room_name}`
                    }
                );
            }
            catch (err) {
                return(
                    {
                        success: false,
                        msg: (err as Error).message
                    }
                );
            }
        }
        else {
            return(
                {
                    success: false,
                    msg: 'Cannot find player in room'
                }
            );
        }
    }
    catch (err) {
        let error = err as Error;
        console.log(error.message);
        return(
            {
                success: false,
                msg: 'Cant find room! ' + error.message
            }
        );
    }
}

export const Room_DeleteIfEmpty = async (db_id: string) => {
    try {
        let room = await RoomModel.findOne({ _id: db_id });
        if (room && (room as unknown as iRoom).player_1.id === '' && (room as unknown as iRoom).player_2.id === ''){
            try {
                await room!.deleteOne()
                console.log('deleted empty room' + db_id);
                return;
            }
            catch (err) {
                console.log((err as Error).message);
                return;
            }
        }
        else {
            return;
        }
    }
    catch (err) {
        console.log((err as Error).message);
        return;
    }
}

export const Room_SetGameReady = async (db_id: string): Promise<SuccessResponse> => {
    try {
        let room = await RoomModel.findOneAndUpdate(
            { _id: db_id },
            { update_type: 'GAME_READY' }
        );
        return {
            success: true,
            msg: 'Game is now ready'
        }
    }
    catch (err) {
        return {
            success: false,
            msg: (err as Error).message
        }
    }
}

////////////////////////////
// Database Functions End //
////////////////////////////