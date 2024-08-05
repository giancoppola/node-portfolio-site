"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var icons_material_1 = require("@mui/icons-material");
var Player = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: props.name, secondary: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: props.playerStatus }) }) }), (0, jsx_runtime_1.jsxs)(material_1.ListItemIcon, { sx: { justifyContent: 'center', alignItems: "center", gap: '.5rem' }, children: [(0, jsx_runtime_1.jsx)(icons_material_1.EmojiEvents, {}), " ", (0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 'bold', variant: 'subtitle2', children: " 0" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemIcon, { sx: { justifyContent: 'flex-end' }, children: [props.playerStatus === 'Waiting for player to join' && (0, jsx_runtime_1.jsx)(icons_material_1.Pending, { color: 'action' }), props.playerStatus === 'Waiting for player to be ready' && (0, jsx_runtime_1.jsx)(icons_material_1.HourglassEmpty, { color: 'warning' }), props.playerStatus === 'Player ready!' && (0, jsx_runtime_1.jsx)(icons_material_1.ThumbUpAlt, { color: 'success' })] })] }));
};
var PlayerStatus = function (props) {
    var _a = (0, react_1.useState)('Waiting for player to join'), playerOneStatus = _a[0], setPlayerOneStatus = _a[1];
    var _b = (0, react_1.useState)('Waiting for player to join'), playerTwoStatus = _b[0], setPlayerTwoStatus = _b[1];
    (0, react_1.useEffect)(function () {
        var room = props.roomData;
        if (room.current_status === "ROOM_CREATED") {
            room.player_1_id && room.player_1.ready && setPlayerOneStatus('Player ready!');
            room.player_1_id && !room.player_1.ready && setPlayerOneStatus('Waiting for player to be ready');
            !room.player_1_id && setPlayerOneStatus('Waiting for player to join');
            room.player_2_id && room.player_2.ready && setPlayerTwoStatus('Player ready!');
            room.player_2_id && !room.player_2.ready && setPlayerTwoStatus('Waiting for player to be ready');
            !room.player_2_id && setPlayerTwoStatus('Waiting for player to join');
        }
    }, [props.roomData]);
    return ((0, jsx_runtime_1.jsxs)(material_1.List, { children: [(0, jsx_runtime_1.jsx)(Player, { name: 'Player 1', playerStatus: playerOneStatus }), (0, jsx_runtime_1.jsx)(Player, { name: 'Player 2', playerStatus: playerTwoStatus })] }));
};
exports.PlayerStatus = PlayerStatus;
