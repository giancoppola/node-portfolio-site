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
exports.Search = void 0;
var react_1 = __importStar(require("react"));
var SearchForm = function (props) {
    var _a = (0, react_1.useState)(''), keyword = _a[0], setKeyword = _a[1];
    return (react_1.default.createElement("div", { className: "search" },
        react_1.default.createElement("button", { className: "search__clear", id: "clear-search", onClick: function () { return setKeyword(''); } },
            react_1.default.createElement("img", { src: "../img/icons/material-x.svg", alt: "Clear" })),
        react_1.default.createElement("input", { value: keyword, className: 'search__input', type: "text", name: "meal-name", id: "meal-name", onChange: function (e) { return setKeyword(e.target.value); }, onKeyUp: function (e) { e.key == "Enter" ? props.fetchMeals(keyword) : e; } }),
        react_1.default.createElement("button", { className: "search__btn", id: "search-meals", onClick: function () { return props.fetchMeals(keyword); } },
            react_1.default.createElement("img", { src: "../img/icons/material-arrow-forward.svg", alt: "Search" }))));
};
var Search = function () {
    var _a = (0, react_1.useState)('LOADING'), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)({ meals: [] }), meals = _b[0], setMeals = _b[1];
    var fetchMeals = function (keyword) {
        console.log(keyword);
        setStatus('LOADING');
        fetch("/api/meals/get/all?name=".concat(keyword))
            .then(function (res) { return res.json(); })
            .then(function (data) {
            console.log(data);
            setMeals(data);
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
                setMeals(data);
                setStatus('READY');
            });
        }
        catch (e) {
            setStatus('ERROR');
        }
    }, []);
    return (react_1.default.createElement("section", { className: 'narrow-container search-section', id: 'search-section' },
        react_1.default.createElement(SearchForm, { fetchMeals: fetchMeals }),
        react_1.default.createElement("div", { className: 'results' },
            status == 'ERROR' && react_1.default.createElement(react_1.default.Fragment, null, "ERROR"),
            status == "LOADING" && react_1.default.createElement("p", null, "LOADING"),
            status == 'READY' &&
                meals.meals.map(function (meal) {
                    return (
                    //@ts-ignore
                    react_1.default.createElement("div", { key: meal._id },
                        react_1.default.createElement("p", null, meal.emoji),
                        react_1.default.createElement("p", null, meal.name),
                        react_1.default.createElement("p", null, meal.cookTime),
                        react_1.default.createElement("p", null, meal.prepTime),
                        react_1.default.createElement("p", null, meal.veggie),
                        react_1.default.createElement("ul", null, meal.ingredients.map(function (ing) {
                            return (react_1.default.createElement("li", null, ing));
                        })),
                        react_1.default.createElement("a", { href: meal.link }, meal.link)));
                }))));
};
exports.Search = Search;
