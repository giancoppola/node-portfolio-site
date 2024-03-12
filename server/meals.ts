import { Model } from "mongoose";
const mongoose = require('mongoose');

// Interfaces & Types
export interface iMeal {
    name: string;
    emoji: string;
    prepTime: number;
    cookTime: number;
    feeds: number;
    veggie: boolean;
    ingredients: Array<string>;
    recipe: Array<string>;
    link: string;
    tags: Array<string>;
}
// End of Interfaces & Types

// MongoDB
export const MealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emoji: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    feeds: { type: Number, required: true },
    veggie: { type: Boolean, required: true },
    ingredients: { type: [String], required: true },
    recipe: { type: [String], required: true },
    link: { type: String, required: false },
    tags: { type: [String], required: true },
})
export const MealModel: Model<Object> = mongoose.model('Meal', MealSchema);
// End MongoDB

// Redux

// End of Redux