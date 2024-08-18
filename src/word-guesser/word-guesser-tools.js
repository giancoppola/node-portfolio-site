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
exports.Fetch_Player_LeaveRoom = exports.Fetch_Player_CreateNewPlayer = exports.Fetch_Player_CheckPlayerId = exports.Fetch_Room_IsRoomJoinable = exports.Fetch_Room_CreateRoom = exports.Fetch_Room_DoesRoomExist = exports.GuessChecker = exports.RemoveQuotes = void 0;
/////////////
// General //
/////////////
var RemoveQuotes = function (input) {
    return input.replace(/"/gm, "");
};
exports.RemoveQuotes = RemoveQuotes;
var GuessChecker = function (guess, word) {
    var matches = 0;
    guess[0] === word[0] ? matches++ : null;
    guess[1] === word[1] ? matches++ : null;
    guess[2] === word[2] ? matches++ : null;
    guess[3] === word[3] ? matches++ : null;
    return matches;
};
exports.GuessChecker = GuessChecker;
/////////////////
// General End //
/////////////////
////////////////////
// Room API Calls //
////////////////////
var Fetch_Room_DoesRoomExist = function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
    var exists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/rooms/find?name=".concat(room_name))
                    .then(function (res) { return res.text(); })
                    .then(function (data) { return exists = (0, exports.RemoveQuotes)(data); })];
            case 1:
                exists = _a.sent();
                if (exists === 'true') {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
        }
    });
}); };
exports.Fetch_Room_DoesRoomExist = Fetch_Room_DoesRoomExist;
var Fetch_Room_CreateRoom = function (room_name, player_id) { return __awaiter(void 0, void 0, void 0, function () {
    var created;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/rooms/new?name=".concat(room_name, "&id=").concat(player_id), {
                    method: "POST"
                })
                    .then(function (res) { return true; })
                    .catch(function (err) { console.log(err); return false; })];
            case 1:
                created = _a.sent();
                return [2 /*return*/, created];
        }
    });
}); };
exports.Fetch_Room_CreateRoom = Fetch_Room_CreateRoom;
var Fetch_Room_IsRoomJoinable = function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
    var joined;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/rooms/joinable?name=".concat(room_name))
                    .then(function (res) { return res.text(); })
                    .then(function (data) { if ((0, exports.RemoveQuotes)(data) === "true") {
                    return true;
                } return false; })
                    .catch(function (err) { console.log(err); return false; })];
            case 1:
                joined = _a.sent();
                return [2 /*return*/, joined];
        }
    });
}); };
exports.Fetch_Room_IsRoomJoinable = Fetch_Room_IsRoomJoinable;
////////////////////////
// Room API Calls End //
////////////////////////
//////////////////////
// Player API Calls //
//////////////////////
var Fetch_Player_CheckPlayerId = function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
    var valid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/players/find?id=".concat(player_id))
                    .then(function (res) { return res.text(); })
                    .then(function (data) { return (0, exports.RemoveQuotes)(data); })
                    .catch(function (err) { return console.log(err); })];
            case 1:
                valid = _a.sent();
                if (valid === "true") {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
        }
    });
}); };
exports.Fetch_Player_CheckPlayerId = Fetch_Player_CheckPlayerId;
var Fetch_Player_CreateNewPlayer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/players/new", {
                    method: "POST"
                })
                    .then(function (res) { return res.text(); })
                    .then(function (id) { return (0, exports.RemoveQuotes)(id); })];
            case 1:
                newId = _a.sent();
                return [2 /*return*/, newId];
        }
    });
}); };
exports.Fetch_Player_CreateNewPlayer = Fetch_Player_CreateNewPlayer;
var Fetch_Player_LeaveRoom = function (player_id, room_name) { return __awaiter(void 0, void 0, void 0, function () {
    var left;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/word-guesser/rooms/leave?name=".concat(room_name, "&id=").concat(player_id), {
                    method: "PATCH"
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) { return data; })
                    .catch(function (err) { console.log(err); return { success: false, msg: err.message }; })];
            case 1:
                left = _a.sent();
                return [2 /*return*/, left];
        }
    });
}); };
exports.Fetch_Player_LeaveRoom = Fetch_Player_LeaveRoom;
//////////////////////////
// Player API Calls End //
//////////////////////////
