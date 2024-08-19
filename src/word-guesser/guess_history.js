"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuessHistory = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var word_guesser_tools_1 = require("./word-guesser-tools");
var GuessHistory = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: props.open, children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: "Guess History" }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { dividers: true, children: (0, jsx_runtime_1.jsxs)(material_1.List, { children: [props.guesses.length < 1 &&
                            (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "No guesses yet..." }) }), props.guesses.length >= 1 &&
                            (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: props.guesses.map(function (guess) {
                                    return ((0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsxs)(material_1.DialogContentText, { children: [guess, ": ", (0, word_guesser_tools_1.GuessChecker)(guess, props.opp_word), " ", (0, word_guesser_tools_1.GuessChecker)(guess, props.opp_word) === 4 ? '- WINNER!' : ''] }) }));
                                }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { props.setOpen(false); }, children: "Close" }) })] }));
};
exports.GuessHistory = GuessHistory;
