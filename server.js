"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.get("*", function (req, res, next) {
    console.log(req.method, req.url, res.status);
    next();
});
app.get("/", function (req, res) {
    res.send("OK");
});
var listener = app.listen(process.env.PORT || 3000, function () {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
});
