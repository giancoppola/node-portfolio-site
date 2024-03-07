import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
export const router: Router = express.Router();

import { Mongoose } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import {MealModel, MealSchema, iMeal} from './meals';

router.use("/*", express.json());
router.route('/new')
.get( async (req: Request, res: Response, next: NextFunction) => {
    let meals: Array<Object> = await MealModel.find().exec();
    console.log(meals.length);
    res.json({
        meals
    })
    next()
})
.post( async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    let meal = new MealModel({
        name: req.body.name,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        veggie: req.body.veggie,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        link: req.body.link,
        tags: req.body.tags
    })
    await meal.save();
    res.json({
        meal
    })
    next()
})