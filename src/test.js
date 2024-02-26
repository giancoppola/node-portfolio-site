"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ReactDOM = require('react-dom');
var UserProfile = function () {
    var _a = (0, react_1.useState)([]), users = _a[0], setUsers = _a[1];
    (0, react_1.useEffect)(function () {
        fetch('/api/users')
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            setUsers(data.users);
        });
    }, []);
    return (react_1.default.createElement("div", null, users.map(function (user) { return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h2", null,
            user.firstName,
            " ",
            user.lastName),
        react_1.default.createElement("p", null, user.username))); })));
};
ReactDOM.render(react_1.default.createElement(UserProfile, null), document.querySelector('#root'));
