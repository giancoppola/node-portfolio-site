"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors = require('cors');
var app = (0, express_1.default)();
app.use(cors());
app.get("/", function (req, res) {
    res.send("OK");
});
var listener = app.listen(process.env.PORT || 3000, function () {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
});
