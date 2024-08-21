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
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var react_1 = require("react");
var material_1 = require("@mui/material");
var _create_room_1 = require("./_create-room");
var _join_room_1 = require("./_join_room");
var _footer_1 = require("./_footer");
var word_guesser_types_1 = require("../../types/word-guesser-types");
var word_guesser_tools_1 = require("./word-guesser-tools");
var socket_io_client_1 = require("socket.io-client");
var _word_input_1 = require("./_word_input");
var _player_status_1 = require("./_player_status");
var guess_history_dialog_1 = require("./guess_history_dialog");
var _leave_room_1 = require("./_leave_room");
var _guess_history_button_1 = require("./_guess_history_button");
var _theme_mode_toggle_1 = require("./_theme_mode_toggle");
var _status_message_1 = require("./_status_message");
var _rematch_vote_1 = require("./_rematch_vote");
var _status_dialog_1 = require("./_status_dialog");
var socket = (0, socket_io_client_1.io)();
var DarkTheme = (0, material_1.createTheme)({
    palette: {
        mode: "dark",
    }
});
var LightTheme = (0, material_1.createTheme)({
    palette: {
        mode: "light",
    }
});
var Main = function () {
    // State for when in room
    var _a = (0, react_1.useState)('ROOM_CREATED'), currentStatus = _a[0], setCurrentStatus = _a[1];
    var _b = (0, react_1.useState)(word_guesser_types_1.EMPTY_ROOM), roomData = _b[0], setRoomData = _b[1];
    var _c = (0, react_1.useState)(false), ready = _c[0], setReady = _c[1];
    var _d = (0, react_1.useState)(true), canSubmitWord = _d[0], setCanSubmitWord = _d[1];
    var _e = (0, react_1.useState)(""), word = _e[0], setWord = _e[1];
    var _f = (0, react_1.useState)(''), currentGuess = _f[0], setCurrentGuess = _f[1];
    var _g = (0, react_1.useState)(''), playerNumber = _g[0], setPlayerNumber = _g[1];
    var _h = (0, react_1.useState)(false), showGuessHistory = _h[0], setShowGuessHistory = _h[1];
    var _j = (0, react_1.useState)(false), showStatus = _j[0], setShowStatus = _j[1];
    var _k = (0, react_1.useState)(""), statusDialogMsg = _k[0], setStatusDialogMsg = _k[1];
    // State used at all times
    var _l = (0, react_1.useState)(false), darkMode = _l[0], setDarkMode = _l[1];
    var _m = (0, react_1.useState)(0), userCount = _m[0], setUserCount = _m[1];
    var _o = (0, react_1.useState)(""), roomName = _o[0], setRoomName = _o[1];
    var _p = (0, react_1.useState)(""), playerId = _p[0], setPlayerId = _p[1];
    var CheckPlayerId = function (player_id) { return __awaiter(void 0, void 0, void 0, function () {
        var valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, word_guesser_tools_1.Fetch_Player_CheckPlayerId)(player_id)];
                case 1:
                    valid = _a.sent();
                    if (valid) {
                        setPlayerId(player_id);
                    }
                    else {
                        localStorage.removeItem(word_guesser_types_1.PLAYER_ID);
                        CreateNewPlayer();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var CreateNewPlayer = function () { return __awaiter(void 0, void 0, void 0, function () {
        var newId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, word_guesser_tools_1.Fetch_Player_CreateNewPlayer)()];
                case 1:
                    newId = _a.sent();
                    console.log(newId);
                    setPlayerId(newId);
                    localStorage.setItem(word_guesser_types_1.PLAYER_ID, newId);
                    return [2 /*return*/];
            }
        });
    }); };
    var CanSubmitCheck = function (room_data) {
        var canSubmit;
        switch (room_data.current_status) {
            case 'ROOM_CREATED':
                word ? canSubmit = false : canSubmit = true;
                break;
            case 'GAME_READY':
                playerNumber === room_data.current_guesser ? canSubmit = true : canSubmit = false;
                break;
            case 'PLAYER_1_GUESSED':
                playerNumber === word_guesser_types_1.PLAYER_2 ? canSubmit = true : canSubmit = false;
                break;
            case 'PLAYER_2_GUESSED':
                playerNumber === word_guesser_types_1.PLAYER_1 ? canSubmit = true : canSubmit = false;
                break;
            case 'GAME_FINISH':
                canSubmit = false;
                break;
            default:
                canSubmit = false;
        }
        return canSubmit;
    };
    var LeaveRoom = function () {
        socket.emit(word_guesser_types_1.LEAVE_ROOM, playerNumber, roomName);
        setRoomName('');
        setPlayerNumber('');
        setCurrentGuess('');
        setWord('');
        setCanSubmitWord(true);
        setReady(false);
        setRoomData(word_guesser_types_1.EMPTY_ROOM);
        setCurrentStatus('ROOM_CREATED');
    };
    var RestartRoom = function () {
        setCurrentGuess('');
        setWord('');
        setReady(false);
    };
    var PlayerVote = function (vote) {
        socket.emit(word_guesser_types_1.PLAYER_VOTE, playerNumber, roomName, vote);
    };
    socket.on(word_guesser_types_1.LATEST_DATA, function (room_data) {
        console.log('Got new room data:', room_data);
        setRoomData(room_data);
        setCurrentStatus(room_data.current_status);
        setCanSubmitWord(CanSubmitCheck(room_data));
        if (room_data.current_status === 'GAME_FINISH') {
            RestartRoom();
        }
        if (room_data.current_status === 'ROOM_CLOSING') {
            LeaveRoom();
        }
    });
    (0, react_1.useEffect)(function () {
        var player_id = localStorage.getItem(word_guesser_types_1.PLAYER_ID);
        console.log("Player ID: ", player_id);
        if (player_id != null) {
            CheckPlayerId(player_id);
        }
        else {
            CreateNewPlayer();
        }
    }, []);
    (0, react_1.useEffect)(function () {
        switch (currentStatus) {
            //todo
        }
        setShowStatus(true);
    }, [currentStatus]);
    (0, react_1.useEffect)(function () { playerId ? socket.emit(word_guesser_types_1.ACTIVE, playerId) : null; }, [playerId]);
    (0, react_1.useEffect)(function () { roomName ? socket.emit(word_guesser_types_1.ROOM_JOINED, roomName) : null; }, [roomName]);
    (0, react_1.useEffect)(function () { ready ? socket.emit(word_guesser_types_1.READY, playerId, roomName, word) : socket.emit(word_guesser_types_1.NOT_READY, playerId, roomName); }, [ready]);
    (0, react_1.useEffect)(function () {
        if (currentStatus === 'ROOM_CREATED') {
            var guesser = playerNumber === word_guesser_types_1.PLAYER_1 ? word_guesser_types_1.PLAYER_1_WORD : word_guesser_types_1.PLAYER_2_WORD;
            if (word) {
                setReady(true);
                setCanSubmitWord(false);
                socket.emit(guesser, word);
            }
            else {
                setReady(false);
                setCanSubmitWord(true);
                socket.emit(guesser, '');
            }
        }
    }, [word]);
    (0, react_1.useEffect)(function () {
        if (currentGuess && canSubmitWord) {
            var test = playerNumber === word_guesser_types_1.PLAYER_1 ? word_guesser_types_1.PLAYER_2 : word_guesser_types_1.PLAYER_1;
            var guesser = playerNumber === word_guesser_types_1.PLAYER_1 ? word_guesser_types_1.PLAYER_1_GUESSED : word_guesser_types_1.PLAYER_2_GUESSED;
            (0, word_guesser_tools_1.GuessChecker)(currentGuess, roomData[test].word) === 4 ?
                socket.emit(word_guesser_types_1.GAME_FINISH, playerNumber, roomName) :
                socket.emit(guesser, roomName, currentGuess);
            setCurrentGuess('');
        }
    }, [currentGuess]);
    socket.on(word_guesser_types_1.USER_COUNT, function (user_count) { return setUserCount(user_count); });
    return ((0, jsx_runtime_1.jsxs)(material_1.ThemeProvider, { theme: darkMode ? DarkTheme : LightTheme, children: [(0, jsx_runtime_1.jsx)(material_1.CssBaseline, {}), (0, jsx_runtime_1.jsx)(_theme_mode_toggle_1.ThemeModeToggle, { darkMode: darkMode, setDarkMode: setDarkMode }), (0, jsx_runtime_1.jsxs)(material_1.Box, { component: 'section', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100dvh', width: '100dvw', children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h1', fontWeight: 'bold', children: "BattleWords" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'subtitle2', fontWeight: 'bold', textAlign: 'center', children: "".concat(userCount, " player").concat(userCount > 1 ? 's are' : ' is', " online") })] }), playerId && !roomName &&
                        (0, jsx_runtime_1.jsxs)(material_1.Box, { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem', children: [(0, jsx_runtime_1.jsx)(_create_room_1.CreateRoom, { setPlayerNumber: setPlayerNumber, setRoomName: setRoomName, playerId: playerId }), (0, jsx_runtime_1.jsx)(_join_room_1.JoinRoom, { setPlayerNumber: setPlayerNumber, setRoomName: setRoomName, playerId: playerId })] }), playerId && roomName &&
                        (0, jsx_runtime_1.jsxs)(material_1.Box, { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: '2rem', children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(_status_message_1.StatusMessage, { currentStatus: currentStatus, winner: roomData.winner, word: word }), (0, jsx_runtime_1.jsx)(_player_status_1.PlayerStatus, { roomData: roomData })] }), currentStatus != 'GAME_FINISH' &&
                                    (0, jsx_runtime_1.jsx)(_word_input_1.WordInput, { canSubmitWord: canSubmitWord, currentStatus: currentStatus, setCurrentGuess: setCurrentGuess, setWord: setWord }), currentStatus === 'GAME_FINISH' &&
                                    (0, jsx_runtime_1.jsx)(_rematch_vote_1.RematchVote, { vote: PlayerVote }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(_guess_history_button_1.GuessHistoryButton, { showHistory: setShowGuessHistory }), (0, jsx_runtime_1.jsx)(_leave_room_1.LeaveRoomButton, { leaveRoom: LeaveRoom })] }), (0, jsx_runtime_1.jsx)(guess_history_dialog_1.GuessHistoryDialog, { open: showGuessHistory, setOpen: setShowGuessHistory, opp_word: playerNumber === 'player_1' ? roomData.player_2.word : roomData.player_1.word, guesses: playerNumber === 'player_1' ? roomData.player_1.guesses : roomData.player_2.guesses }), (0, jsx_runtime_1.jsx)(_status_dialog_1.StatusDialog, { msg: statusDialogMsg, show: showStatus, setShow: setShowStatus })] }), (0, jsx_runtime_1.jsx)(_footer_1.Footer, {})] })] }));
};
var root = (0, client_1.createRoot)(document.getElementById('main'));
root.render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(Main, {}) }));
