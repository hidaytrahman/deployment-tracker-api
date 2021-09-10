const express = require("express");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;

// body parser
app.use(express.json());


// DB Config
require('./src/config/DB')();

app.listen(port, () => {
    console.log(`Server is started : ${port}`)
})


// Landing Route
app.get('/', (req, res, next) => {
    res.send("Welcome to ejam");
});


// All Routes
require("./src/routes/Routes")(app);