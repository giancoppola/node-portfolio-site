const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
import { Mongoose } from 'mongoose';
require('dotenv').config();
const cors = require('cors');

const mongoose: Mongoose = require('mongoose');
const dbUri = `mongodb+srv://giancoppola:${process.env.MONGO_PW}@cluster0.gjnjhuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbUri);

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true }
})
const User = mongoose.model('User', userSchema);

const app: Express = express();

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
    let users = await User.find().select('-pass -_id -__v').exec();
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
    let user = new User({
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