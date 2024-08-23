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
                setContextualMsg('');
                setMsg('');
                break;
            case 'GAME_READY':
                setContextualMsg('');
                setMsg("".concat(props.playerNumber === 'player_1' ? 'You' : 'Player 1', " to guess first!"));
                ShowDialog();
                break;
            case 'PLAYER_1_GUESSED':
                setContextualMsg(props.playerNumber === 'player_1' ?
                    "You guessed ".concat(props.roomData.player_1.current_guess.toUpperCase(), " which had ").concat(props.roomData.player_1.last_guess_score, " matches") :
                    "Player 1 guessed ".concat(props.roomData.player_1.current_guess.toUpperCase(), " which had ").concat(props.roomData.player_1.last_guess_score, " matches"));
                setMsg("".concat(props.playerNumber === 'player_1' ? "Player 2's" : 'Your', " turn to guess!"));
                ShowDialog();
                break;
            case 'PLAYER_2_GUESSED':
                setContextualMsg(props.playerNumber === 'player_1' ?
                    "Player 2 guessed ".concat(props.roomData.player_2.current_guess.toUpperCase(), " which had ").concat(props.roomData.player_2.last_guess_score, " matches") :
                    "You guessed ".concat(props.roomData.player_2.current_guess.toUpperCase(), " which had ").concat(props.roomData.player_2.last_guess_score, " matches"));
                setMsg("".concat(props.playerNumber === 'player_1' ? "Your" : "Player 1's", " turn to guess!"));
                ShowDialog();
                break;
            case 'GAME_FINISH':
                setContextualMsg('');
                setMsg("".concat(props.winner, " is the winner!"));
                ShowDialog();
                break;
            case 'ROOM_CLOSING':
                setContextualMsg('');
                props.roomData.player_count < 2 ?
                    setMsg('Opponent left! Room is now closing...') :
                    setMsg('Rematch denied! Room is now closing...');
                ShowDialog();
                break;
        }
    }, [props.currentStatus]);
    return ((0, jsx_runtime_1.jsx)(material_1.Dialog, { open: show, children: (0, jsx_runtime_1.jsxs)(material_1.DialogTitle, { textAlign: 'center', margin: '1rem', children: [contextualMsg, contextualMsg && (0, jsx_runtime_1.jsx)("br", {}), contextualMsg && (0, jsx_runtime_1.jsx)("br", {}), msg] }) }));
};
exports.StatusDialog = StatusDialog;
