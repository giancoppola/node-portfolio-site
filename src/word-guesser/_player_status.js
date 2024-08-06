"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var icons_material_1 = require("@mui/icons-material");
var Player = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: props.name, secondary: props.playerStatus }), (0, jsx_runtime_1.jsxs)(material_1.ListItemIcon, { sx: { justifyContent: 'center', alignItems: "center", gap: '.5rem' }, children: [(0, jsx_runtime_1.jsx)(icons_material_1.EmojiEvents, {}), " ", (0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 'bold', variant: 'subtitle2', children: " 0" })] }), (0, jsx_runtime_1.jsxs)(material_1.ListItemIcon, { sx: { justifyContent: 'flex-end' }, children: [props.icon === 'pending' && (0, jsx_runtime_1.jsx)(icons_material_1.Pending, { color: 'action' }), props.icon === 'hourglass' && (0, jsx_runtime_1.jsx)(icons_material_1.HourglassEmpty, { color: 'warning' }), props.icon === 'thumbs_up' && (0, jsx_runtime_1.jsx)(icons_material_1.ThumbUpAlt, { color: 'success' })] })] }));
};
var PlayerStatus = function (props) {
    var _a = (0, react_1.useState)('Waiting for player to join...'), playerOneStatus = _a[0], setPlayerOneStatus = _a[1];
    var _b = (0, react_1.useState)('pending'), playerOneIcon = _b[0], setPlayerOneIcon = _b[1];
    var _c = (0, react_1.useState)('Waiting for player to join...'), playerTwoStatus = _c[0], setPlayerTwoStatus = _c[1];
    var _d = (0, react_1.useState)('pending'), playerTwoIcon = _d[0], setPlayerTwoIcon = _d[1];
    (0, react_1.useEffect)(function () {
        var room = props.roomData;
        switch (room.current_status) {
            case "ROOM_CREATED":
                if (room.player_1_id && room.player_1.ready) {
                    setPlayerOneStatus('Player ready! Waiting for game start...');
                    setPlayerOneIcon('thumbs_up');
                }
                if (room.player_1_id && !room.player_1.ready) {
                    setPlayerOneStatus('Waiting for player to be ready...');
                    setPlayerOneIcon('hourglass');
                }
                if (!room.player_1_id) {
                    setPlayerOneStatus('Waiting for player to join...');
                    setPlayerOneIcon('pending');
                }
                if (room.player_2_id && room.player_2.ready) {
                    setPlayerTwoStatus('Player ready! Waiting for game start...');
                    setPlayerTwoIcon('thumbs_up');
                }
                if (room.player_2_id && !room.player_2.ready) {
                    setPlayerTwoStatus('Waiting for player to be ready...');
                    setPlayerTwoIcon('hourglass');
                }
                if (!room.player_2_id) {
                    setPlayerTwoStatus('Waiting for player to join...');
                    setPlayerTwoIcon('pending');
                }
                break;
            case "GAME_READY":
                setPlayerOneStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                setPlayerTwoStatus('Waiting for Player 1 to guess...');
                setPlayerTwoIcon('pending');
                break;
            case "PLAYER_1_GUESSED":
                setPlayerOneStatus("Guessed ".concat(room.player_1.current_guess.toUpperCase(), ". Waiting for Player 2 to guess..."));
                setPlayerOneIcon('pending');
                setPlayerTwoStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                break;
            case "PLAYER_2_GUESSED":
                setPlayerTwoStatus("Guessed ".concat(room.player_2.current_guess.toUpperCase(), ". Waiting for Player 2 to guess..."));
                setPlayerTwoIcon('pending');
                setPlayerOneStatus('Now guessing...');
                setPlayerOneIcon('hourglass');
                break;
            case "GAME_FINISH":
                setPlayerTwoStatus("Waiting for player to vote...");
                setPlayerTwoIcon('hourglass');
                setPlayerOneStatus('Waiting for player to vote...');
                setPlayerOneIcon('hourglass');
                break;
        }
    }, [props.roomData]);
    return ((0, jsx_runtime_1.jsxs)(material_1.List, { children: [(0, jsx_runtime_1.jsx)(Player, { name: 'Player 1', icon: playerOneIcon, playerStatus: playerOneStatus }), (0, jsx_runtime_1.jsx)(Player, { name: 'Player 2', icon: playerTwoIcon, playerStatus: playerTwoStatus })] }));
};
exports.PlayerStatus = PlayerStatus;
