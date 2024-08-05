"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var StatusMessage = function (props) {
    var _a = (0, react_1.useState)('Game begins in 5...'), countdownString = _a[0], setCountdownString = _a[1];
    (0, react_1.useEffect)(function () {
        var room = props.roomData;
    }, [props.roomData]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Typography, { children: [props.currentStatus === 'ROOM_CREATED' && props.roomData.player_1.ready && props.roomData.player_2.ready &&
                countdownString, props.currentStatus === 'GAME_READY' &&
                "Player 1's turn to guess"] }));
};
exports.StatusMessage = StatusMessage;
