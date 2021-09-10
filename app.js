const express = require("express");
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3200;

// body parser
app.use(express.json());

// Database connectivity
async function main() {
    await mongoose.connect(process.env.DB_URI);
}

main().then(() => {
    console.log('Database connected...')
}).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is started : ${port}`)
})


// Landing Route
app.get('/', (req, res, next) => {
    res.send("Welcome to ejam");
});


// All Routes
require("./src/routes/Routes")(app);