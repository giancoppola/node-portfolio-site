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
exports.Planner = exports.Days = exports.Day = exports.AddButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function getRandomInt(min, max) {
    var minCeiled = Math.ceil(min);
    var maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
var AddButton = function (props) {
    return ((0, jsx_runtime_1.jsxs)("button", { className: "planner-section__add", id: "add-day", onClick: function () { return props.add(); }, children: [(0, jsx_runtime_1.jsx)("img", { src: "../img/icons/material-add-dm-primary.svg", alt: "Add Icon" }), "Add"] }));
};
exports.AddButton = AddButton;
var Day = function (props) {
    return ((0, jsx_runtime_1.jsxs)("li", { className: "day", id: props.id, children: [(0, jsx_runtime_1.jsxs)("h2", { children: ["Day ", props.count] }), (0, jsx_runtime_1.jsxs)("div", { className: "day__tile", children: [(0, jsx_runtime_1.jsxs)("div", { className: "day__shown", children: [(0, jsx_runtime_1.jsx)("span", { className: "day__icon", children: props.meal.icon }), (0, jsx_runtime_1.jsxs)("div", { className: "day__info", children: [(0, jsx_runtime_1.jsx)("h4", { className: "day__meal-name", children: props.meal.name }), (0, jsx_runtime_1.jsxs)("div", { className: "day__data", children: [(0, jsx_runtime_1.jsxs)("p", { className: "day__prep", children: ["Prep Time: ", props.meal.prepTime] }), (0, jsx_runtime_1.jsxs)("p", { className: "day__cook", children: ["Cook Time: ", props.meal.cookTime] }), (0, jsx_runtime_1.jsxs)("p", { className: "day__feeds", children: ["Feeds: ", props.meal.feeds] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "day__modify", children: [(0, jsx_runtime_1.jsx)("button", { className: "btn", id: props.id + 'random', onClick: props.getRandom, children: "Random" }), (0, jsx_runtime_1.jsx)("button", { className: "btn", id: props.id + 'info', onClick: function () { return console.log('info'); }, children: "More Info" }), (0, jsx_runtime_1.jsx)("button", { className: "btn", id: props.id + 'delete', onClick: props.remove, children: "Delete" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "day__extra" })] })] }, props.id));
};
exports.Day = Day;
var Days = function (props) {
    var _a = (0, react_1.useState)('LOADING'), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)([]), meals = _b[0], setMeals = _b[1];
    var _c = (0, react_1.useState)(0), days = _c[0], setDays = _c[1];
    var removeMeal = function (ind) {
        var newMeals = __spreadArray([], meals, true);
        newMeals.splice(ind, 1);
        setMeals(newMeals);
        localStorage.MEALS = JSON.stringify(newMeals);
    };
    var updateMeal = function (type, ind) {
        setStatus('LOADING');
        try {
            fetch("/api/meals/get/all")
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                var newMeals = __spreadArray([], meals, true);
                newMeals[ind] = data.meals[getRandomInt(0, data.meals.length - 1)];
                console.log(newMeals);
                setMeals(newMeals);
                setStatus('READY');
                localStorage.MEALS = JSON.stringify(newMeals);
            });
        }
        catch (e) {
            setStatus('ERROR');
        }
    };
    var addMeal = function () {
        console.log(meals.length);
        if (meals.length < 7) {
            setStatus('LOADING');
            try {
                fetch("/api/meals/get/all")
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    console.log(data);
                    var newMeals = __spreadArray(__spreadArray([], meals, true), [data.meals[getRandomInt(0, data.meals.length - 1)]], false);
                    setMeals(newMeals);
                    setStatus('READY');
                    localStorage.MEALS = JSON.stringify(newMeals);
                });
            }
            catch (e) {
                setStatus('ERROR');
            }
        }
    };
    (0, react_1.useEffect)(function () {
        if (localStorage.MEALS) {
            setMeals(JSON.parse(localStorage.MEALS));
        }
        else {
            try {
                setStatus('LOADING');
                fetch('/api/meals/get/all')
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    console.log(data);
                    var newMeals = __spreadArray(__spreadArray([], meals, true), [data.meals[getRandomInt(0, data.meals.length - 1)]], false);
                    setMeals(newMeals);
                    setStatus('READY');
                    localStorage.MEALS = JSON.stringify(newMeals);
                });
            }
            catch (e) {
                setStatus('ERROR');
            }
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "days", id: "days", children: (0, jsx_runtime_1.jsxs)("ul", { className: "days__list", id: "days-list", children: [meals.length == 0 && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "LOADING" }), meals.length > 0 && meals.map(function (meal, index) {
                            return ((0, jsx_runtime_1.jsx)(exports.Day, { meal: meal, id: "meal-".concat(index), count: index + 1, getRandom: function () { updateMeal('RANDOM', index); }, remove: function () { removeMeal(index); } }));
                        })] }) }), meals.length < 7 && (0, jsx_runtime_1.jsx)(exports.AddButton, { add: addMeal, days: days })] }));
};
exports.Days = Days;
var Planner = function () {
    return ((0, jsx_runtime_1.jsx)("section", { className: "narrow-container planner-section", id: "planner-section", children: (0, jsx_runtime_1.jsx)(exports.Days, {}) }));
};
exports.Planner = Planner;
