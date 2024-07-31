"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoom = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var CreateRoom = function () {
    var _a = (0, react_1.useState)(""), roomName = _a[0], setRoomName = _a[1];
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h2', children: "Create a room" }), (0, jsx_runtime_1.jsx)(material_1.List, { children: (0, jsx_runtime_1.jsx)(material_1.ListItem, { children: (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Room Name", value: roomName, onChange: function (e) { return setRoomName(e.target.value); } }) }) })] }));
};
exports.CreateRoom = CreateRoom;
