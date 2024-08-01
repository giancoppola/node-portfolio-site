import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
const rateLimit = require("express-rate-limit");
export const router: Router = express.Router();

import { Mongoose } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import { iPlayer, PlayerSchema, PlayerModel, RoomModel, iRoom } from "../types/word-guesser-types";
import { Server } from "http";
import { Socket } from "dgram";

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
        },
        player_2: {
            id: '',
            word: '',
            wins: 0,
            current_guess: '',
        },
        current_guess: '',
        current_guesser: 'player_1',
        number_of_games_played: 0,
    }
    let room = new RoomModel(newRoom);
    console.log(room);
    await room.save();
    res.redirect(`/word-guesser?room=${req.query.name}`);
})

/////////////////////////////
// Rooms API Endpoints End //
/////////////////////////////


// .get( async (req: Request, res: Response, next: NextFunction) => {
//     let users: Array<Object> = await UserModel.find().select('-pass -_id -__v').exec();
//     console.log(users.length);
//     res.json({
//         users
//     })
//     next()
// })
// .post( async (req: Request, res: Response, next: NextFunction) => {
//     let wins = req.
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//     let email = req.body.email;
//     let pass = req.body.pass;
//     let user = new UserModel({
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         pass: pass
//     })
//     await user.save();
//     res.json({
//         user
//     })
//     next()
// })