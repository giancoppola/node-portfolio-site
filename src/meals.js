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
var Title = function () {
    return (react_1.default.createElement("h1", { className: 'page-title' }, "Meal Planner"));
};
var PostForm = function () {
    (0, react_1.useEffect)(function () {
        var form = document.querySelector('#post-form');
        var formControls = form.elements;
        var submit = document.querySelector('#post-submit');
        console.log(form.elements);
        submit.addEventListener('click', function (e) {
            e.preventDefault();
            var data = formControls;
            fetch('/api/meals/post/new', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name.value,
                    emoji: data.emoji.value,
                    prepTime: data.prepTime.value,
                    cookTime: data.cookTime.value,
                    feeds: data.feeds.value,
                    veggie: data.veggie.checked,
                    ingredients: data.ingredients.value,
                    recipe: data.recipe.value,
                    link: data.link.value,
                    tags: data.tags.value
                })
            });
        });
    }, []);
    return (react_1.default.createElement("form", { id: "post-form" },
        react_1.default.createElement("label", { htmlFor: "name" }, "Name"),
        react_1.default.createElement("input", { type: "text", name: "name", id: "post-name" }),
        react_1.default.createElement("label", { htmlFor: "emoji" }, "Emoji"),
        react_1.default.createElement("input", { type: "text", name: "emoji", id: "post-emoji" }),
        react_1.default.createElement("label", { htmlFor: "prepTime" }, "Prep Time"),
        react_1.default.createElement("input", { type: "number", name: "prepTime", id: "post-prepTime" }),
        react_1.default.createElement("label", { htmlFor: "cookTime" }, "Cook Time"),
        react_1.default.createElement("input", { type: "number", name: "cookTime", id: "post-cookTime" }),
        react_1.default.createElement("label", { htmlFor: "feeds" }, "Feeds"),
        react_1.default.createElement("input", { type: "number", name: "feeds", id: "post-feeds" }),
        react_1.default.createElement("label", { htmlFor: "veggie" }, "Veggie"),
        react_1.default.createElement("input", { type: "checkbox", role: 'switch', name: "veggie", id: "post-veggie" }),
        react_1.default.createElement("label", { htmlFor: "ingredients" }, "Ingredients"),
        react_1.default.createElement("input", { type: "text", name: "ingredients", id: "post-ingredients" }),
        react_1.default.createElement("label", { htmlFor: "recipe" }, "Recipe"),
        react_1.default.createElement("input", { type: "text", name: "recipe", id: "post-recipe" }),
        react_1.default.createElement("label", { htmlFor: "link" }, "Link"),
        react_1.default.createElement("input", { type: "text", name: "link", id: "post-link" }),
        react_1.default.createElement("label", { htmlFor: "tags" }, "Tags"),
        react_1.default.createElement("input", { type: "text", name: "tags", id: "post-tags" }),
        react_1.default.createElement("button", { id: "post-submit" }, "Submit")));
};
var Navigation = function (props) {
    return (react_1.default.createElement("section", { className: "navigation", id: "navigation" },
        react_1.default.createElement("button", { className: "navigation__btn", id: "search" },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-search.svg", alt: "Magnifying glass icon - search" }),
            "SEARCH"),
        react_1.default.createElement("button", { className: "navigation__btn", id: "planner" },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-menu.svg", alt: "Menu book icon - planner" }),
            "PLANNER"),
        react_1.default.createElement("button", { className: "navigation__btn active", id: "manage" },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-settings.svg", alt: "Cog icon - settings" }),
            "MANAGE")));
};
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Title, null),
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
        }),
        react_1.default.createElement(PostForm, null),
        react_1.default.createElement(Navigation, null)));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
