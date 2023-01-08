require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const { router } = require('./routes/articles');


// express app
const app = express();

// middleware
app.use(express.json())
app.use((request, response, next) => {
    console.log(request.path, request.method);
    next();
});

// routes
app.use('/blogs', router);


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Setup port number
        app.listen(process.env.PORT, () => {
            console.log(`Successful! Listening on port ${process.env.PORT}`);
        });
    })
    .catch((error => console.log(error)));