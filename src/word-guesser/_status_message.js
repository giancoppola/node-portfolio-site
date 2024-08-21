"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var StatusMessage = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Typography, { minHeight: '3rem', textAlign: 'center', fontWeight: 'bold', variant: 'h4', children: [props.currentStatus != 'GAME_FINISH' && props.word &&
                "Your word is ".concat(props.word.toUpperCase()), props.currentStatus != 'GAME_FINISH' && !props.word &&
                'Please submit your word', props.currentStatus === 'GAME_FINISH' &&
                "".concat(props.winner, " is the winner!")] }));
};
exports.StatusMessage = StatusMessage;
