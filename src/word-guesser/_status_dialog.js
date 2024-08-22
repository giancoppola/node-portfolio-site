"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var StatusDialog = function (props) {
    var _a = (0, react_1.useState)(false), show = _a[0], setShow = _a[1];
    var _b = (0, react_1.useState)(""), contextualMsg = _b[0], setContextualMsg = _b[1];
    var _c = (0, react_1.useState)(""), msg = _c[0], setMsg = _c[1];
    var ShowDialog = function () {
        setShow(true);
        setTimeout(function () {
            setShow(false);
        }, 2000);
    };
    (0, react_1.useEffect)(function () {
        switch (props.currentStatus) {
            case 'ROOM_CREATED':
                break;
            case 'GAME_READY':
                setMsg("".concat(props.playerNumber === 'player_1' ? 'You' : 'Player 1', " to guess first!"));
                ShowDialog();
                break;
            case 'PLAYER_1_GUESSED':
                setMsg("".concat(props.playerNumber === 'player_1' ? "Player 2's" : 'Your', " turn to guess!"));
                ShowDialog();
                break;
            case 'PLAYER_2_GUESSED':
                setMsg("".concat(props.playerNumber === 'player_1' ? "Your" : "Player 1's", " turn to guess!"));
                ShowDialog();
                break;
            case 'GAME_FINISH':
                setMsg("".concat(props.winner, " is the winner!"));
                ShowDialog();
                break;
            case 'ROOM_CLOSING':
                setMsg('Rematch denied! Room is now closing...');
                ShowDialog();
                break;
        }
    }, [props.currentStatus]);
    return ((0, jsx_runtime_1.jsx)(material_1.Dialog, { open: show, children: (0, jsx_runtime_1.jsxs)(material_1.DialogTitle, { children: [contextualMsg, contextualMsg && (0, jsx_runtime_1.jsx)("br", {}), msg] }) }));
};
exports.StatusDialog = StatusDialog;
