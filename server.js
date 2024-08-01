"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
var socket_io_1 = require("socket.io");
var mongoose = require('mongoose');
var dbUri = "mongodb+srv://giancoppola:".concat(process.env.MONGO_PW, "@cluster0.gjnjhuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
mongoose.connect(dbUri);
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.get("*", function (req, res, next) {
    console.log(req.method, req.url, res.statusCode);
    next();
});
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
// add GET requests for pages
var pageArr = ['meal-planner', 'to-do', 'word-guesser'];
var _loop_1 = function (page) {
    app.get("/".concat(page), function (req, res, next) {
        res.sendFile(__dirname + "/views/".concat(page, ".html"));
    });
};
for (var _i = 0, pageArr_1 = pageArr; _i < pageArr_1.length; _i++) {
    var page = pageArr_1[_i];
    _loop_1(page);
}
app.get('/meal-planner/*', function (req, res, next) {
    res.redirect('/meal-planner');
    next();
});
//API endpoints
var apiRoute = require('./server/api').router;
app.use('/api', apiRoute);
var mealsApiRoute = require('./server/meals-api').router;
app.use('/api/meals', mealsApiRoute);
var wgApiRoute = require('./server/word-guesser-api').router;
app.use('/api/word-guesser/', wgApiRoute);
// Error page matching
app.get('*', function (req, res, next) {
    res.status(400).send('No match found - error page!');
});
var server = app.listen(process.env.PORT || 3000, function () {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
});
// Socket IO Connections and Responses
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    console.log("user connected");
    socket.on('disconnect', function () {
        console.log("user disconnected");
    });
    socket.on("active", function (player_id) {
        console.log(player_id, 'is now active');
    });
});
