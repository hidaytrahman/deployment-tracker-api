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
    res.send(`
        <div style="text-align:center;  max-width: 1024px;
        margin: 0 auto;
        padding: 4%;
        font-size: 3rem;
        background: #f7efef;
        border-radius: 33px;">
        <img src="https://www.ejam.com/assets/images/ejam_logo_Black.png" />
        <h1>Welcome to ejam!</h1>
        </div>
    `);
});


// All Routes
require("./src/routes/Routes")(app);