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
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("react-dom/client");
var _manage_1 = require("./_manage");
var _planner_1 = require("./_planner");
var _search_1 = require("./_search");
var Title = function () {
    return (react_1.default.createElement("h1", { className: 'page-title' }, "Meal Planner"));
};
var Navigation = function (props) {
    var location = (0, react_router_dom_1.useLocation)();
    (0, react_1.useEffect)(function () {
        console.log(location);
        var search = document.querySelector('#search');
        var planner = document.querySelector('#planner');
        var manage = document.querySelector('#manage');
        if (location.pathname.startsWith('/meal-planner/search')) {
            search.classList.add('active');
            planner.classList.remove('active');
            manage.classList.remove('active');
        }
        else if (location.pathname.startsWith('/meal-planner/manage')) {
            search.classList.remove('active');
            planner.classList.remove('active');
            manage.classList.add('active');
        }
        else if (location.pathname.startsWith('/meal-planner')) {
            search.classList.remove('active');
            planner.classList.add('active');
            manage.classList.remove('active');
        }
    }, [location]);
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
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner', element: react_1.default.createElement(_planner_1.Planner, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage', element: react_1.default.createElement(_manage_1.Manage, null) },
                react_1.default.createElement(react_router_dom_1.Route, { index: true, element: react_1.default.createElement(_manage_1.PostForm, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage/add', element: react_1.default.createElement(_manage_1.PostForm, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage/edit', element: react_1.default.createElement(_manage_1.PostForm, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/manage/delete', element: react_1.default.createElement(_manage_1.PostForm, null) })),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/search', element: react_1.default.createElement(_search_1.Search, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/meal-planner/*', element: react_1.default.createElement(_planner_1.Planner, null) })),
        react_1.default.createElement(Navigation, null)));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(AppWrapper, null));
