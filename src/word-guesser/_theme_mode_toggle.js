"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModeToggle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var material_1 = require("@mui/material");
var ThemeModeToggle = function (props) {
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { position: 'absolute', top: '0', left: '0', children: (0, jsx_runtime_1.jsxs)(material_1.IconButton, { onClick: function () { return props.setDarkMode(!props.darkMode); }, children: [props.darkMode && (0, jsx_runtime_1.jsx)(icons_material_1.Brightness7, {}), !props.darkMode && (0, jsx_runtime_1.jsx)(icons_material_1.Brightness4, {})] }) }));
};
exports.ThemeModeToggle = ThemeModeToggle;
