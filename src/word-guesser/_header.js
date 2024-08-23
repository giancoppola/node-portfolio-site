"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var _floating_options_1 = require("./_floating_options");
var Header = function (props) {
    var _a;
    return ((0, jsx_runtime_1.jsxs)(material_1.AppBar, { position: 'static', color: 'primary', sx: { padding: (_a = {}, _a[theme.breakpoints.down('md')] = '2rem 1rem 1rem', _a) }, children: [(0, jsx_runtime_1.jsx)(_floating_options_1.FloatingOptions, { darkMode: props.darkMode, setDarkMode: props.setDarkMode }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'h1', fontWeight: 'bold', textAlign: 'center', children: "BattleWords" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: 'subtitle2', fontWeight: 'bold', textAlign: 'center', children: "".concat(props.userCount, " player").concat(props.userCount > 1 ? 's are' : ' is', " online") })] }));
};
exports.Header = Header;
