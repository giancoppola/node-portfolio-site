"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RematchVote = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var RematchVote = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { minHeight: '3rem', textAlign: 'center', fontWeight: 'bold', variant: 'h4', children: "Want to play again?" }), (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { return props.vote('yes'); }, fullWidth: true, color: 'success', children: "Yes" }), (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { return props.vote('no'); }, fullWidth: true, color: 'error', children: "No" })] }));
};
exports.RematchVote = RematchVote;
