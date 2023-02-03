const test = require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");
const {allInterval} = require("./helper");
const {db} = require("./models");
const {getData} = require("./controllers/getData");
const corsOptions = {
    origin: '*',
}

app.use(express.json());

app.use(cors(corsOptions));


app.get("/clearData", async function (req, res) {
    await db.Video.destroy({
        where: {},
        truncate: true
    })
    res.json({
        "success": 1
    })
})
app.get("/", getData)


app.listen(process.env.PORT, () => {
    allInterval()
    console.log(`FAMPAY Assignment running on ${process.env.PORT}!`)
});