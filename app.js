const express = require("express");
const cors = require("cors");
var path = require('path');
require("dotenv").config();
const postRoute = require("./routes/post.route.js")

const app = express();

app.use(
    cors({
        "Access-Control-Allow-Origin": "*",
        credentials: true, //쿠키정책
        optionsSuccessStatus: 200
        //   exposedHeaders: ["token"],
    })
);

app.use(express.json());
app.use(express.static(path.join(__dirname,'uploads')))
app.use('/',postRoute );


app.listen(3001, () => {
    console.log(` http://localhost:3001 `);
})