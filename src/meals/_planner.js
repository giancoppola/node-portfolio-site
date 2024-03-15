"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = exports.Days = exports.AddButton = void 0;
var react_1 = __importDefault(require("react"));
var AddButton = function () {
    return (react_1.default.createElement("button", { className: "planner-section__add", id: "add-day", onClick: function () { return console.log('add'); } },
        react_1.default.createElement("img", { src: "../img/icons/material-add-dm-primary.svg", alt: "Add Icon" }),
        "Add"));
};
exports.AddButton = AddButton;
var Days = function () {
    return (react_1.default.createElement("div", { className: "days", id: "days" },
        react_1.default.createElement("ul", { className: "days__list", id: "days-list" })));
};
exports.Days = Days;
var Planner = function () {
    return (react_1.default.createElement("section", { className: "narrow-container planner-section", id: "planner" },
        react_1.default.createElement("h2", null, "planner"),
        react_1.default.createElement(exports.Days, null),
        react_1.default.createElement(exports.AddButton, null)));
};
exports.Planner = Planner;
