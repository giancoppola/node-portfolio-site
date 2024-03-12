import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
export const router: Router = express.Router();

import { Mongoose } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import {MealModel, MealSchema, iMeal} from './meals';

router.use("/*", express.json());
router.get('/get/all', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.query);
        let options: Record<string, any> = {};
        req.query.name ? options.name = {$regex : req.query.name} : options;
        req.query.tags ? options.tags = {$all: req.query.tags} : options;
        let meals: Array<Object> = await MealModel.find(options);
        console.log(meals.length);
        res.json({
            meals
        })
    }
    catch(e){
        res.send((e as Error).message);
    }
    next()
})
router.get('/get/pass', async (req: Request, res: Response, next: NextFunction) => {
    if(req.query.pass && req.query.pass === process.env.MONGO_PW){
        res.send('true');
    }
    else {
        res.send('false');
    }
    next()
})
router.post('/post/new', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    try {
        let meal = new MealModel({
            name: req.body.name,
            emoji: req.body.emoji,
            prepTime: req.body.prepTime,
            cookTime: req.body.cookTime,
            feeds: req.body.feeds,
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
    }
    catch(e){
        res.json({
            error: (e as Error).message
        });
    }
    next()
})