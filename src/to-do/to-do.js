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
var react_1 = __importStar(require("react"));
var client_1 = require("react-dom/client");
var Title = function () {
    return (react_1.default.createElement("h1", { className: 'page-title' }, "To Do List"));
};
var List = function (props) {
    var _a = (0, react_1.useState)(["Try adding your own"]), list = _a[0], setList = _a[1];
    var add = function () {
        var newList = __spreadArray(__spreadArray([], list, true), [""], false);
        setList(newList);
    };
    var remove = function (index) {
        console.log(list);
        console.log(list[index]);
        console.log("removing ", index);
        var newList = __spreadArray([], list, true);
        newList.splice(index, 1);
        console.log(newList);
        setList(newList);
    };
    return (react_1.default.createElement("div", { className: "to-do-container" },
        react_1.default.createElement("ul", { className: "list" }, list.map(function (item, index) { return (react_1.default.createElement(ListItem, { index: index, key: index, text: item, remove: remove })); })),
        react_1.default.createElement(AddNew, { add: add })));
};
var ListItem = function (props) {
    var index = props.index;
    (0, react_1.useEffect)(function () {
        console.log(props);
    }, []);
    return (react_1.default.createElement("li", { className: 'list-item', "data-index": props.index, key: props.key },
        react_1.default.createElement("button", { className: 'list-item__check' }, "/"),
        react_1.default.createElement("input", { className: 'list-item__text', value: props.text }),
        react_1.default.createElement("button", { onClick: function () { return props.remove(index); }, className: 'list-item__delete' }, "X")));
};
var AddNew = function (props) {
    return (react_1.default.createElement("div", { className: "add-new" },
        react_1.default.createElement("button", { onClick: function () { return props.add(); }, className: 'btn' }, "Add +")));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_1.StrictMode, null,
        react_1.default.createElement(Title, null),
        react_1.default.createElement(List, null)));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
