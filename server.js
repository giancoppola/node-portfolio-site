"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.rooms = exports.users = void 0;
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
var wgApiRoute = require('./server/word-guesser-api').router;
app.use('/api/word-guesser/', wgApiRoute);
// Error page matching
app.get('*', function (req, res, next) {
    res.status(400).send('No match found - error page!');
});
var server = app.listen(process.env.PORT || 3000, function () {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
});
// MongoDB Database Functions
var word_guesser_api_1 = require("./server/word-guesser-api");
var word_guesser_types_1 = require("./types/word-guesser-types");
// Socket IO Connections and Responses
exports.users = {};
exports.rooms = {};
exports.io = new socket_io_1.Server(server);
exports.io.on("connection", function (socket) {
    exports.users[socket.id] = { player_id: '', room_name: '' };
    exports.io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(exports.users).length);
    console.log(exports.users);
    socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (exports.users[socket.id].room_name) {
                socket.leave(exports.users[socket.id].room_name);
            }
            delete exports.users[socket.id];
            exports.io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(exports.users).length);
            console.log("user disconnected");
            return [2 /*return*/];
        });
    }); });
    socket.on(word_guesser_types_1.ACTIVE, function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.users[socket.id].player_id = player_id;
            console.log(exports.users);
            (0, word_guesser_api_1.Player_ResetLastPlayedDate)(player_id);
            return [2 /*return*/];
        });
    }); });
    socket.on(word_guesser_types_1.ROOM_JOINED, function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.users[socket.id].room_name = room_name;
            exports.rooms[room_name] = word_guesser_types_1.EMPTY_ROOM;
            exports.rooms[room_name].player_1_id = exports.users[socket.id].player_id;
            socket.join(room_name);
            console.log("Rooms", exports.io.sockets.adapter.rooms);
            console.log(exports.users);
            return [2 /*return*/];
        });
    }); });
});
