"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveQuotes = void 0;
var RemoveQuotes = function (input) {
    return input.replace(/"/gm, "");
};
exports.RemoveQuotes = RemoveQuotes;
