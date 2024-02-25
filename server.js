"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dbUri = `mongodb+srv://giancoppola:${process.env.MONGO_PW}@cluster0.gjnjhuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUri);
// MongoDB model imports
const models_1 = require("./server/models");
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.get("*", (req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
});
app.get("/", (req, res) => {
    res.send("OK");
});
app.get("/test", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
//API endpoints
app.use("/api/users", express.json());
app.route('/api/users')
    .get(async (req, res, next) => {
    let users = await models_1.User.Model.find().select('-pass -_id -__v').exec();
    console.log(users.length);
    res.json({
        users
    });
    next();
})
    .post(async (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.pass;
    let user = new models_1.User.Model({
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
    });
    await user.save();
    res.json({
        user
    });
    next();
});
// Error page matching
app.use('*', (req, res) => {
    res.send('No match found - error page!');
});
const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
});
