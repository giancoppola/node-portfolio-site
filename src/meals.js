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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("react-dom/client");
var Title = function () {
    return (react_1.default.createElement("h1", { className: 'page-title' }, "Meal Planner"));
};
var Planner = function () {
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
var Manage = function () {
    return (react_1.default.createElement(PostForm, null));
};
var PostForm = function () {
    var _a = (0, react_1.useState)(''), message = _a[0], setMessage = _a[1];
    (0, react_1.useEffect)(function () {
        var form = document.querySelector('#post-form');
        var formControls = form.elements;
        var submit = document.querySelector('#post-submit');
        console.log(form.elements);
        submit.addEventListener('click', function (e) {
            e.preventDefault();
            formValidation(formControls);
        });
    }, []);
    var formMessage = function (text, type) {
        var message = document.querySelector('#post-message');
        message.classList.remove('success', 'error');
        type === "SUCCESS" ? message.classList.add('success') : message.classList.add('error');
        setMessage(text);
    };
    var formValidation = function (formControls) { return __awaiter(void 0, void 0, void 0, function () {
        var pass, data, valid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pass = false;
                    data = formControls;
                    return [4 /*yield*/, fetch("/api/meals/get/pass?pass=".concat(data.pass.value))
                            .then(function (res) { return res.text(); })
                            .then(function (data) { if (data === 'true') {
                            pass = true;
                        } })];
                case 1:
                    _a.sent();
                    if (pass) {
                        valid = true;
                        !data.name.value ? (formMessage('Meal must have a name!', 'ERROR'), valid = false) : data;
                        !data.emoji.value ? (formMessage('Meal must have an icon!', 'ERROR'), valid = false) : data;
                        !data.prepTime.value ? (formMessage('Please add the prep time!', 'ERROR'), valid = false) : data;
                        !data.cookTime.value ? (formMessage('Please add the cook time!', 'ERROR'), valid = false) : data;
                        !data.feeds.value ? (formMessage('Please add how many people it feeds!', 'ERROR'), valid = false) : data;
                        !data.ingredients.value ? (formMessage('Please add the ingredients!', 'ERROR'), valid = false) : data;
                        !data.recipe.value ? (formMessage('Please add the recipe!', 'ERROR'), valid = false) : data;
                        !data.tags.value ? (formMessage('Please add at least one tag!', 'ERROR'), valid = false) : data;
                        if (valid) {
                            try {
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
                                })
                                    .then(function (res) { return res.json(); })
                                    .then(function (data) {
                                    if (data.error) {
                                        formMessage(data.error, 'ERROR');
                                    }
                                    else {
                                        formMessage('Meal added successfully!', 'SUCCESS');
                                    }
                                });
                            }
                            catch (e) {
                                formMessage(e.message, 'ERROR');
                            }
                        }
                    }
                    else {
                        formMessage('Wrong password!', 'ERROR');
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1.default.createElement("form", { className: 'manage-form', id: "post-form" },
        react_1.default.createElement("label", { htmlFor: "name" }, "Name"),
        react_1.default.createElement("input", { type: "text", name: "name", id: "post-name", required: true }),
        react_1.default.createElement("label", { htmlFor: "emoji" }, "Emoji"),
        react_1.default.createElement("input", { type: "text", name: "emoji", id: "post-emoji", required: true }),
        react_1.default.createElement("label", { htmlFor: "prepTime" }, "Prep Time"),
        react_1.default.createElement("input", { type: "number", name: "prepTime", id: "post-prepTime", required: true }),
        react_1.default.createElement("label", { htmlFor: "cookTime" }, "Cook Time"),
        react_1.default.createElement("input", { type: "number", name: "cookTime", id: "post-cookTime", required: true }),
        react_1.default.createElement("label", { htmlFor: "feeds" }, "Feeds"),
        react_1.default.createElement("input", { type: "number", name: "feeds", id: "post-feeds", required: true }),
        react_1.default.createElement("label", { htmlFor: "veggie" }, "Veggie"),
        react_1.default.createElement("input", { type: "checkbox", role: 'switch', name: "veggie", id: "post-veggie" }),
        react_1.default.createElement("label", { htmlFor: "ingredients" }, "Ingredients"),
        react_1.default.createElement("input", { type: "text", name: "ingredients", id: "post-ingredients", required: true }),
        react_1.default.createElement("label", { htmlFor: "recipe" }, "Recipe"),
        react_1.default.createElement("input", { type: "text", name: "recipe", id: "post-recipe", required: true }),
        react_1.default.createElement("label", { htmlFor: "link" }, "Link"),
        react_1.default.createElement("input", { type: "text", name: "link", id: "post-link" }),
        react_1.default.createElement("label", { htmlFor: "tags" }, "Tags"),
        react_1.default.createElement("input", { type: "text", name: "tags", id: "post-tags", required: true }),
        react_1.default.createElement("label", { htmlFor: "pass" }, "Password"),
        react_1.default.createElement("input", { type: "password", name: "pass", id: "post-pass", required: true }),
        react_1.default.createElement("button", { id: "post-submit" }, "Submit"),
        react_1.default.createElement("p", { className: 'message', id: "post-message" }, message)));
};
var Navigation = function (props) {
    return (react_1.default.createElement("section", { className: "navigation", id: "navigation" },
        react_1.default.createElement(react_router_dom_1.Link, { className: 'navigation__btn', id: "search", to: 'meal-planner/search' },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-search.svg", alt: "Magnifying glass icon - search" }),
            "SEARCH"),
        react_1.default.createElement(react_router_dom_1.Link, { className: 'navigation__btn', id: "planner", to: '/meal-planner' },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-menu.svg", alt: "Menu book icon - planner" }),
            "PLANNER"),
        react_1.default.createElement(react_router_dom_1.Link, { className: 'navigation__btn', id: "manage", to: 'meal-planner/manage/add' },
            react_1.default.createElement("img", { className: 'navigation__btn--icon', src: "../img/icons/material-settings.svg", alt: "Cog icon - settings" }),
            "MANAGE")));
};
var AppWrapper = function (props) {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Title, null),
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner', element: react_1.default.createElement(Planner, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage', element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/meal-planner/manage/add" }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage/add', element: react_1.default.createElement(Manage, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/search', element: react_1.default.createElement(Planner, null) })),
        react_1.default.createElement(Navigation, null)));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
