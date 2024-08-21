"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusDialog = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var StatusDialog = function (props) {
    return ((0, jsx_runtime_1.jsxs)(material_1.Dialog, { open: props.show, children: [(0, jsx_runtime_1.jsx)(material_1.DialogTitle, { children: props.msg }), (0, jsx_runtime_1.jsx)(material_1.DialogActions, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { onClick: function () { return props.setShow(false); }, children: "Close" }) })] }));
};
exports.StatusDialog = StatusDialog;
