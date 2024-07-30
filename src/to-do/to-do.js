"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var client_1 = require("react-dom/client");
var Title = function () {
    return ((0, jsx_runtime_1.jsx)("h1", { className: 'page-title', children: "To Do List" }));
};
var List = function (props) {
    var _a = (0, react_1.useState)(["Try adding your own"]), list = _a[0], setList = _a[1];
    var add = function () {
        var newList = __spreadArray(__spreadArray([], list, true), [""], false);
        setList(newList);
    };
    var remove = function (index) {
        console.log("now removing", index);
        var newList = __spreadArray([], list, true);
        newList.splice(index, 1);
        console.log(newList);
        setList(newList);
    };
    var update = function (index, text) {
        console.log("update called");
        var newList = __spreadArray([], list, true);
        newList[index] = text;
        setList(newList);
        console.log(newList);
    };
    (0, react_1.useEffect)(function () {
    }, [list]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "to-do-container", children: [(0, jsx_runtime_1.jsx)("ul", { className: "list", children: list.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(ListItem, { index: index, text: item, remove: remove, update: update }, index)); }) }), (0, jsx_runtime_1.jsx)(AddNew, { add: add })] }));
};
var ListItem = function (props) {
    var index = props.index;
    var _a = (0, react_1.useState)(""), inputVal = _a[0], setInputVal = _a[1];
    (0, react_1.useEffect)(function () {
        console.log(props);
        props.text != null ? setInputVal(props.text) : setInputVal("");
    }, []);
    var inputUpdate = function (e) {
        setInputVal(e.target.value);
        props.update(index, e.target.value);
    };
    return ((0, jsx_runtime_1.jsxs)("li", { className: 'list-item', "data-index": props.index, children: [(0, jsx_runtime_1.jsx)("button", { className: 'list-item__check', children: "/" }), (0, jsx_runtime_1.jsx)("input", { className: 'list-item__text', value: inputVal, onChange: function (e) { return inputUpdate(e); } }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return props.remove(index); }, className: 'list-item__delete', children: "X" })] }, props.key));
};
var AddNew = function (props) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "add-new", children: (0, jsx_runtime_1.jsx)("button", { onClick: function () { return props.add(); }, className: 'btn', children: "Add +" }) }));
};
var AppWrapper = function (props) {
    return ((0, jsx_runtime_1.jsxs)(react_1.StrictMode, { children: [(0, jsx_runtime_1.jsx)(Title, {}), (0, jsx_runtime_1.jsx)(List, {})] }));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render((0, jsx_runtime_1.jsx)(AppWrapper, {}));
