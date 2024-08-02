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
// MongoDB Database Functions
var word_guesser_api_1 = require("./server/word-guesser-api");
var word_guesser_types_1 = require("./types/word-guesser-types");
// Socket IO Connections and Responses
var users = {};
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    users[socket.id] = { player_id: '', room_name: '' };
    io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(users).length);
    console.log(users);
    socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!users[socket.id].room_name) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, word_guesser_api_1.Player_RemoveFromRoom)(users[socket.id].player_id, users[socket.id].room_name)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    delete users[socket.id];
                    io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(users).length);
                    console.log("user disconnected");
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on(word_guesser_types_1.ACTIVE, function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            users[socket.id].player_id = player_id;
            console.log(users);
            (0, word_guesser_api_1.Player_ResetLastPlayedDate)(player_id);
            return [2 /*return*/];
        });
    }); });
    socket.on(word_guesser_types_1.ROOM_JOINED, function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            users[socket.id].room_name = room_name;
            console.log("Rooms", io.sockets.adapter.rooms);
            socket.join(room_name);
            console.log(users);
            return [2 /*return*/];
        });
    }); });
});
var Room_CheckNextAction = function (db_id) {
};
// Watching for room updates, to pass on to players or take action
word_guesser_types_1.RoomModel.watch()
    .on("change", function (data) {
    if (data.operationType === 'update') {
        console.log("Room Updates", data.updateDescription.updatedFields);
        // Check if the room is now empty, if it is then delete it
        (0, word_guesser_api_1.Room_DeleteIfEmpty)(data.documentKey._id.toString());
    }
});
