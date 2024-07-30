"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
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
    return ((0, jsx_runtime_1.jsx)("div", { children: users.map(function (user) { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h2", { children: [user.firstName, " ", user.lastName] }), (0, jsx_runtime_1.jsx)("p", { children: user.username })] })); }) }));
};
ReactDOM.render((0, jsx_runtime_1.jsx)(UserProfile, {}), document.querySelector('#root'));
