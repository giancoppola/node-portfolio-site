"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingOptions = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var react_1 = require("react");
var FloatingOptions = function (props) {
    var _a = (0, react_1.useState)(false), openHelp = _a[0], setOpenHelp = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { position: 'absolute', top: '0', left: '0', children: [(0, jsx_runtime_1.jsxs)(material_1.IconButton, { onClick: function () { return props.setDarkMode(!props.darkMode); }, children: [props.darkMode && (0, jsx_runtime_1.jsx)(icons_material_1.Brightness7, {}), !props.darkMode && (0, jsx_runtime_1.jsx)(icons_material_1.Brightness4, {})] }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: function () { return setOpenHelp(true); }, children: (0, jsx_runtime_1.jsx)(icons_material_1.Help, {}) })] }), (0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: openHelp, children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { fontWeight: 'bold', children: "How To Play" }), (0, jsx_runtime_1.jsxs)(material_1.DialogContent, { dividers: true, sx: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: [(0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "BattleWords is a two player game where the aim is to beat your opponent by guessing their word!" }), (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "At the start of the game, you and your opponent will both submit a word, and then take turns guessing your opponents word." }), (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "Every time you or your opponent guess you will be told how many characters of your guess match the same character position in your opponents word." }), (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "The first person to figure out their opponents word wins!" }), (0, jsx_runtime_1.jsx)(material_1.DialogContentText, { children: "To get started, either create a new room and invite a friend, or join an existing room!" })] }), (0, jsx_runtime_1.jsx)(material_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { return setOpenHelp(false); }, children: "Close" }) })] })] }));
};
exports.FloatingOptions = FloatingOptions;