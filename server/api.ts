import { Express, Response, Request, NextFunction, Router } from "express";
const express = require('express')
export const router: Router = express.Router();

import { Mongoose } from "mongoose";
const mongoose: Mongoose = require('mongoose');
// MongoDB model imports
import {UserModel, UserSchema, iUser} from './user';

router.use("/users", express.json());
router.route('/users')
.get( async (req: Request, res: Response, next: NextFunction) => {
    let users: Array<Object> = await UserModel.find().select('-pass -_id -__v').exec();
    console.log(users.length);
    res.json({
        users
    })
    next()
})
.post( async (req: Request, res: Response, next: NextFunction) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.pass;
    let user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
    })
    await user.save();
    res.json({
        user
    })
    next()
})