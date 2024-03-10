"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealModel = exports.MealSchema = void 0;
var mongoose = require('mongoose');
// End of Interfaces & Types
// MongoDB
exports.MealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    veggie: { type: Boolean, required: true },
    ingredients: { type: [String], required: true },
    recipe: { type: [String], required: true },
    link: { type: String, required: false },
    tags: { type: [String], required: true },
});
exports.MealModel = mongoose.model('Meal', exports.MealSchema);
// End MongoDB
// Redux
// End of Redux
