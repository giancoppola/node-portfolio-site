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
exports.Planner = exports.Days = exports.Day = exports.AddButton = void 0;
var react_1 = __importStar(require("react"));
function getRandomInt(min, max) {
    var minCeiled = Math.ceil(min);
    var maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
var AddButton = function (props) {
    return (react_1.default.createElement("button", { className: "planner-section__add", id: "add-day", onClick: function () { return props.add(); } },
        react_1.default.createElement("img", { src: "../img/icons/material-add-dm-primary.svg", alt: "Add Icon" }),
        "Add"));
};
exports.AddButton = AddButton;
var Day = function (props) {
    return (react_1.default.createElement("li", { className: "day", id: props.id, key: props.id },
        react_1.default.createElement("div", { className: "day__shown" },
            react_1.default.createElement("span", { className: "day__icon" }, props.meal.icon),
            react_1.default.createElement("div", { className: "day__info" },
                react_1.default.createElement("h4", { className: "day__meal-name" }, props.meal.name),
                react_1.default.createElement("div", { className: "day__data" },
                    react_1.default.createElement("p", { className: "day__prep" }, props.meal.prepTime),
                    react_1.default.createElement("p", { className: "day__cook" }, props.meal.cookTime),
                    react_1.default.createElement("p", { className: "day__feeds" }, props.meal.feeds))),
            react_1.default.createElement("div", { className: "day__modify" },
                react_1.default.createElement("button", { className: "btn", id: props.id + 'random', onClick: function () { return console.log('random'); } }, "Random"),
                react_1.default.createElement("button", { className: "btn", id: props.id + 'info', onClick: function () { return console.log('info'); } }, "More Info"),
                react_1.default.createElement("button", { className: "btn", id: props.id + 'delete', onClick: function () { return console.log('delete'); } }, "Delete"))),
        react_1.default.createElement("div", { className: "day__extra" })));
};
exports.Day = Day;
var Days = function () {
    var _a = (0, react_1.useState)('LOADING'), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)([]), meals = _b[0], setMeals = _b[1];
    var addMeal = function () {
        setStatus('LOADING');
        fetch("/api/meals/get/all")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            setMeals(__spreadArray(__spreadArray([], meals, true), [data.meals[getRandomInt(0, data.meals.length - 1)]], false));
            setStatus('READY');
        });
    };
    (0, react_1.useEffect)(function () {
        try {
            setStatus('LOADING');
            fetch('/api/meals/get/all')
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                setMeals(__spreadArray(__spreadArray([], meals, true), [data.meals[getRandomInt(0, data.meals.length - 1)]], false));
                setStatus('READY');
            });
        }
        catch (e) {
            setStatus('ERROR');
        }
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "days", id: "days" },
            react_1.default.createElement("ul", { className: "days__list", id: "days-list" },
                meals.length == 0 && react_1.default.createElement(react_1.default.Fragment, null, "LOADING"),
                meals.length > 0 && meals.map(function (meal, index) {
                    return (react_1.default.createElement(exports.Day, { meal: meal, id: "meal-".concat(index) }));
                }))),
        react_1.default.createElement(exports.AddButton, { add: addMeal })));
};
exports.Days = Days;
var Planner = function () {
    return (react_1.default.createElement("section", { className: "narrow-container planner-section", id: "planner-section" },
        react_1.default.createElement(exports.Days, null)));
};
exports.Planner = Planner;
