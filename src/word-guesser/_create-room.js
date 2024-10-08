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
exports.CreateRoom = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var word_guesser_tools_1 = require("./word-guesser-tools");
var word_guesser_types_1 = require("../../types/word-guesser-types");
var CreateRoom = function (props) {
    var _a = (0, react_1.useState)(""), errMsg = _a[0], setErrMsg = _a[1];
    var _b = (0, react_1.useState)(""), newRoomName = _b[0], setNewRoomName = _b[1];
    var CheckRoom = function (room_name) { return __awaiter(void 0, void 0, void 0, function () {
        var room_exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!room_name) {
                        setErrMsg('Please provide a room name!');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, word_guesser_tools_1.Fetch_Room_DoesRoomExist)(room_name)];
                case 1:
                    room_exists = _a.sent();
                    if (room_exists) {
                        setErrMsg("Room with that name already exists!");
                        return [2 /*return*/];
                    }
                    props.setRoomName(room_name);
                    props.setPlayerNumber(word_guesser_types_1.PLAYER_1);
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () { setErrMsg(''); }, [newRoomName]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h3', children: "Create a room" }), (0, jsx_runtime_1.jsx)(material_1.List, { children: (0, jsx_runtime_1.jsxs)(material_1.ListItem, { sx: { gap: '1rem', paddingLeft: 0 }, children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { error: errMsg ? true : false, fullWidth: true, label: "Room Name", value: newRoomName, onChange: function (e) { return setNewRoomName(e.target.value); } }), (0, jsx_runtime_1.jsx)(material_1.Button, { className: 'btn__input', variant: 'contained', onClick: function () { return CheckRoom(newRoomName); }, children: "Create" })] }) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { minHeight: '1.5rem', color: 'red', children: errMsg })] }));
};
exports.CreateRoom = CreateRoom;
