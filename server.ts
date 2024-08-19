require('dotenv').config();
const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const app: Express = express();
const cors = require('cors');
import { Server, Socket, Server as SocketServer,  } from 'socket.io';
const debug = require("debug")('rooms');

import { ChangeStream, ChangeStreamDocument, ChangeStreamEvents } from 'mongodb';
import { Mongoose } from 'mongoose';
const mongoose: Mongoose = require('mongoose');
const dbUri = `mongodb+srv://giancoppola:${process.env.MONGO_PW}@cluster0.gjnjhuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbUri);

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get("*", (req: Request, res:Response, next: NextFunction) => {
    console.log(req.method, req.url, res.statusCode)
    next();
})

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/index.html')
})

// add GET requests for pages
const pageArr: Array<String> = ['meal-planner', 'to-do', 'word-guesser'];
for (let page of pageArr){
    app.get(`/${page}`, (req: Request, res:Response, next: NextFunction) => {
        res.sendFile(__dirname + `/views/${page}.html`)
    })
}
app.get('/meal-planner/*',(req: Request, res:Response, next: NextFunction) => {
    res.redirect('/meal-planner');
    next();
})

//API endpoints
const apiRoute = require('./server/api').router;
app.use('/api', apiRoute);

const wgApiRoute = require('./server/word-guesser-api').router;
app.use('/api/word-guesser/', wgApiRoute);

// Error page matching
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(400).send('No match found - error page!');
})

const server = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})

// MongoDB Database Functions
import { Player_ResetLastPlayedDate } from './server/word-guesser-api';
import { ACTIVE, EMPTY_ROOM, GAME_FINISH, iRoom, LATEST_DATA, NOT_READY, PLAYER_1_GUESSED, PLAYER_2_GUESSED, PlayerModel, PLAYERS, READY, ROOM_JOINED, RoomCollection, SocketIoUser, SocketIoUserObj, USER_COUNT } from './types/word-guesser-types';
import { GuessChecker } from './src/word-guesser/word-guesser-tools';
// Socket IO Connections and Responses
export const users: SocketIoUserObj = {};
export const rooms: RoomCollection = {};
export const io: Server = new SocketServer(server);
io.on("connection", (socket: Socket) => {
    Handle_New_Connection(socket);
    console.log(users);
    Handle_Player_Disconnect(socket);
    Handle_Player_Active(socket);
    Handle_Room_Joined(socket);
    Handle_Player_Ready(socket);
    Handle_Player_Not_Ready(socket);
    Handle_Player_Action(socket);
    Handle_Game_Finished(socket);
})

const Handle_New_Connection = (socket: Socket) => {
    users[socket.id] = { player_id: '', room_name: '' };
    io.sockets.emit(USER_COUNT, Object.keys(users).length);
}

const Handle_Player_Active = (socket: Socket) => {
    socket.on(ACTIVE, async (player_id: string) => {
        users[socket.id].player_id = player_id;
        console.log(users);
        Player_ResetLastPlayedDate(player_id);
    })
}

const Handle_Player_Disconnect = (socket: Socket) => {
    socket.on('disconnect', async () => {
        // If a user is in a room remove them, reduce rooms player count, if player count 0 then delete room
        if (users[socket.id].room_name) {
            rooms[users[socket.id].room_name].player_1_id === users[socket.id].player_id ? rooms[users[socket.id].room_name].player_1_id = '' : rooms[users[socket.id].room_name].player_2_id = '';
            rooms[users[socket.id].room_name].player_count = rooms[users[socket.id].room_name].player_count - 1;
            Send_Latest_Data(users[socket.id].room_name);
            rooms[users[socket.id].room_name].player_count === 0 ? delete rooms[users[socket.id].room_name] : null;
            console.log(rooms);
            socket.leave(users[socket.id].room_name);
        }
        // Remove user from user list
        delete users[socket.id];
        // Update users about remaining online users
        io.sockets.emit(USER_COUNT, Object.keys(users).length);
        console.log("user disconnected");
    })
}

const Handle_Room_Joined = (socket: Socket) => {
    socket.on(ROOM_JOINED, async (room_name: string) => {
        console.log('ROOM JOINED')
        users[socket.id].room_name = room_name;
        !rooms[room_name] ? rooms[room_name] = structuredClone(EMPTY_ROOM) : null;
        !rooms[room_name].room_name ? rooms[room_name].room_name = room_name : null;
        !rooms[room_name].player_1_id ? rooms[room_name].player_1_id = users[socket.id].player_id : rooms[room_name].player_2_id = users[socket.id].player_id;
        rooms[room_name].player_count = rooms[room_name].player_count + 1;
        socket.join(room_name);
        Send_Latest_Data(room_name);
    })
}

const Handle_Player_Ready = (socket: Socket) => {
    socket.on(READY, async (player_id: string, room_name: string, word: string) => {
        if (rooms[room_name]) {
            if (rooms[room_name].player_1_id && rooms[room_name].player_1_id === player_id) {
                rooms[room_name].player_1.ready = true;
                rooms[room_name].player_1.word = word;
            }
            if (rooms[room_name].player_2_id && rooms[room_name].player_2_id === player_id) {
                rooms[room_name].player_2.ready = true;
                rooms[room_name].player_2.word = word;
            }
            if (rooms[room_name].player_1.ready && rooms[room_name].player_2.ready) {
                rooms[room_name].current_status = 'GAME_READY';
            }
            Send_Latest_Data(room_name);
        }
    })
}
const Handle_Player_Not_Ready = (socket: Socket) => {
    socket.on(NOT_READY, async (player_id: string, room_name: string) => {
        if (rooms[room_name]) {
            if (rooms[room_name].player_1_id === player_id) {
                rooms[room_name].player_1.ready = false;
                rooms[room_name].player_1.word = "";
            }
            if (rooms[room_name].player_2_id === player_id) {
                rooms[room_name].player_2.ready = false;
                rooms[room_name].player_2.word = "";
            }
            console.log(rooms[room_name])
            Send_Latest_Data(room_name);
        }
    })
}

const Handle_Player_Action = (socket: Socket) => {
    socket.on(PLAYER_1_GUESSED, async (room_name: string, guess: string) => {
        rooms[room_name].player_1.guesses.push(guess);
        rooms[room_name].player_1.current_guess = guess;
        rooms[room_name].current_guesser = 'player_2';
        rooms[room_name].current_status = 'PLAYER_1_GUESSED';
        Send_Latest_Data(room_name);
    })
    socket.on(PLAYER_2_GUESSED, async (room_name: string, guess: string) => {
        rooms[room_name].player_2.guesses.push(guess);
        rooms[room_name].player_2.current_guess = guess;
        rooms[room_name].current_guesser = 'player_1';
        rooms[room_name].current_status = 'PLAYER_2_GUESSED';
        Send_Latest_Data(room_name);
    })
}

const Handle_Game_Finished = (socket: Socket) => {
    socket.on(GAME_FINISH, async (player_number: PLAYERS, room_name: string) => {
        console.log('game over: ', player_number, room_name);
    })
}

const Handle_Game_Restart = () => {

}

const Send_Latest_Data = (room_name: string) => {
    io.to(room_name).emit(LATEST_DATA, rooms[room_name])
}