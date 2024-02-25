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
import {User} from './server/models';

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
const pageArr: Array<String> = ['cotravel', 'tfl', 'quotes', 'hamburg']
for (let page of pageArr){
    app.get(`/${page}`, (req: Request, res:Response, next: NextFunction) => {
        res.sendFile(__dirname + `/views/${page}.html`)
    })
}

app.use(express.static('/react'));
app.use('/dist', express.static(__dirname + '/dist'));
app.get("/test", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/test.html')
})

//API endpoints
const apiRoute = require('./server/api').router;
app.use('/api', apiRoute);

// Error page matching
app.use('*', (req: Request, res: Response) => {
    res.send('No match found - error page!');
})
const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})