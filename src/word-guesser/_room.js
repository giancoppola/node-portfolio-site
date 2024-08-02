"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var _word_input_1 = require("./_word_input");
var Room = function (props) {
    return ((0, jsx_runtime_1.jsx)(_word_input_1.WordInput, { setWord: props.setWord }));
};
exports.Room = Room;
