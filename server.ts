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
    res.send("OK")
})

app.get("/test", (req: Request, res: Response) => {
    res.sendFile(__dirname + '/views/index.html')
})

//API endpoints
app.use("/api/users", express.json());
app.route('/api/users')
.get( async (req: Request, res: Response, next: NextFunction) => {
    let users: Array<Object> = await User.Model.find().select('-pass -_id -__v').exec();
    console.log(users.length);
    res.json({
        users
    })
    next()
})
.post( async (req: Request, res: Response, next: NextFunction) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.pass;
    let user = new User.Model({
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
    })
    await user.save();
    res.json({
        user
    })
    next()
})

// Error page matching
app.use('*', (req: Request, res: Response) => {
    res.send('No match found - error page!');
})
const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})