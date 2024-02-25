"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
exports.router = express.Router();
const mongoose = require('mongoose');
// MongoDB model imports
const models_1 = require("./models");
exports.router.use("/users", express.json());
exports.router.route('/users')
    .get(async (req, res, next) => {
    let users = await models_1.User.Model.find().select('-pass -_id -__v').exec();
    console.log(users.length);
    res.json({
        users
    });
    next();
})
    .post(async (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let pass = req.body.pass;
    let user = new models_1.User.Model({
        firstName: firstName,
        lastName: lastName,
        email: email,
        pass: pass
    });
    await user.save();
    res.json({
        user
    });
    next();
});
