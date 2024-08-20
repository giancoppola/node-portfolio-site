"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveRoomButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var LeaveRoomButton = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Button, { fullWidth: true, color: 'error', onClick: function () { return props.leaveRoom(); }, children: [(0, jsx_runtime_1.jsx)(icons_material_1.Logout, { color: 'error' }), "\u00A0 Leave Room"] }));
};
exports.LeaveRoomButton = LeaveRoomButton;
