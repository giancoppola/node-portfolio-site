"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("react-dom/client");
var material_1 = require("@mui/material");
var CreateRoom = function () {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h2', children: "Create a room" }) }));
};
var Main = function () {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h1', children: "Word Guesser" }), (0, jsx_runtime_1.jsx)(CreateRoom, {})] }));
};
var root = (0, client_1.createRoot)(document.getElementById('main'));
root.render((0, jsx_runtime_1.jsx)(Main, {}));
