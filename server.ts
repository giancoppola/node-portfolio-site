const express = require('express');
import {Express, NextFunction, Request, Response} from 'express';
const cors = require('cors');
const app = express();
app.use(cors());

app.get("*", (req: Request, res:Response, next: NextFunction) => {
    console.log(req.method, req.url, res.statusCode, res.statusMessage)
    next();
})

app.get("/", (req: Request, res: Response) => {
    res.send("OK")
})

const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})