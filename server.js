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
var debug = require("debug")('rooms');
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
    Handle_New_Connection(socket);
    console.log(exports.users);
    Handle_Player_Disconnect(socket);
    Handle_Player_Active(socket);
    Handle_Room_Joined(socket);
    Handle_Room_Left(socket);
    Handle_Player_Ready(socket);
    Handle_Player_Not_Ready(socket);
    Handle_Player_Action(socket);
    Handle_Game_Finished(socket);
    Handle_Game_Restart(socket);
});
var Handle_New_Connection = function (socket) {
    exports.users[socket.id] = { player_id: '', room_name: '' };
    exports.io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(exports.users).length);
};
var Handle_Player_Active = function (socket) {
    socket.on(word_guesser_types_1.ACTIVE, function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.users[socket.id].player_id = player_id;
            console.log(exports.users);
            (0, word_guesser_api_1.Player_ResetLastPlayedDate)(player_id);
            return [2 /*return*/];
        });
    }); });
};
var Handle_Player_Disconnect = function (socket) {
    socket.on('disconnect', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // If a user is in a room remove them, reduce rooms player count, if player count 0 then delete room
            if (exports.users[socket.id].room_name) {
                exports.rooms[exports.users[socket.id].room_name].player_1_id === exports.users[socket.id].player_id ? exports.rooms[exports.users[socket.id].room_name].player_1_id = '' : exports.rooms[exports.users[socket.id].room_name].player_2_id = '';
                exports.rooms[exports.users[socket.id].room_name].player_count = exports.rooms[exports.users[socket.id].room_name].player_count - 1;
                Send_Latest_Data(exports.users[socket.id].room_name);
                exports.rooms[exports.users[socket.id].room_name].player_count === 0 ? delete exports.rooms[exports.users[socket.id].room_name] : null;
                console.log(exports.rooms);
                socket.leave(exports.users[socket.id].room_name);
            }
            // Remove user from user list
            delete exports.users[socket.id];
            // Update users about remaining online users
            exports.io.sockets.emit(word_guesser_types_1.USER_COUNT, Object.keys(exports.users).length);
            console.log("user disconnected");
            return [2 /*return*/];
        });
    }); });
};
var Handle_Room_Joined = function (socket) {
    socket.on(word_guesser_types_1.ROOM_JOINED, function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('ROOM JOINED');
            exports.users[socket.id].room_name = room_name;
            !exports.rooms[room_name] ? exports.rooms[room_name] = structuredClone(word_guesser_types_1.EMPTY_ROOM) : null;
            !exports.rooms[room_name].room_name ? exports.rooms[room_name].room_name = room_name : null;
            !exports.rooms[room_name].player_1_id ? exports.rooms[room_name].player_1_id = exports.users[socket.id].player_id : exports.rooms[room_name].player_2_id = exports.users[socket.id].player_id;
            exports.rooms[room_name].player_count = exports.rooms[room_name].player_count + 1;
            socket.join(room_name);
            Send_Latest_Data(room_name);
            return [2 /*return*/];
        });
    }); });
};
var Handle_Room_Left = function (socket) {
    socket.on(word_guesser_types_1.LEAVE_ROOM, function (player_number, room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.users[socket.id].room_name = '';
            exports.rooms[room_name][player_number] = structuredClone(word_guesser_types_1.EMPTY_PLAYER_IN_ROOM);
            exports.rooms[room_name][player_number + '_id'] = '';
            exports.rooms[room_name].player_count = exports.rooms[room_name].player_count - 1;
            exports.rooms[room_name].player_count === 0 ? delete exports.rooms[room_name] : null;
            Send_Latest_Data(room_name);
            return [2 /*return*/];
        });
    }); });
};
var Handle_Player_Ready = function (socket) {
    socket.on(word_guesser_types_1.READY, function (player_id, room_name, word) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (exports.rooms[room_name]) {
                if (exports.rooms[room_name].player_1_id && exports.rooms[room_name].player_1_id === player_id) {
                    exports.rooms[room_name].player_1.ready = true;
                    exports.rooms[room_name].player_1.word = word;
                }
                if (exports.rooms[room_name].player_2_id && exports.rooms[room_name].player_2_id === player_id) {
                    exports.rooms[room_name].player_2.ready = true;
                    exports.rooms[room_name].player_2.word = word;
                }
                if (exports.rooms[room_name].player_1.ready && exports.rooms[room_name].player_2.ready) {
                    exports.rooms[room_name].current_status = 'GAME_READY';
                }
                Send_Latest_Data(room_name);
            }
            return [2 /*return*/];
        });
    }); });
};
var Handle_Player_Not_Ready = function (socket) {
    socket.on(word_guesser_types_1.NOT_READY, function (player_id, room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (exports.rooms[room_name]) {
                if (exports.rooms[room_name].player_1_id === player_id) {
                    exports.rooms[room_name].player_1.ready = false;
                    exports.rooms[room_name].player_1.word = "";
                }
                if (exports.rooms[room_name].player_2_id === player_id) {
                    exports.rooms[room_name].player_2.ready = false;
                    exports.rooms[room_name].player_2.word = "";
                }
                console.log(exports.rooms[room_name]);
                Send_Latest_Data(room_name);
            }
            return [2 /*return*/];
        });
    }); });
};
var Handle_Player_Action = function (socket) {
    socket.on(word_guesser_types_1.PLAYER_1_GUESSED, function (room_name, guess) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.rooms[room_name].player_1.guesses.push(guess);
            exports.rooms[room_name].player_1.current_guess = guess;
            exports.rooms[room_name].current_guesser = 'player_2';
            exports.rooms[room_name].current_status = 'PLAYER_1_GUESSED';
            Send_Latest_Data(room_name);
            return [2 /*return*/];
        });
    }); });
    socket.on(word_guesser_types_1.PLAYER_2_GUESSED, function (room_name, guess) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.rooms[room_name].player_2.guesses.push(guess);
            exports.rooms[room_name].player_2.current_guess = guess;
            exports.rooms[room_name].current_guesser = 'player_1';
            exports.rooms[room_name].current_status = 'PLAYER_2_GUESSED';
            Send_Latest_Data(room_name);
            return [2 /*return*/];
        });
    }); });
};
var Handle_Game_Finished = function (socket) {
    socket.on(word_guesser_types_1.GAME_FINISH, function (player_number, room_name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            exports.rooms[room_name].current_status = 'GAME_FINISH';
            exports.rooms[room_name][player_number].wins = exports.rooms[room_name][player_number].wins + 1;
            exports.rooms[room_name].number_of_games_played = exports.rooms[room_name].number_of_games_played + 1;
            exports.rooms[room_name].winner = player_number === 'player_1' ? 'Player 1' : 'Player 2';
            Send_Latest_Data(room_name);
            return [2 /*return*/];
        });
    }); });
};
var Handle_Game_Restart = function (socket) {
    socket.on(word_guesser_types_1.PLAYER_VOTE, function (player_number, room_name, vote) { return __awaiter(void 0, void 0, void 0, function () {
        var roomUsers;
        return __generator(this, function (_a) {
            exports.rooms[room_name][player_number].rematch = vote;
            if (exports.rooms[room_name].player_1.rematch === 'yes' && exports.rooms[room_name].player_2.rematch === 'yes') {
                RestartGame(room_name);
                Send_Latest_Data(room_name);
            }
            else if (exports.rooms[room_name].player_1.rematch === 'no' || exports.rooms[room_name].player_2.rematch === 'no') {
                roomUsers = exports.io.sockets.adapter.rooms.get(room_name);
                exports.rooms[room_name].current_status = 'ROOM_CLOSING';
                Send_Latest_Data(room_name);
                roomUsers === null || roomUsers === void 0 ? void 0 : roomUsers.forEach(function (room_user) {
                    exports.users[room_user].room_name = '';
                    exports.users[room_user].room_name = '';
                });
                delete exports.rooms[room_name];
            }
            else {
                Send_Latest_Data(room_name);
            }
            return [2 /*return*/];
        });
    }); });
};
var Send_Latest_Data = function (room_name) {
    exports.io.to(room_name).emit(word_guesser_types_1.LATEST_DATA, exports.rooms[room_name]);
};
var RestartGame = function (room_name) {
    exports.rooms[room_name].current_guesser = 'player_1';
    exports.rooms[room_name].current_status = 'ROOM_CREATED';
    exports.rooms[room_name].winner = '';
    exports.rooms[room_name].player_1.current_guess = '';
    exports.rooms[room_name].player_1.guesses = [];
    exports.rooms[room_name].player_1.ready = false;
    exports.rooms[room_name].player_1.rematch = '';
    exports.rooms[room_name].player_1.word = '';
    exports.rooms[room_name].player_2.current_guess = '';
    exports.rooms[room_name].player_2.guesses = [];
    exports.rooms[room_name].player_2.ready = false;
    exports.rooms[room_name].player_2.rematch = '';
    exports.rooms[room_name].player_2.word = '';
};
