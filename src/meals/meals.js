"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("react-dom/client");
var _manage_1 = require("./_manage");
var _planner_1 = require("./_planner");
var _search_1 = require("./_search");
var Title = function () {
    return ((0, jsx_runtime_1.jsx)("h1", { className: 'page-title', children: "Meal Planner" }));
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
    return ((0, jsx_runtime_1.jsxs)("section", { className: "navigation", id: "navigation", children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: 'navigation__btn', id: "search", to: 'meal-planner/search', children: [(0, jsx_runtime_1.jsx)("img", { className: 'navigation__btn--icon', src: "../img/icons/material-search.svg", alt: "Magnifying glass icon - search" }), "SEARCH"] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: 'navigation__btn', id: "planner", to: '/meal-planner', children: [(0, jsx_runtime_1.jsx)("img", { className: 'navigation__btn--icon', src: "../img/icons/material-menu.svg", alt: "Menu book icon - planner" }), "PLANNER"] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { className: 'navigation__btn', id: "manage", to: 'meal-planner/manage/add', children: [(0, jsx_runtime_1.jsx)("img", { className: 'navigation__btn--icon', src: "../img/icons/material-settings.svg", alt: "Cog icon - settings" }), "MANAGE"] })] }));
};
var AppWrapper = function (props) {
    return ((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(Title, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner', element: (0, jsx_runtime_1.jsx)(_planner_1.Planner, {}) }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Route, { path: '/meal-planner/manage', element: (0, jsx_runtime_1.jsx)(_manage_1.Manage, {}), children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { index: true, element: (0, jsx_runtime_1.jsx)(_manage_1.PostForm, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner/manage/add', element: (0, jsx_runtime_1.jsx)(_manage_1.PostForm, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner/manage/edit', element: (0, jsx_runtime_1.jsx)(_manage_1.PostForm, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner/manage/delete', element: (0, jsx_runtime_1.jsx)(_manage_1.PostForm, {}) })] }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner/search', element: (0, jsx_runtime_1.jsx)(_search_1.Search, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/meal-planner/*', element: (0, jsx_runtime_1.jsx)(_planner_1.Planner, {}) })] }), (0, jsx_runtime_1.jsx)(Navigation, {})] }) }));
};
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container);
root.render((0, jsx_runtime_1.jsx)(AppWrapper, {}));
