require('dotenv').config();
const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const app: Express = express();
const cors = require('cors');

import { Mongoose } from 'mongoose';
const mongoose: Mongoose = require('mongoose');
const dbUri = `mongodb+srv://giancoppola:${process.env.MONGO_PW}@cluster0.gjnjhuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbUri);
// MongoDB model imports
import {iUser, UserSchema, UserModel} from './server/user';

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

app.use('/dist', express.static(__dirname + '/dist'));
app.get("/test", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/test.html')
})

//API endpoints
const apiRoute = require('./server/api').router;
app.use('/api', apiRoute);

const mealsApiRoute = require('./server/meals-api').router;
app.use('/api/meals', mealsApiRoute);

const wgApiRoute = require('./server/word-guesser-api').router;
app.use('/api/word-guesser/', wgApiRoute);

// Error page matching
app.use('*', (req: Request, res: Response) => {
    res.send('No match found - error page!');
})
const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})