"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var store = require('./meals.state').default;
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("p", null, "Hello World!")));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
