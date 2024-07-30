"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var SearchForm = function (props) {
    var _a = (0, react_1.useState)(''), keyword = _a[0], setKeyword = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "search", children: [(0, jsx_runtime_1.jsx)("button", { className: "search__clear", id: "clear-search", onClick: function () { return setKeyword(''); }, children: (0, jsx_runtime_1.jsx)("img", { src: "../img/icons/material-x.svg", alt: "Clear" }) }), (0, jsx_runtime_1.jsx)("input", { value: keyword, className: 'search__input', type: "text", name: "meal-name", id: "meal-name", onChange: function (e) { return setKeyword(e.target.value); }, onKeyUp: function (e) { e.key == "Enter" ? props.fetchMeals(keyword) : e; } }), (0, jsx_runtime_1.jsx)("button", { className: "search__btn", id: "search-meals", onClick: function () { return props.fetchMeals(keyword); }, children: (0, jsx_runtime_1.jsx)("img", { src: "../img/icons/material-arrow-forward.svg", alt: "Search" }) })] }));
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
    return ((0, jsx_runtime_1.jsxs)("section", { className: 'narrow-container search-section', id: 'search-section', children: [(0, jsx_runtime_1.jsx)(SearchForm, { fetchMeals: fetchMeals }), (0, jsx_runtime_1.jsxs)("div", { className: 'results', children: [status == 'ERROR' && (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "ERROR" }), status == "LOADING" && (0, jsx_runtime_1.jsx)("p", { children: "LOADING" }), status == 'READY' &&
                        meals.meals.map(function (meal) {
                            return (
                            //@ts-ignore
                            (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { children: meal.emoji }), (0, jsx_runtime_1.jsx)("p", { children: meal.name }), (0, jsx_runtime_1.jsx)("p", { children: meal.cookTime }), (0, jsx_runtime_1.jsx)("p", { children: meal.prepTime }), (0, jsx_runtime_1.jsx)("p", { children: meal.veggie }), (0, jsx_runtime_1.jsx)("ul", { children: meal.ingredients.map(function (ing) {
                                            return ((0, jsx_runtime_1.jsx)("li", { children: ing }));
                                        }) }), (0, jsx_runtime_1.jsx)("a", { href: meal.link, children: meal.link })] }, meal._id));
                        })] })] }));
};
exports.Search = Search;
