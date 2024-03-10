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
var client_1 = require("react-dom/client");
var AppWrapper = function (props) {
    var _a = (0, react_1.useState)({ meals: [] }), meals = _a[0], setMeals = _a[1];
    (0, react_1.useEffect)(function () {
        fetch('/api/meals/get/all')
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            setMeals(data);
        });
        var btn = document.querySelector('#update-meals');
        btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function (e) {
            var search = document.querySelector('#meal-name').value;
            fetch("/api/meals/get/all?name=".concat(search))
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                setMeals(data);
            });
        });
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("input", { type: "text", name: "meal-name", id: "meal-name" }),
        react_1.default.createElement("button", { id: "update-meals" }, "Search Meals"),
        meals.meals.map(function (meal) {
            return (
            //@ts-ignore
            react_1.default.createElement("div", { key: meal._id },
                react_1.default.createElement("p", null, meal.name),
                react_1.default.createElement("p", null, meal.cookTime),
                react_1.default.createElement("p", null, meal.prepTime),
                react_1.default.createElement("p", null, meal.veggie),
                react_1.default.createElement("ul", null, meal.ingredients.map(function (ing) {
                    return (react_1.default.createElement("li", null, ing));
                })),
                react_1.default.createElement("a", { href: meal.link }, meal.link)));
        })));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
