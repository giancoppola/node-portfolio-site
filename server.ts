require('dotenv').config();
const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const app: Express = express();
const cors = require('cors');
import { Server, Socket, Server as SocketServer,  } from 'socket.io';

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

const mealsApiRoute = require('./server/meals-api').router;
app.use('/api/meals', mealsApiRoute);

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
import { Player_RemoveFromRoom, Player_ResetLastPlayedDate, Room_DeleteIfEmpty } from './server/word-guesser-api';
import { ACTIVE, PlayerModel, ROOM_JOINED, RoomModel, SocketIoUser, SocketIoUserObj, USER_COUNT } from './types/word-guesser-types';
import { Player_LeaveRoom } from './src/word-guesser/word-guesser-tools';
// Socket IO Connections and Responses
const users: SocketIoUserObj = {};
const io: Server = new SocketServer(server);
io.on("connection", (socket: Socket) => {
    users[socket.id] = { player_id: '', room_name: '' };
    io.sockets.emit(USER_COUNT, Object.keys(users).length);
    console.log(users);
    socket.on('disconnect', async () => {
        if (users[socket.id].room_name) {
            await Player_RemoveFromRoom(users[socket.id].player_id, users[socket.id].room_name);
        }
        delete users[socket.id];
        io.sockets.emit(USER_COUNT, Object.keys(users).length);
        console.log("user disconnected");
    })
    socket.on(ACTIVE, async (player_id: string) => {
        users[socket.id].player_id = player_id;
        console.log(users);
        Player_ResetLastPlayedDate(player_id);
    })
    socket.on(ROOM_JOINED, async (room_name: string) => {
        users[socket.id].room_name = room_name;
        console.log("Rooms", io.sockets.adapter.rooms);
        socket.join(room_name);
        console.log(users);
    })
})

const Room_CheckNextAction = (db_id: string) => {

}

// Watching for room updates, to pass on to players or take action
RoomModel.watch()
.on("change", (data: ChangeStreamDocument) => {
    if (data.operationType === 'update') {
        console.log("Room Updates", data.updateDescription.updatedFields)
        // Check if the room is now empty, if it is then delete it
        Room_DeleteIfEmpty(data.documentKey._id.toString())
    }
});
