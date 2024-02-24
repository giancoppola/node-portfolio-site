import express, {Express, Request, Response} from 'express';
const cors = require('cors');
const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("OK")
})

const listener = app.listen(process.env.PORT || 3000, () => {
    // console.log('Your app is listening on port 3000 ' + listener.address().port)
})