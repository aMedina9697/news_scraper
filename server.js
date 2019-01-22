const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set up promise with mongoose
mongoose.Promise = global.Promise;
// Connect to mongoDb
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
  {
    useMongoClient: true
  }
);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
