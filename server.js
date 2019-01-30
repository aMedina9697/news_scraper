const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require("path");
const router = require('./routes/routes');
const app = express();
require('dotenv').config();
// scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router);
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
let saved;
Handlebars.registerHelper("isSaved", function (saved) {
    console.log("saved\n" + saved);
    if (saved === true || saved === false) {
        return true;
    } else {
        return false;
    }
});

mongoose.Promise = Promise;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://alex:OrangE32@ds147411.mlab.com:47411/heroku_59fgdfg5"

 mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});