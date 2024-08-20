"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuessHistoryButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var GuessHistoryButton = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Button, { fullWidth: true, onClick: function () { return props.showHistory(true); }, children: [(0, jsx_runtime_1.jsx)(icons_material_1.History, {}), "\u00A0 Guess History"] }));
};
exports.GuessHistoryButton = GuessHistoryButton;
