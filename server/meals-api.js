"use strict";
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
exports.router = void 0;
var express = require('express');
exports.router = express.Router();
var mongoose = require('mongoose');
// MongoDB model imports
var meals_1 = require("./meals");
exports.router.use("/*", express.json());
exports.router.get('/get/all', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var meals, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, meals_1.MealModel.find().exec()];
            case 1:
                meals = _a.sent();
                console.log(meals.length);
                res.json({
                    meals: meals
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.send(e_1.message);
                return [3 /*break*/, 3];
            case 3:
                next();
                return [2 /*return*/];
        }
    });
}); });
exports.router.post('/post/new', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var meal, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                meal = new meals_1.MealModel({
                    name: req.body.name,
                    prepTime: req.body.prepTime,
                    cookTime: req.body.cookTime,
                    veggie: req.body.veggie,
                    ingredients: req.body.ingredients,
                    recipe: req.body.recipe,
                    link: req.body.link,
                    tags: req.body.tags
                });
                return [4 /*yield*/, meal.save()];
            case 2:
                _a.sent();
                res.json({
                    meal: meal
                });
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.send(e_2.message);
                return [3 /*break*/, 4];
            case 4:
                next();
                return [2 /*return*/];
        }
    });
}); });
