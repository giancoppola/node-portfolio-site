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
exports.Room_IsRoomJoinable = exports.Room_DoesRoomExist = exports.Player_ResetLastPlayedDate = exports.Player_CheckExists = exports.Player_GetAll = exports.Player_CreateNew = exports.router = void 0;
var express = require('express');
var rateLimit = require("express-rate-limit");
exports.router = express.Router();
var mongoose = require('mongoose');
// MongoDB model imports
var word_guesser_types_1 = require("../types/word-guesser-types");
var server_1 = require("../server");
var limit = rateLimit({
    // Every 5 minutes
    windowMs: 5 * 60 * 1000,
    // A max of this many requests
    max: 50,
});
exports.router.use(limit);
exports.router.use("/*", express.json());
///////////////////////////
// Players API Endpoints //
///////////////////////////
// Get all players in DB
exports.router.route('/players/')
    .get(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var players;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.Player_GetAll)()];
            case 1:
                players = _a.sent();
                res.json({
                    players: players
                });
                return [2 /*return*/];
        }
    });
}); });
exports.router.route('/players/new')
    .post(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var player;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.Player_CreateNew)()];
            case 1:
                player = _a.sent();
                res.send(player._id);
                return [2 /*return*/];
        }
    });
}); });
exports.router.route('/players/find')
    .get(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.Player_CheckExists)(req.query.id)];
            case 1:
                exists = _a.sent();
                if (exists) {
                    res.status(200).send(true);
                }
                else {
                    res.status(200).send(false);
                }
                return [2 /*return*/];
        }
    });
}); });
///////////////////////////////
// Players API Endpoints End //
///////////////////////////////
/////////////////////////
// Rooms API Endpoints //
/////////////////////////
exports.router.route('/rooms/find')
    .get(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exists;
    return __generator(this, function (_a) {
        exists = (0, exports.Room_DoesRoomExist)(req.query.name);
        if (exists) {
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
        return [2 /*return*/];
    });
}); });
exports.router.route('/rooms/joinable')
    .get(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var joinable;
    return __generator(this, function (_a) {
        joinable = (0, exports.Room_IsRoomJoinable)(req.query.name);
        if (joinable) {
            res.status(200).send(true);
        }
        else {
            res.status(200).send(false);
        }
        return [2 /*return*/];
    });
}); });
/////////////////////////////
// Rooms API Endpoints End //
/////////////////////////////
////////////////////////
// Database Functions //
////////////////////////
var Player_CreateNew = function () { return __awaiter(void 0, void 0, void 0, function () {
    var player;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                player = new word_guesser_types_1.PlayerModel({
                    wins: 0,
                    losses: 0,
                    last_played: Date.now(),
                });
                return [4 /*yield*/, player.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, player];
        }
    });
}); };
exports.Player_CreateNew = Player_CreateNew;
var Player_GetAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var players;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, word_guesser_types_1.PlayerModel.find().exec()];
            case 1:
                players = _a.sent();
                console.log(players.length);
                return [2 /*return*/, players];
        }
    });
}); };
exports.Player_GetAll = Player_GetAll;
var Player_CheckExists = function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
    var player, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, word_guesser_types_1.PlayerModel.find({ _id: player_id }).exec()];
            case 1:
                player = _a.sent();
                if (player.length === 1) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, false];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Player_CheckExists = Player_CheckExists;
var Player_ResetLastPlayedDate = function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
    var player, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, word_guesser_types_1.PlayerModel.findOneAndUpdate({ _id: player_id }, { last_played: Date.now() })];
            case 1:
                player = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Player_ResetLastPlayedDate = Player_ResetLastPlayedDate;
var Room_DoesRoomExist = function (room_name) {
    var name = room_name;
    var exists = server_1.rooms[name] != null;
    if (exists) {
        return true;
    }
    return false;
};
exports.Room_DoesRoomExist = Room_DoesRoomExist;
var Room_IsRoomJoinable = function (room_name) {
    var exists = (0, exports.Room_DoesRoomExist)(room_name);
    if (exists) {
        if (server_1.rooms[room_name].player_count < 2) {
            return true;
        }
        return false;
    }
    return false;
};
exports.Room_IsRoomJoinable = Room_IsRoomJoinable;
////////////////////////////
// Database Functions End //
////////////////////////////
