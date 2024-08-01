require('dotenv').config();
const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const app: Express = express();
const cors = require('cors');
import { Server, Socket, Server as SocketServer,  } from 'socket.io';

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
import { Player_ResetLastPlayedDate } from './server/word-guesser-api';
import { SocketIoUser, SocketIoUserObj } from './types/word-guesser-types';
// Socket IO Connections and Responses
const users: SocketIoUserObj = {};
const io: Server = new SocketServer(server);
io.on("connection", (socket: Socket) => {
    users[socket.id] = { player_id: '', room_name: '' };
    console.log(users);
    socket.on('disconnect', () => {
        // TODO - Remove user from room once disconnected
        delete users[socket.id];
        console.log("user disconnected");
    })
    socket.on("active", async (player_id: string) => {
        users[socket.id].player_id = player_id;
        console.log(users);
        Player_ResetLastPlayedDate(player_id);
    })
    socket.on("room_joined", async (room_name: string) => {
        users[socket.id].room_name = room_name;
        console.log(users);
    })
})
