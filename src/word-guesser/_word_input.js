"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var WordInput = function (props) {
    var _a = (0, react_1.useState)(""), errMsg = _a[0], setErrMsg = _a[1];
    var _b = (0, react_1.useState)(""), letterOne = _b[0], setLetterOne = _b[1];
    var _c = (0, react_1.useState)(""), letterTwo = _c[0], setLetterTwo = _c[1];
    var _d = (0, react_1.useState)(""), letterThree = _d[0], setLetterThree = _d[1];
    var _e = (0, react_1.useState)(""), letterFour = _e[0], setLetterFour = _e[1];
    var HandleChange = function (value, element) {
        var _a, _b, _c;
        switch (element) {
            case 'letter-one':
                setLetterOne(value);
                (_a = document.getElementById("letter-two")) === null || _a === void 0 ? void 0 : _a.focus();
                break;
            case 'letter-two':
                setLetterTwo(value);
                (_b = document.getElementById("letter-three")) === null || _b === void 0 ? void 0 : _b.focus();
                break;
            case 'letter-three':
                setLetterThree(value);
                (_c = document.getElementById("letter-four")) === null || _c === void 0 ? void 0 : _c.focus();
                break;
            case 'letter-four':
                setLetterFour(value);
                break;
        }
    };
    var UpdateWord = function () {
        var word = letterOne + letterTwo + letterThree + letterFour;
        if (word.length === 4) {
            props.setWord(word);
            setErrMsg('');
            setLetterOne('');
            setLetterTwo('');
            setLetterThree('');
            setLetterFour('');
        }
        else {
            setErrMsg('Please provide a four letter word!');
        }
    };
    (0, react_1.useEffect)(function () { setErrMsg(''); }, [letterOne, letterTwo, letterThree, letterFour]);
    var InputStyles = { width: '5rem', height: '5rem', fontSize: '5rem', textAlign: 'center' };
    var InputProps = { maxLength: 1, style: InputStyles };
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: 'flex', gap: '1rem', children: [(0, jsx_runtime_1.jsx)(material_1.TextField, { id: 'letter-one', inputProps: InputProps, value: letterOne, onChange: function (e) { return HandleChange(e.target.value, 'letter-one'); } }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: 'letter-two', inputProps: InputProps, value: letterTwo, onChange: function (e) { return HandleChange(e.target.value, 'letter-two'); } }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: 'letter-three', inputProps: InputProps, value: letterThree, onChange: function (e) { return HandleChange(e.target.value, 'letter-three'); } }), (0, jsx_runtime_1.jsx)(material_1.TextField, { id: 'letter-four', inputProps: InputProps, value: letterFour, onChange: function (e) { return HandleChange(e.target.value, 'letter-four'); } })] }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: 'outlined', onClick: UpdateWord, color: errMsg ? 'error' : 'primary', children: "Submit" }), (0, jsx_runtime_1.jsx)(material_1.Typography, { sx: { minHeight: '1.5rem', color: 'red' }, variant: 'subtitle2', fontWeight: 'bold', children: errMsg })] }));
};
exports.WordInput = WordInput;
